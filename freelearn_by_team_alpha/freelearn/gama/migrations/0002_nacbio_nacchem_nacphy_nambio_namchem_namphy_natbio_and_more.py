# Generated by Django 4.0 on 2021-12-27 14:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gama', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='nacbio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('batan', models.CharField(default='some_string', max_length=1000)),
                ('url', models.CharField(default='some_string', max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='nacchem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('batan', models.CharField(default='some_string', max_length=1000)),
                ('url', models.CharField(default='some_string', max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='nacphy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('batan', models.CharField(default='some_string', max_length=1000)),
                ('url', models.CharField(default='some_string', max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='nambio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('batan', models.CharField(default='some_string', max_length=1000)),
                ('url', models.CharField(default='some_string', max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='namchem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('batan', models.CharField(default='some_string', max_length=1000)),
                ('url', models.CharField(default='some_string', max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='namphy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('batan', models.CharField(default='some_string', max_length=1000)),
                ('url', models.CharField(default='some_string', max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='natbio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('batan', models.CharField(default='some_string', max_length=1000)),
                ('url', models.CharField(default='some_string', max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='natchem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('batan', models.CharField(default='some_string', max_length=1000)),
                ('url', models.CharField(default='some_string', max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='natphy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('batan', models.CharField(default='some_string', max_length=1000)),
                ('url', models.CharField(default='some_string', max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='nbcbio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('batan', models.CharField(default='some_string', max_length=1000)),
                ('url', models.CharField(default='some_string', max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='nbcchem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('batan', models.CharField(default='some_string', max_length=1000)),
                ('url', models.CharField(default='some_string', max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='nbcphy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('batan', models.CharField(default='some_string', max_length=1000)),
                ('url', models.CharField(default='some_string', max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='nbmbio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('batan', models.CharField(default='some_string', max_length=1000)),
                ('url', models.CharField(default='some_string', max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='nbmchem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('batan', models.CharField(default='some_string', max_length=1000)),
                ('url', models.CharField(default='some_string', max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='nbmphy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('batan', models.CharField(default='some_string', max_length=1000)),
                ('url', models.CharField(default='some_string', max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='nbtbio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('batan', models.CharField(default='some_string', max_length=1000)),
                ('url', models.CharField(default='some_string', max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='nbtchem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('batan', models.CharField(default='some_string', max_length=1000)),
                ('url', models.CharField(default='some_string', max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='nbtphy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('batan', models.CharField(default='some_string', max_length=1000)),
                ('url', models.CharField(default='some_string', max_length=1000)),
            ],
        ),
    ]
