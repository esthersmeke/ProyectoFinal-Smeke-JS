// Primero lodeamos el HTML y luego arrancamos el JS
document.addEventListener("DOMContentLoaded", function () {
  // Funcion para guardar los datos en el Local Storage pero son Objects
  function storageRun(runData) {
    // Parseamos los datos existentes para convertir a Array. Si no hay datos, arrancamos un Array nuevo "runs".
    let runs = JSON.parse(localStorage.getItem("runs")) || [];

    // El runData pushea los "runs" al Array para crear nuevos entries
    runs.push(runData);

    // El Array "runs" (con los nuevos entries) se guarda en el Local Storage. Volvemos a convertir a un JSON string para guardar y llamamos la función
    localStorage.setItem("runs", JSON.stringify(runs));
  }

  // Funcion para guardar los datos en el Local Storage pero son Objects
  function storageGoal(goalData) {
    // Parseamos los datos existentes para convertir a Array. Si no hay datos, arrancamos un Array nuevo "goals".
    let goals = JSON.parse(localStorage.getItem("goals")) || [];

    // El goalData pushea los "goals" al Array para crear nuevos entries
    goals.push(goalData);

    // El Array "goals" (con los nuevos entries) se guarda en el Local Storage. Volvemos a convertir a un JSON string para guardar y llamamos la función
    localStorage.setItem("goals", JSON.stringify(goals));
  }

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

  // Creamos la funcion para el API del Weather
  async function fetchWeather(city, date, listItem) {
    const apiKey = "b55a9d28377228d4816e600e6dc942e5";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      const weatherData = response.data;

      // Display del weather information para cada Run
      const weatherInfo = `Weather: ${weatherData.weather[0].description}, Temperature: ${weatherData.main.temp}°C`;

      // Seleccion del Div de weather y detectamos si hay error
      const weatherInfoDiv = listItem.querySelector(".weather-info");
      if (weatherInfoDiv) {
        weatherInfoDiv.textContent = weatherInfo;
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  // Funcion para agregar un Run y la llamamos
  function addRun(event) {
    event.preventDefault();

    const runType = document.getElementById("run-type").value;
    const distance = parseFloat(document.getElementById("distance").value);
    const distanceUnit = document.getElementById("distance-unit").value;
    const duration = parseFloat(document.getElementById("duration").value);
    const date = document.getElementById("date").value;
    const city = document.getElementById("city").value;

    // Determinamos si vamos a mostrar minutos u horas. toFixed para que nos muestre decimales que serían minutos.
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

    // Creamos el Div del weather information
    const weatherInfoDiv = document.createElement("div");
    weatherInfoDiv.className = "weather-info"; // CAMBIARLE EL STYLE
    // Agregamos el Div weather-info a la lista
    listItem.appendChild(weatherInfoDiv);

    // Llamamos a la función de Weather para mostrarla en la lista
    fetchWeather(city, date, listItem);

    // Agregamos el entry a la lista del History
    runList.appendChild(listItem);

    // Datos para el Local Storage. Key: Value
    storageRun({
      Type: runType,
      Distance: distance,
      Unit: distanceUnit,
      Time: duration,
      Date: date,
      City: city,
    });

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
    listItem.innerHTML = `<strong>Distance and Time Goal:</strong> ${targetDistance} ${targetDistanceUnit} in ${targetTime} hrs`;

    // Agregamos el entry a la lista de los Goals
    goalList.appendChild(listItem);

    // Datos para el Local Storage. Key: Value
    storageGoal({
      Distance: targetDistance,
      Unit: targetDistanceUnit,
      Time: targetTime,
    });

    // Reseteamos el Form
    goalForm.reset();
  }
});
