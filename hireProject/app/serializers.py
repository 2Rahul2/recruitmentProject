from rest_framework import serializers
from .models import UserProfile ,CreateUser

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreateUser
        fields = '__all__'
class UserProfileSerializer(serializers.ModelSerializer):
    user = CreateUserSerializer()
    class Meta:
        model = UserProfile
        fields = '__all__' 