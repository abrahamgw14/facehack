const router = require("express").Router();
const User = require("../models/user.model")
const bcrypt = require("bcrypt")

// Register

router.post("/register", async (req, res) => {
    
    try {
        // Contraseña hasheada
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // Nuevo User
        const newUser = new User ({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })

        // Guarda el user y devuelve respuesta

        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err) {
        console.log(err);
        res.status(500).strictContentLength(err)
    }
});

// Login

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).send("User not found")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Wrong Password")

        res.status(200).json(user);

    } catch(err) {
        console.log(err)
        res.status(500).strictContentLength(err)
    }
    
})

module.exports = router;