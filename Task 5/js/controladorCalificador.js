function construirBusqueda(contenedor) {
    let titulo = document.createElement("h2");
    titulo.innerText = "Buscar Asignaturas del Alumno";
    contenedor.appendChild(titulo);
    let form = document.createElement("form");
    form.setAttribute("id", "form_busqueda");
    let busquedaAlumno = document.createElement("input");
    busquedaAlumno.setAttribute("type", "text");
    busquedaAlumno.setAttribute("placeholder", "Introduzca la ID del alumno");
    busquedaAlumno.setAttribute("id", "busqueda_alumno");
    form.appendChild(busquedaAlumno);
    let submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Buscar");
    form.appendChild(submit);
    contenedor.appendChild(form);
    realizarBusqueda();
}

function realizarBusqueda() {
    let form = document.getElementById("form_busqueda");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let busqueda = document.getElementById("busqueda_alumno").value;
        let estudiantesMatriculados = JSON.parse(localStorage.getItem("estudiantesMatriculados"));
        let estudiante = estudiantesMatriculados.find(estudiante => {
            let objetoEstudiante = JSON.parse(estudiante);
            return objetoEstudiante.id === busqueda;
        });
        if (estudiante === undefined) {
            alert("No se encontró el estudiante");
        } else {
            mostrarAsignaturas(JSON.parse(estudiante));
        }
    });
}

function mostrarAsignaturas(estudiante) {
    let contenedor = document.getElementById("contenedor_calificar");
    contenedor.innerHTML = "";
    let titulo = document.createElement("h2");
    titulo.innerText = "Asignaturas del alumno " + estudiante.id + " " + estudiante.nombre;
    contenedor.appendChild(titulo);
    console.log(estudiante);
    let tabla = document.createElement("table");
    tabla.setAttribute("id", "tabla_asignaturas");
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    let th1 = document.createElement("th");
    th1.innerText = "Nombre de la asignatura";
    let th2 = document.createElement("th");
    th2.innerText = "Calificar Asignatura";
    let th3 = document.createElement("th");
    th3.innerText = "Desmatricular";
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    thead.appendChild(tr);
    tabla.appendChild(thead);
    let tbody = document.createElement("tbody");
    estudiante.asignaturas.forEach(asignatura => {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerText = asignatura;
        let td2 = document.createElement("td");
        let input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("min", "0");
        input.setAttribute("max", "10");
        input.setAttribute("id", asignatura);
        td2.appendChild(input);
        let td3 = document.createElement("td");
        let botonDesmatricular = document.createElement("button");
        botonDesmatricular.innerText = "Desmatricular";
        botonDesmatricular.setAttribute("id", asignatura);
        botonDesmatricular.addEventListener("click", function() {
            estudiante.asignaturas = estudiante.asignaturas.filter(a => a !== asignatura);
            actualizarLocalStorage(estudiante);
            mostrarAsignaturas(estudiante);
        });
        td3.appendChild(botonDesmatricular);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
    });
    tabla.appendChild(tbody);
    contenedor.appendChild(tabla);
    let botonCalificar = document.createElement("button");
    botonCalificar.innerText = "Calificar";
    botonCalificar.setAttribute("id", "calificar");
    contenedor.appendChild(botonCalificar);
    let bontonBuscar = document.createElement("button");
    bontonBuscar.innerText = "Buscar otro alumno";
    bontonBuscar.addEventListener("click", function() {
        let contenedor = document.getElementById("contenedor_calificar");
        contenedor.innerHTML = "";
        construirBusqueda(contenedor);
    });
    contenedor.appendChild(bontonBuscar);
    calificarAsignaturas(estudiante);
}

function actualizarLocalStorage(estudiante) {
    let estudiantesMatriculados = JSON.parse(localStorage.getItem("estudiantesMatriculados")) || [];
    let nuevosEstudiantesMatriculados = estudiantesMatriculados.map(est => {
        let estObj = JSON.parse(est);
        if (estObj.id === estudiante.id) {
            return JSON.stringify(estudiante); 
        }
        return est; 
    });
    localStorage.setItem("estudiantesMatriculados", JSON.stringify(nuevosEstudiantesMatriculados));
}

function calificarAsignaturas(estudiante) {
    let boton = document.getElementById("calificar");
    boton.addEventListener("click", function() {
        let tabla = document.getElementById("tabla_asignaturas");
        let filas = tabla.querySelectorAll("tbody tr");
        let calificaciones = {};
        filas.forEach(fila => {
            let asignatura = fila.querySelector("td").innerText;
            let calificacion = fila.querySelector("input").value;
            calificaciones[asignatura] = calificacion;
        });
        estudiante.calificaciones = calificaciones;
        actualizarLocalStorage(estudiante); 
    });
}

let contenedor = document.getElementById("contenedor_calificar");
construirBusqueda(contenedor);