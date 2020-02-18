from rest_framework import serializers
from ansible_api.serializers import ProjectSerializer, GroupSerializer
from ansible_api.serializers import HostSerializer as AnsibleHostSerializer
from ko_cluster.model.cluster import Cluster
from ko_cluster.model.config import ConfigFile
from ko_cluster.model.node import Node
from ko_cluster.model.role import Role
from ko_host.models import Host
from ko_package.models import Package


class NodeSerializer(AnsibleHostSerializer):
    roles = serializers.SlugRelatedField(
        many=True, queryset=Role.objects.all(),
        slug_field='name', required=False
    )

    class Meta:
        model = Node
        extra_kwargs = AnsibleHostSerializer.Meta.extra_kwargs
        fields = ['id', 'name', 'host', ]
        read_only_fields = ['id']


class RoleSerializer(GroupSerializer):
    nodes = serializers.SlugRelatedField(
        many=True, queryset=Node.objects.all(),
        slug_field='name', required=False
    )

    class Meta:
        model = Role
        fields = ['id', 'name', 'nodes']
        read_only_fields = ['id']


class ClusterSerializer(ProjectSerializer):
    package = serializers.SlugRelatedField(
        queryset=Package.objects.all(),
        slug_field='name', required=False
    )
    configs = serializers.DictField(required=False)
    nodes = serializers.ListField(required=False)

    def create(self, validated_data):
        instance = super().create(validated_data)
        return instance

    class Meta:
        model = Cluster
        fields = ['id', 'name', 'package', 'date_created', 'configs', 'nodes']
        read_only_fields = ['id', 'date_created']


class ConfigFileSerializer(serializers.ModelSerializer):
    meta = serializers.DictField(required=False)

    class Meta:
        model = ConfigFile
        fields = ['id', 'name', 'version', 'meta']
        read_only_fields = ['id', 'name', 'version', 'meta']
