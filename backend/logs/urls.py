from django.urls import path, include

from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'logs', views.EventView, 'logs')
router.register(r'tags', views.TagView, 'tags')
router.register(r'hosts', views.HostView, 'hosts')
router.register(r'senders', views.SenderView, 'senders')

app_name = 'logs'
urlpatterns = [
    path('api/', include(router.urls)),
]