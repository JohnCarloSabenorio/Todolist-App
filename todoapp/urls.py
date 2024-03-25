from django.urls import path
from . import views
from django.contrib.auth import  views as auth_views

app_name = "todoapp"
urlpatterns = [
    path("login/", auth_views.LoginView.as_view(template_name='todoapp/login.html'), name = "login"),
    path("logout/", auth_views.LogoutView.as_view(template_name='todoapp/logout.html'), name = "logout"),
    path("register/", views.register, name = "register"),
    path("home/", views.home, name = "home"),
    path("save/", views.saveTasks, name = "save"),
]