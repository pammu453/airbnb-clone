const User = require("../models/User.js");
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtsecret='sfwefwcwefwefwefwefwf'

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await new User({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(422).json(error.message)
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email })
    if (userDoc) {
        const passOK = await bcrypt.compareSync(password, userDoc.password)
        if (passOK) {
            jwt.sign({email:userDoc.email,id:userDoc._id},jwtsecret,{},(err,token)=>{
                 if (err) throw err;
                 res.cookie("token",token).json(userDoc)
            })
        } else {
            res.status(422).json("pass not OK")
        }
    } else {
        res.status(422).json("User not found!")
    }
};

const profile= async (req, res) => {
    const {token}=req.cookies;
    if(token){
        jwt.verify(token,jwtsecret,{},async(err,user)=>{
            if (err) throw err;
            const {name,email,_id}=await User.findById(user.id)
            res.status(200).json({name,email,_id})
        })
    }else{
        res.json(null)
    }
};

const logout= async (req, res) => {
    res.cookie("token","").json(true)
};


module.exports = { register, login ,profile,logout};

