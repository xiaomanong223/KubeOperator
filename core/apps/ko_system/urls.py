from rest_framework.routers import DefaultRouter

from django.conf.urls import url
from ko_system import api

app_name = "ko_system"
router = DefaultRouter()
router.register('credentials', api.CredentialViewSet, 'credentials')

urlpatterns = [
                  url('settings', api.SettingView.as_view(), name='settings'),
              ] + router.urls
