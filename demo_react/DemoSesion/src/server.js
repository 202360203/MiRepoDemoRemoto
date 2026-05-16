import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

import auth from "./cookieHttpOnly/auth.js"

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));

const SECRET = "superdupersecreto";

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    //Validación fake
    if (username === "admin" && password === "12345") {
        const token = jwt.sign({username}, SECRET, {expiresIn: "1h"});
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 360000
        });
        return res.json({message: "Login exitoso"})
    }
    return status(401).json({message: "Credenciales invalidas"});
});

app.get("/perfil", auth, (req, res) => {
    console.log("Cookie", req.cookie)
    res.json({
        message: "Eres un usuario protegido",
        user: req.user

    });
});

app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({message: "Logout exitoso"});
});

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});
