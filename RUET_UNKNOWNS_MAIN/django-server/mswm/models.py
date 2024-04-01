from django.db import models

class MSWMSite(models.Model):

    SITE_TYPE_CHOICES = [
        ('STS', 'Solid Waste Transfer Station'),
        ('Landfill', 'Landfill'),
        ('Other', 'Other')
    ]

    name = models.CharField(max_length=100)
    ward_number = models.IntegerField(null=True)
    site_type = models.CharField(max_length=100, choices=SITE_TYPE_CHOICES, default='OTHER')
    description = models.TextField(blank=True)
    capacity = models.FloatField(null=True)
    current_load = models.FloatField(null=True)
    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)

    def __str__(self) -> str:
        return str(self.ward_number) + ' - ' + self.site_type

class VehicleType(models.Model):

    NAME_CHOICES = [
     ("Open Truck", "Open Truck"),
     ("Dump Truck", "Dump Truck"),
     ("Compactor", "Compactor"),
     ("Container Career", "Container Career"),
     ("Other", "Other")
    ]

    CAPACITY_CHOICES = [
        (3, "3 Tonnes"),
        (5, "5 Tonnes"),
        (10, "7 Tonnes"),
        (15, "15 Tonnes"),
    ]
    name = models.CharField(max_length=100, choices=NAME_CHOICES, default='Other')
    capacity = models.FloatField(null=True, choices=CAPACITY_CHOICES, default=3)
    fuel_cost_km_loaded = models.FloatField(null=True)
    fuel_cost_km_empty = models.FloatField(null=True)

    def __str__(self) -> str:
        return self.name

class Vehicle(models.Model):
    vehicle_type = models.ForeignKey(VehicleType, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True)
    registration_number = models.CharField(max_length=100)
    fuel_level = models.FloatField(null=True)
    current_load = models.FloatField(null=True)
    sts_site = models.ForeignKey(MSWMSite, on_delete=models.CASCADE, related_name='site_vehicles', null=True)

    def __str__(self) -> str:
        return str(self.vehicle_type) + ' - ' + self.registration_number


class TravelLogs(models.Model):
    site = models.ForeignKey(MSWMSite, on_delete=models.CASCADE)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    arrival_time = models.DateTimeField(null=True)
    departure_time = models.DateTimeField(null=True)
    waste_weight = models.FloatField(null=True)

    def __str__(self) -> str:
        return str(self.site) + ' - ' + str(self.vehicle) 