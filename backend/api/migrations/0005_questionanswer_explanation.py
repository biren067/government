# Generated by Django 4.2.8 on 2023-12-29 06:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_questionanswer_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='questionanswer',
            name='explanation',
            field=models.CharField(default='Not Available', max_length=8000),
        ),
    ]
