import uuid

from django.db import models
import common.models as common_models
from ko_cluster.model.config import ConfigFile
from ko_cluster.model.node import Node
from ko_cluster.model.role import Role

__all__ = ["Cluster"]


class Cluster(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    name = models.SlugField(max_length=128, allow_unicode=True, unique=True, verbose_name=_('Name'))
    package = models.ForeignKey("ko_package.Package", null=True, on_delete=models.SET_NULL)
    configs = common_models.JsonDictTextField(default={})
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def is_real(self):
        return True

    @property
    def inventory(self):
        return

    @classmethod
    def cluster_config(cls):
        config = ConfigFile.objects.get(name="cluster", version="v1")
        return config

    def create_roles(self):
        config = Cluster.cluster_config()
        roles_meta = config["cluster"]["roles"]
        parent = Role.objects.create(project=self, name="cluster")
        roles = []
        for rm in roles_meta["roles"]:
            role = Role.objects.create(project=self,
                                       name=rm["name"],
                                       vars=rm["vars"])
            roles.append(role)
        parent.children.set(roles)

    def create_localhost_nodes(self):
        local_nodes = ['localhost', '127.0.0.1', '::1']
        for name in local_nodes:
            node = Node.objects.create(
                name=name, vars={"ansible_connection": "local"},
                project=self, meta={"hidden": True},
            )
            node.set_groups(group_names=['cluster'])

    def set_default_configs(self):
        config = Cluster.cluster_config()
        self.configs.update(config["cluster"]["vars"])
        self.save()

    def on_save(self):
        self.create_roles()
        self.create_localhost_nodes()
        self.set_default_configs()
