from django.db import models
from django.contrib.auth.models import AbstractUser
from mswm.models import MSWMSite

class Permission(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Role(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    permissions = models.ManyToManyField(Permission, related_name='roles', blank=True)

    def __str__(self):
        return self.name


class CustomUser(AbstractUser):
    name = models.CharField(null=True, blank=True, max_length=100)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)
    managed_site = models.ForeignKey(MSWMSite, on_delete=models.SET_NULL, null=True, related_name="managers")
