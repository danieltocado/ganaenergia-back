const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization;
        jwt.verify(token, "SECRET");
        
        const user = await User.findOne({
            tokens: token,
        })

        if (!user) {
            return res.status(401).send({
                message: 'No tienes permisos...'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error)
        return res.status(401).send({
            message: 'No tienes permisos.',
            error
        })
    }
}

module.exports = auth;