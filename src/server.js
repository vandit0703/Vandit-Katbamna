const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// ------------------ ABOUT ME ------------------ //

const profile = {
    name: "Vandit Katbamna",
    title: "Full-Stack Developer & Digital Creator"
};
const aboutMe = `
I am a passionate full-stack developer with over 2 years of experience building modern web applications. 
I specialize in creating clean, efficient, and user-friendly solutions that help businesses grow.

My journey in tech started with a curiosity about how websites work, and it has evolved into a career I truly love. 
I enjoy tackling complex problems and turning ideas into reality through code.
`;

// ------------------ SKILLS ------------------ //
const skillCategories = [
    {
        id: 1,
        name: "Frontend Development",
        skills: [
            { name: "HTML5", level: "Expert" },
            { name: "CSS3", level: "Expert" },
            { name: "JavaScript", level: "Expert" },
            { name: "React", level: "Intermediate" },
            { name: "TypeScript", level: "Intermediate" }
        ]
    },
    {
        id: 2,
        name: "Backend Development",
        skills: [
            { name: "Node.js", level: "Expert" },
            { name: "Python", level: "Intermediate" },
            { name: "PostgreSQL", level: "Intermediate" },
            { name: "MongoDB", level: "Intermediate" },
            { name: "REST APIs", level: "Expert" }
        ]
    },
    {
        id: 3,
        name: "Tools & DevOps",
        skills: [
            { name: "Git", level: "Expert" },
            { name: "Docker", level: "Intermediate" },
            { name: "AWS", level: "Intermediate" }
        ]
    }
];

// ------------------ PROJECTS ------------------ //
const projects = [
    {
        title: "Transport Management System (TMS)",
        description: "A complete Transport Management System built with Django + PostgreSQL featuring role-based login, TT/Vehicle management, Contractor & Company modules, product master, user activity tracking, and a modern dashboard for smooth transport operations.",
        stack: ["Django", "PostgreSQL", "Git", "HTML", "Bootstrap"],
        image: "/img/tms.jpg",
        link: "#"
    },
    {
        title: "Smart Macro Sales – Customer & Sales Management CRM",
        description: "A powerful CRM system designed to manage leads, customers, sales pipelines, invoices, and team activities in one place. Helps businesses track interactions, improve conversions, and streamline the entire sales workflow.",
        stack: ["Django", "PostgreSQL", "Git", "HTML", "Bootstrap"],
        image: "/img/smart-macro.jpg",
        link: "#"
    },
    {
        title: "Jewellery E-Commerce & Inventory Management System",
        description: "A complete Jewellery E-Commerce and Inventory Management System with product management, gold/diamond stock tracking, secure payments, staff roles, order management, and real-time analytics.",
        stack: ["Django", "PostgreSQL", "Git", "Bootstrap", "Node.js"],
        image: "/img/jewellery.jpg",
        link: "#"
    },
    {
        title: "Hospital Management System (HMS)",
        description: "A fully-featured Hospital Management System covering patient management, appointments, billing, pharmacy, lab tests, inventory, staff roles, reports, and IPD/OPD workflows.",
        stack: ["Django", "PostgreSQL", "Git", "Node.js", "Bootstrap"],
        image: "/img/hms.jpg",
        link: "#"
    },
    {
        title: "Enterprise Resource Planning (ERP) System",
        description: "A full-scale ERP system for managing Sales, Purchase, Inventory, Production, HR, Finance, and CRM. Built for enterprise operations with dashboards, automation, and reporting.",
        stack: ["Node.js", "TypeScript", "Vite", "PostgreSQL"],
        image: "/img/erp.jpg",
        link: "#"
    }
];

// ------------------ SOCIAL LINKS ------------------ //
const socialLinks = [
    { platform: "GitHub", url: "https://github.com/vandit0703", icon: "fab fa-github" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/vandit77/", icon: "fab fa-linkedin" },
    { platform: "Instagram", url: "https://www.instagram.com/__vk_____7/", icon: "fab fa-instagram" }
];


// ------------------ VIEW ENGINE ------------------ //
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// ------------------ ROUTES ------------------ //
app.get("/", (req, res) => {
    res.render("index", {
        profile,
        aboutMe,
        skillCategories,
        projects,
        socialLinks
    });
});

// ------------------ SERVER ------------------ //
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio running on http://localhost:${PORT}`);
});
