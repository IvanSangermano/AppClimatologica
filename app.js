const dias = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DiaActual = new Date();
var CuadroDeBusqueda = document.getElementById("Busqueda");
CuadroDeBusqueda.addEventListener("keypress", function onChangeInput(e){
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        const valueLocation = document.getElementById('Busqueda').value;
        getLocation(valueLocation)
    }
});


const getLocation = async (location) => {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + location +"&units=metric&appid=5ff711b4e64edf3a76e5c6c95af460ff");
    const myJson = await response.json();
    console.log(myJson, new Date());
    document.getElementById('Grados').innerHTML = myJson.main.temp + '°C';
    document.getElementById('Dia').innerHTML = dias[DiaActual.getDay()];
    document.getElementById('Hora').innerHTML = DiaActual.getHours() + ':' + DiaActual.getMinutes();
    document.getElementById('ClimaActualEnString').innerHTML = toUpper(myJson.weather[0].description);
    try {document.getElementById('PorcentajeDeLluvia').innerHTML = "Rain - " + myJson.rain["1h"] + " mm";} 
    catch (error) {document.getElementById('PorcentajeDeLluvia').innerHTML = "No Rain";}
    try {
        document.getElementById('CiudadDentroDeImagen').innerHTML = myJson.name.toUpperCase();
    } 
    catch (error) { document.getElementById('CiudadDentroDeImagen').innerHTML = 'CIUDAD';}
    document.getElementById('MaxTemperature').innerHTML = 'Max: ' + myJson.main.temp_max + '°C';
    document.getElementById('MinTemperature').innerHTML = 'Max: ' + myJson.main.temp_min + '°C';
    document.getElementById('Humidity').innerHTML = myJson.main.humidity + '%';
    document.getElementById('WindSpeed').innerHTML = myJson.wind.speed + ' m/s';
    document.getElementById('Pressure').innerHTML = myJson.main.pressure + ' hPa';
    document.getElementById('Visibility').innerHTML = myJson.visibility + ' Mts.';
    document.getElementById('Sunrise').innerHTML = SecondToHoursAndMinute(myJson.sys.sunrise) + ' Hs';
    document.getElementById('Sunset').innerHTML = SecondToHoursAndMinute(myJson.sys.sunset)  + ' Hs';
}

function toUpper(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(function(Word) {
            return Word[0].toUpperCase() + Word.substr(1);
        })
        .join(' ');
}

function SecondToHoursAndMinute(valor){
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(valor * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    
    // Will display time in 10:30 format
    return hours + ':' + minutes.substr(-2);
}

