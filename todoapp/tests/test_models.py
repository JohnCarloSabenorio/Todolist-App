from django.test import TestCase
from todoapp.models import CustomUser, Task

class TestModels(TestCase):

    def test_task_object(self):
        user1 = CustomUser.objects.create(username = 'testuser', email = 'user@example.com', password = 'newuser12@#')
        task1 = Task.objects.create(title = 'doing the dishes', user = user1, order = 1)

        self.assertEqual(task1.title, 'doing the dishes')
        self.assertEqual(task1.user.username, 'testuser')