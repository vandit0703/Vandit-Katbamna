from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=100)
    tagline = models.CharField(max_length=200)
    bio = models.TextField()
    photo = models.ImageField(upload_to='profile/', blank=True, null=True)
    email = models.EmailField()
    resume = models.FileField(upload_to='resume/', blank=True, null=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile"


class SkillCategory(models.Model):
    name = models.CharField(max_length=50)
    order = models.IntegerField(default=0)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Skill Category"
        verbose_name_plural = "Skill Categories"
        ordering = ['order']


class Skill(models.Model):
    name = models.CharField(max_length=50)
    category = models.ForeignKey(SkillCategory, on_delete=models.CASCADE, related_name='skills')
    icon = models.CharField(max_length=50, blank=True, help_text="Font Awesome icon class (e.g., 'fab fa-python')")
    order = models.IntegerField(default=0)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['order']


class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    live_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    technologies = models.CharField(max_length=200, blank=True, help_text="Comma-separated list of technologies")
    featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    def get_technologies_list(self):
        if self.technologies:
            return [t.strip() for t in self.technologies.split(',')]
        return []
    
    class Meta:
        ordering = ['order', '-created_at']


class SocialLink(models.Model):
    PLATFORM_CHOICES = [
        ('github', 'GitHub'),
        ('linkedin', 'LinkedIn'),
        ('twitter', 'Twitter'),
        ('instagram', 'Instagram'),
        ('youtube', 'YouTube'),
        ('dribbble', 'Dribbble'),
        ('behance', 'Behance'),
        ('facebook', 'Facebook'),
        ('other', 'Other'),
    ]
    
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    url = models.URLField()
    icon = models.CharField(max_length=50, blank=True, help_text="Font Awesome icon class (auto-filled based on platform)")
    order = models.IntegerField(default=0)
    
    def save(self, *args, **kwargs):
        if not self.icon:
            icon_map = {
                'github': 'fab fa-github',
                'linkedin': 'fab fa-linkedin',
                'twitter': 'fab fa-twitter',
                'instagram': 'fab fa-instagram',
                'youtube': 'fab fa-youtube',
                'dribbble': 'fab fa-dribbble',
                'behance': 'fab fa-behance',
                'facebook': 'fab fa-facebook',
                'other': 'fas fa-link',
            }
            self.icon = icon_map.get(self.platform, 'fas fa-link')
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.get_platform_display()}"
    
    class Meta:
        ordering = ['order']
