import uuid
from time import sleep
from django.db import models
from ansible_api.models.inventory import BaseHost
from ansible_api.models.utils import name_validator
from common import models as common_models
from common.ssh import SSHClient
from ko_host.apps import get_logger
from ko_host.consts import DEPLOY_TEMPLATE_CHOICES, HOST_STATUS_UNKNOWN, HOST_STATUS_WARNING
from ko_host.exceptions import HostConnectedException
from ko_host.utils import parse_host_to_ssh_config

__all__ = ['Host', 'Volume', 'GPU', 'Condition']
logger = get_logger()


class Host(BaseHost):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=128, validators=[name_validator], unique=True)
    credential = models.ForeignKey("ko_system.Credential", null=True, on_delete=models.SET_NULL)
    volumes = models.ManyToManyField('Volume')
    gpus = models.ManyToManyField('GPU')
    state = models.CharField(choices=DEPLOY_TEMPLATE_CHOICES, default=HOST_STATUS_UNKNOWN, max_length=128)
    basic = common_models.JsonDictTextField(default={})
    conditions = models.ManyToManyField("Condition")
    connected = models.BooleanField(default=True)

    @property
    def username(self):
        return self.credential.username

    @property
    def password(self):
        return self.credential.password

    @property
    def private_key(self):
        return self.credential.private_key

    def health_check(self):
        if self.connected:
            from ko_host.health.host_check import HostHealthCheck
            health_check = HostHealthCheck(host=self)
            conditions = health_check.go()
            self.conditions.set(conditions)
            for cond in conditions:
                if not cond.status:
                    self.state = HOST_STATUS_WARNING
            self.save()

    def gather_info(self):
        from ko_host.info.gather_info import HostInfoCollector
        cl = HostInfoCollector(self)
        result = cl.go()
        self.basic = result.get("basic", None) or {}
        self.gpus.set(result.get("gpus", None) or [])
        self.volumes.set(result.get("volumes", None) or [])
        self.save()

    def ping(self, retry=3):
        config = parse_host_to_ssh_config(self)
        client = SSHClient(config)
        result = False
        while retry > 0:
            result = client.ping()
            if result:
                break
            retry -= 1
            sleep(5)
        if not result:
            self.connected = False
            self.save()
            raise HostConnectedException("can not connect host with ssh: name: {} .".format(self.host.name))

    class Meta:
        ordering = ('name',)


class Volume(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=128)
    size = models.CharField(max_length=16)

    class Meta:
        ordering = ('size',)


class GPU(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=256)


class Condition(models.Model):
    type = models.CharField(max_length=128, null=True)
    status = models.BooleanField(default=True, null=True)
    reason = models.CharField(max_length=256, null=True)
    last_time = models.DateTimeField(auto_now_add=True)
