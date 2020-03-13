window.addEventListener('load', () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let long = position.coords.longitude;
            let lat = position.coords.latitude;
            const api_key = "94d802007552bd114c032598c745399c";
            const api = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&apikey="+api_key;

            setDataContainer(api);
        }, error);
    } else {
        //do nothing -> search feature is possible!
    }

    //search functionality
    let search_input = document.querySelector('#search-input');
    let search_btn = document.querySelector('#search-btn');

    search_input.addEventListener('input', () => {
        search_btn.addEventListener('click', () => {
            let value = search_input.value.trim();
            if(value == null) {
                alert("You must enter a city name!");
            } else {
                const api_key = "94d802007552bd114c032598c745399c";
                const api = "https://api.openweathermap.org/data/2.5/weather?q="+value+"&appid="+api_key;
                setDataContainer(api);
            }
        });
        
    });
});

function setDataContainer(api) {
    let locationInfo = document.querySelector('#location');
    let temperatureInfo = document.querySelector('#temperature');
    let humidityInfo = document.querySelector('#humidity');
    let windInfo = document.querySelector('#wind');
    let pressureInfo = document.querySelector('#pressure');
    //TODO: unit(C, F) change -> let unit = document.querySelector('.unit');
    
    parsingToJSON(api).then(data => {
            const country = data.sys.country;
            const city = data.name;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const wind = data.wind.speed;
            const pressure = data.main.pressure; 

            //Set DOM Elements from the API
            locationInfo.textContent = city + ", " + country;
            temperatureInfo.textContent = Math.round(temperature - 273.15) + " °C";
            humidityInfo.textContent = humidity + " %";
            windInfo.textContent = wind + " m/s";
            pressureInfo.textContent = pressure + " hPa";

            //TODO: unit change
            /* degreeSection.addEventListener('click', () => {
                if(unit.textContent == "°F") {
                    temperatureDegree.textContent = Math.round(temp - 273.15);
                    unit.textContent = "°C"
                } else {
                    temperatureDegree.textContent = Math.round(temp * 9/5 -459.67);
                    unit.textContent = "°F";
                }
            }); */
    });
}

function parsingToJSON(api) {
    return fetch(api).then(response => response.json());
}

function error(err) {
    let h1 = document.getElementsByTagName('h1');
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