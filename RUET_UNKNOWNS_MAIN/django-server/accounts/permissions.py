from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # Only authenticated users can see the list
        if request.user.is_authenticated:
            return True
        return False
    
    def has_object_permission(self, request, view, obj):
        # Allow GET, HEAD or OPTIONS requests to all
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Provide write permissions to the admin
        return request.user.is_staff
    
