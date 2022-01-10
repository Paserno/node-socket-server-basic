// Referencias del HTML
const on         = document.querySelector('#on');
const off        = document.querySelector('#off');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');



const socket = io();


socket.on('connect', () => {
    console.log('Conectado');

    off.style.display = 'none';
    on.style.display  = '';
});

socket.on('disconnect', () => {
    console.log('Desconectado del Servidor');
    on.style.display  = 'none';
    off.style.display = '';
});


btnEnviar.addEventListener( 'click', () =>{

    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }
    socket.emit( 'enviar-mensaje', payload );
});