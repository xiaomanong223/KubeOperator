from rest_framework.generics import get_object_or_404

from ko_host.models import Host
from ko_host.serializer import HostSerializer
from rest_framework import viewsets

__all__ = ["HostViewSet"]


class HostViewSet(viewsets.ModelViewSet):
    queryset = Host.objects.all()
    serializer_class = HostSerializer
    lookup_field = 'name'
    lookup_url_kwarg = 'name'

    def retrieve(self, request, *args, **kwargs):
        name = kwargs.get('name')
        host = get_object_or_404(Host, name=name)
        host.gather_info()
        return super().retrieve(request, *args, **kwargs)
