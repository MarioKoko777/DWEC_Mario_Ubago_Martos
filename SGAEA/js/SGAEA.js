import { Estudiante } from './Estudiante.js';
import { Asignatura } from './Asignatura.js';
export class SGAEA {
  constructor() {
    this.estudiantes = new Map();
    this.asignaturas = new Map();
  }
  insertaEstudiante(id, nombre, edad, calle, numero, piso, cp, provincia, localidad) {
    const direccion = { calle, numero, piso, cp, provincia, localidad };
    if (this.estudiantes.has(id)) throw new Error("ID duplicado");
    this.estudiantes.set(id, new Estudiante(id, nombre, edad, direccion));
  }
  eliminaEstudiante(id) {
    this.estudiantes.delete(id);
  }
  buscaEstudiante(texto) {
    return [...this.estudiantes.values()].filter(e => e.nombre.toLowerCase().includes(texto.toLowerCase()));
  }
  creaAsignatura(id, nombre, curso) {
    if (this.asignaturas.has(id)) throw new Error("ID duplicado");
    this.asignaturas.set(id, new Asignatura(id, nombre, curso));
  }
  buscaAsignatura(nombre) {
    return [...this.asignaturas.values()].filter(a => a.nombre.toLowerCase().includes(nombre.toLowerCase()));
  }
  matriculaEstudiante(idEstudiante, idAsignatura) {
    let est = this.estudiantes.get(idEstudiante);
    if (!est || !this.asignaturas.has(idAsignatura)) return;
    est.matriculas.set(idAsignatura, new Date().toLocaleDateString("es-ES"));
  }
  desMatriculaEstudiante(idEstudiante, idAsignatura) {
    let est = this.estudiantes.get(idEstudiante);
    if (est) est.matriculas.delete(idAsignatura);
  }
  califica(idEstudiante, idAsignatura, nota) {
    if (nota < 0 || nota > 10) throw new Error("Nota inválida");
    let est = this.estudiantes.get(idEstudiante);
    if (est) est.agregarCalificacion(idAsignatura, nota);
  }
  promedioAsignaturasEstudiante(idEstudiante) {
    return this.estudiantes.get(idEstudiante)?.obtenerPromedioGeneral();
  }
  promedioAsignaturaEstudiante(idEstudiante, idAsignatura) {
    return this.estudiantes.get(idEstudiante)?.obtenerPromedioPorAsignatura(idAsignatura);
  }
  informeGeneral(idEstudiante = null) {
    if (idEstudiante) {
      const e = this.estudiantes.get(idEstudiante);
      if (!e) return null;
      return {
        nombre: e.nombre,
        asignaturas: [...e.matriculas.keys()],
        calificaciones: [...e.calificaciones.entries()],
        promedio: e.obtenerPromedioGeneral()
      };
    } else {
      return [...this.estudiantes.values()].map(e => this.informeGeneral(e.id));
    }
  }
  listadoEstudiantes() {
    return [...this.estudiantes.values()];
  }
  listadoAsignaturas() {
    return [...this.asignaturas.values()];
  }
  listadoMatriculas() {
    return [...this.estudiantes.values()].map(e => ({
      estudiante: e.nombre,
      matriculas: [...e.matriculas.entries()]
    }));
  }
}
