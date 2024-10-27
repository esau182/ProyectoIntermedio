const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta raíz opcional
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Ruta para manejar la transcripción
app.post('/api/transcription', (req, res) => {
  const { text } = req.body;
  console.log("Texto recibido:", text);

  // Lógica adicional, si es necesario
  const responseMessage = `Texto recibido y procesado: ${text}`;

  // Responder al front-end
  res.json({ message: responseMessage });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});





