import express from "express";
import {studentModel} from "../models/studentModel.js";

const studentRouter = express.Router();

studentRouter.get("/student", async(req,res)=>{
    try{
        const student = await studentModel.find({});
        res.status(200).send(student);
    }catch(err){
        res.status(400).send({error: err.message});
    }
});

studentRouter.post("/student", async (req,res)=>{
    try{
        const student = new studentModel(req.body);
        await student.save();
        res.status(200).send(student);
    }catch(err){
        res.status(400).send({error: err.message});
    }
});

studentRouter.delete("/student/:id", async(req,res)=>{
    try{
        const student = await studentModel.findOneAndDelete({"_id":req.params.id});
        if(!student){
            res.status(404).send("Id não encontrado na coleção");
        }
        res.status(200).send("Exluido com sucesso");
    }catch(err){
        res.status(400).send({errors: err.message});
    }
});

studentRouter.patch("/student/:id", async(req,res)=>{
    try{
        const student = await studentModel.findOneAndUpdate({_id: req.params.id}, req.body, {new:true});
        if(!student){
            res.status(404).send("Id não encontrado na coleção");
        }
        res.status(200).send(student);
    }catch(err){
        res.status(400).send({error: err.message});
    }
});


export {studentRouter};