new Vue({
 el: "#app",
 template: `
 <div>
 	<h1 style='text-align:center'> Vue-Metereología </h1>
  <p> Introduce el nombre de la ciudad </p>
  
  <input v-model="city" placeholder="Nombre de la ciudad..." style='text-align:center'>
  <button style="display:inline;" @click="getWeather(city)">Ver Meteorología</button>

    <h3 v-if='city_error' style='color:red'>
        Lo sentimos, esta ciudad no existe o no está en nuestra base de datos! Intentalo de nuevo.
    </h3>
    <h3 v-if='gotResponse'>Displaying weather for {{ret_city}}</h3>
    <p class="valueL">Temperatura: {{temp}} {{degreeSymbol}}</p> 
    <p class="valueR">Sensación térmica: {{feels_like}} {{degreeSymbol}}</p>


    <p class="valueL">Min : {{temp_min}} {{degreeSymbol}}</p> 
    <p class="valueR">Max: {{temp_max}} {{degreeSymbol}}</p>


    <p class="valueL">Presión: {{pressure}}</p> 
    <p class="valueR">Humedad: {{humidity}}</p>
    <p class="valueR">Visibilidad: {{visibility}}</p>

    <p class="valueR">País: {{country}}</p>

    <br><hr>
    <p style='text-align:center'> Toda la información meteorológica la provee Open Weather Map (openweathermap.org) </p>
 </div>
 `,
 data: {
    city: '',
    temp: '',
    feels_like: '',
    temp_min: '',
    temp_max: '',
    pressure: '',
    humidity: '',
    visibility: '',
    country: '',
    weather_API_key: weather_API_key,
    degreeSymbol: '',
    ret_city: '',
    city_error: false,
    gotResponse: false
  },
  methods: {
    getWeather(city) {
      fetch('https://api.openweathermap.org/data/2.5/weather?q='+this.city+'&units=metric&appid='+ this.weather_API_key)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.cod === '404' && data.message === 'city not found'){
            this.city_error = true;
        } else {
            this.city_error = false;
            this.gotResponse = true;
            this.temp = data.main.temp;
            this.feels_like = data.main.feels_like;
            this.temp_min = data.main.temp_min;
            this.temp_max = data.main.temp_max;
            this.pressure = data.main.pressure + ' mb';
            this.humidity = data.main.humidity + ' %';
            this.visibility = data.visibility + ' meters';
            this.country = data.sys.country;
            this.degreeSymbol = '℃';
            this.ret_city = this.city;
            this.city = '';
        }
        });
    }
  }
});
