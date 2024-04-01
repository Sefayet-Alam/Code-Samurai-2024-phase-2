from django.contrib import admin
from django.contrib.auth.admin import UserAdmin # ?

from .models import CustomUser, Permission, Role
from .forms import CustomUserChangeForm, CustomUserCreationForm


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display=[ # Display fields in admin page
        "email",
        "username",
        "name",
        "is_staff"
    ]
    fieldsets = UserAdmin.fieldsets + ((None, {"fields": ("name",)}),)
    add_fieldsets = UserAdmin.add_fieldsets + ((None, {"fields": ("name",)}),)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Permission)
admin.site.register(Role)