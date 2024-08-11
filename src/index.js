import express from "express";
import morgan from "morgan";

//crea el servidor de la api rest
const app = express();

//seteamos el puerto para escuchar las solicitudes
app.set('port', 3000);

//para poder ver la solicitud de los clientes
app.use(morgan('dev'));

//interpreta los objetos JSON de las solicitudes de los clientes que se van enviando
app.use(express.json());

//levantamos el servicio indicandole a nuestra aplicacion cuál es el puerto, el cual
//ya habíamos seteado en 3000 así que vá estar escuchando en ese puerto
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
})