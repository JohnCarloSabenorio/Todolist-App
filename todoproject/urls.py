from django.contrib import admin
from django.urls import path
from django.contrib.auth import views as auth_views
from todoapp import views as user_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", auth_views.LoginView.as_view(template_name='todoapp/login.html', redirect_authenticated_user=True), name = "login"),
    path("logout/", auth_views.LogoutView.as_view(template_name='todoapp/logout.html'), name = "logout"),
    path("register/", user_views.register, name = "register"),
    path("home/", user_views.home, name = "home"),
    path("savetasks", user_views.saveTasks, name = "save"),
    path("delTask" , user_views.deleteTask, name = "delete"),
    path("addTask" , user_views.addTask, name = "add"),
]
