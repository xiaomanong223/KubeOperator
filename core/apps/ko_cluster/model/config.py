import uuid
import os

import yaml
from django.db import models
import common.models as common_models
from kubeoperator.settings import CONFIG_FILE_PATH


class ConfigFile(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    name = models.SlugField(max_length=128, unique=True)
    version = models.CharField(default="v1", max_length=32)
    meta = common_models.JsonDictTextField(default={})
    config_dir = CONFIG_FILE_PATH

    @classmethod
    def look_up(cls):
        for d in os.listdir(cls.config_dir):
            full_path = os.path.join(cls.config_dir, d)
            if not os.path.isfile(full_path):
                continue
            with open(full_path) as f:
                data = yaml.load(f)
                name = data["resource"]
                version = data["version"]
                meta = data["meta"]
                defaults = {'name': name, 'meta': meta, 'version': version}
                _, created = cls.objects.update_or_create(defaults=defaults, name=name)
