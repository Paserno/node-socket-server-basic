> __Elemento Anterior 👀:__ __[REST Server con Node.js y Express](https://github.com/Paserno/node-express-restserver-fst)__
#
# Socket Server Basico

Websockets con Node.js, Express y Socket.io. Elementos utilizados:

* __[Express](https://www.npmjs.com/package/express)__ - [Pagina Oficial](https://expressjs.com)
* __[Doenv](https://www.npmjs.com/package/dotenv)__
* __[Cors](https://www.npmjs.com/package/cors)__
* __[Socket.io](https://www.npmjs.com/package/socket.io)__

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