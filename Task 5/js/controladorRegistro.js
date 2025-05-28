import { Estudiante } from "./clases.js";

async function generarMatriculacion(contenedor, estudiante) {
    contenedor.innerHTML = "";

    contenedor.appendChild(document.createElement("h2")).innerText = "Matriculación del estudiante " + estudiante.id + " " + estudiante.nombre;
    
    let form = document.createElement("form");
    form.setAttribute("id", "matriculacion-form");

    let asignaturasGuardadas = JSON.parse(localStorage.getItem("AsignaturasTroncales"));

    if (asignaturasGuardadas && asignaturasGuardadas.length > 0) {
        asignaturasGuardadas.forEach(asignatura => {
            let div = document.createElement("div");

            let checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("name", "asignaturas");
            checkbox.setAttribute("value", asignatura.nombre);
            checkbox.setAttribute("id", asignatura.nombre);

            let label = document.createElement("label");
            label.setAttribute("for", asignatura.nombre);
            label.textContent = asignatura.nombre;

            div.appendChild(label);
            div.appendChild(checkbox);

            form.appendChild(div);
        });
    } else {
        let mensaje = document.createElement("p");
        mensaje.textContent = "No hay asignaturas disponibles";
        form.appendChild(mensaje);
    }

    let submitbutton = document.createElement("input");
    submitbutton.setAttribute("type", "submit");
    submitbutton.setAttribute("value", "Matricular");
    form.appendChild(submitbutton);

    contenedor.appendChild(form);

    await guardarAsignaturas(estudiante);
}

function guardarAsignaturas(estudiante) {
    return new Promise((resolve) => {
        let form = document.getElementById("matriculacion-form");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let checkboxes = form.querySelectorAll('input[name="asignaturas"]:checked');
            let asignaturasSeleccionadas = [];

            checkboxes.forEach(checkbox => {
                asignaturasSeleccionadas.push(checkbox.value);
            });

            localStorage.setItem("matricula" + estudiante.id, JSON.stringify(asignaturasSeleccionadas));

            resolve();
        });
    });
}

function ejecutarMatriculacion(estudiante) {
    let asignaturas = JSON.parse(localStorage.getItem("matricula" + estudiante.id));
    if (asignaturas) {
        asignaturas.forEach(asignatura => {
            estudiante.matricular(asignatura);
        });
    }

    let json = JSON.stringify(estudiante); 
    estudiantesMatriculados.push(json);
    localStorage.setItem("estudiantesMatriculados", JSON.stringify(estudiantesMatriculados));
}

function FormularioOriginal(contenedor) {
    contenedor.innerHTML = "";

    const h2 = document.createElement("h2");
    h2.textContent = "Registro de Estudiantes";
    contenedor.appendChild(h2);

    const form = document.createElement("form");
    form.setAttribute("id", "registro-form");

    const inputNombre = document.createElement("input");
    inputNombre.setAttribute("type", "text");
    inputNombre.setAttribute("id", "nombre");
    inputNombre.setAttribute("required", "true");
    inputNombre.setAttribute("placeholder", "Nombre");
    form.appendChild(inputNombre);

    const inputEdad = document.createElement("input");
    inputEdad.setAttribute("type", "number");
    inputEdad.setAttribute("id", "edad");
    inputEdad.setAttribute("min", "1");
    inputEdad.setAttribute("required", "true");
    inputEdad.setAttribute("placeholder", "Edad");
    form.appendChild(inputEdad);

    const fieldset = document.createElement("fieldset");

    const legend = document.createElement("legend");
    legend.textContent = "Dirección";
    fieldset.appendChild(legend);

    const inputCalle = document.createElement("input");
    inputCalle.setAttribute("type", "text");
    inputCalle.setAttribute("id", "calle");
    inputCalle.setAttribute("required", "true");
    inputCalle.setAttribute("placeholder", "Calle");
    fieldset.appendChild(inputCalle);

    const inputPiso = document.createElement("input");
    inputPiso.setAttribute("type", "text");
    inputPiso.setAttribute("id", "piso");
    inputPiso.setAttribute("placeholder", "Piso");
    fieldset.appendChild(inputPiso);

    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(document.createElement("br"));

    const inputCP = document.createElement("input");
    inputCP.setAttribute("type", "number");
    inputCP.setAttribute("id", "cp");
    inputCP.setAttribute("required", "true");
    inputCP.setAttribute("placeholder", "Codigo Postal");
    fieldset.appendChild(inputCP);

    const inputCiudad = document.createElement("input");
    inputCiudad.setAttribute("type", "text");
    inputCiudad.setAttribute("id", "ciudad");
    inputCiudad.setAttribute("required", "true");
    inputCiudad.setAttribute("placeholder", "Ciudad");
    fieldset.appendChild(inputCiudad);

    const inputLocalidad = document.createElement("input");
    inputLocalidad.setAttribute("type", "text");
    inputLocalidad.setAttribute("id", "localidad");
    inputLocalidad.setAttribute("required", "true");
    inputLocalidad.setAttribute("placeholder", "localidad");
    fieldset.appendChild(inputLocalidad);

    form.appendChild(fieldset);

    const inputSubmit = document.createElement("input");
    inputSubmit.setAttribute("type", "submit");
    inputSubmit.setAttribute("value", "Registrar");
    form.appendChild(inputSubmit);

    contenedor.appendChild(form);
    logicaBase();
}

function logicaBase() {
    let form = document.getElementById("registro-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        let contenedor_formulario = document.getElementById("contenedor_formulario");
    
        let nombre = document.getElementById("nombre").value;
        let edad = parseInt(document.getElementById("edad").value);
        let direccion = {
            calle: document.getElementById("calle").value,
            numero: document.getElementById("piso").value,
            ciudad: document.getElementById("ciudad").value,
            localidad: document.getElementById("localidad").value,
            codigoPostal: document.getElementById("cp").value
        };
    
        let nuevoEstudiante = new Estudiante(nombre, edad, direccion);
    
        await generarMatriculacion(contenedor_formulario, nuevoEstudiante);
        ejecutarMatriculacion(nuevoEstudiante);
        FormularioOriginal(contenedor_formulario);
    });
}

function seederAsignaturas() {
    
    let asignaturasTroncales = [
        { nombre: "Matematicas" },
        { nombre: "Lengua" },
        { nombre: "Ingles" },
        { nombre: "Fisica" },
        { nombre: "Quimica" },
        { nombre: "Historia" },
        { nombre: "Geografia" },
        { nombre: "Filosofia" },
        { nombre: "Educacion Fisica" },
        { nombre: "Tecnologia" },
        { nombre: "Musica" },
        { nombre: "Plastica" },
        { nombre: "Religion" }
    ];
    localStorage.setItem("AsignaturasTroncales", JSON.stringify(asignaturasTroncales));
}
let estudiantesMatriculados = new Array();
let contenedor_formulario = document.getElementById("contenedor_formulario");

seederAsignaturas();
FormularioOriginal(contenedor_formulario);