const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;



app.use(cors());

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
  });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('audio'), (req, res) => {
    const audioFile = req.file;
  
    if (!audioFile) {
      console.log("No se recibió ningún archivo de audio.");
      return res.status(400).json({ error: 'No se recibió ningún archivo de audio' });
    }
  
    console.log("Archivo de audio recibido:", audioFile.originalname); // Muestra el nombre del archivo recibido
    console.log("Tamaño del archivo:", audioFile.size); // Muestra el tamaño del archivo
  
    const result = "Este es el resultado simulado de la IA.";
    res.json({ result });
  });
  

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
