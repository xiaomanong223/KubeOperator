from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers

from ko_cluster import api

app_name = "ko_cluster"
router = DefaultRouter()

router.register('clusters', api.ClusterViewSet, 'cluster')
router.register(r'config', api.ConfigFileViewSet, 'config')
cluster_router = routers.NestedDefaultRouter(router, r'clusters', lookup='cluster')
cluster_router.register(r'nodes', api.NodeViewSet, 'cluster-node')
cluster_router.register(r'roles', api.RoleViewSet, 'cluster-role')
urlpatterns = [] + router.urls + cluster_router.urls
