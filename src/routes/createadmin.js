const bcrypt = require('bcryptjs');
const db = require('../database');

const username = "vandit77";
const password = "123456@Vk";

const hashedPassword = bcrypt.hashSync(password, 10);

db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(username, hashedPassword);

console.log("Admin user created successfully!");
