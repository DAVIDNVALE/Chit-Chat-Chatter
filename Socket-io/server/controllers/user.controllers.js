import User from '../models/User.js'
import bcrypt from 'bcrypt'

export const UserController = {
    register: async (req, res) => {
        try{
            const potentialUser = await User.findOne({email:req.body.email})
            if(potentialUser){
                res.status(400).json({message: 'Email already exists please login'})
            }
            const newUser = await User.create(req.body)
            console.log("NEW USER: ", newUser)
            res.status(201).json(newUser)
        }
        catch(err){
            res.status(500).json(err)
        }
    }
}