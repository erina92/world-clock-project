function displayTime() {
  let londonElement = document.querySelector("#london");
  if (londonElement) {
    let londonTimeElement = londonElement.querySelector(".time");
    londonTimeElement.innerHTML = moment()
      .tz("Europe/London")
      .format("hh:mm:ss [<small>]A[</small>]");
    let londonDateElement = londonElement.querySelector(".date");
    londonDateElement.innerHTML = moment()
      .tz("Europe/London")
      .format("MMMM Do YYYY");
  }

  let newYorkElement = document.querySelector("#new-york");
  if (newYorkElement) {
    let newYorkTimeElement = newYorkElement.querySelector(".time");
    newYorkTimeElement.innerHTML = moment()
      .tz("America/New_York")
      .format("hh:mm:ss [<small>]A[</small>]");
    let newYorkDateElement = newYorkElement.querySelector(".date");
    newYorkDateElement.innerHTML = moment()
      .tz("America/New_York")
      .format("MMMM Do YYYY");
  }

  let seoulElement = document.querySelector("#seoul");
  if (seoulElement) {
    let seoulTimeElement = seoulElement.querySelector(".time");
    seoulTimeElement.innerHTML = moment()
      .tz("Asia/Seoul")
      .format("hh:mm:ss [<small>]A[</small>]");
    let seoulDateElement = seoulElement.querySelector(".date");
    seoulDateElement.innerHTML = moment()
      .tz("Asia/Seoul")
      .format("MMMM Do YYYY");
  }

  let sydneyElement = document.querySelector("#sydney");
  if (sydneyElement) {
    let sydneyTimeElement = sydneyElement.querySelector(".time");
    sydneyTimeElement.innerHTML = moment()
      .tz("Australia/Sydney")
      .format("hh:mm:ss [<small>]A[</small>]");
    let sydneyDateElement = sydneyElement.querySelector(".date");
    sydneyDateElement.innerHTML = moment()
      .tz("Australia/Sydney")
      .format("MMMM Do YYYY");
  }
}

function displayCity(event) {
  let cityTimeZone = event.target.value;
  let cityName = event.target.options[event.target.selectedIndex].text;
  clearInterval(interval);

  updateCityInterval(cityTimeZone, cityName);
  interval = setInterval(() => {
    updateCityInterval(cityTimeZone, cityName);
  }, 1000);
}

function updateCityInterval(cityTimeZone, cityName) {
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
    cityName = cityTimeZone.replace("_", " ").split("/")[1];
  }
  let cityTime = moment().tz(cityTimeZone).format("hh:mm:ss");
  let cityAmPm = moment().tz(cityTimeZone).format("A");
  let cityDate = moment().tz(cityTimeZone).format("MMMM Do YYYY");

  let citiesElement = document.querySelector("#cities");

  if (cityTimeZone.length > 0) {
    citiesElement.innerHTML = `
          <div class="row d-flex justify-content-between" id="london">
          <div class="col 6 city-date">
            <h2>${cityName}</h2>
            <p class="date">${cityDate}</p>
          </div>
          <div class="col 6">
            <h2 class="time">${cityTime} <small>${cityAmPm}</small></h2>
          </div>
          <a href="index.html">All cities</a>
  `;
  } else {
    location.reload();
  }
}

let interval;
displayTime();
interval = setInterval(displayTime, 1000);

let citySelector = document.querySelector("#city");

citySelector.addEventListener("change", displayCity);
