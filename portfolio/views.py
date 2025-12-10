from django.shortcuts import render
from .models import Profile, SkillCategory, Project, SocialLink


def home(request):
    profile = Profile.objects.first()
    skill_categories = SkillCategory.objects.prefetch_related('skills').all()
    projects = Project.objects.all()
    social_links = SocialLink.objects.all()
    
    context = {
        'profile': profile,
        'skill_categories': skill_categories,
        'projects': projects,
        'social_links': social_links,
    }
    return render(request, 'portfolio/index.html', context)
