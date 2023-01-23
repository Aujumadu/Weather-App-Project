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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
   
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="70"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> ${Math.round(
              forecastDay.temp.max
            )}° </span>
            <span class="weather-forecast-temperature-min"> ${Math.round(
              forecastDay.temp.min
            )}° </span>
          </div>
        </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5da7b2dc058f07286fea39c4cee516a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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

  getForecast(response.data.coord);
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
