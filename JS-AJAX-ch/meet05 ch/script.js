const key = "ce8eca16854dff3c9755eaee502c2e70";
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function runfirst(){
    city = "Palembang"
    const request = new XMLHttpRequest();
    request.onload = function(){
        const data = JSON.parse(this.responseText);
        console.log(data.message)
        if(data.message === "city not found"){
            alert("City not found")
        }else{
            document.querySelector(".city").innerHTML = "Weather in " +city
            document.querySelector(".desc").innerHTML = data.weather[0].main
            document.querySelector(".temp").innerHTML = ((data.main.temp-273.15)).toFixed(2) + "°C"
            document.querySelector(".humidity").innerHTML = `Humidiy : ${data.main.humidity}%`
            document.querySelector(".wind").innerHTML = `Wind Speed : ${data.wind.speed} km/h`
            document.querySelector(".icon-img").src ="https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
            console.log(data)
            console.log(data.main.temp)
        }
        
    }
    request.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
    request.send()

    return false;
}

runfirst()

function weather(){
    let city = document.querySelector(".search-bar").value.trim()
    city = capitalizeFirstLetter(city)
    

    const request = new XMLHttpRequest();
    request.onload = function(){
        const data = JSON.parse(this.responseText);
        console.log(data.message)
        if(data.message === "city not found"){
            alert("City not found")
        }else{
            document.querySelector(".city").innerHTML = "Weather in " +city
            document.querySelector(".desc").innerHTML = data.weather[0].main
            document.querySelector(".temp").innerHTML = ((data.main.temp-273.15)).toFixed(2) + "°C"
            document.querySelector(".humidity").innerHTML = `Humidiy : ${data.main.humidity}%`
            document.querySelector(".wind").innerHTML = `Wind Speed : ${data.wind.speed} km/h`
            document.querySelector(".icon-img").src ="https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
            console.log(data)
            console.log(data.weather.icon)
        }
        
    }
    request.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
    request.send()

    return false;
}

document.addEventListener("DOMContentLoaded", () => {
    
    document.querySelector(".search-btn").onclick = function(){
        weather()
    }

    document.querySelector(".search-bar").addEventListener("keyup", function (event){
        if(event.key === "Enter"){
            weather()
        }
    })

})

