import { API_KEY } from "./config";
import WeatherService from "./Services/WeatherService.Js";
import HttpUtils from "./Tools/HttpUtils";
import ResponseService from "./Services/ResponseService";

class App{
    //on déclare nos propriétés
    //PROPRIETES DE L'INTERFACE DU DOM 
    elInputNewLon;
    elInputNewLat;
    elInputNewCity;
    elListWeather;
    //PROPRIETES DE SERVICES
    weatherServiceFr;
    weatherServiceUk;
    weatherServiceUsa;

    constructor(){
        this.weatherServiceFr = new WeatherService(API_KEY);
    }

    start(){
        console.log("App started");
    }
}

const app = new App();

export default app;