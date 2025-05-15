import { Estudiante } from './Estudiante.js';
import { Asignatura } from './Asignatura.js';

/**
 * Clase principal que gestiona estudiantes y asignaturas en el sistema SGAEA.
 */
export class SGAEA {
  /**
   * Crea una nueva instancia del sistema de gestión académica.
   */
  constructor() {
    /** @type {Map<string, Estudiante>} */
    this.estudiantes = new Map();
    /** @type {Map<string, Asignatura>} */
    this.asignaturas = new Map();
  }
  /**
   * Inserta un nuevo estudiante en el sistema.
   * 
   * @param {string} id - El ID único del estudiante.
   * @param {string} nombre - El nombre del estudiante.
   * @param {number} edad - La edad del estudiante.
   * @param {string} calle - La calle de la dirección del estudiante.
   * @param {string} numero - El número de la dirección del estudiante.
   * @param {string} piso - El piso de la dirección del estudiante.
   * @param {string} cp - El código postal de la dirección del estudiante.
   * @param {string} provincia - La provincia de la dirección del estudiante.
   * @param {string} localidad - La localidad de la dirección del estudiante.
   * @throws {Error} Si el ID del estudiante ya existe.
   */
  insertaEstudiante(id, nombre, edad, calle, numero, piso, cp, provincia, localidad) {
    if (this.estudiantes.has(id)) {
      throw new Error("ID duplicado");
    }
    const direccion = { calle, numero, piso, cp, provincia, localidad };
    this.estudiantes.set(id, new Estudiante(id, nombre, edad, direccion));
  }
  /**
   * Elimina un estudiante del sistema por su ID.
   * 
   * @param {string} idEstudiante - El ID del estudiante a eliminar.
   * @throws {Error} Si no se encuentra un estudiante con el ID proporcionado.
   */
  eliminaEstudiante(idEstudiante) {
    let est = this.estudiantes.get(idEstudiante);
    if (!est) {
      throw new Error("ID no encontrado");
    } else {
      this.estudiantes.delete(idEstudiante);
    }
  }
  /**
   * Elimina una asignatura del sistema por su ID.
   * Si hay estudiantes matriculados en la asignatura, se desmatriculan.
   * 
   * @param {string} idAsignatura - El ID de la asignatura a eliminar.
   * @throws {Error} Si la asignatura no se encuentra.
   */
  eliminaAsignatura(idAsignatura) {
    const asig = this.asignaturas.get(idAsignatura);
    if (!asig) {
      throw new Error("Asignatura no encontrada");
    }
    for (let estudiante of this.estudiantes.values()) {
      if (estudiante.matriculas.has(idAsignatura)) {
        this.desMatriculaEstudiante(estudiante.id, idAsignatura);
      }
    }
    this.asignaturas.delete(idAsignatura);
  }
  /**
   * Busca estudiantes que coincidan con un texto en su nombre.
   * 
   * @param {string} texto - Texto para buscar en los nombres de los estudiantes.
   * @returns {string} El listado de estudiantes que coinciden con el texto de búsqueda.
   * @throws {Error} Si no se encuentran estudiantes que coincidan con el texto.
   */
  buscaEstudiante(texto) {
    const estudiantesEncontrados = [...this.estudiantes.values()]
      .filter(e => e.nombre.toLowerCase().includes(texto.toLowerCase()));
    if (estudiantesEncontrados.length === 0) {
      throw new Error (`No se encontraron estudiantes que coincidan con "${texto}".`);
    }else {
      let textoResultado = `🔍 Estudiantes encontrados que coinciden con "${texto}":\n`;
      estudiantesEncontrados.forEach(est => {
        textoResultado += `  - ${est.nombre} (ID: ${est.id}), Edad: ${est.edad}, Dirección: ${est.direccion.calle}, ${est.direccion.numero}\n`;
      });
      return textoResultado;
    }
  }
  /**
   * Crea una nueva asignatura en el sistema.
   * 
   * @param {string} id - El ID único de la asignatura.
   * @param {string} nombre - El nombre de la asignatura.
   * @param {string} curso - El curso en el que se imparte la asignatura.
   * @throws {Error} Si el ID de la asignatura ya existe.
   */
  creaAsignatura(id, nombre, curso) {
    if (this.asignaturas.has(id)) throw new Error("ID duplicado");
    this.asignaturas.set(id, new Asignatura(id, nombre, curso));
  }
  /**
   * Busca asignaturas que coincidan con un texto en su nombre.
   * 
   * @param {string} nombre - Texto para buscar en los nombres de las asignaturas.
   * @returns {string} El listado de asignaturas que coinciden con el texto de búsqueda.
   * @throws {Error} Si no se encuentran asignaturas que coincidan con el texto.
   */
  buscaAsignatura(nombre) {
    const asignaturasEncontradas = [...this.asignaturas.values()]
      .filter(a => a.nombre.toLowerCase().includes(nombre.toLowerCase()));
    if (asignaturasEncontradas.length === 0) {
      throw new Error (`No se encontraron asignaturas que coincidan con "${nombre}".`);
    }else {
      let texto = `🔍 Asignaturas encontradas que coinciden con "${nombre}":\n`;
      asignaturasEncontradas.forEach(asig => {
        texto += `  - ${asig.nombre} (ID: ${asig.id}), Curso: ${asig.curso}\n`;
      });
      return texto;
    }
  }
  /**
   * Matrícula a un estudiante en una asignatura.
   * 
   * @param {string} idEstudiante - El ID del estudiante.
   * @param {string} idAsignatura - El ID de la asignatura.
   * @throws {Error} Si el estudiante o la asignatura no existen, o si el estudiante ya está matriculado.
   */
  matriculaEstudiante(idEstudiante, idAsignatura) {
    let est = this.estudiantes.get(idEstudiante);
    if (est) {
      if (this.asignaturas.has(idAsignatura)) {
        if (est.matriculas.has(idAsignatura)) {
          throw new Error("Ya está matriculado en esta asignatura");
        } else {
          est.matriculas.set(idAsignatura, new Date().toLocaleDateString("es-ES"));
        }
      } else {
        throw new Error("Asignatura no encontrada");
      }
    } else {
      throw new Error("Estudiante no encontrado");
    }
  }
  /**
   * Desmatricula a un estudiante de una asignatura.
   * 
   * @param {string} idEstudiante - El ID del estudiante.
   * @param {string} idAsignatura - El ID de la asignatura.
   * @throws {Error} Si el estudiante no está matriculado.
   * @throws {Error} Si el estudiante no tiene calificaciones en la asignatura.
   * @throws {Error} Si el estudiante no existe.
   */
  desMatriculaEstudiante(idEstudiante, idAsignatura) {
    let est = this.estudiantes.get(idEstudiante);
    if (est) {
      if (!est.matriculas.has(idAsignatura)) {
        throw new Error("No está matriculado en esta asignatura");
      } else {
        est.matriculas.delete(idAsignatura);
      }
      if (!est.calificaciones.has(idAsignatura)) {
        throw new Error("No tiene calificaciones en esta asignatura");
      } else {
        est.calificaciones.delete(idAsignatura);
      }
    } else {
      throw new Error("Estudiante no encontrado");
    }
  }
  /**
   * Asigna una calificación a un estudiante en una asignatura.
   * 
   * @param {string} idEstudiante - El ID del estudiante.
   * @param {string} idAsignatura - El ID de la asignatura.
   * @param {number} nota - La calificación del estudiante (de 0 a 10).
   * @throws {Error} Si la calificación es inválida o si el estudiante no está matriculado en la asignatura.
   * @throws {Error} Si el estudiante o la asignatura no existen.
   */
  califica(idEstudiante, idAsignatura, nota) {
    let est = this.estudiantes.get(idEstudiante);
    if (nota < 0 || nota > 10) {
      throw new Error("Nota inválida");
    } else {
      if (est) {
        if (this.asignaturas.has(idAsignatura)) {
          if (est.matriculas.has(idAsignatura)) {
            est.agregarCalificacion(idAsignatura, nota);
          } else {
            throw new Error("No está matriculado en esta asignatura");
          }
        } else {
          throw new Error("Asignatura no encontrada");
        }
      } else {
        throw new Error("Estudiante no encontrado");
      }
    }
  }
  /**
   * Obtiene el promedio general de un estudiante.
   * 
   * @param {string} idEstudiante - El ID del estudiante.
   * @returns {number} El promedio general del estudiante.
   * @throws {Error} Si el estudiante no existe.
   */
  promedioAsignaturasEstudiante(idEstudiante) {
    let est = this.estudiantes.get(idEstudiante);
    if (!est) {
      throw new Error("Estudiante no encontrado");
    }else{
        return est.obtenerPromedioGeneral();;
    }
  }
  /**
   * Obtiene el promedio de una asignatura para un estudiante.
   * 
   * @param {string} idEstudiante - El ID del estudiante.
   * @param {string} idAsignatura - El ID de la asignatura.
   * @returns {number} El promedio de la asignatura para el estudiante.
   * @throws {Error} Si el estudiante no existe.
   * @throws {Error} Si la asignatura no existe.
   */
  promedioAsignaturaEstudiante(idEstudiante, idAsignatura) {
    let est = this.estudiantes.get(idEstudiante);
    if (!est) {
      throw new Error("Estudiante no encontrado");
    }else{
        if (!this.asignaturas.has(idAsignatura)) {
          throw new Error("Asignatura no encontrada");
        }else{
          return est.obtenerPromedioPorAsignatura(idAsignatura);
        }
    } 
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
   * Genera un listado de todos los estudiantes registrados.
   * 
   * @returns {string} El listado de estudiantes con sus detalles.
   * @throws {Error} Si no hay estudiantes registrados.
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
   * Genera un listado de todas las asignaturas registradas.
   * 
   * @returns {string} El listado de asignaturas con sus detalles.
   * @throws {Error} Si no hay asignaturas registradas.
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
   * Genera un listado de todas las matrículas de los estudiantes.
   * 
   * @returns {string} El listado de matrículas de los estudiantes.
   * @throws {Error} Si no hay estudiantes registrados.
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
