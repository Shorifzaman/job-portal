const bcrypt = require('bcryptjs');
const { generateToken } = require("../utils/token");
const { createUserService, getUserByEmail } = require('../services/user.services');

exports.singup = async (req, res, next) => {
    try {
        const result = await createUserService(req.body)

        res.status(200).json({
            stauts: "success",
            massage: "successfully create a new user",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            stauts: "fail",
            message: "Data is not inserted",
            error: error.message
        })
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                stauts: "fail",
                error: "please provide your credaentials",
            })
        }

        const user = await getUserByEmail(email)

        if (!user) {
            return res.status(401).json({
                stauts: "fail",
                error: "user not found.Please create account",
            })
        }

        const isPasswordValid = user.comparePassword(password, user.password)


        if (!isPasswordValid) {
            return res.status(403).json({
                stauts: "fail",
                error: "password is not correct",
            })
        }

        if (user.status != "active") {
            return res.status(401).json({
                stauts: "fail",
                error: "Your Account is not active",
            })
        }

        const token = generateToken(user)

        const { password: pws, ...others } = user.toObject();
        res.status(200).json({
            stauts: "success",
            massage: "successfully login in",
            data: {
                user: others,
                token
            }
        })
    } catch (error) {
        res.status(400).json({
            stauts: "fail",
            message: "Data is not inserted",
            error: error.message
        })
    }
}


exports.getMe = async (req, res) => {
    try {
        const user = await getUserByEmail(req.user?.email)
        res.status(200).json({
            status: "Success",
            data: user
        })

    } catch (error) {
        res.status(400).json({
            stauts: "fail",
            error,
        })
    }
}
// confirmEmail 
exports.confirmEmail = async (req, res) => {
    try {
      const { token } = req.params;
  
  
      const user = await findUserByToken(token);
  
      if(!user){
        return res.status(403).json({
          status: "fail",
          error: "Invalid token"
        });
      }
  
      const expired = new Date() > new Date(user.confirmationTokenExpires);
  
      if(expired){
        return res.status(401).json({
          status: "fail",
          error: "Token expired"
        });
      }
  
      user.status = "active";
      user.confirmationToken = undefined;
      user.confirmationTokenExpires = undefined;
  
      user.save({ validateBeforeSave: false });
  
      res.status(200).json({
        status: "success",
        message: "Successfully activated your account.",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "fail",
        error,
      });
    }
  };