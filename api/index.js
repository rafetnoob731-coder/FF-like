const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// --- 1. LOAD YOUR 151 ACCOUNTS ---
let accounts = [];
try {
    // This loads the big list you created in api/accounts.js
    accounts = require('./accounts');
} catch (error) {
    console.error("Error loading accounts file:", error.message);
    accounts = []; // Prevents crash if file is missing
}

// --- 2. SECURITY CONFIGURATION ---
const SECRET_KEY = "DARKNESS_VIP_SECRET"; 
const ADMIN_PASSWORD = "admin"; // Password to login

// --- 3. MIDDLEWARE (Protects the API) ---
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        
        jwt.verify(bearerToken, SECRET_KEY, (err, authData) => {
            if (err) {
                return res.status(403).json({ 
                    status: false, 
                    message: "Invalid Token. Please Login again." 
                });
            }
            req.authData = authData;
            next();
        });
    } else {
        res.status(403).json({ 
            status: false, 
            message: "Token Required. Add 'Authorization: Bearer <token>' header." 
        });
    }
};

// --- 4. API ROUTES ---

// [GET] Home Page - Check if API is alive
app.get('/', (req, res) => {
    res.json({
        status: true,
        message: "FF Like API is Online 🟢",
        total_accounts_loaded: accounts.length,
        developer: "Dev by Darkness",
        server_time: new Date().toISOString()
    });
});

// [POST] Login - Get your Secret Token
app.post('/login', (req, res) => {
    const { password } = req.body;
    
    if (password === ADMIN_PASSWORD) {
        // Create a token that lasts 1 hour
        const token = jwt.sign({ role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({
            status: true,
            message: "Login Successful",
            token: token
        });
    }
    
    return res.status(403).json({
        status: false,
        message: "Wrong Password"
    });
});

// [POST] Send Likes - The Main Feature
app.post('/send-likes', verifyToken, (req, res) => {
    const { target_uid, count } = req.body;

    if (!target_uid) {
        return res.status(400).json({ 
            status: false, 
            message: "Target UID is missing!" 
        });
    }

    // Limit the number of likes to the max accounts you have (151)
    let likeCount = count || 10;
    if (likeCount > accounts.length) likeCount = accounts.length;

    // Get the specific workers from your list
    const workers = accounts.slice(0, likeCount);

    // Create a report of what is happening
    const results = workers.map(acc => ({
        account_name: acc.name,
        account_uid: acc.uid,
        status: "Command Sent ✅",
        target: target_uid,
        time: new Date().toISOString()
    }));

    res.json({
        status: true,
        code: 200,
        message: `Success! Preparing to send ${likeCount} likes to UID: ${target_uid}`,
        developer: "Dev by Darkness",
        data: results
    });
});

// --- 5. EXPORT (Required for Vercel) ---
module.exports = app;
