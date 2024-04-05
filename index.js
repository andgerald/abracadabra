//importar express
const express = require("express");

//instanciar express
const app = express();

//levantando el servidor en el puerto 3000
app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});

//middleware de uso general
app.use(express.static("assets"));

//arreglo de usuarios
const usuarios = [
  "Juan",
  "Jocelyn",
  "Astrid",
  "Maria",
  "Ignacia",
  "Javier",
  "Brian",
];

//ruta para ir a usuarios
app.get("/abracadabra/usuarios", (req, res) => {
  res.send({ usuarios });
});

//middleware de la segunda ruta
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
  usuarios.includes(req.params.usuario) ? next() : res.redirect("/who.jpeg");
});

//ruta del usuario existente
app.get("/abracadabra/juego/:usuario", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//middleware de la tercera ruta
app.use("/abracadabra/conejo/:n", (req, res, next) => {
  //numero aleatorio entre 1 a 4
  let numRandom = Math.floor(Math.random() * (4 - 1 + 1) + 1);
  // si numero numRandom es == a req.params.n nos manda a la ruta con el conejito en caso contrario muestra volvemort
  numRandom == req.params.n ? next() : res.redirect("/voldemort.jpg");
});

//ruta cuando coincide el número  muestra el conejito
app.get("/abracadabra/conejo/:n", (req, res) => {
  res.redirect("/conejito.jpg");
});

//ruta generica esta pagina no existe
app.get("*", (req, res) => {
  res.send("Esta página no existe: ");
});
