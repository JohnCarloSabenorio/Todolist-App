from django.test import TestCase, Client
from django.urls import reverse
from todoapp.models import CustomUser, Task
from django.contrib.auth import get_user_model
from django.contrib import messages  
class TestViews(TestCase):
    def setUp(self):
        self.client = Client()
        self.login_url = reverse('login')
        self.logout_url = reverse('logout')
        self.register_url = reverse('register')
        self.home_url = reverse('home')
        self.save_url = reverse('save')      
        self.delete_url = reverse('delete')                        
        self.add_url = reverse('add')    
        self.user_model = get_user_model()   

    def test_login_GET_template(self):
        response = self.client.get(self.login_url)
        self.assertEqual(response.status_code, 200)       
        self.assertTemplateUsed(response, 'todoapp/login.html')

    def test_logout_GET_template(self):
        self.client.login(username='kojicadmin', password = 'newuser12@#')
        response = self.client.post(self.logout_url)
        self.assertEqual(response.status_code, 200)
        # self.assertTemplateUsed('todoapp/logout.html')

    def test_register_GET_template(self):
        response = self.client.get(self.register_url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'todoapp/register.html')

    def test_register_GET_user_is_authenticated(self):
        # Creates and login user
        user = self.user_model.objects.create(username = 'kojicadmin', password = 'newuser12@#')
        self.client.force_login(user)
        # Checks if user is redirected if logged in
        response = self.client.get(self.register_url)
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, self.home_url)

    def test_register_POST(self):
        response = self.client.post(self.register_url, {
            'username' : 'kojicadmin',
            'email' : 'user@example.com',
            'password1' : 'newuser12@#',
            'password2' : 'newuser12@#',
        })

        self.assertEqual(response.status_code, 302)
        self.assertEqual(len(messages.get_messages(response.wsgi_request)), 1)
        self.assertTrue(self.user_model.objects.filter(username = 'kojicadmin').exists())
        self.assertRedirects(response, self.login_url)

    def test_home_GET(self):
        user = self.user_model.objects.create(username = 'kojicadmin', password = 'newuser12@#')
        self.client.force_login(user)
        response = self.client.get(self.home_url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'todoapp/home.html')

    def test_home_GET_no_user_logged_in(self):
        response = self.client.get(self.home_url)
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, f"{self.login_url}?next={self.home_url}")
