import UserYB from "../models/UserYoutube.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

let refreshTokens = [];

// console.log(refreshTokens);

const authController = {
  //register
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const newUser = new UserYB({
        ...req.body,
        password: hashed,
      });

      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ msg: err });
    }
  },

  //Generate access token
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_SCERET_KEY,
      { expiresIn: "1h" }
    );
  },

  //Generate refresh token
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "10d" }
    );
  },

  //login
  loginUser: async (req, res) => {
    // const { userName, Email } = req.body;
    try {
      const user = await UserYB.findOne({
        $or: [{ email: req.body.email }, { username: req.body.username }],
      });
      // const userEmail = await UserYB.findOne({ email: req.body.email });
      if (!user) {
        return res.status(500).json({ msg: "can't find this name or email !" });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(500).json({ msg: "Wrong password !" });
      } else if (user && validPassword) {
        const access_token = authController.generateAccessToken(user);
        const refresh_token = authController.generateRefreshToken(user);
        refreshTokens.push(refresh_token);
        res.cookie("refreshToken", refresh_token, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, admin, ...otherDetails } = user._doc;
        return res.status(200).json({ ...otherDetails, access_token });
      }
    } catch (error) {}
  },

  requestRefreshToken: async (req, res) => {
    //take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(400).json("You are not authenticated !");
    if (!refreshTokens.includes(refreshToken))
      return res.status(400).json("Refresh Token is not valid !");

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //create new accesstoken, refreshtoken
      const newAccess_token = authController.generateAccessToken(user);
      const newRefresh_token = authController.generateRefreshToken(user);
      refreshTokens.push(newRefresh_token);
      res.cookie("refreshToken", newRefresh_token, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res
        .status(200)
        .json({ accessToken: newAccess_token, refreshToken: newRefresh_token });
    });
  },

  //Logout
  userLogout: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    return res.status(200).json("Logout successfull  !");
  },
};

export default authController;
