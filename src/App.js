//import des styles de bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//import des script de bootstrap
import 'bootstrap/dist/js/bootstrap.min.js';
//import des icones de bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css';

import { API_KEY } from "./config";
import WeatherService from "./Services/WeatherService";
import MainWeather from './Classes/MainWeather';

class App {
    // on déclare nos propriétés
    //PROPRIETES DU DOM
    elInputNewLon;
    elInputNewLat;
    elInputNewCity;
    elResultDiv;
    // PROPRIETES DE SERVICES
    weatherServiceFr;
    weatherServiceUk;
    weatherServiceUs;

    constructor() {
        this.weatherServiceFr = new WeatherService(API_KEY);
        this.weatherServiceUs = new WeatherService(API_KEY, {
            lang: 'en',
            units: 'imperial'
        });
        this.weatherServiceUk = new WeatherService(API_KEY, {
            lang: 'en',
        });
    }


    start() {
        console.log('App started');
        this.loadDom();
    }

    loadDom() {
        //on récupère l'élément app de index.html
        const elApp = document.getElementById('app');
        // on crée un element container
        const elDivContainer = document.createElement('div');
        elDivContainer.className = 'container mt-5 col-12 col-md-8 col-lg-6';

        // on crée un container pour le titre et l'image
        const elTitleContainer = document.createElement('div');
        elTitleContainer.className = 'd-flex align-items-center'

        // on crée l'image
        const elImage = document.createElement('img');
        elImage.src = './src/assets/logo.png';
        elImage.alt = 'logo';
        elImage.className = 'me-3 logo';

        // on cree le titre
        const elH1 = document.createElement('h1');
        elH1.textContent = 'Appli Météo';

        // on ajoute l'image et le titre au container
        elTitleContainer.append(elImage, elH1);

        // on ajoute le container du titre au container principale
        elDivContainer.append(elTitleContainer);

        //création des onglets
        const elTabList = document.createElement('ul');
        elTabList.className = 'nav nav-tabs mt-4';
        elTabList.innerHTML = `
      <li class="nav-item">
        <a class="nav-link active text-warning" id="byCoord-tab" data-bs-toggle="tab" href="#byCoord" role="tab" aria-controls="byCoord" aria-selected="true">Par Coordonnées</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-warning" id="byCity-tab" data-bs-toggle="tab" href="#byCity" role="tab" aria-controls="byCity" aria-selected="false">Par Ville</a>
      </li>
    `;

        //on crée le contenu des onglets
        const elTabContent = document.createElement('div');
        elTabContent.className = 'tab-content';
        elTabContent.innerHTML = `
      <div class="tab-pane fade show active" id="byCoord" role="tabpanel"     aria-labelledby="byCoord-tab">
        <h4 class="mt-4">Entrer les coordonnées géographiques (latitude et longitude)</h4>
        <div class="form-group">
          <label class="text-warning" for="latitude">Latitude:</label>
          <input type="text" class="form-control" id="latitude">
        </div>
        <div class="form-group mt-3">
          <label class="text-warning" for="longitude">Longitude:</label>
          <input type="text" class="form-control" id="longitude">
        </div>
      </div>
      <div class="tab-pane fade" id="byCity" role="tabpanel" aria-labelledby="byCity-tab">
        <h4 class="mt-4">Entrer le nom de la ville</h4>
        <div class="form-group">
          <label class="text-warning" for="city">Ville:</label>
          <input type="text" class="form-control" id="city">
        </div>
      </div>
    `;

        //bouton de validation
        const elButton = document.createElement('button');
        elButton.className = 'btn btn-warning my-3 form-control';
        elButton.textContent = 'Afficher la météo';
        elButton.addEventListener('click', this.getWeather.bind(this));

        //on crée une div pour afficher le résultat
        this.elResultDiv = document.createElement('div');
        this.elResultDiv.className = 'mt-3';
        this.elResultDiv.id = 'result';

        elDivContainer.append(elTabList, elTabContent, elButton, this.elResultDiv);

        // on insert dans elApp
        elApp.append(elDivContainer);

        //on récupère les inputs
        this.elInputNewLat = document.getElementById('latitude');
        this.elInputNewLon = document.getElementById('longitude');
        this.elInputNewCity = document.getElementById('city');

        //ajout du gestionnaire d'evenement pour les onglets
        document.querySelectorAll('.nav-link').forEach(tab => {
            tab.addEventListener('show.bs.tab', () => {
                this.clearFormFields();
            })
        })

        // vider les champs du formulaire
        this.clearFormFields();
    }

    //méthode pour vider les champs du formulaire
    clearFormFields() {
        this.elInputNewLat.value = '';
        this.elInputNewLon.value = '';
        this.elInputNewCity.value = '';
    }

    //méthode pour afficher la météo
    getWeather() {
        let newWeather = {};
        //on récupère sur quelle onglet on est
        const selectedTab = document.querySelector('.nav-link.active').id;

        if (selectedTab === 'byCoord-tab') {
            const newLatitude = this.elInputNewLat.value.trim();
            const newLongitude = this.elInputNewLon.value.trim();
            newWeather = {
                q: '',
                lat: newLatitude,
                lon: newLongitude
            }

        } else if (selectedTab === 'byCity-tab') {
            const newCity = this.elInputNewCity.value.trim();
            newWeather = {
                q: newCity,
                lat: '',
                lon: ''
            }
        }
        console.log(newWeather);

        this.weatherServiceFr
            .getCurrent(newWeather)
            .then(response => {
                this.handleServiceResponse(response);
            })
            .catch(error => {
                console.error('error', error);
            });
    }

    //méthode pour afficher les données
    handleServiceResponse(serviceResponse) {
        console.log('response', serviceResponse);
        if (!serviceResponse.ok) {
            //TODO: gerer l'erreur
        }
        const currentWeather = new MainWeather(serviceResponse.data);
        this.elResultDiv.innerHTML = '';
        this.elResultDiv.append(currentWeather.getDom());
    }
}

const app = new App();

export default app;