# Generated by Django 5.1.1 on 2024-12-04 22:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('layout', '0004_grid_created_at_grid_deleted_at_grid_is_active_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='grid',
            name='name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='template',
            name='name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='widget',
            name='name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]