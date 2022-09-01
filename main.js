



function weatherForcast() {

    const city = document.querySelector("#city").value;
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=49cc8c821cd2aff9af04c9f98c36eb74&units=metric`)
        .then(function (response) {
            // handle success
            console.log(response);




            let dayWise = [];
            let dateOfMonth = null;
            let counter = -1;
            response.data.list.map(eachHour => {
                let temDateOfMoth = new Date(eachHour.dt_txt).getDate();
                console.log("temDateOfMoth", temDateOfMoth)

                if (dateOfMonth !== temDateOfMoth) {
                    counter++;
                    dateOfMonth = temDateOfMoth;

                }

                if (!dayWise[counter]) { dayWise[counter] = [] }
                dayWise[counter].push(eachHour)
            })
            console.log("dayWise: ", dayWise);


            dayWise = dayWise.map((eachDay) => {

                return eachDay.reduce((previousEachHour, currentEachHour) => {
console.log("prevouis",previousEachHour,"Current", currentEachHour)
                     
                    let sumTemp = Number(previousEachHour.main.temp) + Number(currentEachHour.main.temp)
                    
                    let sumMinTemp = Number(previousEachHour.main.temp_min) + Number(currentEachHour.main.temp_min)
                    let sumMaxTemp = Number(previousEachHour.main.temp_max) + Number(currentEachHour.main.temp_max)
                   let sumsea_level =Number(previousEachHour.main.sea_level) + Number(currentEachHour.main.sea_level)
                   let sumHumidity =Number(previousEachHour.main.humidity) + Number(currentEachHour.main.humidity)
                    return {
                        main: {
                            temp: sumTemp,
                            temp_min: sumMinTemp,
                            temp_max: sumMaxTemp,
                            humidity: sumsea_level,
                        sea_level: sumHumidity,
                           
                        },
                        dt_txt: currentEachHour.dt_txt,
                        length: eachDay.length,
                        description: currentEachHour.weather[0].description,
                        icon: currentEachHour.weather[0].icon,
                        windSpeed: currentEachHour.wind.speed,
                       
                    }
                }, {
                    main: {
                        temp: 0,
                        temp_min: 0,
                        temp_max: 0,
                        humidity:0,
                        sea_level:0
                        
                    }
                })

            })
            console.log("final: ", dayWise);


            dayWise.map(eachDay => {

               
                document.querySelector("#forcastDiv").innerHTML +=
        
                    `

                    <div onclick="handler(event)" class="forcastCard">
        <div class="border">   
        
<span class="day">${moment(eachDay.dt_txt).format('ddd')}</span>
<img class="img" src="http://openweathermap.org/img/wn/${eachDay.icon}@2x.png" alt="">

<div class="Min">Temp Min: ${Math.floor(eachDay.main.temp_min / eachDay.length)}</div>
<div class="Max">Temp Max: ${Math.floor(eachDay.main.temp_max / eachDay.length)}</div>
</div>

                    `
                        

            })

            


        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }





    function handler(event) {

         console.log(event);

         let ev = event.path[1].childNodes[1];
         console.log("ev",ev)
        //  document.querySelector(".card")
        //  .classList.remove("#hidden_weather");
         document.querySelector(".card").innerHTML +=
         `
         
         <div class="weather_loading" >
       
         <span> <h2 class="city">Weather in <b > </b>
         </h2><h5 class="regon">sindh pakistan</h5>
         <div class="time">4:00Pm</div>
         <div class="dayAndDate"></div>
         <div class="Date">May/2022</div>  
           <h1 class="temp">51°C</h1></span>
           <div class="Tem_min">51°C</div>
           <div class="Tem_max">51°C</div>  
             <div class="humidity">Humidity: 60%</div>
             <div class="wind">Wind speed: 6.2 km/h</div>
             <div class="wind">Sea Level: 6.2 km/h</div>
             <div class="wind">Feels Like: 6.2 km/h</div>
             <span class="boxWeather">
               <img src="https://openweathermap.org/img/wn/04n.png" alt="not Found" class="icon" />
               <div class="description">Cloudy</div>
             </span>
             </div>
           </div>`
}