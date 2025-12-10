# Personal Portfolio Website

## Overview
A modern, responsive personal portfolio website built with Django and SQLite. Features a clean, minimalistic design with smooth animations and easy content management through Django admin.

## Tech Stack
- **Backend**: Django 5.2.9
- **Database**: SQLite (Django default)
- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Custom CSS with CSS Grid, Flexbox, and CSS animations
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Inter, Playfair Display)

## Project Structure
```
portfolio_site/          # Django project settings
portfolio/               # Main Django app
  ├── models.py         # Profile, Skills, Projects, SocialLinks models
  ├── views.py          # Homepage view
  ├── admin.py          # Admin configuration
  ├── urls.py           # App URL routes
  ├── templates/        # HTML templates
  │   └── portfolio/
  │       └── index.html
  └── management/       # Custom management commands
      └── commands/
          └── setup_sample_data.py
static/
  ├── css/style.css     # Main stylesheet
  └── js/main.js        # JavaScript for interactions
media/                  # Uploaded files (images, resumes)
```

## Features
1. **Hero Section**: Animated landing with name, tagline, and call-to-action buttons
2. **About Section**: Bio with optional profile photo and resume download
3. **Skills Section**: Categorized skills displayed as badges
4. **Projects Section**: Grid layout showcasing projects with hover effects
5. **Contact Section**: Email and social media links

## Admin Access
- URL: `/admin/`
- Username: `admin`
- Password: `admin123`

Use the admin panel to:
- Edit profile information
- Add/remove skills and categories
- Manage projects with images and links
- Configure social media links

## Running the Project
```bash
python manage.py runserver 0.0.0.0:5000
```

## Adding Content
1. Go to `/admin/` and log in
2. Edit the Profile for your name, bio, and email
3. Add your Skills organized by categories
4. Add your Projects with descriptions and links
5. Add your Social Links (GitHub, LinkedIn, etc.)

## Recent Changes
- December 10, 2025: Initial portfolio website created with Django and SQLite
