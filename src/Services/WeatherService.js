import HttpUtils from "../Tools/HttpUtils";
import ResponseService from "./ResponseService";

class WeatherService {
    apiKey; // clé d'api
    options; // options pour la requête

    constructor(apiKey, userOptions = {}) {
        this.apiKey = apiKey;
        //on mettre des options par défaut
        this.options = {
            units: 'metric',
            lang: 'fr',
        }
        //on fusionne les options par défaut avec les options de l'utilisateur
        Object.assign(this.options, { appid: apiKey }, userOptions);
    }

    getCurrent(coords) {
        const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
        //on va fusionner les options avec les coordonnées pour construire l'url
        Object.assign(this.options, coords);

        //on va construirre l'url
        const URL = HttpUtils.buildUrl(BASE_URL, this.options)
        // this.options = {
        //   units: 'metric',
        //   lang: 'fr',
        //   appid: 'ma_clé_d_api',
        //   lat: 48.8566,
        //   lon: 2.3522
        // }

        //on va faire la requête sur l'API
        return new Promise(resolve => {
            fetch(URL)
                .then(response => response.json())
                .then(data => {
                    //on check le code de la réponse
                    // code 400 = erreur de requete
                    // code 404 = ville non trouvée
                    if (data.cod == 400 || data.cod == 404) {
                        resolve(new ResponseService(false, data.message, null))
                    }
                    resolve(new ResponseService(true, null, data))
                })
                .catch(error => {
                    resolve(new ResponseService(false, error.message, null))
                })
        })
    }
}

export default WeatherService;