from django.urls import path, include

from .views import VehicleTypeListCreate, VehicleListCreate, MSWMSiteListCreate, MSWMSiteListManagers, MSWMSiteAddManager, MSWMSiteListVehicles, MSWMSiteAddVehicle, TravelLogsListCreate, STSManagerViewOptimizedFleet, LandfillManagerBillView

urlpatterns = [
    path("vehicle-types/", VehicleTypeListCreate.as_view(), name="vehicle-types-list-create"),
    path("vehicles/", VehicleListCreate.as_view(), name="vehicles-list-create"),
    
    path("sites/", MSWMSiteListCreate.as_view(), name="sites-list-create"),
    
    path("sites/managers/", MSWMSiteListManagers.as_view(), name="sites-managers-list"),
    path("sites/<int:pk>/managers/", MSWMSiteAddManager.as_view(), name="sites-add-manager"),
    path('sites/managers/optimized-fleet', STSManagerViewOptimizedFleet.as_view(), name='sts-manager-optimized-fleet'),


    path("sites/vehicles/", MSWMSiteListVehicles.as_view(), name="sites-vehicles-list"),
    path("sites/<int:pk>/vehicles/", MSWMSiteAddVehicle.as_view(), name="sites-add-vehicle"),
    
    path('travel-logs/', TravelLogsListCreate.as_view(), name='travel-logs-list-create'),
    path('travel-logs/<int:pk>/bill/', LandfillManagerBillView.as_view(), name='travel-logs-bill'),

]