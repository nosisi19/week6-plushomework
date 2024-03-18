function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function searchCity(city) {
  let apiKey = "t2f442498b6eeb2eff8a231bc0a6oce8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeatherdate);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "sunday",
    "Monday",
    "Tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0:(minutes)`;
    return `${day} & ${hours}:${minutes}`;
  }
  console.log(`${day} ${hours}`);
}
function updateWeatherdate(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature;
  temperatureElement.innerHTML = Math.round(temperature);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#condition");
  descriptionElement.innerHTML = response.data.condition.description;
  let HumidityElement = document.querySelector("#Humidity");
  HumidityElement.innerHTML = `${response.data.temperature.humidity} %`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  let timeElemet = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  timeElemet.innerHTML = formatDate(date);
}
