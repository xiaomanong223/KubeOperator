import uuid

from django.db import models
from common import models as common_models
from ko_cluster.apps import get_logger

__all__ = ["Node"]
logger = get_logger()


class Node(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    name = models.SlugField(max_length=128, allow_unicode=True, unique=True)
    host = models.ForeignKey("ko_host.Host", on_delete=models.CASCADE)
    vars = common_models.JsonDictTextField(default={})
    cluster = models.ForeignKey('Cluster', on_delete=models.CASCADE)
