from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveUpdateAPIView , ListAPIView



from .models import CustomUser, Permission, Role
from .serializers import CustomUserSerializer, CustomUserSerializerAdmin, PermissionSerializer, RoleSerializer, UserRoleUpdateSerializer
from .permissions import IsAdminOrReadOnly


class CustomUserListCreate(ListCreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializerAdmin
    permission_classes = [permissions.IsAdminUser]

class CustomUserRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAdminUser]

class CustomUserProfileRetrieveUpdateView(RetrieveUpdateAPIView):
    # Only provide the information of authenticated user
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    # Lookups for the authenticated user
    def get_object(self):
        return self.request.user
    

class PermissionListCreate(ListCreateAPIView):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    permission_classes = [permissions.IsAdminUser]

class PermissionRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    permission_classes = [permissions.IsAdminUser]

class RoleListCreate(ListCreateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [permissions.IsAdminUser]

class RoleListView(ListAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAdminOrReadOnly]

class RoleRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAdminOrReadOnly]


class UserRoleUpdate(RetrieveUpdateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserRoleUpdateSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = 'pk'
    lookup_url_kwarg = 'pk'

# For assigning permission to a role
class RolePermissionUpdate(RetrieveUpdateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = 'pk'
    lookup_url_kwarg = 'pk'

