import express from "express";
import mongoose from "mongoose";
import { studentRouter } from "./routes/studentRouter.js";


(async()=>{
    try{
    await mongoose.connect("mongodb+srv://teste:1234@primeiroprojeto.z1rts.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conectado ao banco de dados com sucesso");
    }catch(err){
        console.log("Erro ao conectar ao banco de dados: "+ err);
    }
})();

const app = express();

app.use(express.json());
app.use(studentRouter);

app.get("/", (req,res)=>{
    res.send("Api rodando");
});

app.listen(3000, ()=>  console.log("API Lisening port 3000"));