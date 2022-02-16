from rest_framework import serializers
from .models import Event, Host, Sender, Tag

class DynamicEventSerializer(serializers.ModelSerializer):
    """
    A EventSerializer that leaves out stderr, stdout and description unless id is provided
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if kwargs['context']['request'].method == "GET" and not 'id' in kwargs['context']['request'].query_params:
            fields = ['stderr', 'stdout', 'description']
            for field_name in fields:
                self.fields.pop(field_name)

class EventSerializer(DynamicEventSerializer):
    host_str     = serializers.CharField(max_length=50,  write_only=True)
    sender_str   = serializers.CharField(max_length=50,  write_only=True)
    tags_str     = serializers.CharField(max_length=100, write_only=True)
    description  = serializers.CharField(allow_blank=True, trim_whitespace=False)
    stdout       = serializers.CharField(allow_blank=True, trim_whitespace=False)
    stderr       = serializers.CharField(allow_blank=True, trim_whitespace=False)

    def create(self, validated_data):
        return Event.create(validated_data)

    def update(self, instance, validated_data):
        return Event.update(instance, validated_data)

    class Meta:
        model = Event 
        fields = '__all__'
        read_only_fields = ["host", "sender", "tags"]
        depth = 1

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'title']
        depth = 1

class HostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Host
        fields = ['id', 'name', 'pretty_name']
        depth = 1

class SenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sender
        fields = ['id', 'name', 'pretty_name']
        depth = 1