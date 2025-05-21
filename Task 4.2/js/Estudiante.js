/**
 * Clase que representa a un estudiante con sus datos personales, matriculaciones y calificaciones.
 * Utiliza propiedades privadas para encapsular los datos y Map para gestionar relaciones.
 */
export class Estudiante {
  
  #id;
  #nombre;
  #edad;
  #direccion;
  #matriculas;
  #calificaciones;

  /**
   * Crea una instancia de Estudiante.
   * @param {string} id - Identificador único del estudiante.
   * @param {string} nombre - Nombre completo del estudiante.
   * @param {number|string} edad - Edad del estudiante (puede ser número o cadena numérica).
   * @param {string} direccion - Dirección del estudiante.
   */
  constructor(id, nombre, edad, direccion) {
    this.#id = id;
    this.#nombre = nombre;
    this.#edad = edad;
    this.#direccion = direccion;
    this.#matriculas = new Map();
    this.#calificaciones = new Map();
  }

  // Getters (encapsulación)
  /**
   * @returns {string} El identificador único del estudiante.
   */
  get id() { return this.#id; }
  
  /**
   * @returns {string} El nombre completo del estudiante.
   */
  get nombre() { return this.#nombre; }
  
  /**
   * @returns {number|string} La edad del estudiante.
   */
  get edad() { return this.#edad; }
  
  /**
   * @returns {string} La dirección del estudiante.
   */
  get direccion() { return this.#direccion; }
  
  /**
   * @returns {Map} Mapa de matriculaciones del estudiante (asignaturaId -> datos).
   */
  get matriculas() { return this.#matriculas; }
  
  /**
   * @returns {Map} Mapa de calificaciones del estudiante (asignaturaId -> array de notas).
   */
  get calificaciones() { return this.#calificaciones; }

  // Setters con validación (encapsulación)
  /**
   * Establece un nuevo nombre para el estudiante.
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
   * Establece una nueva edad para el estudiante.
   * @param {number|string} nuevaEdad - Nueva edad a asignar (debe ser numérica).
   * @throws {Error} Si la edad contiene caracteres no numéricos.
   */
  set edad(nuevaEdad) {
    if (!/^\d+$/.test(nuevaEdad)) {
      throw new Error("La edad solo puede contener números");
    }
    this.#edad = nuevaEdad;
  }

  /**
   * Añade una nueva calificación para una asignatura.
   * @param {string} idAsignatura - Identificador de la asignatura.
   * @param {number} nota - Calificación obtenida (0-10 o equivalente).
   */
  agregarCalificacion(idAsignatura, nota) {
    if (!this.calificaciones.has(idAsignatura)) {
      this.#calificaciones.set(idAsignatura, []);
    }
    this.#calificaciones.get(idAsignatura).push(nota);
  }

  /**
   * Calcula el promedio general de todas las calificaciones del estudiante.
   * @returns {string} Promedio general formateado con 2 decimales (0 si no hay calificaciones).
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
   * Calcula el promedio de calificaciones para una asignatura específica.
   * @param {string} idAsignatura - Identificador de la asignatura.
   * @returns {string} Promedio de la asignatura formateado con 2 decimales (0 si no hay calificaciones).
   */
  obtenerPromedioPorAsignatura(idAsignatura) {
    let notas = this.calificaciones.get(idAsignatura) || [];
    let suma = notas.reduce((a, b) => a + b, 0);
    return notas.length ? (suma / notas.length).toFixed(2) : 0;
  }

  /**
   * Devuelve una representación en cadena del estudiante.
   * @returns {string} Cadena con formato "Nombre (Edad años) - Dirección".
   */
  toString() {
    return `${this.#nombre} (${this.#edad} años) - ${this.#direccion}`;
  }
}