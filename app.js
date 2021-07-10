const dias = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DiaActual = new Date();

var Cancel = document.getElementById("Cancelar");
Cancel.addEventListener("click", function (){
    document.getElementById("Busqueda").value = "";
});

var CuadroDeBusqueda = document.getElementById("Busqueda");
CuadroDeBusqueda.addEventListener("keypress", function onChangeInput(e){
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        const valueLocation = document.getElementById('Busqueda').value;
        getWeather(valueLocation)
    }
});

var CuadroDeBusqueda = document.getElementById("Buscar");
CuadroDeBusqueda.addEventListener("click", function onChangeInput(e){
        const valueLocation = document.getElementById('Busqueda').value;
        getWeather(valueLocation)
});


const getWeather = async (location) => {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + location +"&units=metric&appid=5ff711b4e64edf3a76e5c6c95af460ff");
    const myJson = await response.json();
    console.log(myJson, new Date());
    document.getElementById('Grados').innerHTML = myJson.main.temp + '°C';
    document.getElementById('Dia').innerHTML = dias[DiaActual.getDay()] + ", ";
    document.getElementById('Hora').innerHTML =  CorrectlyHoursAndMinute(DiaActual.getHours(), DiaActual.getMinutes());
    document.getElementById('ClimaActualEnString').innerHTML = toUpper(myJson.weather[0].description);
    try {
        document.getElementById('PorcentajeDeLluvia').innerHTML = "Rain - " + myJson.rain["1h"] + " mm";
        document.getElementById('PrecipitacionesIcon').src = "Img/Precipitaciones.png";
    } 
    catch (error) {
        document.getElementById('PorcentajeDeLluvia').innerHTML = "No Rain";
        document.getElementById('PrecipitacionesIcon').src = "Img/NoPrecipitaciones.png";
    }
    try {
        document.getElementById('CiudadDentroDeImagen').innerHTML = myJson.name.toUpperCase();
    } 
    catch (error) { 
        document.getElementById('CiudadDentroDeImagen').innerHTML = 'CIUDAD';
    }
    document.getElementById('MaxTemperature').innerHTML = 'Max: ' + myJson.main.temp_max + '°C';
    document.getElementById('MinTemperature').innerHTML = 'Max: ' + myJson.main.temp_min + '°C';
    document.getElementById('Humidity').innerHTML = myJson.main.humidity + '%';
    document.getElementById('WindSpeed').innerHTML = myJson.wind.speed + ' m/s';
    document.getElementById('Pressure').innerHTML = myJson.main.pressure + ' hPa';
    document.getElementById('Visibility').innerHTML = myJson.visibility + ' Mts.';
    document.getElementById('Sunrise').innerHTML = SecondToHoursAndMinute(myJson.sys.sunrise) + ' Hs';
    document.getElementById('Sunset').innerHTML = SecondToHoursAndMinute(myJson.sys.sunset)  + ' Hs';
    SwitchImg(myJson.weather[0].description, "ClimaActualIconoIzq");
    SwitchImg(myJson.weather[0].description, "TipoDeClimaActualIcono")
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

function CorrectlyHoursAndMinute(hours, minute){
    if (hours.toString().length == 1) {
        hours = "0" + hours
    }
    if (minute.toString().length == 1) {
        minute = "0" + minute
    }
    return hours + ":" + minute
}

function SecondToHoursAndMinute(valor){
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(valor * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    
    // Will display time in 10:30 format
    return  hours + ':' + minutes.substr(-2);
}

function SwitchImg(WeatherType, id){
    switch (WeatherType) {
        case "clear sky":
            document.getElementById(id).src = "Img/Soleado.png";
            break;
        case "few clouds":
            document.getElementById(id).src = "Img/ParcialmenteNublado.png";
            break;
        case "scattered clouds":
            document.getElementById(id).src = "Img/Nublado.png";
            break;
        case "broken clouds":
            document.getElementById(id).src = "Img/Churrascos.png";
            break;
        case "shower rain":
            document.getElementById(id).src = "Img/Lluvioso.png";
            break;
        case "rain":
            document.getElementById(id).src = "Img/Lluvioso.png";
            break;
        case "thunderstorm":
            document.getElementById(id).src = "Img/TormentaElectrica.png";
            break;
        case "snow":
            document.getElementById(id).src = "Img/Nevado.png";
            break;
        case "mist":
            document.getElementById(id).src = "Img/Neblina.png";
            break;
        default:
            break;
    }
}

