const express = require('express');
const path = require('path');
const session = require('express-session');
const db = require('./database');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'portfolio-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
});

app.get('/', (req, res) => {
    try {
        const profile = db.prepare('SELECT * FROM profiles LIMIT 1').get();
        const skillCategories = db.prepare('SELECT * FROM skill_categories ORDER BY sort_order').all();
        const skills = db.prepare('SELECT * FROM skills ORDER BY sort_order').all();
        const projects = db.prepare('SELECT * FROM projects ORDER BY sort_order').all();
        const socialLinks = db.prepare('SELECT * FROM social_links ORDER BY sort_order').all();

        const categoriesWithSkills = skillCategories.map(cat => ({
            ...cat,
            skills: skills.filter(s => s.category_id === cat.id)
        }));

        res.render('index', {
            profile,
            skillCategories: categoriesWithSkills,
            projects,
            socialLinks
        });
    } catch (error) {
        console.error('Error loading portfolio:', error);
        res.status(500).send('Error loading portfolio');
    }
});

app.use('/admin', adminRoutes);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio running at http://localhost:${PORT}`);
});
