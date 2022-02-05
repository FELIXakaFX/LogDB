from django.contrib import admin

from .models import Event

class EventAdmin(admin.ModelAdmin):
    list_display = ('subject', 'created', 'host', 'sender')
    list_filter  = ['created', 'severity', 'host', 'sender']
    search_fields = ['subject', 'description']
    sortable_by = ('created')
    ordering = ['-created']

admin.site.register(Event, EventAdmin)