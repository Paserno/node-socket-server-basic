> __Elemento Anterior 👀:__ __[REST Server con Node.js y Express](https://github.com/Paserno/node-express-restserver-fst)__
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
### 1.- Inicio del Proyecto
Al iniciar el proyecto de __Websockets__ se reutilizo el archivo `server.js` del anterior proyecto, ademas de lo siguiente:

* Extraer codigo de la aplicación anterior, en el archivo __[server.js](https://github.com/Paserno/node-express-restserver-fst/blob/main/models/server.js)__ eliminamos la conexion a bd, las rutas y paths.
* Realizar la instalación de __Express__, __Cors__ y __Doenv__.
* Crear 📂 carpeta __public__ con `index.html`
* Crear archivo `app.js` para la ejecución de la aplicación.

En `app.js`
* Creamos la configuración de __dotenv__.
* Instanciamos la clase __Server__.
````
require('dotenv').config();

const Server = require('./models/server');

const server = new Server();

server.listen();
````
#
### 2.- Implementación de Socket.io
Una vez instalado __Socket.io__ realizamos la configuración en la clase __Server__

En `models/server.js`
* Agregamos en el constructor de la clase __Server__ la configuración para inicializar __Socket.io__.
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
### 3.- Configuración de Socket.io - Frontend
En este punto se realizará la conexión del __Frontend__ y mostrar en la consola del __Backend__ que un cliente se conecto

En `models/server.js`
* En el constructor agregamos el metodo que crearemos a continuación.
````
this.sockets();
````
* Creamos el metodo `sockets()`, copiamos la conexión que sale en la documentación `io.on('connection', socket => {});`.
* Agregamos a la función copiada de la documentación un `console.log` donde nos mande que se conecto un cliente y con una id propia de __Socket.io__.
* Agregamos una desconexión para saber cuando se desconecta el cliente.
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
* Agregamos esto propio de __Socket.io__ para el cliente, esto hará que se conecte al servidor de socket y de esta manera la consola detectará un nuevo cliente.
````
const socket = io();
````
#
### 4.- Mensaje de conexión y Desconexión - Cliente
Aquí se hará un retoque en HTML para saber cuando se esté conectado en el Cliente

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
* En la conexión le agregamos un estilo de `display = "none"` para ocultar el elemento `offline`.
* Lo hacemos de la misma forma en la desconexión pero al reves, agregandole el `display = "none"` al `online`, así cubrimos las dos funciones.
````
socket.on('connect', () => {
    console.log('Conectado');

    off.style.display = 'none';
    on.style.display  = '';
});
````
#