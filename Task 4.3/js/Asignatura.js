/**
 * Representa una asignatura en el sistema académico.
 */
export class Asignatura {
  /**
   * Crea una nueva instancia de Asignatura.
   * @param {number} id - Identificador único de la asignatura.
   * @param {string} nombre - Nombre de la asignatura.
   * @param {string} curso - Curso o nivel educativo al que pertenece.
   */
  constructor(id, nombre, curso) {
    /** @type {number} */
    this.id = id;
    /** @type {string} */
    this.nombre = nombre;
    /** @type {string} */
    this.curso = curso;
  }
}