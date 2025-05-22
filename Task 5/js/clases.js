/** Clase Estudiante: Representa a un estudiante con atributos y métodos asociados */
export class Estudiante {

    /** Atributos privados */
    #id;             // ID único del estudiante
    #nombre;         // Nombre del estudiante
    #direccion;      // Dirección del estudiante
    #edad;           // Edad del estudiante
    #asignaturas;    // Lista de asignaturas matriculadas
    #registro;       // Historial de matrículas y desmatrículas
    #calificaciones; // Objeto que almacena las calificaciones por asignatura

    /** Atributo estático para controlar las IDs ocupadas */
    static #numerosOcupados = [];

    /**
     * Constructor para inicializar un estudiante
     * @param {string} nombre - Nombre del estudiante
     * @param {number} edad - Edad del estudiante
     * @param {object} direccion - Objeto con información de la dirección
     */
    constructor(nombre, edad, direccion) {
        /** Generación de una ID única para el estudiante */
        let numeroId = 1;
        while (Estudiante.#numerosOcupados.includes(numeroId)) {
            numeroId++;
        }
        Estudiante.#numerosOcupados.push(numeroId);
        this.#id = "C" + numeroId;

        /** Asignación de valores con validaciones */
        this.#nombre = this.#validarNombre(nombre);
        this.#edad = this.#validarEdad(edad);
        this.#direccion = { ...direccion }; // Clonación de dirección para evitar referencias directas

        /** Inicialización de listas y objetos */
        this.#registro = [];
        this.#asignaturas = [];
        this.#calificaciones = {};
    }

    /** Getters para acceder a los atributos privados */
    get id() { return this.#id; }

    get nombre() { return this.#nombre; }

    get edad() { return this.#edad; }

    get direccion() { return { ...this.#direccion }; }

    get asignaturas() { return [...this.#asignaturas]; }

    get calificaciones() { return { ...this.#calificaciones }; }

    /** Métodos privados para validaciones */
    #validarNombre(nombre) {
        if (/^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$/.test(nombre)) {
            return nombre;
        } else {
            throw new Error("El nombre debe contener solo letras y espacios.");
        }
    }

    #validarEdad(edad) {
        if (/^\d{1,2}$/.test(edad) && Number(edad) > 0) {
            return Number(edad);
        } else {
            throw new Error("La edad debe ser un número válido mayor que cero.");
        }
    }

    /**
     * Matricula al estudiante en una asignatura
     * @param {string} asignatura - Nombre de la asignatura
     */
    matricular(asignatura) {
        if (!this.#asignaturas.includes(asignatura)) {
            this.#asignaturas.push(asignatura);
            this.#registro.push({ asignatura, tipo: "Matriculación", fecha: new Date() });
        }
    }

    /**
     * Desmatricula al estudiante de una asignatura
     * @param {string} asignatura - Nombre de la asignatura
     */
    desmatricular(asignatura) {
        const index = this.#asignaturas.indexOf(asignatura);
        if (index > -1) {
            this.#asignaturas.splice(index, 1);
            this.#registro.push({ asignatura, tipo: "Desmatriculación", fecha: new Date() });
        }
    }

    /**
     * Califica al estudiante en una asignatura
     * @param {string} asignatura - Nombre de la asignatura
     * @param {number} calificacion - Nota entre 0 y 10
     */
    calificar(asignatura, calificacion) {
        if (calificacion < 0 || calificacion > 10) {
            throw new Error("La calificación debe estar entre 0 y 10.");
        }
        if (this.#asignaturas.includes(asignatura)) {
            if (!this.#calificaciones[asignatura]) {
                this.#calificaciones[asignatura] = [];
            }
            this.#calificaciones[asignatura].push(calificacion);
        } else {
            throw new Error(`El estudiante no está matriculado en la asignatura ${asignatura}.`);
        }
    }

    /**
     * Calcula la media de las calificaciones del estudiante
     * @returns {string|number} Media de calificaciones o "Sin evaluar"
     */
    obtenerMedia() {
        const calificaciones = Object.values(this.#calificaciones).flat();
        if (calificaciones.length === 0) {
            return "Sin evaluar";
        }
        const suma = calificaciones.reduce((acc, val) => acc + val, 0);
        return (suma / calificaciones.length).toFixed(2);
    }

    /**
     * Devuelve el historial de actividades del estudiante
     * @returns {string[]} Lista de registros
     */
    obtenerRegistro() {
        return this.#registro.map(reg => {
            const fecha = reg.fecha.toLocaleDateString("es-ES");
            const hora = reg.fecha.toLocaleTimeString("es-ES");
            return `${reg.tipo} de ${reg.asignatura} el ${fecha} a las ${hora}`;
        });
    }

    /**
     * Representación textual del estudiante
     * @returns {string} Información del estudiante
     */
    toString() {
        return `${this.#nombre} (${this.#id}) tiene ${this.#edad} años.`;
    }

    /**
     * Método toJSON para serializar el objeto a JSON
     * @returns {object} Objeto con los atributos del estudiante
     * @override
     * @public
     * @memberof Estudiante
     * @instance
     * @method
     * @name toJSON
     */
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            edad: this.edad,
            direccion: this.direccion,
            asignaturas: this.asignaturas,
            calificaciones: this.calificaciones,
            registro: this.#registro // Incluimos el registro privado
        };
    }
}