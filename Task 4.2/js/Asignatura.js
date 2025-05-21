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