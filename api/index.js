const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// --- 1. LOAD ACCOUNTS ---
let accounts = [];
try {
    // This looks for accounts.js in the SAME folder
    accounts = require('./accounts');
} catch (error) {
    console.error("CRITICAL ERROR: Could not load accounts.js");
    accounts = []; // Empty if failed
}

const SECRET_KEY = "DARKNESS_VIP"; 
const ADMIN_PASSWORD = "admin";

// --- 2. ROUTES ---

// Home Route
app.get('/', (req, res) => {
    // If accounts is empty, show error message
    if (accounts.length === 0) {
        return res.json({
            status: false,
            message: "⚠️ accounts.js file is MISSING or EMPTY!",
            help: "Make sure accounts.js is inside the 'api' folder."
        });
    }

    res.json({
        status: true,
        message: "FF Like API is Online 🟢",
        total_accounts: accounts.length, // Should show 151
        developer: "Dev by Darkness"
    });
});

// Login Route
app.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ status: true, token: token });
    }
    return res.status(403).json({ status: false, message: "Wrong Password" });
});

// Middleware
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        jwt.verify(bearer[1], SECRET_KEY, (err, authData) => {
            if (err) return res.status(403).json({ message: "Invalid Token" });
            req.authData = authData;
            next();
        });
    } else {
        res.status(403).json({ message: "Token Required" });
    }
};

// Send Likes Route
app.post('/send-likes', verifyToken, (req, res) => {
    const { target_uid, count } = req.body;
    if (!target_uid) return res.status(400).json({ message: "Target UID required" });

    let limit = count || 10;
    if (limit > accounts.length) limit = accounts.length;

    const workers = accounts.slice(0, limit);

    res.json({
        status: true,
        message: `Sending ${limit} likes to ${target_uid}`,
        data: workers.map(w => ({ 
            worker: w.name, 
            status: "Success", 
            time: new Date().toISOString() 
        }))
    });
});

// Export
module.exports = app;
