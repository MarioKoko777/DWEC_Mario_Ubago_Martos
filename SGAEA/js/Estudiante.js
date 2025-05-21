export class Estudiante {
  
  #id;
  #nombre;
  #edad;
  #direccion;
  #matriculas;
  #calificaciones;

  constructor(id, nombre, edad, direccion) {
    this.#id = id;
    this.#nombre = nombre;
    this.#edad = edad;
    this.#direccion = direccion;
    this.#matriculas = new Map();
    this.#calificaciones = new Map();
  }
  // Getters (encapsulación)
  get id() { return this.#id; }
  get nombre() { return this.#nombre; }
  get edad() { return this.#edad; }
  get direccion() { return this.#direccion; }
  get matriculas() { return this.#matriculas; }
  get calificaciones() { return this.#calificaciones; }
  // Setters con validación (encapsulación)
  set nombre(nuevoNombre) {
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nuevoNombre)) {
      throw new Error("El nombre solo puede contener letras y espacios");
    }
    this.#nombre = nuevoNombre;
  }
  set edad(nuevaEdad) {
    if (!/^\d+$/.test(nuevaEdad)) {
      throw new Error("La edad solo puede contener números");
    }
    this.#edad = nuevaEdad;
  }
  agregarCalificacion(idAsignatura, nota) {
    if (!this.calificaciones.has(idAsignatura)) {
      this.#calificaciones.set(idAsignatura, []);
    }
    this.#calificaciones.get(idAsignatura).push(nota);
  }
  obtenerPromedioGeneral() {
    let total = 0, count = 0;
    for (let notas of this.calificaciones.values()) {
      total += notas.reduce((a, b) => a + b, 0);
      count += notas.length;
    }
    return count === 0 ? 0 : (total / count).toFixed(2);
  }
  obtenerPromedioPorAsignatura(idAsignatura) {
    let notas = this.calificaciones.get(idAsignatura) || [];
    let suma = notas.reduce((a, b) => a + b, 0);
    return notas.length ? (suma / notas.length).toFixed(2) : 0;
  }
  toString() {
    return `${this.#nombre} (${this.#edad} años) - ${this.#direccion}`;
  }
}