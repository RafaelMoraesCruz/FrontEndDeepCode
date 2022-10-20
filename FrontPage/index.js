const resultContainer =  document.getElementById('weather')

async function showWeatherRecife(){
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=-8.0584933&lon=-34.8848193&appid=0aca0aee2a32ab0f974e183e25908b87&units=metric")
    if(response.ok){
        const weather = await response.json();
        createLine(weather)
    }
}

function createLine(city){
    const nameLine = document.createElement("p")
    const tempLine = document.createElement("p")
    const situationLine = document.createElement("p")

    nameLine.innerHTML = `<strong>name:</strong> ${city.name}`
    tempLine.innerHTML = `<strong>temperature:</strong> ${Math.round(city.main.temp)}ºC`
    situationLine.innerHTML = `<strong>situation:</strong> ${city.weather[0].main}` 

    resultContainer.appendChild(nameLine)
    resultContainer.appendChild(tempLine)
    resultContainer.appendChild(situationLine)

}

showWeatherRecife()