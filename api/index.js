const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const accounts = require('./accounts'); // Imports your 151 accounts

const app = express();
app.use(express.json());
app.use(cors());

// --- CONFIGURATION ---
const SECRET_KEY = "JOBAYAR_SUPER_SECRET_KEY"; // Change this if needed
const ADMIN_PASSWORD = "admin"; // Password to get Token

// --- 1. HOME ROUTE ---
app.get('/', (req, res) => {
    res.json({
        status: true,
        message: "FF Like API is Running",
        total_accounts: accounts.length,
        developer: "Jobayar_Codx"
    });
});

// --- 2. LOGIN (GET JWT TOKEN) ---
app.post('/login', (req, res) => {
    const { password } = req.body;

    if (password === ADMIN_PASSWORD) {
        // Create Token valid for 1 hour
        const token = jwt.sign({ role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({
            status: true,
            message: "Login Successful",
            token: token
        });
    }

    return res.status(403).json({
        status: false,
        message: "Invalid Password"
    });
});

// --- MIDDLEWARE: VERIFY JWT ---
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        
        jwt.verify(bearerToken, SECRET_KEY, (err, authData) => {
            if (err) {
                return res.status(403).json({ status: false, message: "Invalid or Expired Token" });
            }
            req.authData = authData;
            next();
        });
    } else {
        res.status(403).json({ status: false, message: "Token Required" });
    }
}

// --- 3. SEND LIKES (PROTECTED) ---
app.post('/send-likes', verifyToken, async (req, res) => {
    const { target_uid, count } = req.body;

    if (!target_uid) {
        return res.status(400).json({ status: false, message: "target_uid is required" });
    }

    // Determine how many likes to send (Max 151 based on file)
    let likeCount = count || 10; // Default to 10 if not specified
    if (likeCount > accounts.length) likeCount = accounts.length;

    // Slice the accounts array to get the specific number of workers
    const workers = accounts.slice(0, likeCount);

    // --- SIMULATION LOGIC ---
    // In a real scenario, you would put the Axios/Fetch request to the Game Server here.
    // Since we are simulating the API structure:
    
    const results = workers.map(acc => {
        return {
            worker_name: acc.name,
            worker_uid: acc.uid,
            status: "Like Sent Successfully",
            target: target_uid,
            timestamp: new Date().toISOString()
        };
    });

    res.json({
        status: true,
        code: 200,
        message: `Process Started. Sending ${likeCount} likes to UID: ${target_uid}`,
        data: results
    });
});

// For Vercel Serverless
module.exports = app;

// For Local Testing
if (require.main === module) {
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}
