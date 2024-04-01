from rest_framework import serializers

from .models import MSWMSite, VehicleType, Vehicle, TravelLogs

class VehicleTypeCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleType
        fields = ['id', 'name', 'capacity', 'fuel_cost_km_loaded', 'fuel_cost_km_empty']

class VehicleCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['id', 'vehicle_type', 'registration_number', 'sts_site']

        # Allow some fields to be read only
        read_only_fields = ['sts_site']

class MSWMSiteCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MSWMSite
        fields = ['id', 'ward_number', 'site_type', 'capacity', 'current_load', 'latitude', 'longitude', 'managers', 'site_vehicles']

        read_only_fields = ['site_vehicles', 'managers']

        # Allow some fields to be non-required
        extra_kwargs = {
            'current_load': {'required': False},
            'ward_number': {'required': False},
            'managers': {'required': False},
            'site_vehicles': {'required': False}
        }

class MSWMSiteAddManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = MSWMSite
        fields = ['id', 'ward_number', 'site_type', 'managers']
        read_only_fields = ['ward_number', 'site_type']

class MSWMSiteAddVehicleSerializer(serializers.
ModelSerializer):
    class Meta:
        model = MSWMSite
        fields = ['id', 'ward_number', 'site_type', 'site_vehicles']
        read_only_fields = ['ward_number', 'site_type']

class TravelLogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelLogs
        fields = ['id', 'site', 'vehicle', 'arrival_time', 'departure_time', 'waste_weight']