const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const { errorHandler } = require("../auth");

module.exports.registerUser = (req, res) => {
    if (!req.body.email || !req.body.email.includes("@")) {
        return res.status(400).send({ message: "Invalid email format" });
    } else if (!req.body.username || req.body.username.trim() === "") {
        return res.status(400).send({ message: "Username is required" });
    } else if (!req.body.password || req.body.password.length < 8) {
        return res.status(400).send({ message: "Password must be at least 8 characters long" });
    } else {
        return User.findOne({
            $or: [
                { email: req.body.email.toLowerCase() },
                { username: req.body.username.trim() }
            ]
        })
        .then(existingUser => {
            if (existingUser) {
                return res.status(409).send({ message: "Email or username already exists" });
            } else {
                let newUser = new User({
                    email: req.body.email.toLowerCase(),
                    username: req.body.username.trim(),
                    password: bcrypt.hashSync(req.body.password, 10)
                });

                return newUser.save()
                .then(() => res.status(201).send({ message: "User registered successfully" }))
                .catch(error => errorHandler(error, req, res));
            }
        })
        .catch(error => errorHandler(error, req, res));
    }
};

module.exports.loginUser = (req, res) => {
    if (!req.body.email || !req.body.email.includes("@")) {
        return res.status(400).send({ message: "Invalid email format" });
    } else if (!req.body.password) {
        return res.status(400).send({ message: "Password is required" });
    }

    return User.findOne({ email: req.body.email.toLowerCase() })
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: "No email found" });
        } else {
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

            if (isPasswordCorrect) {
                return res.status(200).send({
                    message: "User logged in successfully",
                    access: auth.createAccessToken(user)
                });
            } else {
                return res.status(401).send({ message: "Incorrect email or password" });
            }
        }
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.getUserDetails = (req, res) => {
    return User.findById(req.user.id).select("-password")
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        } else {
            return res.status(200).send(user);
        }
    })
    .catch(error => errorHandler(error, req, res));
};
