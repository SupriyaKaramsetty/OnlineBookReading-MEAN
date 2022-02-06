const express = require("express")
const Validator = require('validator');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user");
const router = express.Router()


exports.signup = async (req,res) => {
    try{
    const {username,email,password,confirmpassword} = req.body;


    if(!(username && email && password && confirmpassword)){
        res.send("All details are required.")
    }

    const oldUser = await User.findOne({email})
    if(oldUser){
        res.send("User already exists.")
    }
        const encryptedPassword = await bcrypt.hash(password,10)
        const user = await User.create({username:username, email:email.toLowerCase(),password:encryptedPassword})
        return res.json(user)
    }
    catch(err){
        res.send(err)
    }

    };

exports.login = async (req,res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email});
        console.log(user);
        const {role,_id,wantToReadBooks,currentlyReadingBooks,readBooks} = user;
        if(user && (await bcrypt.compare(password,user.password))){
            const token = jwt.sign({email,password,role,_id},process.env.JWT_KEY)
            user.token = token
            return res.json({
                token,user});
        }
        return res.send("Email or password is Invalid!")
    }
    catch(err){
        res.send(err)
    }
};

exports.getAllUsers = async (req,res) => {
    try{
         const users = await User.find({role: "user"})
         res.send(users)
    }
    catch(err){
        res.send(err)
    }
 };

 exports.getSingleUser = async (req,res) => {
    try{
         const user = await User.findOne({email: req.user.email})
         res.send(user)
    }
    catch(err){
        res.send(err)
    }
 };
