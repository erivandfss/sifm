import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import veiculosRoutes from "./routes/veiculos.js";
import motoristasRoutes from "./routes/motoristas.js";
import portariaRoutes from "./routes/portaria.js";
import usuariosRoutes from "./routes/usuarios.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/veiculos", veiculosRoutes);
app.use("/api/motoristas", motoristasRoutes);
app.use("/api/portaria", portariaRoutes);
app.use("/api/usuarios", usuariosRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));