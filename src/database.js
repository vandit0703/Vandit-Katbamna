const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, '..', 'data', 'portfolio.db');

const fs = require('fs');
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        tagline TEXT,
        bio TEXT,
        email TEXT,
        photo_url TEXT,
        resume_url TEXT
    );

    CREATE TABLE IF NOT EXISTS skill_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        icon TEXT,
        category_id INTEGER,
        sort_order INTEGER DEFAULT 0,
        FOREIGN KEY (category_id) REFERENCES skill_categories(id)
    );

    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        live_url TEXT,
        github_url TEXT,
        technologies TEXT,
        featured INTEGER DEFAULT 0,
        sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS social_links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        platform TEXT NOT NULL,
        url TEXT NOT NULL,
        icon TEXT,
        sort_order INTEGER DEFAULT 0
    );
`);

const userExists = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
if (!userExists) {
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', hashedPassword);

    db.prepare(`INSERT INTO profiles (name, tagline, bio, email) VALUES (?, ?, ?, ?)`).run(
        'Alex Johnson',
        'Full-Stack Developer & Digital Creator',
        'I am a passionate full-stack developer with over 5 years of experience building modern web applications. I specialize in creating clean, efficient, and user-friendly solutions that help businesses grow.\n\nMy journey in tech started with a curiosity about how websites work, and it has evolved into a career I truly love. I enjoy tackling complex problems and turning ideas into reality through code.',
        'hello@alexjohnson.dev'
    );

    const categories = [
        { name: 'Frontend Development', order: 1 },
        { name: 'Backend Development', order: 2 },
        { name: 'Tools & DevOps', order: 3 }
    ];

    const insertCategory = db.prepare('INSERT INTO skill_categories (name, sort_order) VALUES (?, ?)');
    categories.forEach(cat => insertCategory.run(cat.name, cat.order));

    const skills = [
        { name: 'HTML5', icon: 'fab fa-html5', category_id: 1, order: 1 },
        { name: 'CSS3', icon: 'fab fa-css3-alt', category_id: 1, order: 2 },
        { name: 'JavaScript', icon: 'fab fa-js', category_id: 1, order: 3 },
        { name: 'React', icon: 'fab fa-react', category_id: 1, order: 4 },
        { name: 'Vue.js', icon: 'fab fa-vuejs', category_id: 1, order: 5 },
        { name: 'TypeScript', icon: 'fas fa-code', category_id: 1, order: 6 },
        { name: 'Node.js', icon: 'fab fa-node-js', category_id: 2, order: 1 },
        { name: 'Python', icon: 'fab fa-python', category_id: 2, order: 2 },
        { name: 'Express', icon: 'fas fa-server', category_id: 2, order: 3 },
        { name: 'PostgreSQL', icon: 'fas fa-database', category_id: 2, order: 4 },
        { name: 'MongoDB', icon: 'fas fa-leaf', category_id: 2, order: 5 },
        { name: 'REST APIs', icon: 'fas fa-plug', category_id: 2, order: 6 },
        { name: 'Git', icon: 'fab fa-git-alt', category_id: 3, order: 1 },
        { name: 'Docker', icon: 'fab fa-docker', category_id: 3, order: 2 },
        { name: 'AWS', icon: 'fab fa-aws', category_id: 3, order: 3 },
        { name: 'Linux', icon: 'fab fa-linux', category_id: 3, order: 4 },
        { name: 'Figma', icon: 'fab fa-figma', category_id: 3, order: 5 },
        { name: 'CI/CD', icon: 'fas fa-sync-alt', category_id: 3, order: 6 }
    ];

    const insertSkill = db.prepare('INSERT INTO skills (name, icon, category_id, sort_order) VALUES (?, ?, ?, ?)');
    skills.forEach(s => insertSkill.run(s.name, s.icon, s.category_id, s.order));

    const projects = [
        { title: 'E-Commerce Platform', description: 'A full-featured online store with product management, shopping cart, secure checkout with Stripe integration, and an admin dashboard.', technologies: 'React, Node.js, MongoDB, Stripe', live_url: '#', github_url: '#', featured: 1, order: 1 },
        { title: 'Task Management App', description: 'Collaborative project management tool featuring real-time updates, team workspaces, kanban boards, and deadline tracking.', technologies: 'Vue.js, Express, PostgreSQL, Socket.io', live_url: '#', github_url: '#', featured: 1, order: 2 },
        { title: 'Analytics Dashboard', description: 'Interactive data visualization dashboard with real-time charts, custom reporting, and data export functionality.', technologies: 'React, D3.js, Python, Flask', live_url: '#', github_url: '#', featured: 1, order: 3 },
        { title: 'Weather Application', description: 'Beautiful weather app with location-based forecasts, hourly predictions, and weather alerts with smooth animations.', technologies: 'React Native, OpenWeather API, Redux', live_url: '#', github_url: '#', featured: 0, order: 4 },
        { title: 'Blog Platform', description: 'Modern blogging platform with markdown support, SEO optimization, social sharing, and analytics.', technologies: 'Next.js, Prisma, PostgreSQL, Tailwind', live_url: '#', github_url: '#', featured: 0, order: 5 },
        { title: 'Fitness Tracker', description: 'Comprehensive fitness tracking app with workout logging, progress charts, meal planning, and goal setting.', technologies: 'Flutter, Firebase, Node.js', live_url: '#', github_url: '#', featured: 0, order: 6 }
    ];

    const insertProject = db.prepare('INSERT INTO projects (title, description, technologies, live_url, github_url, featured, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)');
    projects.forEach(p => insertProject.run(p.title, p.description, p.technologies, p.live_url, p.github_url, p.featured, p.order));

    const socialLinks = [
        { platform: 'GitHub', url: 'https://github.com', icon: 'fab fa-github', order: 1 },
        { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'fab fa-linkedin', order: 2 },
        { platform: 'Twitter', url: 'https://twitter.com', icon: 'fab fa-twitter', order: 3 }
    ];

    const insertSocial = db.prepare('INSERT INTO social_links (platform, url, icon, sort_order) VALUES (?, ?, ?, ?)');
    socialLinks.forEach(s => insertSocial.run(s.platform, s.url, s.icon, s.order));

    console.log('Database seeded with sample data!');
}

module.exports = db;
