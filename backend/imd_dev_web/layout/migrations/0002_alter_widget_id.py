# Generated by Django 5.1.1 on 2024-12-03 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('layout', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='widget',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]