import { db } from "../connectionDB.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

// const secret_key = process.env.SECRET_KEY


//REGISTER
export const register = async (req, res) => {
const q = "SELECT * FROM users WHERE  username = ?"


db.query(q,[req.body.username],(err, data)=>{

    //check if user exists
    if (err) return res.status(500).json(err)

    if(data.length) return res.status(409).json("User already exists")

    //if no , create new user
    //hash password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    const q = "INSERT INTO users(`fullName`, `username`, `email`, `password`) VALUE(?)"
   const values = [req.body.fullName, req.body.username, req.body.email, hashedPassword]

    db.query(q,[values],(err,data)=>{
        if (err) return res.status(500).json(err)
        return res.status(200).json("User has been created") 
    })


    
})


};


//LOGIN
export const login = async (req, res) => {

    const q = "SELECT * FROM users WHERE  username = ?"


    db.query(q,[req.body.username],(err, data)=>{
        if (err) return res.status(500).json(err)
        if(data.length === 0) return res.status(404).json("User not found")

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)
        if(!checkPassword) res.status(400).json("Wrong Password or Username")

        const token = jwt.sign({id:data[0].id}, "secret key")
        const {password, ...others} = data[0]

        res.cookie("accessToken",token,{
            httpOnly: true
        }).status(200).json(others)    
    
        
    })
    

};


//LOGOUT
export const logout = async (req, res) => {

    const q = "SELECT * FROM users WHERE  username = ?"


    db.query(q,[req.body.username],(err, data)=>{
    
        //check if user exists
        if (err) return res.status(500).json(err)
    
        if(data.length) return res.status(409).json("User already exists")

    
        db.query(q,[values],(err,data)=>{
            if (err) return res.status(500).json(err)
            return res.status(200).json("") 
        })
    
    
        
    })
};
