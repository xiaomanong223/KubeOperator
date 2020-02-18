from django.db import models
from ansible_api.models import Host as Ansible_Host
from ko_cluster.apps import get_logger

__all__ = ["Node"]
logger = get_logger()


class Node(Ansible_Host):
    host = models.ForeignKey("ko_host.Host", on_delete=models.CASCADE)

    @property
    def username(self):
        return self.host.username

    @property
    def password(self):
        return self.host.password

    @property
    def private_key(self):
        return self.host.private_key

    @property
    def ip(self):
        return self.host.ip

    @property
    def port(self):
        return self.host.port
