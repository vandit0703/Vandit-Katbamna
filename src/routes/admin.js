const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database');

function isAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    }
    res.redirect('/admin/login');
}

router.get('/login', (req, res) => {
    res.render('admin/login', { error: null });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    
    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.userId = user.id;
        res.redirect('/admin');
    } else {
        res.render('admin/login', { error: 'Invalid credentials' });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});

router.get('/', isAuthenticated, (req, res) => {
    const profile = db.prepare('SELECT * FROM profiles LIMIT 1').get();
    const skillCategories = db.prepare('SELECT * FROM skill_categories ORDER BY sort_order').all();
    const skills = db.prepare('SELECT * FROM skills ORDER BY sort_order').all();
    const projects = db.prepare('SELECT * FROM projects ORDER BY sort_order').all();
    const socialLinks = db.prepare('SELECT * FROM social_links ORDER BY sort_order').all();
    
    res.render('admin/dashboard', { profile, skillCategories, skills, projects, socialLinks });
});

router.post('/profile', isAuthenticated, (req, res) => {
    const { name, tagline, bio, email } = req.body;
    const existing = db.prepare('SELECT id FROM profiles LIMIT 1').get();
    
    if (existing) {
        db.prepare('UPDATE profiles SET name = ?, tagline = ?, bio = ?, email = ? WHERE id = ?')
            .run(name, tagline, bio, email, existing.id);
    } else {
        db.prepare('INSERT INTO profiles (name, tagline, bio, email) VALUES (?, ?, ?, ?)')
            .run(name, tagline, bio, email);
    }
    res.redirect('/admin');
});

router.post('/project', isAuthenticated, (req, res) => {
    const { id, title, description, technologies, live_url, github_url, featured } = req.body;
    
    if (id) {
        db.prepare('UPDATE projects SET title = ?, description = ?, technologies = ?, live_url = ?, github_url = ?, featured = ? WHERE id = ?')
            .run(title, description, technologies, live_url, github_url, featured ? 1 : 0, id);
    } else {
        const maxOrder = db.prepare('SELECT MAX(sort_order) as max FROM projects').get();
        db.prepare('INSERT INTO projects (title, description, technologies, live_url, github_url, featured, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)')
            .run(title, description, technologies, live_url, github_url, featured ? 1 : 0, (maxOrder.max || 0) + 1);
    }
    res.redirect('/admin');
});

router.post('/project/delete/:id', isAuthenticated, (req, res) => {
    db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
    res.redirect('/admin');
});

router.post('/social', isAuthenticated, (req, res) => {
    const { id, platform, url, icon } = req.body;
    
    if (id) {
        db.prepare('UPDATE social_links SET platform = ?, url = ?, icon = ? WHERE id = ?')
            .run(platform, url, icon, id);
    } else {
        const maxOrder = db.prepare('SELECT MAX(sort_order) as max FROM social_links').get();
        db.prepare('INSERT INTO social_links (platform, url, icon, sort_order) VALUES (?, ?, ?, ?)')
            .run(platform, url, icon, (maxOrder.max || 0) + 1);
    }
    res.redirect('/admin');
});

router.post('/social/delete/:id', isAuthenticated, (req, res) => {
    db.prepare('DELETE FROM social_links WHERE id = ?').run(req.params.id);
    res.redirect('/admin');
});

router.post('/skill-category', isAuthenticated, (req, res) => {
    const { id, name } = req.body;
    
    if (id) {
        db.prepare('UPDATE skill_categories SET name = ? WHERE id = ?').run(name, id);
    } else {
        const maxOrder = db.prepare('SELECT MAX(sort_order) as max FROM skill_categories').get();
        db.prepare('INSERT INTO skill_categories (name, sort_order) VALUES (?, ?)').run(name, (maxOrder.max || 0) + 1);
    }
    res.redirect('/admin');
});

router.post('/skill-category/delete/:id', isAuthenticated, (req, res) => {
    db.prepare('DELETE FROM skills WHERE category_id = ?').run(req.params.id);
    db.prepare('DELETE FROM skill_categories WHERE id = ?').run(req.params.id);
    res.redirect('/admin');
});

router.post('/skill', isAuthenticated, (req, res) => {
    const { id, name, icon, category_id } = req.body;
    
    if (id) {
        db.prepare('UPDATE skills SET name = ?, icon = ?, category_id = ? WHERE id = ?').run(name, icon, category_id, id);
    } else {
        const maxOrder = db.prepare('SELECT MAX(sort_order) as max FROM skills').get();
        db.prepare('INSERT INTO skills (name, icon, category_id, sort_order) VALUES (?, ?, ?, ?)').run(name, icon, category_id, (maxOrder.max || 0) + 1);
    }
    res.redirect('/admin');
});

router.post('/skill/delete/:id', isAuthenticated, (req, res) => {
    db.prepare('DELETE FROM skills WHERE id = ?').run(req.params.id);
    res.redirect('/admin');
});

module.exports = router;
