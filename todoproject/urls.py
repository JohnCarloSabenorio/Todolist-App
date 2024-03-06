from django.contrib import admin
from django.urls import include, path
from django.contrib.auth import  views as auth_views
from todoapp import views as user_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", auth_views.LoginView.as_view(template_name='todoapp/login.html'), name = "login"),
    path("logout/", auth_views.LogoutView.as_view(template_name='todoapp/logout.html'), name = "logout"),
    path("register/", user_views.register, name = "register"),
    path("home/", user_views.home, name = "home"),
    # path('', include("todoapp.urls")),

]
