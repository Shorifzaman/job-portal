const jwt = require("jsonwebtoken");

exports.generateToken = (userInfo) => {
    const payload = {
        _id: userInfo._id,
        email: userInfo.email,
        role: userInfo.role,
        name: userInfo.name,
    };
    const TOKEN_SECRET='eb2bcebb999407286caea729998e7fa0c089178f8ca43857e73ea3ff66dbe1852af24a4b0199be9192798a3f8ad6d6475db3621cfacf38dcb0fba5d77d73aaf5';
    
    const token = jwt.sign(payload, TOKEN_SECRET, {
        expiresIn: "7days",
    });

    return token;
};