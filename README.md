> __Elemento Anterior 馃憖:__ __[REST Server con Node.js y Express](https://github.com/Paserno/node-express-restserver-fst)__
#
# Socket Server Basico

Websockets con Node.js, Express y Socket.io. Elementos utilizados:

* __[Express](https://www.npmjs.com/package/express)__ - [Pagina Oficial](https://expressjs.com)
* __[Doenv](https://www.npmjs.com/package/dotenv)__
* __[Cors](https://www.npmjs.com/package/cors)__
* __[Socket.io](https://www.npmjs.com/package/socket.io)__ - [Pagina Oficial](https://socket.io/docs/v4/)

#
Para reconstruir los modulos de node ejecute el siguiente comando.

````
npm install
````

#
> __Elemento Posterior 馃憖:__ __[Aplicaci贸n de Ticket con Socket.io](https://github.com/Paserno/node-socket-ticket)__ 
#
### 1.- Inicio del Proyecto
Al iniciar el proyecto de __Websockets__ se reutilizo el archivo `server.js` del anterior proyecto, ademas de lo siguiente:

* Extraer codigo de la aplicaci贸n anterior, en el archivo __[server.js](https://github.com/Paserno/node-express-restserver-fst/blob/main/models/server.js)__ eliminamos la conexion a bd, las rutas y paths.
* Realizar la instalaci贸n de __Express__, __Cors__ y __Doenv__.
* Crear 馃搨 carpeta __public__ con `index.html`
* Crear archivo `app.js` para la ejecuci贸n de la aplicaci贸n.

En `app.js`
* Creamos la configuraci贸n de __dotenv__.
* Instanciamos la clase __Server__.
````
require('dotenv').config();

const Server = require('./models/server');

const server = new Server();

server.listen();
````
#
### 2.- Implementaci贸n de Socket.io
Una vez instalado __Socket.io__ realizamos la configuraci贸n en la clase __Server__

En `models/server.js`
* Agregamos en el constructor de la clase __Server__ la configuraci贸n para inicializar __Socket.io__.
````
this.server = require('http').createServer(this.app);
this.io = require('socket.io')(this.server);
````
* Cambiamos el metodo `lister()` de `this.app` a `this.server`.
````
listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
````
En `public/index.html`
* Agregamos la libreria de __socket.io__ en la pantalla __"Frontend"__, para verificar si esta todo correcto, verificandolo en el navegador, especificamente en __Network__.
````
<script src="./socket.io/socket.io.js"></script>
````
#
### 3.- Configuraci贸n de Socket.io - Frontend
En este punto se realizar谩 la conexi贸n del __Frontend__ y mostrar en la consola del __Backend__ que un cliente se conecto

En `models/server.js`
* En el constructor agregamos el metodo que crearemos a continuaci贸n.
````
this.sockets();
````
* Creamos el metodo `sockets()`, copiamos la conexi贸n que sale en la documentaci贸n `io.on('connection', socket => {});`.
* Agregamos a la funci贸n copiada de la documentaci贸n un `console.log` donde nos mande que se conecto un cliente y con una id propia de __Socket.io__.
* Agregamos una desconexi贸n para saber cuando se desconecta el cliente.
````
sockets(){
        this.io.on('connection', socket => { 
            console.log('Cliente Conectado', socket.id );
        
            socket.on('disconnect', () => {
                console.log('Cliente Desconectado', socket.id );
            })
        });
    }
````
En __Frontend__ `public/js/socket-client.js`
* Agregamos esto propio de __Socket.io__ para el cliente, esto har谩 que se conecte al servidor de socket y de esta manera la consola detectar谩 un nuevo cliente.
````
const socket = io();
````
#
### 4.- Mensaje de conexi贸n y Desconexi贸n - Cliente
Aqu铆 se har谩 un retoque en HTML para saber cuando se est茅 conectado en el Cliente

En `public/index.htmal`
* Se crea un parrafo, donde tenemos 2 span con diferentes mensajes.
* Le creamos una id, para manejarlo con JS y la clase de __Boostrap__.
````
<p>
   Server Status:
   <span id="on" class="text-success">Online</span>
   <span id="off" class="text-danger">Offline</span>
</p>
````
En `public/js/socket-client.js`
* Hacemos referencia al HTML que creamos.
````
const on = document.querySelector('#on');
const off = document.querySelector('#off');
````
* En la conexi贸n le agregamos un estilo de `display = "none"` para ocultar el elemento `offline`.
* Lo hacemos de la misma forma en la desconexi贸n pero al reves, agregandole el `display = "none"` al `online`, as铆 cubrimos las dos funciones.
````
socket.on('connect', () => {
    console.log('Conectado');

    off.style.display = 'none';
    on.style.display  = '';
});
````
#
### 5.- Emitir desde el Cliente - Escuchar en el Servidor
Se desea emitir un evento desde el __Cliente__ que sea escuchado por el __Servidor__ 

En `public/index.html`
* Se crea un `input` con un `button` para enviar los eventos, usamos las clases de __Bootstrap__.
````
<div class="row">
        <div class="col">
            <input type="text" id="txtMensaje" class="form-control">
        </div>
        <div class="col">
            <button id="btnEnviar" class="btn btn-primary">
                Enviar
            </button>
        </div>
    </div>
````
En `public/js/socket-client.js`
* Hacemos referencia a los nuevos elementos creados en HTML con sus IDs.
````
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');
````
* Realizamos un evento click, donde enviaremos el valor del input.
* Se almacenar谩 el mensaje en un objeto literiario, para luego emitirlo en el evento del socket.
````
btnEnviar.addEventListener( 'click', () =>{

    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }
    socket.emit( 'enviar-mensaje', payload );
});
````
En `models/server.js`
* Vamos a querer escuchar el evento que es emitido en el __Cliente__, para esto escuchamos el evento de socket `enviar-mensaje` y recibimos en un __callback__ lo del `payload`, para luego imprimirlo por consola.
````
socket.on('enviar-mensaje', (payload ) => {
        console.log(payload);
})
````
#
### 6.- Emitir desde el Servidor - Escuchar en el Cliente
En este punto lo que se quiere es abrir 2 pesta帽as en el navegador para luego enviar 1 mensaje de un cliente y que lo reenvie el servidor a ambos cliente

En `models/server.js`
* Eliminamos los mensajes por consola de conectar y desconectar.
* Una vez recibido el mensaje del `payload` lo reenviaremos a todos los clientes.
````
socket.on('enviar-mensaje', (payload ) => {

    this.io.emit('enviar-mensaje', payload);
});
````
* Eliminamos los mensajes por consola de conectar y desconectar.
* Para escuchar los mensajes que son emitidos del Servidor, agregamos `socket.on` con el evento `enviar-mensaje`, ademas mandamos un `console.log` con el `payload`.
````
socket.on('enviar-mensaje', (payload) =>{
    console.log(payload)
});
````
#
### 7.- Retroalimenaci贸n de emision del Cliente hacia el Servidor
En el caso que se quiera emitir un mensaje desde el cliente y que se nos mande por ejemplo una id desde la BD o servidor

En `public/js/socket-client.js`
* En el evento del boton del __Frontend__ se agrega un tercer argumento que seria un callback.
* La que recibir谩 el elemento del servidor en una impresi贸n por consola.
````
socket.emit( 'enviar-mensaje', payload, ( id ) => {
        console.log('Desde el Server', id);
    });
````
En `models/server.js`
* Al escuchar el mensaje en el servidor enviaremos un callback.
* Por ejemplo un id, se puede mandar un objeto literario o primitivo en el __callback__.
* De esta manera cuando se emita un mensaje del cliente solo ese cliente recibir谩 el objeto.
````
socket.on('enviar-mensaje', ( payload, callback ) => {

        const id = 123456;
        callback( { id, fecha: new Date().getTime() } );

        // this.io.emit('enviar-mensaje', payload);
})
````
#
### 8.- Broadcast - Ordenar el C贸digo
Se realizar谩 un controlador donde se tenga la conexi贸n de socket, para ordenar el codigo

En `sockets/contoller.js`
* Creamos la nueva funci贸n `socketController()`, extraemos lo que tenemos en el la clase __Sevidor__, espec铆ficamente en el metodo `sockets()`.
* Dejamos los `console.log` de conexi贸n y desconexi贸n.
* En la parte de recibir el mensaje de `enviar-mensaje`, reenviamos la id y ademas en el emitir el mensaje a los demas __clientes__, necesitamos agregar `socket.broadcast.emit()` para enviarle a todos los clientes el mensaje, en lo contrario no se podria. _(Gracias al `.broadcast`)_
````
const socketController = (socket) => {

    console.log('Cliente Conectado', socket.id );

    socket.on('disconnect', () => {
        console.log('Cliente Desconectado', socket.id );
    });

    socket.on('enviar-mensaje', (payload, callback) => {

        const id = 123456;
        callback( id );

        socket.broadcast.emit('enviar-mensaje', payload);
    })
}
````
* Realizamos la exportaci贸n de la funci贸n.
````
module.exports = {
    socketController
}
````
En `models/server.js`
* Importamos el `socketController`.
````
const { socketController } = require('../sockets/controller');
````
* Modificamos el metodo `sockets()` recibiendo la importaci贸n de `socketController`.
````
sockets(){
        this.io.on('connection', socketController);
    }
````
De esta manera queda igual el c贸dgio solo mas ordenado.
#