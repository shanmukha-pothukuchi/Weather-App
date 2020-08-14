function getWeather(city) {

    if (city.trim() === "") {
        alert("Please enter city!")
        return
    }

    document.getElementById('txtCity').value = "";
    
    try {
        const request = new XMLHttpRequest(); 
        request.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5d7e802aaaf427ee06246d43c947f3c9&units=metric`);
        request.send();    
        request.onload = () => {
        if(request.status === 200) {
            let data = JSON.parse(request.response);
            let icon = data.weather[0].icon;
            let iconURL = `${icon}.png`
            let temparature = data.main.temp;
            let description = data.weather[0].description;
            let country = data.sys.country;
            let city = data.name;
            document.getElementById("weatherImage").src = iconURL;
            document.getElementById("temp").innerHTML = Math.floor(temparature);
            document.getElementById("tempVar").value = temparature
            document.getElementById("description").innerHTML = description;
            document.getElementById("place").innerHTML = `${city}, ${country}`;
            document.getElementById("units").innerHTML = 'C';
            document.getElementById("units").classList.remove("F");
        } else {
            alert("Please enter valid city!")
            console.log(`error ${request.status}`);
        };
    }; 
    }
    catch(err) {
        alert(err.message)
    };
};

function toggle(tempVar){

    if (description.innerText === '-') {
        return false;
    };

    if(document.getElementById("units").classList.contains("F")){
        document.getElementById("units").classList.remove("F");
        document.getElementById("temp").innerHTML = convert(Math.floor(tempVar.value));
        document.getElementById("units").innerHTML = 'C';
        return;
    };
    document.getElementById("units").classList.add("F");
    document.getElementById("temp").innerHTML = convert(Math.floor(tempVar.value));
    document.getElementById("units").innerHTML = 'F';
};

function convert(temparature){
    if(document.getElementById("units").classList.contains("F")){
        return Math.floor((temparature * 9/5) + 32);
    } else {
        return temparature;
    }
};
