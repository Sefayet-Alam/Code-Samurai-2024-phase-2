from django.contrib import admin

from .models import MSWMSite, VehicleType, Vehicle, TravelLogs

admin.site.register(MSWMSite)
admin.site.register(VehicleType)
admin.site.register(Vehicle)
admin.site.register(TravelLogs)