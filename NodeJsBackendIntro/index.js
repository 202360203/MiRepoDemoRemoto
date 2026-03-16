const express = require('express');
const app = express();
const port= 3600;
app.use(express.json());

let data=[
  {id:1, superHero:"Batman"},
  {id:2, superHero:"Spider-Man"},
  {id:3, superHero:"Moon Knight"},
];

app.get("/", (reg,res)=>{
  return res.send("Hola desde mi casa en las Bahamas");
});

app.get("/datos", (req,res)=>{
  res.json(data);
});

app.get("/datos/Spider-Man", (req,res)=>{
  res.json(data[1]);
});

app.post("/add",(req,res)=>{
  let nuevoHeroe ={
    id:data.length+1,
    superHero:req.body.superHero
  };
  data.push(nuevoHeroe);
  return res.status(200).json(data);
});


app.listen(port, ()=>{
  console.log("Servidor http://localhost:"+port);
});
