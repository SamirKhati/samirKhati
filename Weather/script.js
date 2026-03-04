// Sidebar Elements
const userLocation = document.getElementById('userLocation'),
      converter = document.getElementById('converter'),
      searchIcon = document.querySelector('.fa-search'),
      weatherIcon = document.querySelector('.weatherIcon'),
      temperature = document.querySelector('.temperature'),
      feelslike = document.querySelector('.feelslike'),
      description = document.querySelector('.description'),
      date = document.querySelector('.date'),
      city = document.querySelector('.city');

// Highlights Elements (Using IDs to match your HTML)
const Hvalue = document.getElementById('Hvalue'),    // humidity
      Wvalue = document.getElementById('Wvalue'),    // Wind Speed
      Cvalue = document.getElementById('Cvalue'),    // Clouds
      UVvalue = document.getElementById('UVvalue'),  // UV Index
      Pvalue = document.getElementById('Pvalue'),    // Pressure (Note: ID in HTML is Pvalue)
      SRvalue = document.querySelector('.SRValue'),  // Sunrise (Note: class is SRValue)
      SSvalue = document.querySelector('.SSValue'),  // Sunset (Note: class is SSValue)
      Forecast = document.querySelector('.forecast');

const API_KEY = "93d84073193d9fafdba12fd6e67d3253";

function findUserLocation() {
    const location = userLocation.value.trim();
    if (!location) {
        alert("Please enter a city name");
        return;
    }

    const WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

    fetch(WEATHER_API_ENDPOINT)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                alert("City not found. Please check the spelling.");
                return;
            }

            // Update Primary Sidebar UI
            city.innerHTML = `${data.name}, ${data.sys.country}`;
            temperature.innerHTML = `${Math.round(data.main.temp)}°C`;
            feelslike.innerHTML = `Feels like ${Math.round(data.main.feels_like)}°C`;
            
            const weatherDesc = data.weather[0].description;
            description.innerHTML = weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1);
            
            // Update Weather Icon
            const iconCode = data.weather[0].icon;
            weatherIcon.style.backgroundImage = `url("https://openweathermap.org/img/wn/${iconCode}@2x.png")`;

            // Use coordinates for the detailed OneCall data (UV, Clouds, etc.)
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            const WEATHER_DATA_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&exclude=minutely&units=metric`;

            return fetch(WEATHER_DATA_ENDPOINT);
        })
        .then(response => {
            if (!response) return; 
            return response.json();
        })
        .then(data => {
            if (!data) return;
            
            // Update "Today's Highlights"
            Hvalue.innerHTML = `${data.current.humidity}%`;
            Wvalue.innerHTML = `${data.current.wind_speed} m/s`;
            UVvalue.innerHTML = data.current.uvi;
            Pvalue.innerHTML = `${data.current.pressure} hPa`;
            Cvalue.innerHTML = `${data.current.clouds}%`;
            
            // Update Sunrise/Sunset
            SRvalue.innerHTML = new Date(data.current.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            SSvalue.innerHTML = new Date(data.current.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            // Update Sidebar Date
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            date.innerHTML = new Date(data.current.dt * 1000).toLocaleDateString(undefined, options);
        })
        .catch(err => {
            console.error("Error fetching weather data:", err);
        });
}

// Search Listeners
searchIcon.addEventListener('click', findUserLocation);
userLocation.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') findUserLocation();
});