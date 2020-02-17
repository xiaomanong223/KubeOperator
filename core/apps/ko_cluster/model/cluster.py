import yaml
from django.db import models
from ansible_api.models import Project
import common.models as common_models
from ko_cluster.model.config import ConfigFile
from ko_cluster.model.node import Node
from ko_cluster.model.role import Role

__all__ = ["Cluster"]


class Cluster(Project):
    package = models.ForeignKey("ko_package.Package", null=True, on_delete=models.SET_NULL)
    configs = common_models.JsonDictTextField(default={})

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
