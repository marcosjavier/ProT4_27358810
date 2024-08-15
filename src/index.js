import express from "express";
import morgan from "morgan";

//importamos las rutas que exportamos en nuestro archivo routes.js
import { router } from "./routes.js";

//crea el servidor de la api rest
const app = express();

//seteamos el puerto para escuchar las solicitudes
app.set('port', 3000);
//interpreta los objetos JSON de las solicitudes de los clientes que se van enviando
//esta línea tiene que ir sí o si antes de la línea de código de morgan
app.use(express.json());

//para poder ver la solicitud de los clientes
app.use(morgan('dev'));

app.use(router);

//levantamos el servicio indicandole a nuestra aplicacion cuál es el puerto, el cual
//ya habíamos seteado en 3000 así que vá estar escuchando en ese puerto
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
})