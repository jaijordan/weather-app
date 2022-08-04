
let fetchData 
let cityName = 'New York'
let weatherIconId
const url = 'https://api.openweathermap.org/data/2.5/weather?q='
const key = credentials.apiKey
const displayBox = document.querySelector('.display-box') 
const userInputCity = document.querySelector('.user-input-city')
const userCityBtn = document.querySelector('.submit')
const displayVals = []
const weatherIcon = document.querySelector('.image')
const weatherIconUrl1 = 'http://openweathermap.org/img/wn/'
const weatherIconUrl2 = '@2x.png'
const weatherContainer = document.querySelector('.weather-container')
const searchContainer = document.querySelector('.container')

userCityBtn.addEventListener('click', () => {
    searchContainer.style.display = 'none';
    cityName = userInputCity.value.trim();
    fetchData = fetch(url + cityName + key)
    getWeather()
    weatherContainer.style.display = "block";
})

const getWeather = () => {
    fetchData.then(response => {

        return response.json();
        
    }) .then (data => {
     
        const temp = [data].map(data => data.main.temp);
        const description = [data].map(data => data.weather[0].description);
        const name = [data].map(data => data.name);

        weatherIconId = [data].map(data => data.weather[0].icon)
        
        displayVals.push(tempConverter(temp) + '°')
        displayVals.push(description)
        displayVals.push(name)
        
        weatherIcon.src = weatherIconUrl1 + weatherIconId + weatherIconUrl2

        displayBox.innerHTML = displayVals.map(i => `<li>${i}</li>`).join('');
 
    });
}


const tempConverter = (kelvin) => {
    //kelvin = [data].map(data => data.main.temp);
    return Math.round((kelvin - 273.15) * 9/5 + 32)
}
