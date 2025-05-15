import { Estudiante } from './Estudiante.js';
import { Asignatura } from './Asignatura.js';
export class SGAEA {
  constructor() {
    this.estudiantes = new Map();
    this.asignaturas = new Map();
  }
  insertaEstudiante(id, nombre, edad, calle, numero, piso, cp, provincia, localidad) {
    if (this.estudiantes.has(id)) {
      throw new Error("ID duplicado");
    }
    const direccion = { calle, numero, piso, cp, provincia, localidad };
    this.estudiantes.set(id, new Estudiante(id, nombre, edad, direccion));
  }
  eliminaEstudiante(idEstudiante) {
    let est = this.estudiantes.get(idEstudiante)
    if (!est){
      throw new Error("ID no encontrado");
    }else{
      this.estudiantes.delete(idEstudiante);
    }
  }
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
  buscaEstudiante(texto) {
    const estudiantesEncontrados = [...this.estudiantes.values()]
      .filter(e => e.nombre.toLowerCase().includes(texto.toLowerCase()));
    if (estudiantesEncontrados.length === 0) {
      return `No se encontraron estudiantes que coincidan con "${texto}".`;
    }else{
    let textoResultado = `🔍 Estudiantes encontrados que coinciden con "${texto}":\n`;
    estudiantesEncontrados.forEach(est => {
      textoResultado += `  - ${est.nombre} (ID: ${est.id}), Edad: ${est.edad}, Dirección: ${est.direccion.calle}, ${est.direccion.numero}\n`;
    });
    return textoResultado;
    }
  }
  creaAsignatura(id, nombre, curso) {
    if (this.asignaturas.has(id)) throw new Error("ID duplicado");
    this.asignaturas.set(id, new Asignatura(id, nombre, curso));
  }
  buscaAsignatura(nombre) {
    const asignaturasEncontradas = [...this.asignaturas.values()]
      .filter(a => a.nombre.toLowerCase().includes(nombre.toLowerCase()));
    if (asignaturasEncontradas.length === 0) {
      return `No se encontraron asignaturas que coincidan con "${nombre}".`;
    }else{
    let texto = `🔍 Asignaturas encontradas que coinciden con "${nombre}":\n`;
    asignaturasEncontradas.forEach(asig => {
      texto += `  - ${asig.nombre} (ID: ${asig.id}), Curso: ${asig.curso}\n`;
    });
    return texto;
    }
  }
  matriculaEstudiante(idEstudiante, idAsignatura) {
    let est = this.estudiantes.get(idEstudiante);
    if (est){
      if(this.asignaturas.has(idAsignatura)){
        if (est.matriculas.has(idAsignatura)){
          throw new Error("Ya está matriculado en esta asignatura");
        } else{
          est.matriculas.set(idAsignatura, new Date().toLocaleDateString("es-ES"));
        }           
      } else{
        throw new Error("Asignatura no encontrada");
      }
    }else {
      throw new Error("Estudiante no encontrado");
    }
  }
  desMatriculaEstudiante(idEstudiante, idAsignatura) {
    let est = this.estudiantes.get(idEstudiante);
    if (est){
      if (!est.matriculas.has(idAsignatura)){
        throw new Error("No está matriculado en esta asignatura");
      }else {
        est.matriculas.delete(idAsignatura);
      }
      if (!est.calificaciones.has(idAsignatura)){
        throw new Error("No tiene calificaciones en esta asignatura");
      }else {
        est.calificaciones.delete(idAsignatura);
      }
    } else {
      throw new Error("Estudiante no encontrado");
    }
  }
  califica(idEstudiante, idAsignatura, nota) {
    let est = this.estudiantes.get(idEstudiante);
    if (nota < 0 || nota > 10){
      throw new Error("Nota inválida");
    }else{
      if (est){
        if (this.asignaturas.has(idAsignatura)){
          if (est.matriculas.has(idAsignatura)){
            est.agregarCalificacion(idAsignatura, nota)
          } else{
            throw new Error("No está matriculado en esta asignatura");
          } 
        }else{
          throw new Error("Asignatura no encontrada");
        }
        if (est) est.agregarCalificacion(idAsignatura, nota);
      }else{
        throw new Error("Estudiante no encontrado");
      }
    }
     
    
  }
  promedioAsignaturasEstudiante(idEstudiante) {
    let est = this.estudiantes.get(idEstudiante);
    if (!est) {
      throw new Error("Estudiante no encontrado");
    }else{
        return est.obtenerPromedioGeneral();;
    }
  }
  promedioAsignaturaEstudiante(idEstudiante, idAsignatura) {
    let est = this.estudiantes.get(idEstudiante);
    if (!est) {
      throw new Error("Estudiante no encontrado");
    }else{
      return est.obtenerPromedioPorAsignatura(idAsignatura);
    } 
  }
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
        throw new Error("No hay estudiantes registrados.");
      }
      return [...this.estudiantes.values()]
        .map(e => this.informeGeneral(e.id))
        .join("\n---------------------------------\n");
    }
  }
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
