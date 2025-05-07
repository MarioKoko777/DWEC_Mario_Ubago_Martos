export class Estudiante {
  constructor(id, nombre, edad, direccion) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.direccion = direccion;
    this.matriculas = new Map();
    this.calificaciones = new Map();
  }
  agregarCalificacion(idAsignatura, nota) {
    if (!this.calificaciones.has(idAsignatura)) {
      this.calificaciones.set(idAsignatura, []);
    }
    this.calificaciones.get(idAsignatura).push(nota);
  }
  obtenerPromedioGeneral() {
    let total = 0, count = 0;
    for (let notas of this.calificaciones.values()) {
      total += notas.reduce((a, b) => a + b, 0);
      count += notas.length;
    }
    return count === 0 ? 0 : (total / count).toFixed(2);
  }
  obtenerPromedioPorAsignatura(idAsignatura) {
    let notas = this.calificaciones.get(idAsignatura) || [];
    let suma = notas.reduce((a, b) => a + b, 0);
    return notas.length ? (suma / notas.length).toFixed(2) : 0;
  }
}
