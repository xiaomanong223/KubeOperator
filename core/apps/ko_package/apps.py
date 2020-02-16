import logging

from django.apps import AppConfig


class KoPackageConfig(AppConfig):
    name = 'ko_package'


def get_logger():
    return logging.getLogger("host")
