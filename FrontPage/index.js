const resultContainer =  document.getElementById('weather')
const timeLine = document.createElement("p")

setInterval(updateTime,1000)

function updateTime(){
    var time = new Date().toLocaleTimeString()
    timeLine.innerHTML = "<strong>time:</strong>"+time
}

async function showWeatherRecife(){
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=-8.0584933&lon=-34.8848193&appid=0aca0aee2a32ab0f974e183e25908b87&units=metric")
    if(response.ok){
        const weather = await response.json();
        createLine(weather,timeLine)
    }
}

function createLine(city,timeLine){
    const nameLine = document.createElement("p")
    const tempLine = document.createElement("p")
    const situationLine = document.createElement("p")
    var time = new Date().toLocaleTimeString()


    nameLine.innerHTML = `<strong>name:</strong> ${city.name}`
    tempLine.innerHTML = `<strong>temperature:</strong> ${Math.round(city.main.temp)}ºC`
    situationLine.innerHTML = `<strong>situation:</strong> ${city.weather[0].main}`
    timeLine.innerHTML = `<strong>time:</strong> ${time}`

    resultContainer.appendChild(nameLine)
    resultContainer.appendChild(tempLine)
    resultContainer.appendChild(situationLine)
    resultContainer.appendChild(timeLine)
}

showWeatherRecife()