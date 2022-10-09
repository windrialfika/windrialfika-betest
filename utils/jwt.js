const JWT = require('jsonwebtoken');
const tokenSecret = "windritestbackend"

module.exports = {
    generateAccessToken: (userName) => {
        return JWT.sign({ userName: userName }, tokenSecret, { expiresIn: '24h' });  // expires in 24 hours
    },

    verifyAccessToken: (req, res, next) => {
        const authorization = req.headers.authorization;

        if (authorization) {
            let token = authorization.split(' ')[1];
            JWT.verify(token, tokenSecret, (err, payload) => {
                if (err) {
                    res.status(401).json({ error: true, message: 'Invalid / Expired token' });
                    return next({ error: true, message: 'Invalid / Expired token' });
                }
                req.payload = payload
                next()
            })
        } else {
            res.status(401).json({ error: true, message: 'Token required!' });
        }
    }
}




//module.exports = generateAccessToken;