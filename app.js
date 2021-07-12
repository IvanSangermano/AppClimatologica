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

    const docBusqueda = document.getElementById('Busqueda')
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + location +"&units=metric&appid=5ff711b4e64edf3a76e5c6c95af460ff");  
    const myJson = await response.json();
    console.log("myJson", myJson);

    var RetornoBusquedaFallida = document.getElementById('Busqueda').value;

    if (myJson.message == "city not found") {
        docBusqueda.value = "Error, City not found";
        docBusqueda.style.color = "red";
        setTimeout(() => {
            docBusqueda.value = RetornoBusquedaFallida;
            docBusqueda.style.color = "black";
        }, 1500);
        return;
    }

    var diaDeHoy = dias[DiaActual.getDay()];

    document.getElementById('Grados').innerHTML = myJson.main.temp + '°C';
    document.getElementById('Dia').innerHTML = diaDeHoy + ", ";
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
    document.getElementById('MaxTemperature').innerHTML = myJson.main.temp_max + '°C';
    document.getElementById('MinTemperature').innerHTML = myJson.main.temp_min + '°C';
    document.getElementById('Humidity').innerHTML = myJson.main.humidity + '%';
    document.getElementById('WindSpeed').innerHTML = myJson.wind.speed + ' m/s';
    document.getElementById('Pressure').innerHTML = myJson.main.pressure + ' hPa';
    document.getElementById('Visibility').innerHTML = myJson.visibility + ' Mts.';
    document.getElementById('Sunrise').innerHTML = SecondToHoursAndMinute(myJson.sys.sunrise) + ' Hs';
    document.getElementById('Sunset').innerHTML = SecondToHoursAndMinute(myJson.sys.sunset)  + ' Hs';

    SwitchImg(myJson.weather[0].id, "ClimaActualIconoIzq");
    SwitchImg(myJson.weather[0].id, "TipoDeClimaActualIcono")

    const lat = myJson.coord.lat;
    const lon = myJson.coord.lon;

    getWeatherHistory(lat, lon, diaDeHoy);
}
const getWeatherHistory = async (latitud, longuitud, diaDeHoy) => { 
    const response = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitud +"&lon=" + longuitud+ "&units=metric&exclude=current,minutely,hourly,alerts&appid=5ff711b4e64edf3a76e5c6c95af460ff");  
    const myJson2 = await response.json();
    console.log("myJson",myJson2);

   for (let i = 1; i <= 7; i++) {
       var GradosMax = document.getElementById("GradosMaxDia" + i);
       GradosMax.innerHTML = myJson2.daily[i-1].temp.max;
       var GradosMin = document.getElementById("GradosMinDia" + i);
       GradosMin.innerHTML = myJson2.daily[i-1].temp.min;
   }

   const firstpart = dias.splice(0, dias.indexOf(diaDeHoy));
   const newArrayDay = dias.concat(firstpart);

   for (let j = 0; j < 7; j++) {
       var DayDocument = document.getElementById("Dia" + (j+1));
       DayDocument.innerHTML = newArrayDay[j].substring(0,3);
       SwitchImg(myJson2.daily[j].weather[0].id, "imgDia" + (j+1));
   }
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

function SwitchImg(WeatherTypeID, id){
    if(WeatherTypeID >= 200 || WeatherTypeID <= 232){
        document.getElementById(id).src = "Img/TormentaElectrica.png";
    }

    if(WeatherTypeID >= 300 && WeatherTypeID <= 310 || WeatherTypeID == 771){
        document.getElementById(id).src = "Img/Churrascos.png";
    }

    if(WeatherTypeID >= 311 && WeatherTypeID <= 321){
        document.getElementById(id).src = "Img/Lluvioso.png";
    }

    if(WeatherTypeID >= 600 && WeatherTypeID <= 622){
        document.getElementById(id).src = "Img/Nevado.png";
    }

    if(WeatherTypeID >= 701 && WeatherTypeID <= 770){
        document.getElementById(id).src = "Img/Neblina.png";
    }           

    if(WeatherTypeID == 800){
        document.getElementById(id).src = "Img/Soleado.png";
    }
          
    if(WeatherTypeID == 801||WeatherTypeID == 802){ 
        document.getElementById(id).src = "Img/ParcialmenteNublado.png";
    }

    if(WeatherTypeID == 803||WeatherTypeID == 804){
        document.getElementById(id).src = "Img/Nublado.png";
    }   
}

