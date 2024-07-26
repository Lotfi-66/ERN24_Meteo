import Weather from "./Weather.js";
import Sun from "./Sun.js";
import Main from "./Main";

class MainWeather {
    //properties
    clouds;
    dt;
    main;
    rain;
    snow;
    sun;
    visibility;
    weather;
    wind;

    constructor(mainWeatherData) {
        this.clouds = mainWeatherData.clouds;
        this.dt = mainWeatherData.dt;
        this.main = mainWeatherData.main;

        //si on a des dinées de pluie ou de neige on les affiches
        if (mainWeatherData.hasOwnProperty('rain')) {
            this.rain = mainWeatherData.rain["1h"];
        };
        if (mainWeatherData.hasOwnProperty('snow')) {
            this.snow = mainWeatherData.snow["1h"];
        };

        //création de l'instance Sun avec ses données
        this.sun = new Sun({
            sunset: mainWeatherData.sys.sunset,
            sunrise: mainWeatherData.sys.sunrise
        })

        this.visibility = mainWeatherData.visibility;

        //creation de l'instance Weather avec ses données
        this.weather = new Weather({
            description: mainWeatherData.weather[0].description,
            icon: mainWeatherData.weather[0].icon,
            locationName: mainWeatherData.name,
            country: mainWeatherData.sys.country
        });

        this.wind = new Wind(mainWeatherData.wind);
    }

    getDom() {
        const mainWeather = document.getElementById('result');

        //on cree les element pour les onglets 
        const tab1 = document.createElement('div');
        tab1.className = 'tab-pane fade show active';
        tab1.id = 'tab1';
        tab1.role = 'tabpanel';
        tab1.setAttribute('aria-labelledby', 'tab1-tab');
        tab1.innerHTML = `<h5 class="card-title">Informations générales</h5>`;
        tab1.appendChild(this.weather.getDom());

        //information température
        const tab2 = document.createElement('div');
        tab2.className = 'tab-pane fade';
        tab2.id = 'tab2';
        tab2.role = 'tabpanel';
        tab2.setAttribute('aria-labelledby', 'tab2-tab');
        tab2.innerHTML = `<h5 class="card-title">Températures</h5>`;
        tab2.appendChild(this.weather.getDom());

        //vitesse du vent
        const tab3 = document.createElement('div');
        tab3.className = 'tab-pane fade';
        tab3.id = 'tab3';
        tab3.role = 'tabpanel';
        tab3.setAttribute('aria-labelledby', 'tab3-tab');
        tab3.innerHTML = `<h5 class="card-title">Vitesse du vent</h5>`;
        tab3.appendChild(this.wind.getDom());

        //information sur le soleil
        const tab4 = document.createElement('div');
        tab4.className = 'tab-pane fade';
        tab4.id = 'tab4';
        tab4.role = 'tabpanel';
        tab4.setAttribute('aria-labelledby', 'tab4-tab');
        tab4.innerHTML = `<h5 class="card-title">Soleil</h5>`;
        tab4.appendChild(this.sun.getDom());

        //information sur les precipitations
        const tab5 = document.createElement('div');
        tab5.className = 'tab-pane fade';
        tab5.id = 'tab5';
        tab5.role = 'tabpanel';
        tab5.setAttribute('aria-labelledby', 'tab5-tab');
        this.rain ?
        tab5.innerHTML = `
        <h5 class="card-title">Précipitations</h5>
        <div class="d-flex align-items-center">
                <i class="bi bi-cloud drizzle mx-2"></i>
                <span>Cumule de pluie: ${this.rain} mm</span>
            </div>`
            ://sinon ternaire
        tab5.innerHTML = `
        <h5 class="card-title">Précipitations</h5>
        <div class="d-flex align-items-center">
                <i class="bi bi-snow2 mx-2"></i>
                <span>Cumule de pluie: ${this.rain} mm</span>
            </div>`;

        //création de la liste des onglets
        const tabList = document.createElement('ul');
        tabList.className = 'nav nav-tabs card-header-tabs ms-0';
        tabList.id = 'myTabs';
        tabList.role = 'tablist';
        tabList.innerHTML = `
        <li class ="nav-item" role="presentation">
        <a class="nav-link text-warning fw-bold active " id="tab1-tab" data-bs-toggle="tab" 
        href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">Générales</a>
        </li>
        <li class ="nav-item" role="presentation">
        <a class="nav-link text-warning fw-bold active " id="tab2-tab" data-bs-toggle="tab" 
        href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">Températures</a>
        </li>
        <li class ="nav-item" role="presentation">
        <a class="nav-link text-warning fw-bold active " id="tab3-tab" data-bs-toggle="tab" 
        href="#tab3" role="tab" aria-controls="tab3" aria-selected="false">Vent</a>
        </li>
        <li class ="nav-item" role="presentation">
        <a class="nav-link text-warning fw-bold active " id="tab4-tab" data-bs-toggle="tab" 
        href="#tab4" role="tab" aria-controls="tab4" aria-selected="false">Soleil</a>
        </li>
        `;

        //ajouter l'onglet precipitation si on a des données de pluie ou de neige
        if(this.rain||this.snow) {
            tabList.innerHTML += `
            <li class ="nav-item" role="presentation">
            <a class="nav-link text-warning fw-bold active " id="tab5-tab" data-bs-toggle="tab" 
            href="#tab5" role="tab" aria-controls="tab5" aria-selected="false">Precipitations</a>
            </li>
            `;

            //creation des elements pour le contenue des onglets
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            cardBody.innerHTML = `
            <div class="tab-content" id="myTabContent">
            ${tab1.outerHTML}
            ${tab2.outerHTML}
            ${tab3.outerHTML}
            ${tab4.outerHTML}
            ${tab5.outerHTML}
            </div>
            `;
            
            //crée l'element pour la carte
            const card = document.createElement('div');
            card.className = 'card h-100';
            card.append(tabList, cardBody);

            //crée l'element conteneur pour la carte
            const cardContainer = document.createElement('div');
            cardContainer.className = 'container mt-4';
            cardContainer.innerHTML = `
            <div class="row justify-content-center">
            <div class="col-12 container-card">
            </div>
            </div>
            </div>`;
            cardContainer.querySelector('.conteiner-card').appendChild(card);

            //mise a jour du container principal avec la nouvelle carte
            resultDiv.innerHTML = '';
            resultDiv.appendChild(cardContainer);
            return cardContainer;
        }

}

}

export default MainWeather