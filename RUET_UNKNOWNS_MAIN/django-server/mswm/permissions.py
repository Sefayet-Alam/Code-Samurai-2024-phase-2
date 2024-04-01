from rest_framework import permissions

class IsAdminOrManager(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Check whether the vehicle belongs to the site
        print(obj.site)
        if obj.site != request.user.managed_site:
            return False
        
        if obj.vehicle.sts_site != obj.site:
            if request.user.role.name == "Landfill Manager":
                return True
            return False
        

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # Only authenticated users can see the list
        if not request.user.is_authenticated:
            return False
        if request.method in permissions.SAFE_METHODS or request.user.is_staff:
            return True
        return False
    
    def has_object_permission(self, request, view, obj):
        # Allow GET, HEAD or OPTIONS requests to all
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Provide write permissions to the admin
        return request.user.is_staff
    
