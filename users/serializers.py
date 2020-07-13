from .models import Organization
from .models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers


class SignupUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", )

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class SetPasswordSerializer(serializers.Serializer):
    password1 = serializers.CharField(required=True)
    password2 = serializers.CharField(required=True)

    def validate_password1(self, password):
        validate_password(password, user=self.context['request'].user)
        return password

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("Passwords don't match")
        return data

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password1'])
        return instance


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ("name", )
