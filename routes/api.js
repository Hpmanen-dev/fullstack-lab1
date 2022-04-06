const User = require("../schemas/User")
const express = require("express")
const router = express.Router()


router.post("/users", async (req, res) => {
    try{
        if(await User.findOne({username: req.body.username})){
            res.status(409)
            res.send({error: "User already exists!"})
        }else{
            const user = new User({
                username: req.body.username,
                name: req.body.name,
                age: req.body.age
            })
    
            await user.save()
            res.status(201)
            res.send(user)
        }
    }catch{
        res.status(409)
        res.send({error: "All fields are required!"})
    }
})

router.get("/users", async (req, res) => {
    const users = await User.find()
    res.send(users)
})

router.get("/users/:id", async (req, res) => {
    try{
        const user = await User.findOne({
            _id: req.params.id
        })
        if(user != null){
            res.send(user)
        }else{
            res.status(404)
            res.send({error: "User does not exist!"})
        }
    }catch{
        res.status(404)
        res.send({error: "Something went wrong!"})
    }
})

router.put("/users/:id", async (req, res) => {
    try{
        if(await User.findOne({username: req.body.username})){
            res.status(404)
            res.send({error: "User Already Exists!"})
        }else{
            await User.findByIdAndUpdate({_id: req.params.id}, req.body)
            res.send({message: "Success!"})  
        }
    }catch{
        res.status(404)
        res.send({error: "Something went wrong!"})
    }
})

router.delete("/users/:id", async (req,res) => {
    try{
        await User.deleteOne({_id: req.params.id})
        res.status(204).send()
    }catch{
        res.status(404)
        res.send({error: "User does not exist!"})
    }
})


module.exports = router