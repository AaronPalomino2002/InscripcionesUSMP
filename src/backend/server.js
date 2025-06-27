import express from "express";
import cors from "cors";
import pool from "./db.js"; // <-- usa import en lugar de require
import morgan from "morgan";

const app = express();
app.use(
  cors({
    methods: ["POST", "GET", "PUT"],
    origin: "*",
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/postulantes", (req, res) =>
  res.status(200).json({ message: "Alive" })
);

app.post("/api/postulantes", async (req, res) => {
  try {
    console.log("HIT");

    const data = req.body;
    const result = await pool.query(
      `INSERT INTO postulantes (
        dni_num, nombres, apellidos, correo, celular, distrito, dni, colegio, grado,
        fuente, modo_ingreso, padre_madre, celular_padre, dni_padre, carreras,  
        desea_postular, autoriza, nombres_padre, apellidos_padre
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9,
        $10, $11, $12, $13, $14, $15,
        $16, $17, $18, $19
      ) RETURNING *`,
      [
        data.dniNum,
        data.nombres,
        data.apellidos,
        data.correo,
        data.celular,
        data.distrito,
        data.dni,
        data.colegio,
        data.grado,
        data.fuente,
        data.modoIngreso,
        data.padreMadre,
        data.celularPadre,
        data.dniPadre,
        JSON.stringify(data.carreras),
        data.deseaPostular,
        data.autoriza,
        data.nombresPadre,
        data.apellidosPadre,
      ]
    );

    return res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("❌ Error al insertar postulante:", err);
    res
      .status(500)
      .json({ success: false, message: "Error al registrar postulante" });
  }
});

app.get("/", (req, res) => {
  res.send("🟢 API de Postulantes activa");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
