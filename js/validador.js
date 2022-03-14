export { validar };
import { juego } from "./script.js";
function validar() {
  const nombre = document.getElementById("nombre");
  const btnJugador = document.getElementById("btn-jugador");
  const btnNuevaPartida = document.getElementById("btnNuevaPartida");
  const btnPedirCarta = document.getElementById("btnPedirCarta");
  const btnComodin = document.getElementById("btnComodin");
  const btnResultado = document.getElementById("btnResultado");
  const divPrevio = document.getElementById("inicio");
  const divJuego = document.getElementById("juego");
  const baraja = document.getElementById("baraja");

  nombre.addEventListener("focusout", function () {
    if (nombre.value != "") {
      btnJugador.disabled = false;
    } else {
      btnJugador.disabled = true;
    }
  });

  btnJugador.addEventListener("click", function () {
    divPrevio.classList.add("transicion-Out");
    setTimeout(() => {
      divPrevio.classList.add("oculto");
      divJuego.classList.remove("oculto");
      divJuego.classList.add("transicion-In");
    }, 1500);
    setTimeout(() => {
      divJuego.classList.remove("oculto-altura");
    }, 2500);
    setTimeout(() => {
      baraja.classList.remove("baraja-Oculta");
    }, 3250);
    btnNuevaPartida.disabled = false;
    btnComodin.disabled = true;
    btnPedirCarta.disabled = true;
    btnResultado.disabled = true;
    document.getElementById("jugador").innerHTML = nombre.value;
    setTimeout(() => {
      juego();
    }, 100);
  });
}
