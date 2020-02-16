from django.test import TestCase

from ko_host.models import Host
from ko_system.models import Credential


class TestHost(TestCase):

    def create_host(self):
        credential = Credential.objects.create(username="root", password="Calong@2015")
        host = Host.objects.create(name="test", ip="47.114.141.79", credential=credential)
        host.gather_info()
