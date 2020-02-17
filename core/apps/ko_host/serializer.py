from ansible_api.serializers.inventory import HostReadSerializer
from rest_framework import serializers
from common.ssh import SshConfig, SSHClient
from ko_host.models import Host, Volume, GPU, Condition
from ko_system.models import Credential

__all__ = ["VolumeSerializer", "GPUSerializer", "ConditionSerializer", "HostSerializer"]


def is_ip_exists(ip):
    hosts = Host.objects.filter(ip=ip)
    return len(hosts) > 0


def is_host_connected(ip, port, credential):
    config = SshConfig(host=ip, username=credential.username, password=credential.password,
                       private_key=credential.private_key,
                       port=port, timeout=10)
    client = SSHClient(config)
    return client.ping()


class HostSerializerMixin(serializers.ModelSerializer):

    def validate(self, attrs):
        ip = attrs.get("ip")
        credential = attrs.get("credential")
        port = attrs.get("port", 22)
        if is_ip_exists(ip):
            raise serializers.ValidationError("ip {} already exists!".format(ip))
        if not is_host_connected(ip, port, credential):
            raise serializers.ValidationError("can not connected host: {} with given credential".format(ip))
        return attrs

    def save(self, **kwargs):
        self.instance = super().save(**kwargs)
        self.instance.gather_info()
        return self.instance


class VolumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volume
        fields = [
            'id', 'name', 'size',
        ]
        read_only_fields = ['id', 'name', 'size', ]


class GPUSerializer(serializers.ModelSerializer):
    class Meta:
        model = GPU
        fields = [
            'id', 'name',
        ]
        read_only_fields = ['id', 'name', ]


class ConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Condition
        fields = [
            "type", "status", "reason", "last_time"
        ]
        read_only_fields = ["type", "status", "reason", "last_time"]


class HostSerializer(HostReadSerializer, HostSerializerMixin):
    credential = serializers.SlugRelatedField(
        queryset=Credential.objects.all(),
        slug_field='name', required=False
    )
    volumes = VolumeSerializer(required=False, many=True)
    conditions = ConditionSerializer(required=False, many=True)
    gpus = GPUSerializer(required=False, many=True)
    basic = serializers.DictField(required=False)

    class Meta:
        model = Host
        extra_kwargs = HostReadSerializer.Meta.extra_kwargs
        fields = ['id', 'name', 'ip', 'port', 'gpus', 'credential', 'connected', 'basic', 'volumes', 'conditions']
        read_only_fields = ['id', 'basic', 'connected', 'volumes', 'gpus', 'conditions']
