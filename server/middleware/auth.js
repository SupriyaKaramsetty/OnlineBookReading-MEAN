const jwt = require("jsonwebtoken")

verifyToken = (req) => {
    const token = req.headers.authorization.split(" ")[1];
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                reject();
            }

            req.user = decoded;
            resolve();
        });
    });
}

exports.isAuth = (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: 'You need to be logged in to access the request!'
            });
        }
        verifyToken(req).then(() => {
            if(req.user.role === "user" || req.user.role === "admin"){
                next();
            }
            else {
                return res.status(401).json({
                    message: 'You are not authorized!'
                });
            }  
        }).catch(() => {
            return res.status(401).json({
                message: 'Token verification failed!'
            });
        });
    },

exports.isAdmin = (req, res, next) => {
            if (req.headers.authorization) {
                verifyToken(req).then(() => {
                    if(req.user.role === 'admin'){
                        next();
                    }
                    else {
                        return res.status(401).json({
                            message: 'You need to be an admin to access the request!'
                        });
                    }  
                }).catch(() => {
                    return res.status(401).json({
                        message: 'Token verification failed!'
                    });
                });
            }
            else {
                return res.status(401).json({
                    message: 'You need to be logged in to access the request!'
                });
        }
    }
    



