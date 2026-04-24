// Basic Setup -> npm init -> Install mongoose express dotenv
// Import Dependencies

const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/Student")
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json()); //Middleware that converts JSON request → JavaScript object; Without this, req.body will be undefined

// Connect with MongoDB
mongoose.connect(MONGO_URL)
    .then(()=>console.log("Connected with the Database"))
    .catch(err=>console.log(err))

// Create a record of a new Student

app.post("/students",async (req,res)=>{
    try{
        const student = await Student.create(req.body);
        res.status(201).json(student);
    }catch(err){
        res.status(400).json(err.message);
    }

})

app.get("/students", async (req,res)=>{
    try{
        const student = await Student.find(req.body);
        res.status(201).json(student);
    }catch(err){
        res.status(400).json(err.message);
    }
})

// Read (But only for 1 user)

app.get("/students/:id", async (req,res) => {
    try{
        const student = await Student.findById(req.params.id);
        res.json(student);
    }catch(err){
        res.status(404).json({message:err.message});
    }
})


app.delete("/students/:id", async (req,res) =>{
    try{
        const student = await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Student deleted successfully"});
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});

app.put("/students/:id", async (req,res) => {
    try{
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { 
                new: true,
                runValidators:true
             }
        );

        res.status(200).json(student);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

app.listen(PORT, ()=>{
    console.log("Server running on Port " + PORT);
})

// CRUD - Create, Read, Update, Delete