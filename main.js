// Primero lodeamos el HTML y luego arrancamos el JS
document.addEventListener("DOMContentLoaded", function () {
  // Seleccionamos los Forms
  const runForm = document.getElementById("run-form");
  const goalForm = document.getElementById("goal-form");

  // Seleccionamos para que aparezcan el Running History y los Goals que se van creando
  const runList = document
    .getElementById("run-list")
    .getElementsByTagName("ul")[0];
  const goalList = document
    .getElementById("goal-list")
    .getElementsByTagName("ul")[0];

  // Eventos para escuchar cuando hago click a mi boton
  runForm.addEventListener("submit", addRun);
  goalForm.addEventListener("submit", setGoal);

  // Funcion para agregar un Run y la llamamos
  function addRun(event) {
    event.preventDefault();

    // Sacamos los values de los inputs
    const runType = document.getElementById("run-type").value;

    const distance = parseFloat(document.getElementById("distance").value);
    const distanceUnit = document.getElementById("distance-unit").value;

    const duration = parseFloat(document.getElementById("duration").value);
    const date = document.getElementById("date").value;

    // Determinamos si vamos a mostrar minutos u horas. toFixed para que nos muestre decimales que serian min.
    let durationDisplay;
    if (duration >= 1) {
      durationDisplay = `${duration.toFixed(2)} hrs`;
    } else {
      durationDisplay = `${(duration * 60).toFixed(0)} min`;
    }

    // Creamos un nuevo entry de Run
    const listItem = document.createElement("li");
    listItem.innerHTML = `
          <strong>${runType}</strong>  ${distance} ${distanceUnit} in ${durationDisplay}, Date: ${date}`;

    // Agregamos el entry a la lista del History
    runList.appendChild(listItem);

    // Datos para el Local Storage. Key: Value
    storageRun({
      Type: runType,
      Distance: distance,
      Unit: distanceUnit,
      Time: duration,
      Date: date,
    });

    // Funcion para guardar los datos en el Local Storage pero son Objects
    function storageRun(runData) {
      // Parseamos los datos existentes para convertir a Array. Si no hay datos arrancamos un Array nuevo Runs.
      let runs = JSON.parse(localStorage.getItem("runs")) || [];

      // El runData pushea los Runs al Array para crear nuevos entrys
      runs.push(runData);

      // El Array Runs (con los nuevos entrys) se guarda en el Local Storage. Volvemos a convertir a un JSON string para guardar y llamamos la funcion
      localStorage.setItem("runs", JSON.stringify(runs));
    }

    // Funcion para accesar a los runs desde el Local Storage
    function getRuns() {
      return JSON.parse(localStorage.getItem("runs")) || [];
    }

    // Reseteamos el Form
    runForm.reset();
  }

  // Funcion para agregar un Goal y la llamamos
  function setGoal(event) {
    event.preventDefault();

    const targetDistance = document.getElementById("target-distance").value;

    const targetDistanceUnit = document.getElementById(
      "target-distance-unit"
    ).value;

    const targetTime = parseFloat(document.getElementById("target-time").value);

    // Creamos un nuevo entry de Goals
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>Distance and  Time Goal:</strong> ${targetDistance} ${targetDistanceUnit} in ${targetTime} hrs`;

    //Agregamos el entry a la lista de los Goals
    goalList.appendChild(listItem);

    // Datos para el Local Storage. Key: Value
    storageGoal({
      Distance: targetDistance,
      Unit: targetDistanceUnit,
      Time: targetTime,
    });

    // Funcion para guardar los datos en el Local Storage pero son Objects
    function storageGoal(goalData) {
      // Parseamos los datos existentes para convertir a Array. Si no hay datos arrancamos un Array nuevo "goals".
      let goals = JSON.parse(localStorage.getItem("goals")) || [];

      // El goalData pushea los "goals" al Array para crear nuevos entrys
      goals.push(goalData);

      // El Array "goals" (con los nuevos entrys) se guarda en el Local Storage. Volvemos a convertir a un JSON string para guardar y llamamos la funcion
      localStorage.setItem("goals", JSON.stringify(goals));
    }

    // Funcion para accesar a los goals desde el Local Storage
    function getGoals() {
      return JSON.parse(localStorage.getItem("goals")) || [];
    }

    // Reseteamos el Form
    goalForm.reset();
  }
});
