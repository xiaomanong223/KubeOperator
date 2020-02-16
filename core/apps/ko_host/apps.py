import logging

from django.apps import AppConfig


class KoHostConfig(AppConfig):
    name = 'ko_host'


def get_logger():
    return logging.getLogger("host")


