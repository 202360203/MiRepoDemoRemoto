const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Usuario = require("./models/Usuario");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

//MongoDB
mongoose.connect("mongodb://Ricardo:yasamri13@ac-dx5h3an-shard-00-00.meytpgo.mongodb.net:27017,ac-dx5h3an-shard-00-01.meytpgo.mongodb.net:27017,ac-dx5h3an-shard-00-02.meytpgo.mongodb.net:27017/?ssl=true&replicaSet=atlas-u3faar-shard-0&authSource=admin&appName=Cluster0")
.then(()=>{console.log("MongoDB Ready!")})
.catch(err=>console.log(err));

let registros = [
  {
    id:1,
    nombre:"Kareld Ismerai",
    email:"Kareld@ucc.mx",
    genero:"Femenino",
    plataformas:["Netflix", "Prime"]
  },
  {
    id:2,
    nombre:"Ricardo Gutierrez",
    email:"Ricardo@ucc.mx",
    genero:"Masculino",
    plataformas:["HBO", "Disney+"]
  }
];

let idActual=2;

app.get("/api/usuarios", async (req,res)=>{
  const usuarios= await Usuario.find();
  res.json(usuarios);
});

app.post("/api/usuarios", async (req,res)=>{
  const nuevo = new Usuario(
    {
      nombre: request req.body.nombre,
      email: req.body.email,
      genero: req.body.genero,
      plataformas: req.body.plataformas
    }
  );
  const guardado= await nuevo.save();
  res.json(guardado);
});

    
app.put("/api/usuarios/:id", async (req,res)=>{
  const usuarioActualizado = await Usuario.findByIdAndUpdate(
    req.params.id,
    {
      nombre: req.body.nombre,
      email: req.body.email,
      genero: req.body.genero,
      plataformas: req.body.plataformas
    },
    {new: true}
  );
  res.json(usuarioActualizado);
});

app.listen(port,()=>{
  console.log("Listening at http://localhost:"+port);
});
