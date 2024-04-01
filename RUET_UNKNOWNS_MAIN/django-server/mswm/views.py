from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, RetrieveUpdateAPIView
import requests

from .models import VehicleType, Vehicle, MSWMSite, TravelLogs
from accounts.models import Role
from .serializers import VehicleTypeCreationSerializer, VehicleCreationSerializer, MSWMSiteCreationSerializer, MSWMSiteAddManagerSerializer, MSWMSiteAddVehicleSerializer, TravelLogsSerializer
from . import fleetOptimizer

from accounts.serializers import CustomUserSerializer
from .permissions import IsAdminOrReadOnly

class VehicleTypeListCreate(ListCreateAPIView):
    queryset = VehicleType.objects.all()
    serializer_class = VehicleTypeCreationSerializer
    permission_classes = [permissions.IsAdminUser]

class VehicleListCreate(ListCreateAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleCreationSerializer
    permission_classes = [permissions.IsAdminUser]

class MSWMSiteListCreate(ListCreateAPIView):
    queryset = MSWMSite.objects.all()
    serializer_class = MSWMSiteCreationSerializer
    permission_classes = (IsAdminOrReadOnly,)

    # Override the query method to filter the queryset based on get parameters
    def get_queryset(self):
        queryset = MSWMSite.objects.all()
        site_type = self.request.query_params.get('type', None)
        if site_type:
            queryset = queryset.filter(site_type=site_type)
        return queryset

class MSWMSiteRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = MSWMSite.objects.all()
    serializer_class = MSWMSiteCreationSerializer
    permission_classes = [permissions.IsAdminUser]

class MSWMSiteListManagers(ListAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        role = self.request.query_params.get('role', None)
        available = self.request.query_params.get('available', None)

        queryset = get_user_model().objects.all()

        if role:
            queryset = queryset.filter(role=role)

        if available:
            if available.lower() == 'true':
                queryset = queryset.filter(managed_site=None)
            elif available.lower() == 'false':
                queryset = queryset.exclude(managed_site=None)

        return queryset

# View for adding a manager to the site
class MSWMSiteAddManager(RetrieveUpdateAPIView):
    # Only allow admin users to add managers
    permission_classes = [IsAdminOrReadOnly]
    queryset = MSWMSite.objects.all()
    serializer_class = MSWMSiteAddManagerSerializer

    def update(self, request, *args, **kwargs):
        site_manager_dict={
            'STS': 'STS Manager',
            'Landfill': 'Landfill Manager',
        }
        print(request.data)
        instance = self.get_object()
        # Get the instance type
        site_type = instance.site_type

        manager_id = request.data.get('managers', None)

        if manager_id:
            manager = get_user_model().objects.get(id=manager_id)

            # Check if the manager is already managing a site
            if manager.managed_site:
                return Response({'error': 'Manager is already managing a site'}, status=400)
            # Check if the manager has different role than the site type
       
            if manager.role.name != site_manager_dict[site_type]:
                return Response({'error': 'Manager role does not match the site type'}, status=400)
            # Assign the manager to the site
            manager.managed_site = instance
            manager.save()

            return Response({'success': 'Manager added successfully'}, status=200)
        return Response({'error': 'Manager not provided'}, status=400)
    

# View for Listing the vehicles
class MSWMSiteListVehicles(ListAPIView):
    # /mswm/site/vehicles/?available=true
    serializer_class = VehicleCreationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        available = self.request.query_params.get('available', None)

        queryset = Vehicle.objects.all()

        if available:
            if available.lower() == 'true':
                queryset = queryset.filter(sts_site=None)
            elif available.lower() == 'false':
                queryset = queryset.exclude(sts_site=None)

        return queryset

# View for Adding a vehicle to the site
class MSWMSiteAddVehicle(RetrieveUpdateAPIView):
    permission_classes = [IsAdminOrReadOnly]
    queryset = MSWMSite.objects.all()
    serializer_class = MSWMSiteAddVehicleSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        vehicle_id = request.data.get('site_vehicles', None)

        if vehicle_id:
            vehicle = Vehicle.objects.get(id=vehicle_id)
            # Check if the vehicle is already assigned to a site
            if vehicle.sts_site:
                return Response({'error': 'Vehicle is already assigned to a site'}, status=400)
            # Assign the vehicle to the site
            vehicle.sts_site = instance
            vehicle.save()

            return Response({'success': 'Vehicle added successfully'}, status=200)
        return Response({'error': 'Vehicle not provided'}, status=400)
    
# View for adding a travel log
class TravelLogsListCreate(ListCreateAPIView):
    queryset = TravelLogs.objects.all()
    serializer_class = TravelLogsSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    # Filter the queryset based on the user
    def get_queryset(self):
        user = self.request.user
        return TravelLogs.objects.filter(site=user.managed_site)
    
    # # Override the create method to check if the vehicle belongs to the site
    def create(self, request, *args, **kwargs):
        vehicle_id = request.data.get('vehicle', None)
        vehicle = Vehicle.objects.get(id=vehicle_id)
        vehicle_capacity = vehicle.vehicle_type.capacity
        waste_weight = request.data.get('waste_weight', None)
        if float(waste_weight) > vehicle_capacity:
            return Response({'error': 'Waste weight exceeds the vehicle capacity'}, status=400)
        site_id = request.data.get('site', None)
        site = MSWMSite.objects.get(id=site_id)

        user = self.request.user

        if user.managed_site != site:
                return Response({'error': 'User does not have permission to add logs to this site'}, status=403)
        # Check whether the vehicle belongs to the site
        if user.role.name != "Landfill Manager":
            # Check whether the user's managed_site is the same as the site
            if vehicle.sts_site != site:
                return Response({'error': 'Vehicle does not belong to the site'}, status=400)
        return super().create(request, *args, **kwargs)
        

class STSManagerViewOptimizedFleet(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        user = request.user

        # Get the capacity of the sts site from query params
        capacity = request.query_params.get('capacity', None)
        
        if capacity is None:
            # The default capacity of the site
            if user.managed_site:
                capacity = user.managed_site.capacity
        else:
            capacity = float(capacity)
        
        if user.role.name == "STS Manager":
            site = user.managed_site
            vehicles = Vehicle.objects.filter(sts_site=site)
            optimizer_vehicles = []
            for vehicle in vehicles:
                vehicle_type = vehicle.vehicle_type
                v = fleetOptimizer.Vehicle(
                    vehicle.id,
                    str(vehicle_type),
                    vehicle_type.capacity,
                    0,
                    vehicle_type.fuel_cost_km_empty,
                    vehicle_type.fuel_cost_km_loaded
                )
                optimizer_vehicles.append(v)
            fleet = fleetOptimizer.prepare_final_fleet(optimizer_vehicles*3, capacity)
            
            # Separate the unique vehicles from the fleet
            unique_vehicles = []
            for vehicle in fleet:
                if vehicle.reg_no not in unique_vehicles:
                    unique_vehicles.append(vehicle.reg_no)
            output_vehicles = []
            for id in unique_vehicles:
                vehicle = Vehicle.objects.get(id=id)
                output_vehicles.append(vehicle)
            serializer = VehicleCreationSerializer(output_vehicles, many=True)
            return Response(serializer.data)
        else:
            return Response({'error': 'User does not have permission to view this page'}, status=403)



class LandfillManagerBillView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk, format=None):
        # Assuming pk is the primary key of the TravelLogs instance
        try:
            log = TravelLogs.objects.get(pk=pk, site=request.user.managed_site)
        except TravelLogs.DoesNotExist:
            return Response({"error": "Travel log not found"}, status=404)

        vehicle = log.vehicle
        dest_lat = log.site.latitude
        dest_lon = log.site.longitude
        src_lat = log.vehicle.sts_site.latitude
        src_lon = log.vehicle.sts_site.longitude

        vehicle_type = vehicle.vehicle_type
        vehicle_capacity = vehicle_type.capacity
        fuel_cost_km_empty = vehicle_type.fuel_cost_km_empty
        fuel_cost_km_loaded = vehicle_type.fuel_cost_km_loaded
        waste_weight = log.waste_weight
        arrival_time = log.arrival_time
        departure_time = log.departure_time

        fuel_cost_per_km = fuel_cost_km_empty + (fuel_cost_km_loaded - fuel_cost_km_empty) * (waste_weight / vehicle_capacity)
        
        fuel_cost = None

        try:
            # Make a request to the API
            url = 'https://api.distancematrix.ai/maps/api/distancematrix/json'
            params = {
                'origins': f'{src_lat},{src_lon}',
                'destinations': f'{dest_lat},{dest_lon}',
                'key': 'w0mkJ1Ltj6ub0VvXo0M8AhdgcZHTSi6gcH3wFHBlbL2rWk0pIECSo1v1jsGhY5PN'
            }
            resp = requests.get(url, params=params)
            resp.raise_for_status()  # Raise exception for HTTP errors
            data = resp.json()
            dist = float(data['rows'][0]['elements'][0]['distance']['value']) / 1000
            fuel_cost = fuel_cost_per_km * dist
            
        except (requests.RequestException, KeyError, ValueError) as e:
            # Handle exceptions raised during API call or JSON parsing
            print(e)


        out_dict = {
            'truck_registration_number': vehicle.registration_number,
            'truck_type': str(vehicle_type),
            'truck_capacity': vehicle_capacity,
            'fuel_cost_km_empty': fuel_cost_km_empty,
            'fuel_cost_km_loaded': fuel_cost_km_loaded,
            'waste_weight': waste_weight,
            'arrival_time': arrival_time,
            'departure_time': departure_time,
            'fuel_cost_per_km': fuel_cost_per_km,
            'estimated_fuel_cost': fuel_cost
        }

        return Response(out_dict)