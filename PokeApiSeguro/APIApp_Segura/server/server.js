import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    res.cookie("token", "seguro123", {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });

    return res.json({ ok: true });
  }

  res.status(401).json({ ok: false });
});

// VALIDAR
app.get("/auth", (req, res) => {
  if (req.cookies.token === "seguro123") {
    return res.json({ authenticated: true });
  }
  res.status(401).json({ authenticated: false });
});

// LOGOUT
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ ok: true });
});

app.listen(3000, () => console.log("Backend en http://localhost:3000"));
