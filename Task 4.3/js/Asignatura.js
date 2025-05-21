// CLASE BASE: Asignatura (usando encapsulación con propiedades privadas)
/**
 * Clase que representa una asignatura académica.
 * Utiliza propiedades privadas para encapsular los datos.
 */
export class Asignatura {
  // # indica propiedad privada (encapsulación)
  #id;
  #nombre;
  #curso;

  /**
   * Crea una instancia de Asignatura.
   * @param {string} id - Identificador único de la asignatura.
   * @param {string} nombre - Nombre de la asignatura (solo letras y espacios).
   * @param {string} curso - Curso al que pertenece la asignatura.
   */
  constructor(id, nombre, curso) {
    this.#id = id;
    this.#nombre = nombre;
    this.#curso = curso;
  }

  // Getters (encapsulación)
  /**
   * @returns {string} El identificador único de la asignatura.
   */
  get id() { return this.#id; }
  
  /**
   * @returns {string} El nombre de la asignatura.
   */
  get nombre() { return this.#nombre; }
  
  /**
   * @returns {string} El curso al que pertenece la asignatura.
   */
  get curso() { return this.#curso; }

  // Setters con validación (encapsulación)
  /**
   * Establece un nuevo nombre para la asignatura.
   * @param {string} nuevoNombre - Nuevo nombre a asignar (solo letras y espacios).
   * @throws {Error} Si el nombre contiene caracteres no permitidos.
   */
  set nombre(nuevoNombre) {
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nuevoNombre)) {
      throw new Error("El nombre solo puede contener letras y espacios");
    }
    this.#nombre = nuevoNombre;
  }

  /**
   * Devuelve una representación en cadena de la asignatura.
   * @returns {string} Cadena que representa la asignatura en formato "Nombre (Curso)".
   */
  toString() {
    return `${this.nombre} (${this.curso})`;
  }
}