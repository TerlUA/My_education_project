function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h1 = document.querySelector("#city");
  h1.innerHTML = searchInput.value;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `Today is ${day} ${date}, ${hours}:${minutes}`;

let curTemp = 24;
let displaydTemp = document.querySelector("#temperature");
let unitsC = document.querySelector("#celsius-link");
let unitsF = document.querySelector("#fahrenheit-link");

function convertUnitsF(event) {
  event.preventDefault();
  let toF = curTemp * 1.8 + 32;
  displaydTemp.innerHTML = `${Math.round(toF)}`;
}
function convertUnitsC(event) {
  event.preventDefault();
  displaydTemp.innerHTML = `${curTemp}`;
}
unitsC.addEventListener("click", convertUnitsC);
unitsF.addEventListener("click", convertUnitsF);
// week 5 //
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

function showWeather(response) {
  let currentWeather = document.querySelector("#temperature");
  currentWeather.innerHTML = Math.round(response.data.main.temp);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let info = document.querySelector("#info");
  info.innerHTML = response.data.weather[0].main;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
}
function searchCity(city) {
  let units = "metric";
  let apiKey = "1947f1d36f63208c122ae776702c96f3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "1947f1d36f63208c122ae776702c96f3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", handleSubmit);

searchCity("Kyiv");
