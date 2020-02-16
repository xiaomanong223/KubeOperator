from django.db import models
from ansible_api.models import Host as Ansible_Host
from ko_cluster.apps import get_logger

__all__ = ["Node"]
logger = get_logger()


class Node(Ansible_Host):
    host = models.ForeignKey("ko_host.Host", on_delete=models.CASCADE)
