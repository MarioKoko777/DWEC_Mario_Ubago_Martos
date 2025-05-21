import { Asignatura } from './Asignatura.js';
// HERENCIA: AsignaturaOptativa extiende Asignatura
/**
 * Clase que representa una asignatura optativa, heredando de Asignatura.
 * Añade información sobre créditos además de los atributos base.
 */
export class AsignaturaOptativa extends Asignatura {
  // # indica propiedad privada (encapsulación)
  #creditos;

  /**
   * Crea una instancia de AsignaturaOptativa.
   * @param {string} id - Identificador único de la asignatura.
   * @param {string} nombre - Nombre de la asignatura.
   * @param {string} curso - Curso al que pertenece la asignatura.
   * @param {number} creditos - Número de créditos de la asignatura (debe ser positivo).
   */
  constructor(id, nombre, curso, creditos) {
    super(id, nombre, curso); // Llamada al constructor padre (herencia)
    this.#creditos = creditos;
  }

  // Getters (encapsulación)
  /**
   * @returns {number} El número de créditos de la asignatura optativa.
   */
  get creditos() { return this.#creditos; }
  
  // Setters con validación (encapsulación)
  /**
   * Establece un nuevo valor para los créditos de la asignatura.
   * @param {number} valor - Nuevo número de créditos (debe ser positivo).
   * @throws {Error} Si el valor no es un número positivo.
   */
  set creditos(valor) {
    if (typeof valor !== 'number' || valor <= 0) {
      throw new Error("Los créditos deben ser un número positivo");
    }
      this.#creditos = valor;
  }

  /**
   * Devuelve una representación en cadena de la asignatura optativa.
   * Sobrescribe el método toString() de la clase padre.
   * @returns {string} Cadena que representa la asignatura en formato "Nombre (Curso) - X créditos".
   */
  toString() {
    return `${super.toString()} - ${this.#creditos} créditos`;
  }
}