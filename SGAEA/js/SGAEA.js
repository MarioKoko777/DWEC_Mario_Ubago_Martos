import { Estudiante } from './Estudiante.js';
import { Asignatura, AsignaturaOptativa } from './Asignatura.js';

/**
 * Clase principal del sistema de gestión académica
 * @class SGAEA
 */
export class SGAEA {
  // ENCAPSULACIÓN: Propiedades privadas
  #estudiantes;
  #asignaturas;

  constructor() {
    this.#estudiantes = new Map();
    this.#asignaturas = new Map();
  }
  // ENCAPSULACIÓN: Getter para estudiantes (solo lectura)
  get estudiantes() {
    return new Map(this.#estudiantes);
  }
  // ENCAPSULACIÓN: Getter para asignaturas (solo lectura)
  get asignaturas() {
    return new Map(this.#asignaturas);
  }

  /**
   * Inserta un nuevo estudiante en el sistema
   * @param {number} id - ID único del estudiante
   * @param {string} nombre - Nombre del estudiante
   * @param {number} edad - Edad del estudiante
   * @param {string} calle - Calle de la dirección
   * @param {string|number} numero - Número de la dirección
   * @param {string|number|null} piso - Piso (opcional)
   * @param {string} cp - Código postal
   * @param {string} provincia - Provincia
   * @param {string} localidad - Localidad
   * @throws {Error} Si el ID ya existe o los datos son inválidos
   */
  insertaEstudiante(id, nombre, edad, calle, numero, piso, cp, provincia, localidad) {
    // ENCAPSULACIÓN: Validación dentro del método
    if (this.#estudiantes.has(id)) {
      throw new Error(`El estudiante con ID ${id} ya existe`);
    }
    const direccion = { calle, numero, piso, cp, provincia, localidad };
    this.#estudiantes.set(id, new Estudiante(id, nombre, edad, direccion));
  }

  /**
   * Elimina un estudiante del sistema
   * @param {number} idEstudiante - ID del estudiante a eliminar
   * @throws {Error} Si el estudiante no existe
   */
  eliminaEstudiante(idEstudiante) {
    if (!this.#estudiantes.has(idEstudiante)) {
      throw new Error(`Estudiante con ID ${idEstudiante} no encontrado`);
    }
    this.#estudiantes.delete(idEstudiante);
  }

  /**
   * HERENCIA Y POLIMORFISMO: Crea una asignatura normal u optativa
   * @param {number} id - ID de la asignatura
   * @param {string} nombre - Nombre de la asignatura
   * @param {string} curso - Curso al que pertenece
   * @param {number|null} [creditos=null] - Créditos (para optativas)
   * @throws {Error} Si el ID ya existe
   */
  creaAsignatura(id, nombre, curso, creditos) {
    if (this.#asignaturas.has(id)) {
      throw new Error(`La asignatura con ID ${id} ya existe`);
    }else{
      // HERENCIA: Creación de diferente tipo según parámetros
      let asignatura;
      if(creditos == null) {
        asignatura = new Asignatura(id, nombre, curso);
      }else{
         asignatura = new AsignaturaOptativa(id, nombre, curso, creditos)
      }
      this.#asignaturas.set(id, asignatura);  
    }
    
  }

  /**
   * Elimina una asignatura del sistema
   * @param {number} idAsignatura - ID de la asignatura a eliminar
   * @throws {Error} Si la asignatura no existe
   */
  eliminaAsignatura(idAsignatura) {
    if (!this.#asignaturas.has(idAsignatura)) {
      throw new Error(`Asignatura con ID ${idAsignatura} no encontrada`);
    }
    // Desmatricular a todos los estudiantes primero
    for (const estudiante of this.#estudiantes.values()) {
      if (estudiante.matriculas.has(idAsignatura)) {
        this.desMatriculaEstudiante(estudiante.id, idAsignatura);
      }
    }
    this.#asignaturas.delete(idAsignatura);
  }

  /**
   * SOBRECARGA: Busca estudiantes y/o asignaturas
   * Versión 1: Búsqueda general
   * @param {string} texto - Texto a buscar
   * @returns {Object} Objeto con estudiantes y asignaturas encontradas
   */
  busca(texto) {
    return {
      estudiantes: this.#buscaEstudiantes(texto),
      asignaturas: this.#buscaAsignaturas(texto)
    };
  }

  /**
   * SOBRECARGA: Busca estudiantes
   * Versión 2: Búsqueda específica de estudiantes
   * @param {string} texto - Texto a buscar en nombres
   * @returns {Array} Estudiantes encontrados
   */
  buscaEstudiante(texto) {
    return this.#buscaEstudiantes(texto);
  }

  /**
   * ENCAPSULACIÓN: Método privado para buscar estudiantes
   * @private
   */
  #buscaEstudiantes(texto) {
    return [...this.#estudiantes.values()].filter(e => 
      e.nombre.toLowerCase().includes(texto.toLowerCase())
    );
  }

  /**
   * SOBRECARGA: Busca asignaturas
   * Versión 2: Búsqueda específica de asignaturas
   * @param {string} nombre - Texto a buscar en nombres
   * @returns {Array} Asignaturas encontradas
   */
  buscaAsignatura(nombre) {
    return this.#buscaAsignaturas(nombre);
  }

  /**
   * ENCAPSULACIÓN: Método privado para buscar asignaturas
   * @private
   */
  #buscaAsignaturas(texto) {
    return [...this.#asignaturas.values()].filter(a => 
      a.nombre.toLowerCase().includes(texto.toLowerCase())
    );
  }

  /**
   * Matricula un estudiante en una asignatura
   * @param {number} idEstudiante - ID del estudiante
   * @param {number} idAsignatura - ID de la asignatura
   * @throws {Error} Si estudiante/asignatura no existen o ya está matriculado
   */
  matriculaEstudiante(idEstudiante, idAsignatura) {
    const estudiante = this.#estudiantes.get(idEstudiante);
    if (!estudiante) {
      throw new Error(`Estudiante con ID ${idEstudiante} no encontrado`);
    }
    if (!this.#asignaturas.has(idAsignatura)) {
      throw new Error(`Asignatura con ID ${idAsignatura} no encontrada`);
    }
    if (estudiante.matriculas.has(idAsignatura)) {
      throw new Error(`El estudiante ya está matriculado en esta asignatura`);
    }
    estudiante.matriculas.set(idAsignatura, new Date().toLocaleDateString('es-ES'));
  }

  /**
   * Desmatricula un estudiante de una asignatura
   * @param {number} idEstudiante - ID del estudiante
   * @param {number} idAsignatura - ID de la asignatura
   * @throws {Error} Si no existe la matrícula o el estudiante
   */
  desMatriculaEstudiante(idEstudiante, idAsignatura) {
    const estudiante = this.#estudiantes.get(idEstudiante);
    if (!estudiante) {
      throw new Error(`Estudiante con ID ${idEstudiante} no encontrado`);
    }
    if (!estudiante.matriculas.has(idAsignatura)) {
      throw new Error(`El estudiante no está matriculado en esta asignatura`);
    }
    estudiante.matriculas.delete(idAsignatura);
    estudiante.calificaciones.delete(idAsignatura);
  }

  /**
   * Asigna una calificación a un estudiante en una asignatura
   * @param {number} idEstudiante - ID del estudiante
   * @param {number} idAsignatura - ID de la asignatura
   * @param {number} nota - Calificación (0-10)
   * @throws {Error} Si los datos son inválidos
   */
  califica(idEstudiante, idAsignatura, nota) {
    if (nota < 0 || nota > 10) {
      throw new Error('La nota debe estar entre 0 y 10');
    }
    const estudiante = this.#estudiantes.get(idEstudiante);
    if (!estudiante) {
      throw new Error(`Estudiante con ID ${idEstudiante} no encontrado`);
    }
    if (!this.#asignaturas.has(idAsignatura)) {
      throw new Error(`Asignatura con ID ${idAsignatura} no encontrada`);
    }
    if (!estudiante.matriculas.has(idAsignatura)) {
      throw new Error(`El estudiante no está matriculado en esta asignatura`);
    }
    estudiante.agregarCalificacion(idAsignatura, nota);
  }

  /**
   * SOBRECARGA: Obtiene promedios
   * Versión 1: Promedio general de un estudiante
   * @param {number} idEstudiante - ID del estudiante
   * @returns {number} Promedio general
   */
  promedioAsignaturasEstudiante(idEstudiante) {
    const estudiante = this.#estudiantes.get(idEstudiante);
    if (!estudiante) {
      throw new Error(`Estudiante con ID ${idEstudiante} no encontrado`);
    }
    return estudiante.obtenerPromedioGeneral();
  }

  /**
   * SOBRECARGA: Obtiene promedios
   * Versión 2: Promedio en una asignatura específica
   * @param {number} idEstudiante - ID del estudiante
   * @param {number} idAsignatura - ID de la asignatura
   * @returns {number} Promedio en la asignatura
   */
  promedioAsignaturaEstudiante(idEstudiante, idAsignatura) {
    const estudiante = this.#estudiantes.get(idEstudiante);
    if (!estudiante) {
      throw new Error(`Estudiante con ID ${idEstudiante} no encontrado`);
    }

    if (!this.#asignaturas.has(idAsignatura)) {
      throw new Error(`Asignatura con ID ${idAsignatura} no encontrada`);
    }

    return estudiante.obtenerPromedioPorAsignatura(idAsignatura);
  }

  /**
   * Genera un informe general de un estudiante o de todos los estudiantes.
   * 
   * @param {string|null} idEstudiante - El ID del estudiante. Si es `null`, genera el informe de todos los estudiantes.
   * @returns {string} El informe general del estudiante o de todos los estudiantes.
   * @throws {Error} Si el estudiante no existe.
   */
  informeGeneral(idEstudiante = null) {
    if (idEstudiante) {
      const e = this.estudiantes.get(idEstudiante);
      if (!e) throw new Error(`Estudiante con ID ${idEstudiante} no encontrado.`);
      let texto = `\n🧑 Nombre: ${e.nombre}\n`;
      texto += `📚 Asignaturas matriculadas:\n`;
      if (e.matriculas.size === 0) {
        texto += `  - No está matriculado en ninguna asignatura.\n`;
      } else {
        for (let [id, fecha] of e.matriculas.entries()) {
          const asig = this.asignaturas.get(id);
          const nombreAsig = asig ? asig.nombre : `ID: ${id}`;
          texto += `  - ${nombreAsig} (ID: ${id}), Fecha: ${fecha}\n`;
        }
      }
      texto += `📝 Calificaciones:\n`;
      if (e.calificaciones.size === 0) {
        texto += `  - No hay calificaciones registradas.\n`;
      } else {
        for (let [idAsig, notas] of e.calificaciones.entries()) {
          const asig = this.asignaturas.get(idAsig);
          const nombreAsig = asig ? asig.nombre : `ID: ${idAsig}`;
          texto += `  - ${nombreAsig} (ID: ${idAsig}) → Notas: ${notas.join(", ")}\n`;
        }
      }
      texto += `📊 Promedio general: ${e.obtenerPromedioGeneral()}\n`;
      return texto;
    } else {
      if (this.estudiantes.size === 0) {
        return "No hay estudiantes registrados.";
      }
      return [...this.estudiantes.values()]
        .map(e => this.informeGeneral(e.id))
        .join("\n---------------------------------\n");
    }
  }

  /**
   * Genera un listado de estudiantes
   * @returns {string} Listado formateado
   */
  listadoEstudiantes() {
    if (this.estudiantes.size === 0) {
      throw new Error("No hay estudiantes registrados.");
    }
    return [...this.estudiantes.values()]
      .map(e => {
        const dir = e.direccion;
        return `🧑 ID: ${e.id}\n` +
              `   Nombre: ${e.nombre}\n` +
              `   Edad: ${e.edad}\n` +
              `   Dirección: ${dir.calle}, Nº ${dir.numero}, Piso ${dir.piso}, ${dir.cp} ${dir.localidad} (${dir.provincia})`;
      })
      .join("\n---------------------------------\n");
  }

  /**
   * Genera un listado de asignaturas
   * @returns {string} Listado formateado
   */
  listadoAsignaturas() {
    if (this.asignaturas.size === 0) {
      throw new Error("No hay asignaturas registradas.");
    }
    return [...this.asignaturas.values()]
      .map(a => {
        return `📘 ID: ${a.id}\n` +
              `   Nombre: ${a.nombre}\n` +
              `   Curso: ${a.curso}`;
      })
      .join("\n---------------------------------\n");
  }

  /**
   * Genera un listado de matrículas
   * @returns {string} Listado formateado
   */
  listadoMatriculas() {
    if (this.estudiantes.size === 0) {
      throw new Error("No hay estudiantes registrados.");
    }
    const salida = [...this.estudiantes.values()]
      .map(est => {
        let texto = `🧑 Estudiante: ${est.nombre} (ID: ${est.id})\n`;
        if (est.matriculas.size === 0) {
          texto += `   - No está matriculado en ninguna asignatura.`;
        } else {
          texto += `   📚 Asignaturas matriculadas:\n`;
          for (let [idAsig, fecha] of est.matriculas.entries()) {
            const asig = this.asignaturas.get(idAsig);
            const nombreAsig = asig ? asig.nombre : `ID: ${idAsig}`;
            texto += `     - ${nombreAsig} (ID: ${idAsig}), Fecha: ${fecha}\n`;
          }
        }
        return texto.trim();
      })
      .join("\n---------------------------------\n");
    return salida;
  }
}