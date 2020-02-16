import uuid
import os
from django.db import models
from common import models as common_models
from common.utils import ssh_key_string_to_obj
from ko_host.apps import get_logger
from ko_system.consts import CREDENTIAL_TYPE_CHOICES, CREDENTIAL_TYPE_PASSWORD
from kubeoperator import settings
from hashlib import md5

__all__ = ["Credential", "Setting"]
logger = get_logger()


class Setting(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    key = models.CharField(max_length=128, blank=False)
    value = models.CharField(max_length=255, blank=True, default=None, null=True)

    @classmethod
    def get_setting(cls, key):
        setting = cls.objects.get(key=key)
        return setting

    @classmethod
    def get_settings(cls):
        settings = cls.objects.all()
        result = {}
        for setting in settings:
            result[setting.key] = setting.value
        return result

    @classmethod
    def set_settings(cls, settings):
        for k, v in settings.items():
            defaults = {"key": k, "value": v}
            cls.objects.update_or_create(defaults=defaults, key=k)


class Credential(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    name = models.SlugField(max_length=128, allow_unicode=True, unique=True)
    username = models.CharField(max_length=256, default='root')
    password = common_models.EncryptCharField(max_length=4096, blank=True, null=True)
    private_key = common_models.EncryptCharField(max_length=8192, blank=True, null=True)
    type = models.CharField(max_length=128, choices=CREDENTIAL_TYPE_CHOICES, default=CREDENTIAL_TYPE_PASSWORD)
    date_created = models.DateTimeField(auto_now_add=True)

    @property
    def private_key_obj(self):
        return ssh_key_string_to_obj(self.private_key, self.password)

    @property
    def private_key_path(self):
        if not self.type == 'privateKey':
            return None
        tmp_dir = os.path.join(settings.BASE_DIR, 'data', 'tmp')
        if not os.path.isdir(tmp_dir):
            os.makedirs(tmp_dir)
        key_name = '.' + md5(self.private_key.encode('utf-8')).hexdigest()
        key_path = os.path.join(tmp_dir, key_name)
        if not os.path.exists(key_path):
            self.private_key_obj.write_private_key_file(key_path)
            os.chmod(key_path, 0o400)
        return key_path
