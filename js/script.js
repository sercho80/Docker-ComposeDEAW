import { Jugador, Crupier } from "./clases.js";
export { juego };
function juego() {
  //VARIABLES
  const tiposDeCartas = ["T", "D", "C", "P"],
    cartasEspeciales = ["A", "J", "Q", "K"];
  var comodin = true,
    MazoJugador = [],
    MazoCrupier = [],
    MazoCrupierComodin = [];
  var crearMazo, mazo, jugador, crupier;

  //REFERENCIAS HTML
  const btnNuevaPartida = document.getElementById("btnNuevaPartida");
  const btnPedirCarta = document.getElementById("btnPedirCarta");
  const btnComodin = document.getElementById("btnComodin");
  const btnResultado = document.getElementById("btnResultado");

  // const divCartasCrupier = document.getElementById("cartas-crupier");
  // const divCartasJugador = document.getElementById("cartas-jugador");
  const divResultado = document.getElementById("Resultado");
  const divBaraja = document.getElementById("baraja");

  var picture = document.createElement("picture"),
    img = document.createElement("img");
  img.setAttribute("src", "./img/cartas/baraja.png");
  img.setAttribute("alt", "Baraja");

  picture.appendChild(img);
  divBaraja.appendChild(picture);

  //OBJETOS
  jugador = new Jugador(nombre.value, 0, []);
  crupier = new Crupier(0, []);

  //FUNCIONES

  //FUNCION QUE INICIA EL JUEGO, CREANDO EL MAZO, BARAJANDOLO y resetenado a los jugadores
  function inicioJuego() {
    botones();
    btnNuevaPartida.disabled = true;
    if (MazoCrupier.length != 0) {
      MazoCrupier.forEach((element) => {
        element.classList.add("nuevaPartida");
      });
    }
    if (MazoCrupierComodin.length != 0) {
      MazoCrupierComodin.forEach((element) => {
        element.classList.add("nuevaPartida");
      });
    }
    if (MazoJugador.length != 0) {
      MazoJugador.forEach((element) => {
        element.classList.add("nuevaPartida");
      });
    }
    setTimeout(() => {
      botones();
      btnPedirCarta.disabled = false;
      vaciarMesa();
      MazoCrupier = [];
      MazoCrupierComodin = [];
      MazoJugador = [];
      divResultado.innerHTML = "";
      console.log("Se ha iniciado el juego");
      mazo = [];
      jugador.limpiar();
      crupier.limpiar();
      comodin = true;
      crearMazo();
      console.log("Este es el mazo", mazo);
      barajarMazo(mazo);
      console.log("Este es el mazo barajado", mazo);
    }, 1500);
  }

  function vaciarMesa() {
    MazoJugador.forEach((element) => {
      element.parentNode.removeChild(element);
    });
    MazoCrupier.forEach((element) => {
      element.parentNode.removeChild(element);
    });
    MazoCrupierComodin.forEach((element) => {
      element.parentNode.removeChild(element);
    });
  }

  //FUNCION QUE QUITA LA ULTIMA CARTA DEL JUGADOR EN CASO DE QUE SEA LA PRIMERA VEZ QUE ESTE SE USA
  function pedirComodin() {
    if (jugador.cartas.length >= 1 && comodin) {
      btnPedirCarta.disabled = false;
      btnResultado.disabled = true;
      let j = jugador.cartas[jugador.cartas.length - 1].substring(0, 1);
      switch (j) {
        case "A":
          jugador.puntos -= 14;
          break;
        case "J":
          jugador.puntos -= 11;
          break;
        case "Q":
          jugador.puntos -= 12;
          break;
        case "K":
          jugador.puntos -= 13;
          break;
        default:
          jugador.puntos -= parseInt(jugador.cartas[jugador.cartas.length - 1]);
          break;
      }
      console.log(
        "El comodin quita: " + jugador.cartas[jugador.cartas.length - 1]
      );
      jugador.cartas.pop();
      picture.removeChild(MazoJugador[MazoJugador.length - 1]);
      MazoJugador.pop();
      comodin = false;
      btnComodin.disabled = true;
    } else {
      console.log("No hay comodin o no se puede usar");
    }
  }

  /*  1. crearMazo 
    Es una función flecha que llena el array de cartas. 
    El resultado es un array de cartas ordenado.*/

  crearMazo = () => {
    for (let i = 0; i < tiposDeCartas.length; i++) {
      for (let j = 1; j <= 13; j++) {
        switch (j) {
          case 1:
            mazo.push(cartasEspeciales[0] + tiposDeCartas[i]);
            break;
          case 11:
            mazo.push(cartasEspeciales[1] + tiposDeCartas[i]);
            break;
          case 12:
            mazo.push(cartasEspeciales[2] + tiposDeCartas[i]);
            break;
          case 13:
            mazo.push(cartasEspeciales[3] + tiposDeCartas[i]);
            break;
          default:
            mazo.push(j + tiposDeCartas[i]);
            break;
        }
      }
    }
  };

  /*  2. barajarMazo
    El resultado es el array de cartas desordenadas con el que vamos a jugar */

  function barajarMazo(array) {
    //SE CREA UN ARRAY AUXILIAR AL QUE SE LE IRAN PASANDO LAS CARTAS DEL MAZO ALEATORIAMENTE, LUEGO EL MAZO SE REASIGNARA CON EL ARRAY AUXILIAR
    let nCartas = array.length;
    let aux = [];
    for (let i = 0; i < nCartas; i++) {
      let aleatorio = parseInt(Math.random() * mazo.length);
      aux.push(mazo[aleatorio]);
      mazo.splice(aleatorio, 1);
    }
    mazo = aux;
  }

  /*  3. pedirCarta 
    Esta función permite devolver una carta de la baraja de cartas. 
    La elección de la carta será a vuestro criterio.
    La carta ya no estará en el mazo de cartas.
   */
  function pedirCarta() {
    btnPedirCarta.disabled = true;
    if (!comodin) btnComodin.disabled = true;
    else btnComodin.disabled = false;
    let numeroCarta, palo;
    if (jugador.cartas.length <= 4) {
      let aleatorio = parseInt(Math.random() * mazo.length);
      jugador.cartas.push(mazo[aleatorio]);
      console.log("Jugador coge la carta: ", mazo[aleatorio]);
      numeroCarta = mazo[aleatorio].substring(0, 1);
      palo = mazo[aleatorio].substring(1);
      img = document.createElement("img");
      switch (numeroCarta) {
        case "A":
          jugador.puntos += 14;
          img.setAttribute("src", `./img/cartas/A${palo}.png`);
          img.setAttribute("alt", `A${palo}`);
          break;
        case "J":
          jugador.puntos += 11;
          img.setAttribute("src", `./img/cartas/J${palo}.png`);
          img.setAttribute("alt", `J${palo}`);
          break;
        case "Q":
          jugador.puntos += 12;
          img.setAttribute("src", `./img/cartas/Q${palo}.png`);
          img.setAttribute("alt", `Q${palo}`);
          break;
        case "K":
          jugador.puntos += 13;
          img.setAttribute("src", `./img/cartas/K${palo}.png`);
          img.setAttribute("alt", `K${palo}`);
          break;
        default:
          jugador.puntos += parseInt(mazo[aleatorio]);
          img.setAttribute("src", `./img/cartas/${mazo[aleatorio]}.png`);
          img.setAttribute("alt", `${mazo[aleatorio]}`);
          break;
      }

      picture.appendChild(img);
      setTimeout(() => {
        img.classList.add("carta-jugador");
        img.style.translate = 30 * MazoJugador.length + "px";
      }, 250);
      MazoJugador.push(img);
      mazo.splice(aleatorio, 1);
      setTimeout(() => {
        if (parseInt(Math.random() * 2) == 0) {
          aleatorio = parseInt(Math.random() * mazo.length);
          crupier.cartas.push(mazo[aleatorio]);
          console.log("Crupier coge la carta: ", mazo[aleatorio]);
          numeroCarta = mazo[aleatorio].substring(0, 1);
          palo = mazo[aleatorio].substring(1);
          let img2 = document.createElement("img");
          switch (numeroCarta) {
            case "A":
              crupier.puntos += 14;
              img2.setAttribute("src", `./img/cartas/A${palo}.png`);
              img2.setAttribute("alt", `A${palo}`);
              break;
            case "J":
              crupier.puntos += 11;
              img2.setAttribute("src", `./img/cartas/J${palo}.png`);
              img2.setAttribute("alt", `J${palo}`);
              break;
            case "Q":
              crupier.puntos += 12;
              img2.setAttribute("src", `./img/cartas/Q${palo}.png`);
              img2.setAttribute("alt", `Q${palo}`);
              break;
            case "K":
              crupier.puntos += 13;
              img2.setAttribute("src", `./img/cartas/K${palo}.png`);
              img2.setAttribute("alt", `K${palo}`);
              break;
            default:
              crupier.puntos += parseInt(mazo[aleatorio]);
              img2.setAttribute("src", `./img/cartas/${mazo[aleatorio]}.png`);
              img2.setAttribute("alt", `${mazo[aleatorio]}`);
              break;
          }
          picture.appendChild(img2);
          setTimeout(() => {
            img2.classList.add("carta-crupier");
            img2.style.translate = 30 * MazoCrupier.length + "px";
          }, 250);
          MazoCrupier.push(img2);
          let imgcomodin = document.createElement("img");
          imgcomodin.setAttribute("src", `./img/cartas/comodin.png`);
          imgcomodin.setAttribute("alt", `Comodin`);
          picture.appendChild(imgcomodin);
          setTimeout(() => {
            imgcomodin.classList.add("carta-crupier");
            imgcomodin.style.translate = 30 * MazoCrupierComodin.length + "px";
            imgcomodin.style.zIndex = 10;
          }, 250);
          MazoCrupierComodin.push(imgcomodin);
          mazo.splice(aleatorio, 1);
        } else {
          console.log("El Crupier no coge carta");
        }
      }, 300);
      setTimeout(() => {
        if (jugador.cartas.length <= 4) {
          btnPedirCarta.disabled = false;
        }
        if (jugador.cartas.length == 5) {
          btnResultado.disabled = false;
        }
      }, 500);
    } else {
      console.log("Ya no se pueden coger mas cartas");
      // btnResultado.disabled = false;
      // btnPedirCarta.disabled = true;
    }
  }

  /*  4. resolverJuego
   */

  function resolverJuego() {
    //Se comprueba si jugador o crupier tienen as y en caso de que ambos tengan se comprueban los puntos
    if (jugador.cartas.length == 5) {
      MazoCrupierComodin.forEach((element) => {
        element.parentNode.removeChild(element);
      });
      MazoCrupierComodin = [];
      botones();
      // btnPedirCarta.disabled
      let mazoJugador = jugador.cartas.toString(),
        mazoCrupier = crupier.cartas.toString();
      console.log(mazoJugador, " asdasd ", mazoCrupier);
      let ganador = "Empate";
      if (mazoJugador.indexOf("A") == -1 && mazoCrupier.indexOf("A") == -1) {
        divResultado.innerHTML =
          "Ninguno tiene as, el juego se vuelve a iniciar";
        // inicioJuego();
      } else {
        if (mazoJugador.indexOf("A") >= 0) {
          if (mazoCrupier.indexOf("A") >= 0) {
            if (jugador.puntos < crupier.puntos) {
              ganador = "Jugador";
            } else if (jugador.puntos > crupier.puntos) {
              ganador = "Crupier";
            }
          } else {
            ganador = "Jugador";
          }
        }

        if (mazoCrupier.indexOf("A") >= 0) {
          if (mazoJugador.indexOf("A") == -1) {
            ganador = "Crupier";
          }
        }

        divResultado.innerHTML =
          "El jugador tiene: " +
          jugador.puntos +
          " puntos<br/>El Crupier tiene: " +
          crupier.puntos +
          " puntos<br/>El Ganador es: " +
          ganador;
      }
    } else {
      console.log("Aun no se puede resolver");
    }
  }

  function botones() {
    btnComodin.disabled = true;
    btnNuevaPartida.disabled = false;
    btnPedirCarta.disabled = true;
    btnResultado.disabled = true;
  }

  //EVENTOS
  btnNuevaPartida.onclick = inicioJuego;
  btnPedirCarta.onclick = pedirCarta;
  btnComodin.onclick = pedirComodin;
  btnResultado.onclick = resolverJuego;

  window.addEventListener("DOMContentLoaded", (event) => {
    const audio = document.querySelector("audio");
    audio.volume = 1;
    audio.play();
  });
}
