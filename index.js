// Store the weather data of added cities
let citiesWeatherData = [];

// Function to add a city to the dashboard
// Function to add a city to the dashboard
// Function to add a city to the dashboard
// Function to add a city to the dashboard
function addCity() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();

    // Check if the input is empty
    if (cityName === '') {
        alert('Please enter a city name.');
        return;
    }

    // Check if the city is already added
    if (citiesWeatherData.find(city => city.name.toLowerCase() === cityName.toLowerCase())) {
        alert('City already added.');
        return;
    }

    // Call the weather API to fetch data for the given city
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found.');
            }
            return response.json();
        })
        .then(data => {
            // Handle the API response and add city data to the dashboard
            const cityWeather = {
                name: data.name,
                temp: data.main.temp,
                temp_min: data.main.temp_min,
                temp_max: data.main.temp_max,
                weather: data.weather[0].main,
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                wind_speed: data.wind.speed,
                wind_direction: data.wind.deg,
                clouds: data.clouds.all,
                country: data.sys.country,
                sunrise: data.sys.sunrise,
                sunset: data.sys.sunset
            };

            citiesWeatherData.push(cityWeather);
            renderWeatherCards();
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('City not found. Please enter a valid city name.');
        });

    cityInput.value = '';
}


// Function to delete a city from the dashboard
function deleteCity(cityName) {
    citiesWeatherData = citiesWeatherData.filter(city => city.name !== cityName);
    renderWeatherCards();
}

// Function to dynamically generate weather cards
function renderWeatherCards() {
    const weatherCardsContainer = document.getElementById('weatherCards');
    weatherCardsContainer.innerHTML = '';

    // Sort cities by temperature (lowest to highest)
    citiesWeatherData.sort((a, b) => a.temp - b.temp);

    citiesWeatherData.forEach(city => {
        const weatherCard = document.createElement('div');
        weatherCard.className = 'weather-card';

        const weatherIcon = document.createElement('img');
        weatherIcon.className = 'weather-icon';
        // Add the appropriate weather icon URL based on the condition (rainy, sunny, cloudy, windy) using a switch case.
        // You can use the OpenWeatherMap documentation to get the icon URLs for different weather conditions.
        // Example: weatherIcon.src = getWeatherIconURL(city.weather);

        const weatherInfo = document.createElement('div');
        weatherInfo.className = 'weather-info';
        weatherInfo.innerHTML = `
            <div>
                <h2>${city.name}, ${city.country}</h2>
                <p>Temperature: ${city.temp}°C (High: ${city.temp_max}°C, Low: ${city.temp_min}°C)</p>
                <p>Weather: ${city.weather}</p>
            </div>
            <div>
                <p>Humidity: ${city.humidity}%</p>
                <p>Pressure: ${city.pressure} hPa</p>
                <p>Wind Speed: ${city.wind_speed} m/s</p>
                <p>Cloudiness: ${city.clouds}%</p>
                <p>Sunrise: ${new Date(city.sunrise * 1000).toLocaleTimeString()}</p>
                <p>Sunset: ${new Date(city.sunset * 1000).toLocaleTimeString()}</p>
            </div>
        `;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => deleteCity(city.name));

        weatherCard.appendChild(weatherIcon);
        weatherCard.appendChild(weatherInfo);
        weatherCard.appendChild(deleteButton);
        weatherCardsContainer.appendChild(weatherCard);
    });
}

// Event listener for the "Add" button
const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addCity);
