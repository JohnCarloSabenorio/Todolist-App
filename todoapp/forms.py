from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.core.exceptions import ValidationError

User = get_user_model()

def unique_email_validator(value):
    if User.objects.filter(email=value).exists():
        raise ValidationError("This email address is already in use.")


class CustomUserform(UserCreationForm):
    email = forms.EmailField(validators=[unique_email_validator])
    class Meta:
        model = User
        fields = ['username', 'email' ,'password1', 'password2']

