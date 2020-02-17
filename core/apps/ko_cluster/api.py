from rest_framework import viewsets

from ansible_api.permissions import IsSuperUser
from ko_cluster import serializers
from ko_cluster.mixin import ClusterResourceAPIMixin
from ko_cluster.model.cluster import Cluster
from ko_cluster.model.config import ConfigFile
from ko_cluster.model.node import Node
from ko_cluster.model.role import Role


class ConfigFileViewSet(viewsets.ModelViewSet):
    queryset = ConfigFile.objects.all()
    serializer_class = serializers.ConfigFileSerializer
    lookup_field = 'name'
    lookup_url_kwarg = 'name'
    http_method_names = ['get', 'head', 'options']

    def list(self, request, *args, **kwargs):
        ConfigFile.look_up()
        return super().list(request, args, kwargs)

    def retrieve(self, request, *args, **kwargs):
        ConfigFile.look_up()
        return super().retrieve(request, args, kwargs)


class ClusterViewSet(viewsets.ModelViewSet):
    queryset = Cluster.objects.all()
    serializer_class = serializers.ClusterSerializer
    lookup_field = 'name'
    lookup_url_kwarg = 'name'


class RoleViewSet(ClusterResourceAPIMixin, viewsets.ModelViewSet):
    queryset = Role.objects.all()
    permission_classes = (IsSuperUser,)
    serializer_class = serializers.RoleSerializer
    lookup_field = 'name'
    lookup_url_kwarg = 'name'


class NodeViewSet(ClusterResourceAPIMixin, viewsets.ModelViewSet):
    queryset = Node.objects.all()
    serializer_class = serializers.NodeSerializer
    permission_classes = (IsSuperUser,)
    lookup_field = 'name'
    lookup_url_kwarg = 'name'
