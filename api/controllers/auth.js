import { db } from "../connectionDB.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// const secret_key = process.env.SECRET_KEY

//REGISTER
export const register = async (req, res) => {
  const q = "SELECT * FROM users WHERE  userName = ?";

  db.query(q, [req.body.userName], (err, data) => {
    //Check if user exists
    if (err) return res.status(500).json(err);

    if (data.length) return res.status(409).json("User already exists");

    //If no , create new user
    //Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    //Create new user
    const q =
      "INSERT INTO users(`fullName`, `userName`, `email`, `password`) VALUE(?)";
    const values = [
      req.body.fullName,
      req.body.userName,
      req.body.email,
      hashedPassword,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created");
    });
  });
};

//LOGIN
export const login = async (req, res) => {
  const q = "SELECT * FROM users WHERE  userName = ?";
  //If user not exists
  db.query(q, [req.body.userName], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found");

    //Check if password from  body equal to password from DB
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!checkPassword) res.status(400).json("Wrong Password or Username");

    //If User exists generate token and return data without password
    const token = jwt.sign({ id: data[0].id }, "secret key");
    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

//LOGOUT
export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logout!");
};
