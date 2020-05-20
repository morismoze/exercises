let locationInfo = document.querySelector('#location');
let temperatureInfo = document.querySelector('#temperature');
let humidityInfo = document.querySelector('#humidity');
let windInfo = document.querySelector('#wind');
let pressureInfo = document.querySelector('#pressure');
let unit = document.querySelector('#unit');
unit.disabled = true;
let search_input = document.querySelector('#search-input');
let search_btn = document.querySelector('#search-btn');

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }); 
} else {
    alert("Your browser does not support geolocation. Make manual search.");
}

//search functionality
search_input.addEventListener('input', () => {
    search_btn.addEventListener('click', () => {
        let value = search_input.value.trim();
        if(value == null || value == '') {
            alert("You must enter a valid city name!");
        } else {
            const api_key = "94d802007552bd114c032598c745399c";
            const api_url= "https://api.openweathermap.org/data/2.5/weather?q="+value+"&appid="+api_key;
            setDataContainer(api_url);
        }
    });
});

unit.addEventListener('click', () => {
    let value = parseInt(temperatureInfo.textContent);
    if(unit.textContent == "°F") {
        temperatureInfo.textContent = Math.round(value * 9/5 + 32)+" °F";
        unit.textContent = "°C"
    } else {
        temperatureInfo.textContent = Math.round((value - 32) * 5/9)+" °C";
        unit.textContent = "°F";
    }
});


function onSuccess(position) {
    let long = position.coords.longitude;
    let lat = position.coords.latitude;
    const api_key = "94d802007552bd114c032598c745399c";
    const api = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&apikey="+api_key;
    setDataContainer(api);
}

function onError(err) {
    switch(err.code) {
        case err.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
        case err.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case err.TIMEOUT:
          alert("The request to get user location timed out. Try reloading the page.");
          break;
        case err.UNKNOWN_ERROR:
          alert("An unknown error occurred getting your location.");
          break;
    }
}

function setDataContainer(api) {
    parsingToJSON(api).then(data => {
            const country = data.sys.country;
            const city = data.name;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const wind = data.wind.speed;
            const pressure = data.main.pressure; 

            //Set DOM Elements from the API data
            locationInfo.textContent = city + ", " + country;
            temperatureInfo.textContent = Math.round(temperature - 273.15) + " °C";
            humidityInfo.textContent = humidity + " %";
            windInfo.textContent = wind + " m/s";
            pressureInfo.textContent = pressure + " hPa";
            //when data is shown, enable the unit button
            unit.disabled = false;
    });
}

function parsingToJSON(api) {
    return fetch(api).then(response => response.json());
}