


function weatherForcast() {

    const city = document.querySelector("#city").value;
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=49cc8c821cd2aff9af04c9f98c36eb74&units=metric`)
        .then(function (response) {
            // handle success
            console.log(response);


//             let icon = response.data.list[0].weather[0.].icon;
           
// document.getElementById("icon").src = `https:${icon}`; 

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
console.log("sh",previousEachHour, currentEachHour)
                     
                    let sumTemp = Number(previousEachHour.main.temp) + Number(currentEachHour.main.temp)
                    let sumMinTemp = Number(previousEachHour.main.temp_min) + Number(currentEachHour.main.temp_min)
                    let sumMaxTemp = Number(previousEachHour.main.temp_max) + Number(currentEachHour.main.temp_max)
                    return {
                        main: {
                            temp: sumTemp,
                            temp_min: sumMinTemp,
                            temp_max: sumMaxTemp,
                           
                        },
                        dt_txt: currentEachHour.dt_txt,
                        length: eachDay.length,
                        icon: currentEachHour.weather[0].description
                    }
                }, {
                    main: {
                        temp: 0,
                        temp_min: 0,
                        temp_max: 0,
                        
                    }
                })

            })
            console.log("final: ", dayWise);


            dayWise.map(eachDay => {

                document.querySelector("#forcastDiv").innerHTML +=
                    `

                    <div class="forcastCard">
        <div class="border">   
<span class="day">${moment(eachDay.dt_txt).format('ddd')}</span>
<p>${eachDay.icon}</p>
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