const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")?.[1];
    
        if(!token){
          return res.status(401).json({
            status: "fail",
            error: "You are not logged in"
          });
        }
        
    
        const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET);
    
        // const user = User.findOne({ email: decoded.email })
    
        req.user = decoded;
    
        next();
    } catch (error) {
    // try {
    //     const { authorization } = req.headers;
    //     if (!authorization) {
    //         return res.status(401).json({
    //             status: false,
    //             error: "You are not logged in!!!",
    //         });
    //     }
    //     const token = authorization.split(" ")[1];

    //     const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    //     req.user = decoded;
    //     next();
    // } catch (error) {
        res.status(401).json({
            status: false,
            error: "Invalid Token!",
        });
    }
};