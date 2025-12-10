from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from portfolio.models import Profile, SkillCategory, Skill, Project, SocialLink


class Command(BaseCommand):
    help = 'Setup sample portfolio data'

    def handle(self, *args, **options):
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
            self.stdout.write(self.style.SUCCESS('Created superuser: admin / admin123'))

        if not Profile.objects.exists():
            Profile.objects.create(
                name='Alex Johnson',
                tagline='Full-Stack Web Developer & Digital Creator',
                bio='I am a passionate full-stack developer with over 5 years of experience building modern web applications. I specialize in creating clean, efficient, and user-friendly solutions that help businesses grow.\n\nMy journey in tech started with a curiosity about how websites work, and it has evolved into a career I truly love. I enjoy tackling complex problems and turning ideas into reality through code. When I\'m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.',
                email='hello@alexjohnson.dev'
            )
            self.stdout.write(self.style.SUCCESS('Created profile'))

        categories_data = [
            ('Frontend Development', 1, [
                ('HTML5', 'fab fa-html5'),
                ('CSS3', 'fab fa-css3-alt'),
                ('JavaScript', 'fab fa-js'),
                ('React', 'fab fa-react'),
                ('Vue.js', 'fab fa-vuejs'),
                ('TypeScript', 'fas fa-code'),
            ]),
            ('Backend Development', 2, [
                ('Python', 'fab fa-python'),
                ('Django', 'fas fa-server'),
                ('Node.js', 'fab fa-node-js'),
                ('PostgreSQL', 'fas fa-database'),
                ('REST APIs', 'fas fa-plug'),
                ('GraphQL', 'fas fa-project-diagram'),
            ]),
            ('Tools & DevOps', 3, [
                ('Git', 'fab fa-git-alt'),
                ('Docker', 'fab fa-docker'),
                ('AWS', 'fab fa-aws'),
                ('Linux', 'fab fa-linux'),
                ('Figma', 'fab fa-figma'),
                ('CI/CD', 'fas fa-sync-alt'),
            ]),
        ]

        for cat_name, cat_order, skills in categories_data:
            category, created = SkillCategory.objects.get_or_create(
                name=cat_name,
                defaults={'order': cat_order}
            )
            for i, (skill_name, skill_icon) in enumerate(skills):
                Skill.objects.get_or_create(
                    name=skill_name,
                    category=category,
                    defaults={'icon': skill_icon, 'order': i}
                )
        self.stdout.write(self.style.SUCCESS('Created skills'))

        projects_data = [
            {
                'title': 'E-Commerce Platform',
                'description': 'A full-featured online store with product management, shopping cart, secure checkout with Stripe integration, and an admin dashboard for inventory management. Built with React frontend and Django REST backend.',
                'technologies': 'React, Django, PostgreSQL, Stripe, Redis',
                'live_url': 'https://example.com/ecommerce',
                'github_url': 'https://github.com/example/ecommerce',
                'featured': True,
                'order': 1
            },
            {
                'title': 'Task Management App',
                'description': 'A collaborative project management tool featuring real-time updates, team workspaces, kanban boards, and deadline tracking. Includes file attachments and commenting system.',
                'technologies': 'Vue.js, Node.js, MongoDB, Socket.io',
                'live_url': 'https://example.com/taskapp',
                'github_url': 'https://github.com/example/taskapp',
                'featured': True,
                'order': 2
            },
            {
                'title': 'Analytics Dashboard',
                'description': 'Interactive data visualization dashboard with real-time charts, custom reporting, and data export functionality. Features responsive design and dark mode support.',
                'technologies': 'Python, D3.js, Flask, PostgreSQL',
                'live_url': 'https://example.com/analytics',
                'github_url': 'https://github.com/example/analytics',
                'featured': True,
                'order': 3
            },
            {
                'title': 'Weather Application',
                'description': 'A beautiful weather app with location-based forecasts, hourly and weekly predictions, and weather alerts. Features smooth animations and offline support.',
                'technologies': 'React Native, OpenWeather API, Redux',
                'live_url': 'https://example.com/weather',
                'github_url': 'https://github.com/example/weather',
                'featured': False,
                'order': 4
            },
            {
                'title': 'Blog Platform',
                'description': 'A modern blogging platform with markdown support, SEO optimization, social sharing, and analytics. Includes an intuitive admin panel for content management.',
                'technologies': 'Next.js, Prisma, PostgreSQL, Tailwind CSS',
                'live_url': 'https://example.com/blog',
                'github_url': 'https://github.com/example/blog',
                'featured': False,
                'order': 5
            },
            {
                'title': 'Fitness Tracker',
                'description': 'A comprehensive fitness tracking app with workout logging, progress charts, meal planning, and goal setting. Syncs with popular fitness devices.',
                'technologies': 'Flutter, Firebase, Node.js, TensorFlow',
                'live_url': 'https://example.com/fitness',
                'github_url': 'https://github.com/example/fitness',
                'featured': False,
                'order': 6
            },
        ]

        for project_data in projects_data:
            Project.objects.get_or_create(
                title=project_data['title'],
                defaults=project_data
            )
        self.stdout.write(self.style.SUCCESS('Created projects'))

        social_data = [
            ('github', 'https://github.com/alexjohnson'),
            ('linkedin', 'https://linkedin.com/in/alexjohnson'),
            ('twitter', 'https://twitter.com/alexjohnson'),
        ]

        for platform, url in social_data:
            SocialLink.objects.get_or_create(
                platform=platform,
                defaults={'url': url}
            )
        self.stdout.write(self.style.SUCCESS('Created social links'))

        self.stdout.write(self.style.SUCCESS('Sample data setup complete!'))
