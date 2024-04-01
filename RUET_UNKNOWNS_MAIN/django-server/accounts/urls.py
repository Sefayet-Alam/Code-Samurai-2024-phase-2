from django.urls import path, include
from dj_rest_auth.views import LoginView, LogoutView, PasswordChangeView, PasswordResetView, PasswordResetConfirmView, UserDetailsView

from .views import CustomUserListCreate, CustomUserRetrieveUpdateDestroy, PermissionListCreate, PermissionRetrieveUpdateDestroy, RoleListCreate, RoleRetrieveUpdateDestroy, UserRoleUpdate, RolePermissionUpdate, RoleListView, CustomUserProfileRetrieveUpdateView

urlpatterns = [

    path("auth/login/", LoginView.as_view(), name="auth-login"),
    path("auth/logout/", LogoutView.as_view(), name="auth-logout"),
    path("auth/change-password/", PasswordChangeView.as_view(), name="auth-change-password"),
    path("auth/reset-password/initiate/", PasswordResetView.as_view(), name="auth-reset-password-initiate"),
    path("auth/reset-password/confirm/<uidb64>/<token>/", PasswordResetConfirmView.as_view(), name="password_reset_confirm"),

    path("users/", CustomUserListCreate.as_view(), name="users-list-create"),
    path("users/<int:pk>/", CustomUserRetrieveUpdateDestroy.as_view(), name="users-retrieve-update-destroy"),
    path("users/roles/", RoleListView.as_view(), name="users-roles-list"),
    path("users/<int:pk>/roles/", UserRoleUpdate.as_view(), name="users-roles-update"),

    path("profile/", CustomUserProfileRetrieveUpdateView.as_view(), name="users-profile"),

    path("rbac/permissions/", PermissionListCreate.as_view(), name="permissions-list-create"),
    path("rbac/permissions/<int:pk>/", PermissionRetrieveUpdateDestroy.as_view(), name="permissions-retrieve-update-destroy"),
    
    path("rbac/roles/", RoleListCreate.as_view(), name="roles-list-create"),
    path("rbac/roles/<int:pk>/", RoleRetrieveUpdateDestroy.as_view(), name="roles-retrieve-update-destroy"),
    path("rbac/roles/<int:pk>/permissions/", RolePermissionUpdate.as_view(), name="roles-permissions-update"),

]