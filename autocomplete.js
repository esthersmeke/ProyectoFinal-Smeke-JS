// Array de Ciudades
const cities = [
  // Ciudades populares para corredores U.S.A
  "New York",
  "Los Angeles",
  "Chicago",
  "San Francisco",
  "Boston",
  "Seattle",
  "Austin",
  "Portland",
  "Denver",
  "Philadelphia",
  // Ciudades populares para corredores Mexico
  "Mexico City",
  "Cancun",
  "Guadalajara",
  "Monterrey",
  "Tulum",
  "Oaxaca",
  "San Cristobal",
  "Merida",
  "Puerto Vallarta",
  "Puebla",
];

// Funcion para el input de autocomplete
function setupCityAutocomplete() {
  const cityInput = document.getElementById("city");

  // Creamos la dataList sugeridas
  const cityDatalist = document.createElement("datalist");
  cityDatalist.id = "city-suggestions";

  // Agregamos al input
  cityInput.setAttribute("list", "city-suggestions");

  // Agregamos para display
  document.body.appendChild(cityDatalist);

  // Evento para los cambios de Ciudad
  cityInput.addEventListener("input", function () {
    const userInput = cityInput.value.toLowerCase();
    const matchingCities = cities.filter((city) =>
      city.toLowerCase().startsWith(userInput)
    );

    // Reseteamos el dataList
    cityDatalist.innerHTML = "";

    // Creamos opcion para seleccionar ciudad sugerida
    matchingCities.forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      cityDatalist.appendChild(option);
    });
  });
}

// Llamamos a la funcion
setupCityAutocomplete();
