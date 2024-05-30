document.addEventListener('DOMContentLoaded', function() {
    const calendario = document.getElementById('calendario');
    const mesActual = document.getElementById('mes-actual');
    const btnAnterior = document.getElementById('anterior');
    const btnSiguiente = document.getElementById('siguiente');
    const formulario = document.getElementById('formulario-evento');
    const fechaEvento = document.getElementById('fecha-evento');
    const horaEvento = document.getElementById('hora-evento');
    const descripcionEvento = document.getElementById('descripcion-evento');
    const participantesEvento = document.getElementById('participantes-evento');


    let eventos = [];
    let fechaActual = new Date();

    function renderizarCalendario() {
        const year = fechaActual.getFullYear();
        const mes = fechaActual.getMonth();
        const primerDia = new Date(year, mes, 1).getDay();
        const ultimoDia = new Date(year, mes + 1, 0).getDate();
        
        calendario.innerHTML = '';
        mesActual.textContent = `${fechaActual.toLocaleString('default', { month: 'long' })} ${year}`;
        
        for (let i = 0; i < primerDia; i++) {
            const divVacio = document.createElement('div');
            calendario.appendChild(divVacio);
        }
        
        for (let dia = 1; dia <= ultimoDia; dia++) {
            const divDia = document.createElement('div');
            divDia.textContent = dia;
            divDia.addEventListener('click', () => seleccionarFecha(dia));
            calendario.appendChild(divDia);
        }
    }

    function seleccionarFecha(dia) {
        const fechaSeleccionada = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), dia);
        fechaEvento.value = fechaSeleccionada.toISOString().split('T')[0];
    }

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();
        
        const nuevoEvento = {
            fecha: fechaEvento.value,
            hora: horaEvento.value,
            descripcion: descripcionEvento.value,
            participantes: participantesEvento.value
        };
        
        eventos.push(nuevoEvento);
        mostrarEventos();
        formulario.reset();
    });

    function mostrarEventos() {
        const elementosDias = document.querySelectorAll('#calendario div');
        
        elementosDias.forEach((elemento, indice) => {
            const dia = indice - new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1).getDay() + 1;
            const fecha = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), dia).toISOString().split('T')[0];
            
            const evento = eventos.find(e => e.fecha === fecha);
            if (evento) {
                elemento.style.backgroundColor = '#ddd';
            } else {
                elemento.style.backgroundColor = '#fff';
            }
        });
    }

    btnAnterior.addEventListener('click', () => {
        fechaActual.setMonth(fechaActual.getMonth() - 1);
        renderizarCalendario();
        mostrarEventos();
    });

    btnSiguiente.addEventListener('click', () => {
        fechaActual.setMonth(fechaActual.getMonth() + 1);
        renderizarCalendario();
        mostrarEventos();
    });

    renderizarCalendario();
    mostrarEventos();
});
