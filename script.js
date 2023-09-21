// script.js

document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;

    // Create container and row dynamically
    const container = document.createElement('div');
    container.className = 'container mt-5';
    const countriesRow = document.createElement('div');
    countriesRow.id = 'countriesRow';
    countriesRow.className = 'row';
    container.appendChild(countriesRow);
    body.appendChild(container);

    // Fetching Data from REST Countries API
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries => {        
          countries.forEach(country => {
    const countryCol = document.createElement('div');
    countryCol.className = 'col-lg-4 col-sm-12';

    const card = document.createElement('div');
    card.className = 'card mb-4';

    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    cardHeader.textContent = country.name.official;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
              //console.log(country.flag, country.name)
              console.log(country)
              const flagImg = document.createElement('img');
            


    flagImg.src = country.flags.png
    flagImg.alt = `Flag of ${country.name}`;
    flagImg.width = '100';
    flagImg.className = 'img-fluid mb-2';



    const capitalP = document.createElement('p'); // Ensure this is defined before appending to cardBody.
    capitalP.textContent = `Capital: ${country.capital}`;

    const latlngP = document.createElement('p');
    latlngP.textContent = `LatLng: ${country.latlng[0]}, ${country.latlng[1]}`;

    const regionP = document.createElement('p');
    regionP.textContent = `Region: ${country.region}`;

    const codeP = document.createElement('p');
    codeP.textContent = `Code: ${country.alpha2Code}`;

    const weatherBtn = document.createElement('button');
    weatherBtn.className = 'btn btn-primary';
    weatherBtn.textContent = 'Click for Weather';
    weatherBtn.onclick = () => fetchWeatherData(country);

    cardBody.append(flagImg, capitalP, latlngP, regionP, codeP, weatherBtn);
    card.append(cardHeader, cardBody);
    countryCol.append(card);
    countriesRow.append(countryCol);
});


        })
        .catch(error => console.error('Error fetching country data:', error));
});

// Fetch Weather Data function
function fetchWeatherData(country) {
    const API_KEY =  "f3b56d82ca84d0d5450cdb66b735179d";
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${API_KEY}&units=metric`;

    fetch(BASE_URL)
        .then(response => response.json())
        .then(data => {
            alert(`Weather in ${country.capital}: ${data.weather[0].description}. Temperature: ${data.main.temp}°C`);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}
