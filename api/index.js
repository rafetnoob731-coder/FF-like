const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// --- 1. Load Accounts Safely ---
let accounts = [];
try {
    accounts = require('./accounts');
} catch (error) {
    console.error("Error loading accounts file:", error.message);
    // Fallback data so API does not crash
    accounts = [
        { uid: 0, name: "GHOST_TEST", region: "BD" } 
    ]; 
}

// --- 2. Configuration ---
const SECRET_KEY = "DARKNESS_SECRET_KEY"; 
const ADMIN_PASSWORD = "admin";

// --- 3. Middleware (Security) ---
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        
        jwt.verify(bearerToken, SECRET_KEY, (err, authData) => {
            if (err) {
                return res.status(403).json({ 
                    status: false, 
                    message: "Invalid Token",
                    developer: "Darkness"
                });
            }
            req.authData = authData;
            next();
        });
    } else {
        res.status(403).json({ 
            status: false, 
            message: "Token Required",
            developer: "Darkness"
        });
    }
};

// --- 4. API Routes ---

// [GET] Home Page
app.get('/', (req, res) => {
    res.json({
        status: true,
        message: "FF Like API is Online 🟢",
        total_accounts: accounts.length,
        developer: "Darkness",
        server_time: new Date().toISOString()
    });
});

// [POST] Login to get Token
app.post('/login', (req, res) => {
    const { password } = req.body;
    
    if (password === ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({
            status: true,
            message: "Login Successful",
            token: token,
            developer: "Darkness"
        });
    }
    
    return res.status(403).json({
        status: false,
        message: "Wrong Password",
        developer: "Darkness"
    });
});

// [POST] Send Likes (The Main Feature)
app.post('/send-likes', verifyToken, (req, res) => {
    const { target_uid, count } = req.body;

    if (!target_uid) {
        return res.status(400).json({ 
            status: false, 
            message: "Please provide target_uid" 
        });
    }

    // Limit likes to available accounts
    let likeCount = count || 10;
    if (likeCount > accounts.length) likeCount = accounts.length;

    // Get the workers
    const workers = accounts.slice(0, likeCount);

    // Create the success response
    const results = workers.map(acc => ({
        account: acc.name,
        uid: acc.uid,
        status: "Like Sent ✅",
        target: target_uid,
        time: new Date().toISOString()
    }));

    res.json({
        status: true,
        code: 200,
        message: `Command received by Darkness. Sending ${likeCount} likes to ${target_uid}`,
        data: results
    });
});

// --- 5. Export (Required for Vercel) ---
module.exports = app;
