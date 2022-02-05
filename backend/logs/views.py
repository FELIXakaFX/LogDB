from django.shortcuts import render
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend

import django_filters

from .models import Event, Host, Sender, Tag
from .serializers import EventSerializer, TagSerializer, HostSerializer, SenderSerializer

class EventView(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.prefetch_related('host', 'sender', 'tags')
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['subject', 'description']
    filterset_fields = {
        'severity': ['gte'],
        'created': ['gte'],
        'id': ['exact'],
        'host__id': ['exact'],
        'sender__id': ['exact'],
        }
    ordering_fields = ['created', 'severity']
    ordering = ['-created']

class TagView(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()

class HostView(viewsets.ModelViewSet):
    serializer_class = HostSerializer
    queryset = Host.objects.all()

class SenderView(viewsets.ModelViewSet):
    serializer_class = SenderSerializer
    queryset = Sender.objects.all()