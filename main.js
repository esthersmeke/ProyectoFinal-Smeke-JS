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
  // Function to load and render runs from Local Storage (Added)
  function loadRunsFromLocalStorage() {
    const runList = document
      .getElementById("run-list")
      .getElementsByTagName("ul")[0];
    // Get the runs from Local Storage
    const storedRunData = JSON.parse(localStorage.getItem("runs")) || [];

    // Iterate through the stored run data and render each run in the running history
    storedRunData.forEach((run) => {
      const listItem = document.createElement("li");

      const runType = run.Type;
      const distance = run.Distance;
      const distanceUnit = run.Unit;
      const duration = run.Time;
      const date = run.Date;
      const city = run.City;
      let durationDisplay;

      // Determinamos si vamos a mostrar minutos u horas. toFixed para que nos muestre decimales que serían minutos.
      if (duration >= 1) {
        durationDisplay = `${duration.toFixed(2)} hrs`;
      } else {
        durationDisplay = `${(duration * 60).toFixed(0)} min`;
      }

      // Creamos un div para el Run info
      const runInfoDiv = document.createElement("div");
      runInfoDiv.innerHTML = `<strong>${runType}</strong>  ${distance} ${distanceUnit} in ${durationDisplay}, Date: ${date}`;

      // Creamos un div para el Weather info
      const weatherInfoDiv = document.createElement("div");
      weatherInfoDiv.className = "weather-info";

      // Agregamos los divs de Run info y Weather info a la lista
      listItem.appendChild(runInfoDiv);
      // Agregamos un Br entre el run y el weather
      listItem.appendChild(document.createElement("br"));
      listItem.appendChild(weatherInfoDiv);

      // Agregamos animacion fade-in a los list item
      listItem.classList.add("fade-in");

      // Llamamos a la función de Weather para mostrarla en la lista
      fetchWeather(city, date, listItem);

      // Agregamos el entry a la lista del History
      runList.appendChild(listItem);
    });
  }
  // Function to load and render goals from Local Storage
  function loadGoalsFromLocalStorage() {
    const goalList = document
      .getElementById("goal-list")
      .getElementsByTagName("ul")[0];

    // Get the goals from Local Storage
    const storedGoalData = JSON.parse(localStorage.getItem("goals")) || [];

    // Iterate through the stored goal data and render each goal
    storedGoalData.forEach((goal) => {
      const listItem = document.createElement("li");

      const targetDistance = goal.Distance;
      const targetDistanceUnit = goal.Unit;
      const targetTime = goal.Time;

      listItem.innerHTML = `<strong>Distance and Time Goal:</strong> ${targetDistance} ${targetDistanceUnit} in ${targetTime} hrs`;

      // Agregamos el entry a the goals list
      goalList.appendChild(listItem);
    });
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

      // Convert the temperature from Kelvin to Celsius and round to two decimal places
      const temperature = (weatherData.main.temp - 273.15).toFixed(0);

      // Display de la temperatura redondeada para cada Run
      const weatherInfo = `Weather: ${weatherData.weather[0].description}, Temperature: ${temperature}°C`;

      // Seleccion del Div de weather y detectamos si hay error
      const weatherInfoDiv = listItem.querySelector(".weather-info");
      if (weatherInfoDiv) {
        weatherInfoDiv.textContent = weatherInfo;
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  function addRun(event) {
    event.preventDefault();

    const runType = document.getElementById("run-type").value;
    const distance = parseFloat(document.getElementById("distance").value);
    const distanceUnit = document.getElementById("distance-unit").value;
    const duration = parseFloat(document.getElementById("duration").value);
    const date = document.getElementById("date").value;
    const city = document.getElementById("city").value;

    let durationDisplay;
    if (duration >= 1) {
      durationDisplay = `${duration.toFixed(2)} hrs`;
    } else {
      durationDisplay = `${(duration * 60).toFixed(0)} min`;
    }

    const listItem = document.createElement("li");
    const runInfoDiv = document.createElement("div");
    runInfoDiv.innerHTML = `<strong>${runType}</strong> ${distance} ${distanceUnit} in ${durationDisplay}, Date: ${date}`;
    const weatherInfoDiv = document.createElement("div");
    weatherInfoDiv.className = "weather-info";

    listItem.appendChild(runInfoDiv);
    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(weatherInfoDiv);

    listItem.classList.add("fade-in");
    fetchWeather(city, date, listItem);

    runList.appendChild(listItem);

    storageRun({
      Type: runType,
      Distance: distance,
      Unit: distanceUnit,
      Time: duration,
      Date: date,
      City: city,
    });

    runForm.reset();
  }

  function setGoal(event) {
    event.preventDefault();

    const targetDistance = document.getElementById("target-distance").value;
    const targetDistanceUnit = document.getElementById(
      "target-distance-unit"
    ).value;
    const targetTime = parseFloat(document.getElementById("target-time").value);

    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>Distance and Time Goal:</strong> ${targetDistance} ${targetDistanceUnit} in ${targetTime} hrs`;

    goalList.appendChild(listItem);

    storageGoal({
      Distance: targetDistance,
      Unit: targetDistanceUnit,
      Time: targetTime,
    });

    goalForm.reset();
  }

  loadRunsFromLocalStorage();
  loadGoalsFromLocalStorage();
});
