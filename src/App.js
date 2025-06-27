import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    dniNum: "",
    nombres: "",
    apellidos: "",
    correo: "",
    celular: "",
    distrito: "",
    dni: "",
    colegio: "",
    grado: "",
    fuente: "",
    modoIngreso: "",
    padreMadre: "",
    celularPadre: "",
    dniPadre: "",
    carreras: [],
    deseaPostular: false,
    autoriza: false,
    nombresPadre: "",
    apellidosPadre: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleCarreraChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return { ...prev, carreras: [...prev.carreras, value] };
      } else {
        return {
          ...prev,
          carreras: prev.carreras.filter((c) => c !== value),
        };
      }
    });
  };

  const validarDNI = async () => {
    const dni = formData.dniNum;
    if (dni.length !== 8) {
      alert("El DNI debe tener 8 dígitos.");
      return;
    }

    try {
      const response = await fetch(
        `https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InBhbG9taW5vZmFsY29uYWFyb25AZ21haWwuY29tIn0.loGC3eI1BUecjPfDNxvNTWizEroEeQDmkojeZkDaIqo`
      );

      if (!response.ok) throw new Error("DNI no válido o no encontrado");
      const data = await response.json();

      setFormData({
        ...formData,
        nombres: data.nombres,
        apellidos: `${data.apellidoPaterno} ${data.apellidoMaterno}`,
        dni: dni,
      });
    } catch (error) {
      alert("Error al validar el DNI: " + error.message);
    }
  };

  const validarDniPadre = async () => {
    const dni = formData.dniPadre;
    if (dni.length !== 8) {
      alert("El DNI del Padre/Madre debe tener 8 dígitos.");
      return;
    }

    try {
      const response = await fetch(
        `https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InBhbG9taW5vZmFsY29uYWFyb25AZ21haWwuY29tIn0.loGC3eI1BUecjPfDNxvNTWizEroEeQDmkojeZkDaIqo`
      );

      if (!response.ok) throw new Error("DNI no válido o no encontrado");
      const data = await response.json();

      setFormData((prev) => ({
        ...prev,
        nombresPadre: data.nombres,
        apellidosPadre: `${data.apellidoPaterno} ${data.apellidoMaterno}`,
      }));
    } catch (error) {
      alert("Error al validar el DNI del Padre/Madre: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://usmp-backend.onrender.com/api/postulantes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al registrar postulante");
      }

      alert("Formulario enviado y guardado con éxito");
      handleClear();
    } catch (error) {
      alert("Error al enviar: " + error.message);
    }
  };

  const handleClear = () => {
    setFormData({
      dniNum: "",
      nombres: "",
      apellidos: "",
      correo: "",
      celular: "",
      distrito: "",
      dni: "",
      colegio: "",
      grado: "",
      fuente: "",
      modoIngreso: "",
      padreMadre: "",
      celularPadre: "",
      dniPadre: "",
      carreras: [], // ✅ ¡esto es lo que faltaba!
      deseaPostular: false,
      autoriza: false,
      nombresPadre: "",
      apellidosPadre: "",
    });
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Formulario de Registro - USMP</h2>
      </header>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.row}>
          <input
            placeholder="DNI del Alumno"
            name="dniNum"
            value={formData.dniNum}
            onChange={handleChange}
            style={{ ...styles.input, flex: 1 }}
            maxLength={8}
          />
          <button
            type="button"
            onClick={validarDNI}
            style={styles.validateButton}
          >
            Validar DNI
          </button>
        </div>

        <input
          placeholder="Nombres"
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          placeholder="Apellidos"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Correo"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          placeholder="Celular"
          name="celular"
          value={formData.celular}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          placeholder="Distrito"
          name="distrito"
          value={formData.distrito}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          placeholder="Nombre Colegio"
          name="colegio"
          value={formData.colegio}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          placeholder="Grado de Estudio"
          name="grado"
          value={formData.grado}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          placeholder="¿Dónde te enteraste de la USMP?"
          name="fuente"
          value={formData.fuente}
          onChange={handleChange}
          style={styles.input}
        />
        <select
          name="modoIngreso"
          value={formData.modoIngreso}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Seleccione el modo de ingreso</option>
          <option value="CEA">CEA</option>
          <option value="Concurso Ordinario">Concurso Ordinario</option>
          <option value="Primera Alternativa">Primera Alternativa</option>
          <option value="Beca 18">Beca 18</option>
        </select>

        <div style={styles.row}>
          <input
            placeholder="DNI del Padre/Madre"
            name="dniPadre"
            value={formData.dniPadre}
            onChange={handleChange}
            style={{ ...styles.input, flex: 1 }}
          />
          <button
            type="button"
            onClick={validarDniPadre}
            style={styles.validateButton}
          >
            Validar DNI Padre/Madre
          </button>
        </div>

        <input
          placeholder="Nombres del papa o mama"
          name="nombresPadre"
          value={formData.nombresPadre}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          placeholder="Apellidos del papa o mama"
          name="apellidosPadre"
          value={formData.apellidosPadre}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          placeholder="Celular del Padre/Madre"
          name="celularPadre"
          value={formData.celularPadre}
          onChange={handleChange}
          style={styles.input}
        />

        <div>
          <label>
            <strong>Carreras de interés:</strong>
          </label>
          <div style={styles.checkboxGroup}>
            {[
              "Administración",
              "Arquitectura",
              "Derecho",
              "Medicina Humana",
              "Odontología",
              "Ingeniería de Sistemas",
              "Ingeniería Civil",
              "Contabilidad y Finanzas",
              "Psicología",
              "Marketing",
              "Negocios Internacionales",
              "Ciencias de la Comunicación",
              "Enfermería",
              "Obstetricia",
              "Farmacia y Bioquímica",
              "Educación Inicial",
              "Educación Primaria",
              "Economía",
            ].map((carrera) => (
              <label key={carrera} style={styles.checkbox}>
                <input
                  type="checkbox"
                  value={carrera}
                  checked={formData.carreras.includes(carrera)}
                  onChange={handleCarreraChange}
                />
                {carrera}
              </label>
            ))}
          </div>
        </div>

        <label style={styles.checkbox}>
          <input
            type="checkbox"
            name="deseaPostular"
            checked={formData.deseaPostular}
            onChange={handleChange}
          />
          ¿Te interesa postular?
        </label>

        <label style={styles.checkbox}>
          <input
            type="checkbox"
            name="autoriza"
            checked={formData.autoriza}
            onChange={handleChange}
          />
          Autorizo el uso de mis datos personales
        </label>

        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>
            Enviar
          </button>
          <button type="button" onClick={handleClear} style={styles.button}>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1rem",
  },
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "2rem",
    maxWidth: "600px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  row: {
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
  },
  input: {
    padding: "0.6rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  },
  button: {
    padding: "0.5rem 1.2rem",
    fontSize: "1rem",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#00703C",
    color: "#fff",
  },
  validateButton: {
    padding: "0.6rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: "#0066cc",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
};

export default App;
