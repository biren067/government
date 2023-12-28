# Generated by Django 4.2.8 on 2023-12-28 16:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menu',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.CreateModel(
            name='QuestionAnswer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=800)),
                ('optoiona', models.CharField(max_length=200)),
                ('optoionb', models.CharField(max_length=200)),
                ('optoionc', models.CharField(max_length=200)),
                ('optoiond', models.CharField(max_length=200)),
                ('answer', models.CharField(max_length=200)),
                ('type', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='qa', to='api.menu')),
            ],
        ),
    ]