const {User}=require ("../database/connection")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports={
    registerUser: async(req,res)=>{
        const {name,email,password,imageUrl,role}=req.body
        try {
            const allowedRoles=['CUSTOMER', 'RESTAURANT_OWNER', 'DRIVER']
            if(!allowedRoles.includes(role)){
                return res.status(400).json({message:"Invalid role"})
            }
            const existingUser=await User.findOne({where:{email}})
            if(existingUser){
                return res.status(400).json({message:"User already exists"})
            }
            const hashedPassword=await bcrypt.hash(password,10)
            const newUser=await User.create({name,email,password:hashedPassword,imageUrl,role})
            res.status(201).json({message:"User registered successfully",user:newUser})
        } catch (error) {
            console.error("Error registering user:",error)
            res.status(500).json({message:"Internal server error"})
        }
    },
    loginUser: async(req,res)=>{
        const {email,password}=req.body
        try {
            const user = await User.findOne({where:{email}})
            if(!user){
                return res.status(401).json({message:"Invalid credentials"})
            }
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if(!isPasswordValid){
                return res.status(401).json({message:"Invalid credentials"})
            }
            
            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET is not defined')
            }
            
            const token = jwt.sign(
                {userId: user.id,
                    role:user.role
                }, 
                process.env.JWT_SECRET,
                {expiresIn: "10d"}
            )
            
            return res.status(200).json({
                message: "Login successful",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token
            })
        } catch (error) {
            console.error("Login error:", error.message || error)
            if (error.message === 'JWT_SECRET is not defined') {
                return res.status(500).json({
                    message: "Server configuration error",
                    error: "Authentication service unavailable"
                })
            }
            return res.status(500).json({
                message: "Failed to process login request",
                error: "Please try again later"
            })
        }
    },
    deleteUser:async(req,res)=>{
        const {id}=req.params
        try {
            const user=await User.findByPk(id)
            if(!user){
                return res.status(404).json({message:"User not found"})
            }
            await user.destroy()
            res.status(200).json({message:"User deleted successfully"})
        } catch (error) {
            res.status(500).json({message:"Internal server error"})
        }

    },
    updateUser:async(req,res)=>{
        const {id}=req.params
        const {name,email,password,imageUrl}=req.body
        try {
            const user=await User.findByPk(id)
            if(!user){
                return res.status(404).json({message:"User not found"})
            }
            user.name=name
            user.email=email
            user.password=password  
            user.imageUrl=imageUrl
            await user.save()
            res.status(200).json({message:"User updated successfully",user})
        } catch (error) {
            res.status(500).json({message:"Internal server error"})
        }

        },
        currentUser: async (req, res) => {
            try {
              const user = await User.findOne({ where: { id: req.user.userId } });
              if (!user) {
                return res.status(404).json({ message: "User not found" });
              }
              res.status(200).json(user);
            } catch (error) {
              console.error("Error fetching current user:", error);
              res.status(500).json({ message: "Server error" });
            }
          },
        }

