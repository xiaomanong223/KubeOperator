from rest_framework import serializers

from ko_system.apps import get_logger
from ko_system.models import Credential

logger = get_logger()

__all__ = ["CredentialSerializer"]


class CredentialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credential
        extra_kwargs = {
            'password': {'write_only': True},
            'private_key': {'write_only': True},
        }
        fields = ['id', 'name', 'username', 'password', 'private_key', 'date_created', 'type']
        read_only_fields = ['id', 'date_created']
