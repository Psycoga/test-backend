const express = require('express');
const morgan = require('morgan'); // Importa Morgan
const db = require('./initdb');
const geoip = require('geoip-lite');
const port = 3000;
const app = express();

// Usa el middleware de Morgan con el formato 'dev'
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send("Hola mundo");
});

app.get("/usuarios", (req, res) => {
    const stmt = "SELECT * FROM usuarios";
    const usuarios = db.prepare(stmt).all();
    res.json(usuarios);
});

app.get('/imagenes', (req, res) => {
    const ip = req.ip;
    const userAgent = req.get('userAgent');
    const fecha = new Date().toISOString();
    const localizacion = geoip.lookup(ip).city
    const insert = db.prepare("INSERT INTO usuarios (ip, userAgent, localizacion, fecha) VALUES (?,?,?,?)");
    insert.run(ip, userAgent, localizacion, fecha);

    const imagenes = [
        "1.jpg",
        "2.jpg",
        "3.jpg",
        "4.jpg",
        "5.jpg",
    ];

    const numeroAleatorio = Math.floor(Math.random() * imagenes.length);
    const imagen = imagenes[numeroAleatorio];

    res.sendFile(__dirname + `/${imagen}`);
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
