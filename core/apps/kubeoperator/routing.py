from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path

from celery_api.ws import CeleryLogWebsocket

application = ProtocolTypeRouter({
    # Empty for now (http->django views is added by default)
    'websocket': AuthMiddlewareStack(
        URLRouter([
            path('ws/tasks/<uuid:task_id>/log/', CeleryLogWebsocket, name='task-log-ws'),
        ]),
    ),

})
