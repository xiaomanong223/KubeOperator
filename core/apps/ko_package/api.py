from rest_framework import viewsets

from ansible_api.permissions import IsSuperUser
from ko_package import serializers
from ko_package.apps import get_logger
from ko_package.models import Package

logger = get_logger()

__all__ = ["PackageViewSet"]


class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = serializers.PackageSerializer
    permission_classes = (IsSuperUser,)
    http_method_names = ['get', 'head', 'options']
    lookup_field = 'name'
    lookup_url_kwarg = 'name'

    def list(self, request, *args, **kwargs):
        Package.lookup()
        return super().list(self, request, *args, **kwargs)
