import { db } from "../connectionDB.js";
import bcrypt from "bcrypt"

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
    
        //check if user exists
        if (err) return res.status(500).json(err)
    
        if(data.length) return res.status(409).json("User already exists")

    
        db.query(q,[values],(err,data)=>{
            if (err) return res.status(500).json(err)
            return res.status(200).json("") 
        })
    
    
        
    })
    

};


//LOGOUT
export const logout = async (req, res) => {};
