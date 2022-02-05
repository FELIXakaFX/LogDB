from django.db import models

from django.db import models
from django.utils import timezone

class Host(models.Model):
    name        = models.CharField(max_length=50)
    pretty_name = models.CharField(max_length=50)
    def __str__(self):
        return self.name

class Sender(models.Model):
    name        = models.CharField(max_length=50)
    pretty_name = models.CharField(max_length=50)
    def __str__(self):
        return self.name

class Tag(models.Model):
    title = models.CharField(max_length=50)
    def __str__(self):
        return self.title

class Event(models.Model):
    created      = models.DateTimeField(auto_now_add=True)
    modified     = models.DateTimeField(auto_now=True)
    subject      = models.CharField(max_length=500)
    description  = models.TextField(null=True)
    stdout       = models.TextField(null=True)
    stderr       = models.TextField(null=True)
    host         = models.ForeignKey(Host, on_delete=models.CASCADE)
    sender       = models.ForeignKey(Sender, on_delete=models.CASCADE)
    severity     = models.PositiveSmallIntegerField(null=True)
    tags         = models.ManyToManyField(Tag, blank=True)
    def __str__(self):
        return self.subject

    def create(data):
        e = Event()
        e.host, _   =   Host.objects.get_or_create(name=data['host_str'],   defaults={'pretty_name': data['host_str']  })
        e.sender, _ = Sender.objects.get_or_create(name=data['sender_str'], defaults={'pretty_name': data['sender_str']})
        e.subject     = data.get('subject')
        e.description = data.get('description') or ''
        e.stdout      = data.get('stdout')      or ''
        e.stderr      = data.get('stderr')      or ''
        e.severity    = data.get('severity')
        e.save()
        for t in data.get('tags_str').split(","):
            e.tags.add(Tag.objects.get_or_create(title=t)[0])
        return e