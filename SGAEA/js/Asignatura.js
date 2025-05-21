// CLASE BASE: Asignatura (usando encapsulación con propiedades privadas)
export class Asignatura {
  // # indica propiedad privada (encapsulación)
  #id;
  #nombre;
  #curso;

  constructor(id, nombre, curso) {
    this.#id = id;
    this.#nombre = nombre;
    this.#curso = curso;
  }

  // Getters (encapsulación)
  get id() { return this.#id; }
  get nombre() { return this.#nombre; }
  get curso() { return this.#curso; }

  // Setters con validación (encapsulación)
  set nombre(nuevoNombre) {
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nuevoNombre)) {
      throw new Error("El nombre solo puede contener letras y espacios");
    }
    this.#nombre = nuevoNombre;
  }
  toString() {
    return `${this.nombre} (${this.curso})`;
  }
}
// HERENCIA: AsignaturaOptativa extiende Asignatura
export class AsignaturaOptativa extends Asignatura {
  // # indica propiedad privada (encapsulación)
  #creditos;

  constructor(id, nombre, curso, creditos) {
    super(id, nombre, curso); // Llamada al constructor padre (herencia)
    this.#creditos = creditos;
  }

  // Getters (encapsulación)
  get creditos() { return this.#creditos; }
  
  // Setters con validación (encapsulación)
  set creditos(valor) {
    if (typeof valor !== 'number' || valor <= 0) {
      throw new Error("Los créditos deben ser un número positivo");
    }
      this.#creditos = valor;
  }
  // SOBRECARGA: Método toString() con comportamiento extendido
  toString() {
    return `${super.toString()} - ${this.#creditos} créditos`;
  }

}