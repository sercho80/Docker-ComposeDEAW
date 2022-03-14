export { Jugador, Crupier };

class Jugador {
  constructor(nombre, puntos, cartas) {
    this.nombre = nombre;
    this.puntos = puntos;
    this.cartas = cartas;
  }

  limpiar() {
    this.puntos = 0;
    this.cartas = [];
  }
}
class Crupier {
  constructor(puntos, cartas) {
    this.puntos = puntos;
    this.cartas = cartas;
  }

  limpiar() {
    this.puntos = 0;
    this.cartas = [];
  }
}
