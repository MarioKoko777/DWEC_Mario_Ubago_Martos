export class Estudiante {
    
    #id;
    #nombre;
    #direccion;
    #edad;
    #asignaturas;
    #registro;
    #calificaciones;
    static #numerosOcupados = [];
   
    constructor(nombre, edad, direccion) {
        let numeroId = 1;
        while (Estudiante.#numerosOcupados.includes(numeroId)) {
            numeroId++;
        }
        Estudiante.#numerosOcupados.push(numeroId);
        this.#id = "C" + numeroId;
        this.#nombre = this.#validarNombre(nombre);
        this.#edad = this.#validarEdad(edad);
        this.#direccion = { ...direccion };
        this.#registro = [];
        this.#asignaturas = [];
        this.#calificaciones = {};
    }

    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get edad() { return this.#edad; }
    get direccion() { return { ...this.#direccion }; }
    get asignaturas() { return [...this.#asignaturas]; }
    get calificaciones() { return { ...this.#calificaciones }; }

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

    matricular(asignatura) {
        if (!this.#asignaturas.includes(asignatura)) {
            this.#asignaturas.push(asignatura);
            this.#registro.push({ asignatura, tipo: "Matriculación", fecha: new Date() });
        }
    }

    desmatricular(asignatura) {
        const index = this.#asignaturas.indexOf(asignatura);
        if (index > -1) {
            this.#asignaturas.splice(index, 1);
            this.#registro.push({ asignatura, tipo: "Desmatriculación", fecha: new Date() });
        }
    }

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

    obtenerMedia() {
        const calificaciones = Object.values(this.#calificaciones).flat();
        if (calificaciones.length === 0) {
            return "Sin evaluar";
        }
        const suma = calificaciones.reduce((acc, val) => acc + val, 0);
        return (suma / calificaciones.length).toFixed(2);
    }

    obtenerRegistro() {
        return this.#registro.map(reg => {
            const fecha = reg.fecha.toLocaleDateString("es-ES");
            const hora = reg.fecha.toLocaleTimeString("es-ES");
            return `${reg.tipo} de ${reg.asignatura} el ${fecha} a las ${hora}`;
        });
    }
    
    toString() {
        return `${this.#nombre} (${this.#id}) tiene ${this.#edad} años.`;
    }
    
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            edad: this.edad,
            direccion: this.direccion,
            asignaturas: this.asignaturas,
            calificaciones: this.calificaciones,
            registro: this.#registro
        };
    }
}