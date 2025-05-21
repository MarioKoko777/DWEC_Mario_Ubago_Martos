import { SGAEA } from '../js/SGAEA.js';

const sistema = new SGAEA();

// Crear estudiantes
sistema.insertaEstudiante(1, "Juan Pérez", 20, "Calle A", 10, 1, 8001, "Barcelona", "Barcelona");
sistema.insertaEstudiante(2, "María López", 21, "Calle B", 20, 2, 8002, "Barcelona", "Barcelona");
sistema.insertaEstudiante(3, "Carlos Ruiz", 22, "Calle C", 30, 3, 8003, "Barcelona", "Barcelona");

// Crear asignaturas
sistema.creaAsignatura(101, "Matemáticas", "1º ESO");
sistema.creaAsignatura(102, "Lengua", "1º ESO");
sistema.creaAsignatura(103, "Historia", "1º ESO");

// Matricular estudiantes
const matriculas = {
  1: [101, 102, 103],
  2: [101, 102, 103],
  3: [101, 102, 103]
};
for (let idEst in matriculas) {
  matriculas[idEst].forEach(idAsig => {
    sistema.matriculaEstudiante(Number(idEst), Number(idAsig));
  });
}

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

// Informes
console.log("INFORMES INDIVIDUALES:");
console.log(sistema.informeGeneral(1));
console.log(sistema.informeGeneral(2));
console.log(sistema.informeGeneral(3));

console.log("INFORME GENERAL:");
console.log(sistema.informeGeneral());

console.log("LISTADO ESTUDIANTES:");
console.log(sistema.listadoEstudiantes());

console.log("LISTADO ASIGNATURAS:");
console.log(sistema.listadoAsignaturas());

console.log("LISTADO MATRÍCULAS:");
console.log(sistema.listadoMatriculas());

// Menú interactivo
function menu() {
  let opcion = "";
  do {
    console.log("\n--- Menú Principal ---");
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
    console.log("14. Promedio de Asignaturas por Estudiante");
    console.log("15. Promedio de Estudiante por Asignatura");
    console.log("0. Salir");
    
    opcion = prompt("Dime la opción que desees realizar");
    opcion = String(opcion);
    switch (opcion) {
      case "1":
        try {
          const id = Number(prompt("ID del estudiante:"));
          const nombre = prompt("Nombre:");
          const edad = Number(prompt("Edad:"));
          const calle = prompt("Calle:");
          const numero = Number(prompt("Número:"));
          const piso = Number(prompt("Piso:"));
          const cp = Number(prompt("Código postal:"));
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
          const creditos = Number(prompt("Créditos (opcional, 0 si no aplica):"));
          sistema.creaAsignatura(id, nombre, curso,creditos);
          console.log("Asignatura creada correctamente.");
        } catch (err) {
          console.error("Error:", err.message);
        }
        break;
      case "3":
        try {
          const idEst = Number(prompt("ID del estudiante:"));
          const idAsig = Number(prompt("ID de la asignatura:"));
          sistema.matriculaEstudiante(idEst, idAsig);
          console.log("Estudiante matriculado correctamente.");
        } catch (err) {
          console.error("Error:", err.message);
        }
        break;
      case "4":
        try {
          const idEst = Number(prompt("ID del estudiante:"));
          const idAsig = Number(prompt("ID de la asignatura:"));
          const nota = Number(prompt("Nota (0-10):"));
          sistema.califica(idEst, idAsig, nota);
          console.log("Calificación registrada.");
        } catch (err) {
          console.error("Error:", err.message);
        }
        break;
      case "5":
        try {
          const id = Number(prompt("ID del estudiante:"));
          console.log(sistema.informeGeneral(id));
        } catch (err) {
          console.error(" Error:", err.message);
        }
        break;
      case "6":
        console.log(sistema.informeGeneral());
        break;
      case "7":
        console.log(sistema.listadoEstudiantes());
        break;
      case "8":
        console.log(sistema.listadoAsignaturas());
        break;
      case "9":
        console.log(sistema.listadoMatriculas());
        break;
      case "10":
        try {
          const id = Number(prompt("ID del estudiante a eliminar:"));
          sistema.eliminaEstudiante(id);
          console.log("Estudiante eliminado.");
        } catch (err) {
          console.error("Error:", err.message);
        }
        break;
      case "11":
        try {
          const id = Number(prompt("ID de la asignatura a eliminar:"));
          sistema.eliminaAsignatura(id);
          console.log("Asignatura eliminada.");
        } catch (err) {
          console.error("Error:", err.message);
        }
        break;
      case "12":
        try {
          const idEst = Number(prompt("ID del estudiante:"));
          const idAsig = Number(prompt("ID de la asignatura:"));
          sistema.desMatriculaEstudiante(idEst, idAsig);
          console.log("Desmatriculación realizada.");
        } catch (err) {
          console.error("Error:", err.message);
        }
        break;
      case "13":
        try {
          const texto = prompt("Texto de búsqueda:");
          console.log("Estudiantes encontrados:", sistema.buscaEstudiante(texto));
          console.log("Asignaturas encontradas:", sistema.buscaAsignatura(texto));
        } catch (err) {
          console.error("Error:", err.message);
        }
        break;
      case "14":
        try {
          const id = Number(prompt("ID del estudiante:"));
          const promedio = sistema.promedioAsignaturasEstudiante(id);
          console.log(`Promedio general del estudiante: ${promedio}`);
        } catch (err) {
          console.error("Error:", err.message);
        }
        break;
      case "15":
        try {
          const idEst = Number(prompt("ID del estudiante:"));
          const idAsig = Number(prompt("ID de la asignatura:"));
          const promedio = sistema.promedioAsignaturaEstudiante(idEst, idAsig);
          console.log(`Promedio del estudiante en la asignatura: ${promedio}`);
        } catch (err) {
          console.error("Error:", err.message);
        }
        break;
      case "0":
        console.log("Saliendo del sistema...");
        break;
      default:
        console.warn("Opción no válida.");
        break;
    }
  } while (opcion !== "0");
}

// Ejecutar menú
menu();
