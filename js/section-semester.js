// const semesters = [{ primero: [] }, { segundo: [] }, { tercero: [] }, { cuarto: [] }, { quinto: [] }, { sexto: [] }, { seption: ["AplicaionesDistribuidas.json", "DiseĆ±oEvaluacionProyectos-TI.json", "MineriaDatos.json", "ProgramacionAvanzada.json", "SeguridadInformatica.json"] }, { octavo: ["ArquitecturaSoftware.json", "GestionEmprendimiento.json", "GestionSeguridadInformatica.json", "TecnologiasEmergencia.json", "Profesionalizate.json"] }];
const semesters = [[], [], [], [], [], [], ["ProgramacionAvanzada.json", "MineriaDatos.json", "SeguridadInformatica.json", "DiseĆ±oEvaluacionProyectos-TI.json", "AplicacionesDistribuidas.json"], ["GestionSeguridadInformatica.json", "ArquitecturaSoftware.json", "GestionEmprendimiento.json", "TecnologiasEmergencia.json", "Profesionalizante.json"]];
const countSemesters = ["primero", "segundo", "tercero", "cuarto", "quinto", "sexto", "septimo", "octavo"];
const btns = document.querySelectorAll('.btnS');
const options = document.querySelectorAll('#op');
let numSemestre = 0;

btns.forEach(function (btn, index) {
    btn.addEventListener("click", function (e) {
        obtenerDatos(index);
        numSemestre = index;
    });
    // console.log(index)
});

async function obtenerDatos(index) {
    const response = await fetch("http://127.0.0.1:5501/Json/semesters-validos.json", { credentials: 'same-origin' });
    const json = await response.json();

    options.forEach(function (dato, i) {
        // let llamar = `materia${num}`
        // const dato;
        // console.log(llamar)
        dato.textContent = json[index].materia[i];
        dato.value = i;
    });
};

const btnOptions = document.querySelector(".tabla_semesters");
const btnOption = document.querySelector("#btnOption");
const positionActual = document.querySelector('#posicion-actual');
const cantidadEstudent = document.querySelector('#cantidad-estudiantes');

btnOption.addEventListener('click', function () {
    traerDatos(numSemestre);
    // console.log(numSemestre)
});

async function traerDatos(num) {
    console.log("TODO FUNCIONA");
    let valor = document.getElementById("materias-option").value;
    let ruta = "http://127.0.0.1:5501/Json/";
    const rutaPadre = ruta;
    let position = '', totalEstudiantes = 0;
    cantidadEstudent.innerHTML = totalEstudiantes;
    let rutaMateria = rutaPadre + 'semesters-validos.json';
    let res = document.querySelector('#muestra_semesters');
    res.innerHTML = ''; // Importante para empezar una nueva consulta

    for (i = 0; i < semesters.length; i++) {
        if (i === num) {
            const allSemester = countSemesters[i];
            // const context = semesters[i];
            // console.log(countSemesters[i])
            // console.log(context.length)
            // console.log(position)
            ruta = ruta.concat(allSemester + "/");
            ruta = ruta.concat(semesters[num][valor]);
            // console.log(semesters[num][valor]);
            console.log(ruta);
            const response = await fetch(ruta, { credentials: 'same-origin' });
            const datos = await response.json();
            console.log(datos)

            for (let data of datos) {
                // console.log(data)
                // AgregaciĆ³n de los datos
                res.innerHTML += `<tr>
                <td>${data.nlista}</td>
                <td>${data.nombres}</td>
                <td>${data.semestre}</td>
                <td>${data.nota1}</td>
                <td>${data.nota2}</td>
                <td>${data.nota3}</td>
                <td>${data.asis}/100</td>
                <td> Calcular Promedio </td>
                <td> Calcular Resultados</td>
                </tr>`;
            }
            ruta = rutaPadre;

            // 

            const allMaterias = await fetch(rutaMateria, { credentials: 'same-origin' });
            const materias = await allMaterias.json();
            // console.log(materias[num].materia[valor]);
            position += `${countSemesters[i]}/${materias[num].materia[valor]}`;
            totalEstudiantes = `${datos.length}`;
            positionActual.innerHTML = position;
            cantidadEstudent.innerHTML = totalEstudiantes;
        }
    }
    // console.log(ruta)
}

