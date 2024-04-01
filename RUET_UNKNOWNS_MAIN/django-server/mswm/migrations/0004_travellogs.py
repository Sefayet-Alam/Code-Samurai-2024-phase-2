# Generated by Django 4.0.10 on 2024-03-31 20:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mswm', '0003_remove_vehicle_landfill_site_alter_vehicle_sts_site'),
    ]

    operations = [
        migrations.CreateModel(
            name='TravelLogs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('arrival_time', models.DateTimeField(null=True)),
                ('departure_time', models.DateTimeField(null=True)),
                ('waste_weight', models.FloatField(null=True)),
                ('site', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mswm.mswmsite')),
                ('vehicle', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mswm.vehicle')),
            ],
        ),
    ]
