import { SGAEA } from '../js/SGAEA.js';
const sistema = new SGAEA();
// Crear estudiantes
sistema.insertaEstudiante(1, "Juan Pérez", 20, "Calle A", 10, "1B", "08001", "Barcelona", "Barcelona");
sistema.insertaEstudiante(2, "María López", 21, "Calle B", 20, "2A", "08002", "Barcelona", "Barcelona");
sistema.insertaEstudiante(3, "Carlos Ruiz", 22, "Calle C", 30, "3C", "08003", "Barcelona", "Barcelona");
// Crear asignaturas
sistema.creaAsignatura(101, "Matemáticas", "1º ESO");
sistema.creaAsignatura(102, "Lengua", "1º ESO");
sistema.creaAsignatura(103, "Historia", "1º ESO");
// Matricular estudiantes
[1, 2, 3].forEach(idEst => {
  [101, 102, 103].forEach(idAsig => {
    sistema.matriculaEstudiante(idEst, idAsig);
  });
});
// Calificaciones
const notas = {
  1: { 101: [7, 8, 9], 102: [6, 7, 8], 103: [9, 9, 10] },
  2: { 101: [5, 6, 7], 102: [7, 8, 9], 103: [8, 8, 9] },
  3: { 101: [10, 10, 10], 102: [6, 6, 6], 103: [7, 7, 8] }
};
for (let idEst in notas) {
  for (let idAsig in notas[idEst]) {
    notas[idEst][idAsig].forEach(nota => {
      sistema.califica(Number(idEst), Number(idAsig), nota);
    });
  }
}
// Mostrar informes individuales
console.log("INFORMES INDIVIDUALES:");
console.log(sistema.informeGeneral(1));
console.log(sistema.informeGeneral(2));
console.log(sistema.informeGeneral(3));
// Mostrar informe general
console.log("INFORME GENERAL:");
console.log(sistema.informeGeneral());
// Listados
console.log("LISTADO ESTUDIANTES:");
console.log(sistema.listadoEstudiantes());
console.log("LISTADO ASIGNATURAS:");
console.log(sistema.listadoAsignaturas());
console.log("LISTADO MATRÍCULAS:");
console.log(sistema.listadoMatriculas());
