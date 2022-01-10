// Referencias del HTML
const on = document.querySelector('#on');
const off = document.querySelector('#off');

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