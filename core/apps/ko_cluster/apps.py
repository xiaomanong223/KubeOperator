import logging

from django.apps import AppConfig


class KoClusterConfig(AppConfig):
    name = 'ko_cluster'


def get_logger():
    return logging.getLogger("host")