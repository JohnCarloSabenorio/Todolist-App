from django.urls import reverse, resolve 
import todoapp.views as todo_views
from django.test import SimpleTestCase
from django.contrib.auth.views import LoginView, LogoutView

class TestUrls(SimpleTestCase):
    def test_login_url_resolves(self):
        url = reverse('login')
        self.assertEquals(resolve(url).func.__name__, LoginView.as_view().__name__)

    def test_logout_url_resolves(self):
        url = reverse('logout')
        self.assertEquals(resolve(url).func.__name__, LogoutView.as_view().__name__)

    def test_register_url_resolves(self):
        url = reverse('register')
        self.assertEquals(resolve(url).func, todo_views.register)
    
    def test_home_url_resolves(self):
        url = reverse('home')
        self.assertEquals(resolve(url).func, todo_views.home)
    
    def test_savetasks_url_resolves(self):
        url = reverse('save')
        self.assertEquals(resolve(url).func, todo_views.saveTasks)

    def test_deletetask_url_resolves(self):
        url = reverse('delete')
        self.assertEquals(resolve(url).func, todo_views.deleteTask)

    def test_addtask_url_resolves(self):
        url = reverse('add')
        self.assertEquals(resolve(url).func, todo_views.addTask)    