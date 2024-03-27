from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from .forms import CustomUserform
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import Task
# Create your views here.


def login(request):
    if request.user.is_authenticated:
        return redirect('home')
    
    return render(request, "todoapp/login.html", {})

def register(request):
    if request.user.is_authenticated:
        return redirect('home')
    
    if request.method == "POST":
        form = CustomUserform(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            messages.success(request, f"{username} successfully registered! You may now login using that account.")
            return redirect('login')
        else:
            return render(request, "todoapp/register.html", {'form' : form})      
    else:
        form = CustomUserform()
        return render(request, "todoapp/register.html", {'form' : form})

@login_required
def home(request):
    tasks = Task.objects.all()
    return render(request, "todoapp/home.html", {'tasks' : tasks})

@login_required
def saveTasks(request):
    task_array = request.POST.getlist('task')
    user = request.user
    id = user.id 

    # Revise this, check Gemini for possible solutions
    for i in range(0, len(task_array)):
        if not Task.objects.filter(title = task_array[i]).exists():
            new_task = Task(title = task_array[i], user_id = id, order = i+1)
            new_task.save()
    return redirect('home')

@login_required
def deleteTask(request):
    if request.method == "POST":
        task_id = request.POST.get('task_id')
        try:
            task = Task.objects.get(pk=task_id)
            task.delete()
            return JsonResponse({'status' : f"task: '{task.title}' Deleted!"})
        except:
            return JsonResponse({'status' : "Error occurred when deleting task!"})

    
    
# # Checks for errors in usernames
# def checkUserErrors(username):
#     registered_users = CustomUser.objects.all()
#     usernames = [user.username for user in registered_users]
#     errors = []
#     regex = r'^[\w_]+$'
#     if  len(username) < 6 or len(username) > 30:
#         errors.append("Username must be 6-30 characters long.")
#     if not re.match(regex, username):
#         errors.append("Username must only contain letters, numbers, and underscores.")
#     if username in usernames:
#         errors.append("Username must be unique.")
    
#     return errors

# # Checks for errors in emails
# def checkEmailErrors(email):
#     registered_users = CustomUser.objects.all()
#     email_regex = r"^\S+@\S+\.\S+$"
#     errors = []     
#     emails = [user.email for user in registered_users]

#     if not re.match(email_regex, email):
#         errors.apend("Email must follow the format 'username@domain.tld'")

#     return errors

# def checkPassErrors(pword, pword2):
#     errors = []
#     return 



'''
Username:
1. Must be 6-30 characters long
2. Must be unique 
3. Only contains letters, numbers, and underscores.

Password:

'''