const express=require("express")
const router=express.Router()
const {registerUser,loginUser,deleteUser,updateUser,currentUser}=require("../controller/user")

const authenticateJWT=require("../auth/auth") 

router.post("/register",registerUser)
router.post("/login",loginUser)
router.delete("/:id",deleteUser)
router.put("/:id",updateUser)
router.get("/current",authenticateJWT,currentUser)

module.exports=router

