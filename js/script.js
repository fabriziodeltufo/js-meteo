// recupero valori
let meteoCity = document.querySelector(".meteo-city");
let meteoInfo = document.querySelector(".meteo-info");
let meteoIcon = document.querySelector(".meteo-icon");
let meteoHum = document.querySelector(".meteo-hum");
let meteoTemp = document.querySelector(".meteo-temp");

let htmlElement = document.documentElement;

console.log(meteoInfo);

navigator.geolocation.getCurrentPosition(onSuccess, onError);

function onError() {
  meteoCity.innerText = "ERROR";
  meteoCity.style.color = "Red";
  meteoInfo.innerText = "Geolocation disabled ...";
  meteoInfo.style.color = "red";
  meteoIcon.src = "img/geolocation_disabled.png";
  meteoHum.innerText = "";
  meteoTemp.innerText = "";

  // rimuovo js-loading class
  htmlElement.className = "";
}

async function onSuccess(position) {
  // recupero delle coordinate
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  //   creazione endpoint
  let END_POINT = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang='it'`;

  //   chiamata alle api
  let response = await fetch(END_POINT);

  //   conversione a JSON
  let data = await response.json();
  let iconCode = data.weather[0].icon;

  // console.log(data);

  meteoCity.innerText = data.name;
  meteoInfo.innerText = data.weather[0].description;
  meteoIcon.alt = data.weather[0].description;
  meteoIcon.src = `img/${iconCode}.png`;
  meteoHum.innerText = `Hum : ${data.main.humidity} %`;
  meteoTemp.innerText = `Temp : ${Math.floor(data.main.temp)} ℃`;

  // rimuovo js-loading class
  htmlElement.className = "";
}
