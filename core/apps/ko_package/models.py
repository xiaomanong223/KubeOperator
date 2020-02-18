import uuid
import os

import yaml
from django.db import models
from ko_host.apps import get_logger
from kubeoperator.settings import PACKAGE_DIR
import common.models as common_models

logger = get_logger()

__all__ = ['Package']


class Package(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    name = models.CharField(max_length=20, unique=True)
    meta = common_models.JsonTextField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    packages_dir = PACKAGE_DIR

    @classmethod
    def lookup(cls):
        for d in os.listdir(cls.packages_dir):
            full_path = os.path.join(cls.packages_dir, d)
            meta_path = os.path.join(full_path, 'meta.yml')
            if not os.path.isdir(full_path) or not os.path.isfile(meta_path):
                continue
            with open(meta_path) as f:
                metadata = yaml.load(f)
                name = metadata["name"]
                defaults = {'name': name, 'meta': metadata}
                _, created = cls.objects.update_or_create(defaults=defaults, name=name)
