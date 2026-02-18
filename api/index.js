const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// --- 1. SAFE ACCOUNT LOADING ---
let accounts = [];
try {
    // Try to load accounts, if fails, use empty array
    accounts = require('./accounts');
} catch (error) {
    console.log("Error loading accounts:", error.message);
    accounts = []; 
}

// --- 2. CONFIG ---
const SECRET_KEY = "JOBAYAR_SUPER_SECRET_KEY"; 

// --- 3. HELPER: VERIFY TOKEN ---
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        
        jwt.verify(bearerToken, SECRET_KEY, (err, authData) => {
            if (err) {
                return res.status(403).json({ 
                    status: false, 
                    message: "Invalid or Expired Token" 
                });
            }
            req.authData = authData;
            next();
        });
    } else {
        res.status(403).json({ 
            status: false, 
            message: "Token Required (Bearer)" 
        });
    }
};

// --- 4. ROUTES ---

// Route: Home (Check if running)
app.get('/', (req, res) => {
    res.json({
        status: true,
        message: "FF Like API is Online",
        loaded_accounts: accounts.length,
        developer: "Jobayar_Codx"
    });
});

// Route: Login (Get Token)
app.post('/login', (req, res) => {
    const { password } = req.body;
    
    // Simple password check
    if (password === "admin") {
        const token = jwt.sign({ role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({
            status: true,
            message: "Login Success",
            token: token
        });
    }
    
    return res.status(403).json({
        status: false,
        message: "Wrong Password"
    });
});

// Route: Send Likes (Protected)
app.post('/send-likes', verifyToken, (req, res) => {
    const { target_uid, count } = req.body;

    if (!target_uid) {
        return res.status(400).json({ status: false, message: "Target UID is required" });
    }

    // Limit likes to max available accounts
    let likeCount = count || 10;
    if (likeCount > accounts.length) likeCount = accounts.length;

    // Get the workers
    const workers = accounts.slice(0, likeCount);

    // Create response data
    const results = workers.map(acc => ({
        worker_uid: acc.uid,
        worker_name: acc.name,
        target: target_uid,
        status: "Success",
        time: new Date().toISOString()
    }));

    res.json({
        status: true,
        message: `Process Started: Sending ${likeCount} likes to ${target_uid}`,
        data: results
    });
});

// --- 5. EXPORT APP ---
module.exports = app;// --- 3. Home Route ---
app.get('/', (req, res) => {
    res.json({
        status: true,
        message: "FF Like API Running",
        total_accounts: accounts.length
    });
});

// --- 4. Login Route ---
app.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === "admin") {
        const token = jwt.sign({ role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ status: true, token: token });
    }
    return res.status(403).json({ status: false, message: "Wrong Password" });
});

// --- 5. Send Likes Route ---
app.post('/send-likes', verifyToken, (req, res) => {
    const { target_uid, count } = req.body;

    if (!target_uid) {
        return res.status(400).json({ status: false, message: "UID is required" });
    }

    let limit = count || 10;
    if (limit > accounts.length) limit = accounts.length;

    // Simulate sending likes
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

// --- 6. Export for Vercel ---
module.exports = app;
    if (password === ADMIN_PASSWORD) {
        // Generate Token
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

// --- 4. MIDDLEWARE (Verify Token) ---
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, SECRET_KEY, (err, authData) => {
            if (err) {
                return res.status(403).json({ status: false, message: "Invalid Token" });
            }
            req.authData = authData;
            next();
        });
    } else {
        res.status(403).json({ status: false, message: "Token Required" });
    }
}

// --- 5. SEND LIKES ROUTE ---
app.post('/send-likes', verifyToken, (req, res) => {
    try {
        const { target_uid, count } = req.body;

        if (!target_uid) {
            return res.status(400).json({ status: false, message: "Missing target_uid" });
        }

        // Calculate limits
        let likeCount = count || 10;
        if (likeCount > accounts.length) {
            likeCount = accounts.length;
        }

        // Select workers
        const workers = accounts.slice(0, likeCount);

        // Process results
        const results = workers.map(acc => {
            return {
                worker_name: acc.name,
                status: "Success",
                target: target_uid,
                timestamp: new Date().toISOString()
            };
        });

        res.json({
            status: true,
            code: 200,
            message: `Sent ${likeCount} likes to ${target_uid}`,
            data: results
        });

    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
});

// --- 6. EXPORT APP (Critical for Vercel) ---
module.exports = app;        const token = jwt.sign({ role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ status: true, token: token });
    }
    return res.status(403).json({ status: false, message: "Wrong Password" });
});

// --- AUTH MIDDLEWARE ---
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, SECRET_KEY, (err, authData) => {
            if (err) return res.status(403).json({ status: false, message: "Invalid Token" });
            req.authData = authData;
            next();
        });
    } else {
        res.status(403).json({ status: false, message: "Token Required" });
    }
};

// --- SEND LIKES ---
app.post('/send-likes', verifyToken, (req, res) => {
    try {
        const { target_uid, count } = req.body;
        if (!target_uid) return res.status(400).json({ status: false, message: "Missing target_uid" });

        let likeCount = count || 10;
        if (likeCount > accounts.length) likeCount = accounts.length;

        const workers = accounts.slice(0, likeCount);
        const results = workers.map(acc => ({
            worker: acc.name,
            status: "Success",
            target: target_uid,
            time: new Date().toISOString()
        }));

        res.json({
            status: true,
            message: `Sent ${likeCount} likes`,
            data: results
        });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
});

// --- CRITICAL FOR VERCEL ---
module.exports = app;
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
