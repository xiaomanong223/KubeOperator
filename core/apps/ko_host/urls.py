from rest_framework.routers import DefaultRouter

from ko_host.api import HostViewSet

app_name = "ko_host"
router = DefaultRouter()

router.register('hosts', HostViewSet, 'hosts')

urlpatterns = [
              ] + router.urls
