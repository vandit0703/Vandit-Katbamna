# 3D Portfolio Website

## Overview
A modern, responsive personal portfolio website built with Node.js/Express and SQLite. Features stunning 3D effects, glassmorphism design, smooth animations, and easy content management through an admin panel.

## Tech Stack
- **Backend**: Node.js with Express
- **Database**: SQLite (via better-sqlite3)
- **Template Engine**: EJS
- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Custom CSS with 3D transforms, glassmorphism, and animations
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Inter, Space Grotesk)

## Project Structure
```
src/
  ├── server.js          # Express server entry point
  ├── database.js        # SQLite database setup and seeding
  ├── routes/
  │   └── admin.js       # Admin panel routes
  ├── views/
  │   ├── index.ejs      # Main portfolio page
  │   └── admin/
  │       ├── login.ejs  # Admin login page
  │       └── dashboard.ejs  # Admin dashboard
  └── public/
      ├── css/style.css  # Main stylesheet with 3D effects
      └── js/main.js     # JavaScript for interactions
data/
  └── portfolio.db       # SQLite database file
```

## Features
1. **Hero Section**: 3D rotating cube, floating shapes, glitch text effect
2. **About Section**: Glassmorphic card with stats
3. **Skills Section**: 3D tilt cards organized by category
4. **Projects Section**: Animated project cards with hover effects
5. **Contact Section**: Email and social media links
6. **Responsive Design**: Works on all devices and screen sizes
7. **Custom Cursor**: Animated cursor on desktop

## Design Highlights
- Glassmorphism (frosted glass effect)
- 3D CSS transforms and perspective
- Floating animated background shapes
- Smooth scroll and parallax effects
- Interactive tilt cards
- Grid overlay with gradient mask

## Admin Access
- URL: `/admin`
- Username: `admin`
- Password: `admin123`

## Running the Project

### On Replit
```bash
npm start
```

### On Windows (Local)
1. Download the project as ZIP
2. Extract to a folder
3. Open terminal/command prompt in that folder
4. Run: `npm install`
5. Run: `npm start`
6. Open browser to `http://localhost:5000`

## Customization
1. Go to `/admin` and log in
2. Update your Profile (name, tagline, bio, email)
3. Add/edit Projects with descriptions and links
4. Configure Social Links

## Windows Compatibility
This project is fully Windows compatible:
- Uses cross-platform Node.js modules
- SQLite database works on Windows
- No OS-specific dependencies

## Recent Changes
- December 10, 2025: Rebuilt with Node.js and 3D design effects
