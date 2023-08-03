from django.contrib.auth import get_user_model
from django.contrib.auth.backends import BaseBackend
from .models import CustomUser
# User = get_user_model()
class CustomUserBackend(BaseBackend):
    def authenticate(self ,request ,username = None ,password= None ,**kawrgs):
        try:
            user = CustomUser.objects.get(email = username)
        except CustomUser.DoesNotExist:
            return None
        if CustomUser.check_password(password):
            return user
        
        return None