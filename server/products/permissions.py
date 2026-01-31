from rest_framework import permissions

class isSellerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        elif not request.user or not request.user.is_authenticated:
            return False

        elif request.user.is_superuser:
            return True
        else:
            return request.user.groups.filter(name='Sellers').exists()

