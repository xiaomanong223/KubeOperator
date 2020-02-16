from rest_framework.routers import DefaultRouter
from ko_package import api

app_name = "ko_package"
router = DefaultRouter()

router.register('packages', api.PackageViewSet, 'packages')

urlpatterns = [
              ] + router.urls
