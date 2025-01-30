import asyncHandler from 'express-async-handler';
import User from '../model/user.model.js'
import bcrypt from "bcrypt"

const userCtrl ={
    signup:asyncHandler (async(req,res,next)=>{
       try {
        const { username, email,password} = req.body;

         // Check if username or email already exists

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ status: false, message: "Username or email already exists" });
          }

      // Check if username already exists

      const usernameCheck = await User.findOne({ username });
      if (usernameCheck) {
        return res.status(409).json({ message: 'Username already used', status: false });
      }

      // Check if email already exists

      const emailCheck = await User.findOne({ email });
      if (emailCheck) {
        return res.status(409).json({ message: 'Email already used', status: false });
      }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({username,email,password:hashedPassword})

        return res.status(201).json({status:true,user:newUser})
      
       } catch (error) {
        next(error)
       }
    }),
  
  login:asyncHandler(async (req, res, next) => {
      const { username, password } = req.body;
    
      // Find user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ status: false, message: "User not found" });
      }
    
      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ status: false, message: "Invalid password" });
      }
    
      // Successful login
      res.status(200).json({ status: true, user });
    }),
}

export default userCtrl;
