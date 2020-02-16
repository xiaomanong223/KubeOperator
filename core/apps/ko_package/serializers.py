from rest_framework import serializers

from ko_package.apps import get_logger
from ko_package.models import Package

logger = get_logger()


class PackageSerializer(serializers.ModelSerializer):
    meta = serializers.JSONField()

    class Meta:
        model = Package
        read_only_fields = ['id', 'name', 'meta', 'date_created']
        fields = ['id', 'name', 'meta', 'date_created']
