# Generated by Django 5.2.3 on 2025-06-17 12:39

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import migrations, models
from django.db.models.deletion import CASCADE


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='CarMake',
            fields=[
                (
                    'id',
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name='ID'
                    )
                ),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='CarModel',
            fields=[
                (
                    'id',
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name='ID'
                    )
                ),
                ('name', models.CharField(max_length=100)),
                (
                    'type',
                    models.CharField(
                        max_length=10,
                        choices=[
                            ('SEDAN', 'Sedan'),
                            ('SUV', 'SUV'),
                            ('WAGON', 'Wagon')
                        ],
                        default='SUV'
                    )
                ),
                (
                    'year',
                    models.IntegerField(
                        default=2023,
                        validators=[
                            MaxValueValidator(2023),
                            MinValueValidator(2015)
                        ]
                    )
                ),
                (
                    'car_make',
                    models.ForeignKey(
                        on_delete=CASCADE,
                        to='djangoapp.carmake'
                    )
                ),
            ],
        ),
    ]
