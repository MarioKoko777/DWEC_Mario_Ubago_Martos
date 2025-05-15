/**
 * Representa a un estudiante con su información personal, matrículas y calificaciones.
 */
export class Estudiante {
  /**
   * Crea una instancia de la clase Estudiante.
   * @param {string} id - El ID único del estudiante.
   * @param {string} nombre - El nombre del estudiante.
   * @param {number} edad - La edad del estudiante.
   * @param {Object} direccion - La dirección del estudiante.
   * @param {string} direccion.calle - La calle de la dirección.
   * @param {string} direccion.numero - El número de la dirección.
   * @param {string} direccion.piso - El piso de la dirección.
   * @param {string} direccion.cp - El código postal de la dirección.
   * @param {string} direccion.provincia - La provincia de la dirección.
   * @param {string} direccion.localidad - La localidad de la dirección.
   */
  constructor(id, nombre, edad, direccion) {
    /** @type {string} */
    this.id = id;
    /** @type {string} */
    this.nombre = nombre;
    /** @type {number} */
    this.edad = edad;
    /** @type {Object} */
    this.direccion = direccion;
    /** @type {Map<string, string>} */
    this.matriculas = new Map();
    /** @type {Map<string, number[]>} */
    this.calificaciones = new Map();
  }
  /**
   * Agrega una calificación a una asignatura del estudiante.
   * @param {string} idAsignatura - El ID de la asignatura.
   * @param {number} nota - La calificación obtenida en la asignatura.
   */
  agregarCalificacion(idAsignatura, nota) {
    if (!this.calificaciones.has(idAsignatura)) {
      this.calificaciones.set(idAsignatura, []);
    }
    this.calificaciones.get(idAsignatura).push(nota);
  }
  /**
   * Obtiene el promedio general de todas las calificaciones del estudiante.
   * @returns {string} El promedio general de las calificaciones del estudiante, redondeado a dos decimales.
   */
  obtenerPromedioGeneral() {
    let total = 0, count = 0;
    for (let notas of this.calificaciones.values()) {
      total += notas.reduce((a, b) => a + b, 0);
      count += notas.length;
    }
    return count === 0 ? 0 : (total / count).toFixed(2);
  }
  /**
   * Obtiene el promedio de las calificaciones de una asignatura específica.
   * @param {string} idAsignatura - El ID de la asignatura.
   * @returns {string} El promedio de las calificaciones en la asignatura, redondeado a dos decimales.
   */
  obtenerPromedioPorAsignatura(idAsignatura) {
    let notas = this.calificaciones.get(idAsignatura) || [];
    let suma = notas.reduce((a, b) => a + b, 0);
    return notas.length ? (suma / notas.length).toFixed(2) : 0;
  }
}
