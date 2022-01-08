from rest_framework import serializers
from schat.models import User
from schat.models import Msg




class UserSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=50)
    name = serializers.CharField(max_length=20)
    phone_no = serializers.CharField( max_length=12 , default="")
    friends = serializers.JSONField()


    def create(self, validated_data):
        return User.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.name = validated_data.get('name', instance.name)
        instance.phone_no = validated_data.get('phone_no', instance.phone_no)
        instance.save()
        return instance



class MsgSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=50)
    user_1 = serializers.CharField(max_length=20)
    user_2 = serializers.CharField(max_length=20)
    msgs = serializers.JSONField()

    def create(self, validated_data):
        return Msg.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.user_1 = validated_data.get('user_1', instance.user_1)
        instance.user_2 = validated_data.get('user_2', instance.user_2)
        instance.msgs = validated_data.get('msgs', instance.msgs)
        instance.save()
        return instance