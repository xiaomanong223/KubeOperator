import logging

from django.apps import AppConfig


class KoSystemConfig(AppConfig):
    name = 'ko_system'


def get_logger():
    return logging.getLogger("system")
