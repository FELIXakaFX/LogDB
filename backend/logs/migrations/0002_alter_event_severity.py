# Generated by Django 4.0.2 on 2022-02-05 23:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('logs', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='severity',
            field=models.PositiveSmallIntegerField(null=True),
        ),
    ]