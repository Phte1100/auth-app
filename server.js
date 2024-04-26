const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const authRoutes = require("./routes/authRoutes");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(cors());

// routes
app.use("/api", authRoutes);

// Protected routes
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({ message: "skyddad route! "});
});

// Validate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: "Not authorized for this route! - token missing!" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Not correct JWT" });
        }

        req.user = user;
        next();
    });
}

app.get("/api/users", authenticateToken, async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start application
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

app.get('/health', (req, res) => {
    res.send('OK');
});