> __Elemento Anterior 👀:__ __[REST Server con Node.js y Express](https://github.com/Paserno/node-express-restserver-fst)__
#
# Socket Server Basico

Websockets con Node.js, Express y Socket.io. Elementos utilizados:

* __[Express](https://www.npmjs.com/package/express)__ - [Pagina Oficial](https://expressjs.com)
* __[Doenv](https://www.npmjs.com/package/dotenv)__
* __[Cors](https://www.npmjs.com/package/cors)__

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