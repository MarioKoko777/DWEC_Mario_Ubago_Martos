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
// Menú interactivo por consola
function menu() {
  let opcion = 0;
  do {
    console.log("Menú Principal:");
    console.log("1. Insertar Estudiante");
    console.log("2. Crear Asignatura");
    console.log("3. Matricular Estudiante");
    console.log("4. Calificar Estudiante");
    console.log("5. Ver informe individual");
    console.log("6. Ver informe general");
    console.log("7. Ver listado de estudiantes");
    console.log("8. Ver listado de asignaturas");
    console.log("9. Ver listado de matrículas");
    console.log("10. Eliminar Estudiante");
    console.log("11. Eliminar Asignatura");
    console.log("12. Desmatricular Estudiante");
    console.log("13. Buscar Estudiante o Asignatura");
    console.log("0. Salir");
    console.log("Elige una opción:");  
    
          opcion = prompt("Dime la opción que desees realizar");
          opcion = String(opcion);
            switch (opcion) {
              case "1":
                try {
                  const id = Number(prompt("ID del estudiante:"));
                  const nombre = prompt("Nombre:");
                  const edad = Number(prompt("Edad:"));
                  const calle = prompt("Calle:");
                  const numero = prompt("Número:");
                  const piso = prompt("Piso:");
                  const cp = prompt("Código postal:");
                  const provincia = prompt("Provincia:");
                  const localidad = prompt("Localidad:");
                  sistema.insertaEstudiante(id, nombre, edad, calle, numero, piso, cp, provincia, localidad);
                  console.log("Estudiante insertado correctamente.");
                } catch (err) {
                  console.error("Error:", err.message);
                }
                break;
              case "2":
                try {
                  const id = Number(prompt("ID de la asignatura:"));
                  const nombre = prompt("Nombre:");
                  const curso = prompt("Curso:");
                  sistema.creaAsignatura(id, nombre, curso);
                  console.log("Asignatura creada correctamente.");
                } catch (err) {
                  console.error("Error:", err.message);
                }
                break;
              case "3":
                try {
                  const idEstudiante = Number(prompt("ID del estudiante:"));
                  const idAsignatura = Number(prompt("ID de la asignatura:"));
                  sistema.matriculaEstudiante(idEstudiante, idAsignatura);
                  console.log("Estudiante matriculado correctamente.");
                } catch (err) {
                  console.error("Error:", err.message);
                }
                break;
              case "4":
                try {
                  const idEstudiante = Number(prompt("ID del estudiante:"));
                  const idAsignatura = Number(prompt("ID de la asignatura:"));
                  const nota = Number(prompt("Nota (0-10):"));
                  sistema.califica(idEstudiante, idAsignatura, nota);
                  console.log("Calificación registrada correctamente.");
                } catch (err) {
                  console.error("Error:", err.message);
                }
                break;
              case "5":
                try {
                  const id = Number(prompt("ID del estudiante:"));
                  const informe = sistema.informeGeneral(id);
                  console.log("Informe individual:", informe);
                } catch (err) {
                  console.error("Error:", err.message);
                }
                break;
              case "6":
                console.log("Informe general:", sistema.informeGeneral());
                break;
              case "7":
                console.log("Listado de estudiantes:", sistema.listadoEstudiantes());
                break;
              case "8":
                console.log("Listado de asignaturas:", sistema.listadoAsignaturas());
                break;
              case "9":
                console.log("Listado de matrículas:", sistema.listadoMatriculas());
                break;
              case "10":
                try {
                  const idEstudiante = Number(prompt("ID del estudiante a eliminar:"));
                  sistema.eliminaEstudiante(idEstudiante);
                  console.log("Estudiante eliminado correctamente.");
                } catch (err) {
                  console.error("Error:", err.message);
                }
                break;
              case "11":
                try {
                  const idAsignatura = Number(prompt("ID de la asignatura a eliminar:"));
                  sistema.asignaturas.delete(idAsignatura);
                  console.log("Asignatura eliminada correctamente.");
                } catch (err) {
                  console.error("Error:", err.message);
                }
                break;
              case "12":
                try {
                  const idEstudiante = Number(prompt("ID del estudiante:"));
                  const idAsignatura = Number(prompt("ID de la asignatura:"));
                  sistema.desMatriculaEstudiante(idEstudiante, idAsignatura);
                  console.log("Desmatriculación realizada correctamente.");
                } catch (err) {
                  console.error("Error:", err.message);
                }
                break;
              case "13":
                try {
                  const textoBusqueda = prompt("Ingrese el texto a buscar:");
                  const estudiantesEncontrados = sistema.buscaEstudiante(textoBusqueda);
                  const asignaturasEncontradas = sistema.buscaAsignatura(textoBusqueda);
                  console.log("Estudiantes encontrados:", estudiantesEncontrados);
                  console.log("Asignaturas encontradas:", asignaturasEncontradas);
                } catch (err) {
                  console.error("Error:", err.message);
                }
                break;
              case "0":
                console.log("Saliendo del sistema...");
                break;
              default:
                console.warn("Opción no válida. Intente de nuevo.");
                break;
            }
          } while (opcion !== "0");
  }

  // Ejecutar menú

  menu();
