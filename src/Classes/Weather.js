const ICON_URL = "https://openweathermap.org/img/wn/";

class Weather {
    //properties
    decription;
    icon;
    locationName;
    country;

    constructor (weatherData){
        this.description = weatherData.description;
        this.icon = weatherData.icon;
        this.locationName = weatherData.locationName;
        this.country = weatherData.country;
    }

    getDom(){
        const weather = document.createElement("div");
        //pour faire la structure html
        weather.innerHTML = `
        <div class="d-flex flex-column">
            <div class="d-flex align-items-center">
            <h6 class="mt-2>${this.locationName}</h6>
            <span class="mx-2">${this.country}</span>
            </div>
            <div class="d-flex align-items-center">
            <img src="${ICON_URL}${this.icon}.png" />
                <i class="bi bi-thermometer-sun mx-2"></i>
                <span>${this.description}</span>
            </div>
        </div>

        `;
        return weather;
    }

}

export default Weather