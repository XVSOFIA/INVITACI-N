// ======================================
// VARIABLES GENERALES
// ======================================
const pantallaInicio = document.getElementById("pantallaInicio");
const botonAbrir = document.getElementById("abrirInvitacion");
const musica = document.getElementById("musica");

// ======================================
// ABRIR INVITACION
// ======================================
botonAbrir.addEventListener("click", () => {
    musica.volume = 0.35;
    musica.play().catch(() => {
        console.log("La reproducción automática fue bloqueada.");
    });

    pantallaInicio.classList.add("ocultar");

    setTimeout(() => {
        document.body.style.overflow = "auto";
    }, 1200);
});

// ======================================
// CUENTA REGRESIVA
// ======================================
const fechaEvento = new Date("2026-06-21T13:00:00").getTime();

function actualizarContador() {
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    if (diferencia <= 0) {
        document.getElementById("dias").textContent = "0";
        document.getElementById("horas").textContent = "0";
        document.getElementById("minutos").textContent = "0";
        document.getElementById("segundos").textContent = "0";
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;
}

actualizarContador();
setInterval(actualizarContador, 1000);

// ======================================
// GESTIÓN DEL MODAL
// ======================================
const modal = document.getElementById("modalConfirmacion");

function abrirModal() {
    modal.style.display = "flex";
}

function cerrarModal() {
    modal.style.display = "none";
}

// Cerrar modal al tocar afuera
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        cerrarModal();
    }
});

// ======================================
// CONTADOR DE PERSONAS EN MODAL
// ======================================
let cantidad = 1;

function cambiarCantidad(cambio) {
    cantidad += cambio;
    if (cantidad < 1) {
        cantidad = 1;
    }
    document.getElementById("cantidadTexto").textContent = cantidad;
}

// ======================================
// VALIDACION DEL FORMULARIO
// ======================================
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const btnEnviar = document.getElementById("btnEnviar");

function validarFormulario() {
    if (nombre.value.trim() !== "" && apellido.value.trim() !== "") {
        btnEnviar.disabled = false;
    } else {
        btnEnviar.disabled = true;
    }
}

nombre.addEventListener("input", validarFormulario);
apellido.addEventListener("input", validarFormulario);

// ======================================
// ENVIAR WHATSAPP
// ======================================
btnEnviar.addEventListener("click", () => {
    const mensaje = `¡Hola!\n\nConfirmo con mucha alegría mi asistencia a los XV Años de Sofía Belén.\n\nNombre: ${nombre.value} ${apellido.value}\nPases confirmados: ${cantidad}\n\n¡Nos vemos pronto!`;
    
    // Tu número actual
    const url = `https://wa.me/50236278227?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
    cerrarModal();
});

// ======================================
// INICIALIZACIÓN
// ======================================
document.body.style.overflow = "hidden";
