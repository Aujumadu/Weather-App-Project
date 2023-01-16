let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let minutes = now.getMinutes();
let thisDay = document.querySelector("#this-day");
let thisDate = document.querySelector("#this-date");
let minSecs = document.querySelector(".min-secs");

minutes = minutes < 10 ? "0" + minutes : minutes;
thisDay.innerHTML = `${days[now.getDay()]}, `;
thisDate.innerHTML = `${
  months[now.getMonth()]
} ${now.getDate()}, ${now.getFullYear()}.`;
minSecs.innerHTML = `${now.getHours()}:${minutes}`;

function showWeather(response) {
  let weatherIcon = document.querySelector("#description-icon");
  document.querySelector("#city-name").innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#celsius");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#describe").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
}

function find(city) {
  let apiKey = "5da7b2dc058f07286fea39c4cee516a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function cityPlace(event) {
  event.preventDefault();
  let city = document.querySelector("#location-of-interest").value;
  find(city);
}

let forms = document.querySelector("form");
forms.addEventListener("submit", cityPlace);

function myLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5da7b2dc058f07286fea39c4cee516a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}

function showfahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#celsius");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showcelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#celsius");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let currentLoc = document.querySelector(".current-city");
currentLoc.addEventListener("click", getLocation);

let celsiusTemperature = null;

let fahrenheitlink = document.querySelector("#fahrenheit-convert");
fahrenheitlink.addEventListener("click", showfahrenheitTemperature);

let celsiuslink = document.querySelector("#celsius-convert");
celsiuslink.addEventListener("click", showcelsiusTemperature);

find("Benin City");
