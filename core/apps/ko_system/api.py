from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.views import APIView

from ansible_api.permissions import IsSuperUser
from ko_host.models import Host
from ko_system import serializers
from ko_system.apps import get_logger
from ko_system.models import Setting, Credential

logger = get_logger()

__all__ = ["SettingView"]


class SettingView(APIView):

    def get(self, request, *args, **kwargs):
        return JsonResponse(Setting.get_settings())

    def post(self, request, *args, **kwargs):
        settings = request.data
        Setting.set_settings(settings)
        return Response(settings, status=status.HTTP_201_CREATED)


class CredentialViewSet(viewsets.ModelViewSet):
    queryset = Credential.objects.all()
    serializer_class = serializers.CredentialSerializer
    permission_classes = (IsSuperUser,)
    lookup_field = 'name'
    lookup_url_kwarg = 'name'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        query_set = Host.objects.filter(credential__name=instance.name)
        if len(query_set) > 0:
            return Response(data={'msg': '凭据: {} 下资源不为空'.format(instance.name)}, status=status.HTTP_400_BAD_REQUEST)
        return super().destroy(self, request, *args, **kwargs)
