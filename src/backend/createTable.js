const pool = require("./db");

async function createTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS postulantes (
        id SERIAL PRIMARY KEY,
        dni_num VARCHAR(8),
        nombres TEXT,
        apellidos TEXT,
        correo TEXT,
        celular TEXT,
        distrito TEXT,
        dni VARCHAR(8),
        colegio TEXT,
        grado TEXT,
        fuente TEXT,
        modo_ingreso TEXT,
        padre_madre TEXT,
        celular_padre TEXT,
        dni_padre VARCHAR(8),
        carreras JSONB,
        desea_postular BOOLEAN,
        autoriza BOOLEAN,
        nombres_padre TEXT,
        apellidos_padre TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("✅ Tabla 'postulantes' creada exitosamente.");
  } catch (error) {
    console.error("❌ Error al crear la tabla:", error);
  } finally {
    pool.end();
  }
}

createTable();
