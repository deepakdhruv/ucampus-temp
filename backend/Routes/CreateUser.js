const express = require("express");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');

// Middleware to validate user input
const validateUser = [
    body('email', "Please enter a valid Email").isEmail(),
    body('password', "Please enter a valid Password").isLength({ min: 5 }),
    body('name', "Please enter a valid Name").isLength({ min: 3 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Route to create a new user
router.post("/createuser", validateUser, async (req, res) => {
    try {
        await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            location: req.body.location
        });
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.json({ success: false });
    }
});

// Route to log in a user
router.post("/loginuser", async (req, res) => {
    let email = req.body.email;
    try {
        let useremail = await User.findOne({ email });
        if (!useremail) {
            return res.status(400).json({ errors: "Try logging with correct credentials" });
        }

        if (req.body.password !== useremail.password) {
            return res.status(400).json({ errors: "Try logging with correct credentials" });
        }

        return res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.json({ success: false });
    }
});

module.exports = router;
