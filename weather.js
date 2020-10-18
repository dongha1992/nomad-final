const weatherSpan = document.querySelector(".weather")
const COORDS_V1 = "coords-v1"
const API_KEY = "f20b980603cf5c8700dfff398b2c001b"


function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(response) {
        return response.json()
    }).then(function(json) {
        const temp = json.main.temp
        const place = json.name
        weatherSpan.innerText = `${temp}, ${place}`
    })
}


function handleGeoSuccess(position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const coordObj = {
        longitude,
        latitude
    }
    saveCoords(coordObj)
    getWeather(latitude, longitude)
}

function handleGeoError() { console.log("error") }

function askCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}


function saveCoords(coordObj) { localStorage.setItem(COORDS_V1, JSON.stringify(coordObj)) }

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS_V1)
    if (loadedCoords === null) {
        askCoords()
    } else {
        const parseCoords = JSON.parse(loadedCoords)
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }
}
loadCoords()