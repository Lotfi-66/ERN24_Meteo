class Wind{
    //properties
    speed;
    deg;
    gust;

    constructor (windData){
        this.speed = windData.speed;
        this.deg = windData.deg;
        this.gust = windData.gust;
    }
    //methods pour obtenir la direction cardinal du vent
    getDirection(degrees){
        const directions = ["Nord", "Nord-est", "Est", "Sud-est", "Sud", "Sud-ouest", "Ouest", "Nord-ouest", "Nord"];
        const direction = Math.round(degrees/45);
        return directions[index];
    }

    getDom(){
        const wind = document.createElement("div");
        wind.innerHTML = `
        <div class="d-flex flex-column">
            <div class="d-flex align-items-center">
                <i class="bi bi-speedometer2 mx-2"></i>
                <span>Vitesse: ${Math.floor(this.speed * 3.6)} km/h</span>
            </div>
            <div class="d-flex align-items-center">
                <i class="bi bi-compass mx-2"></i>
                <span>Direction: ${this.getDirection(this.deg)}</span>
            </div>
            </div>
        `;
        //si il y a des rafales on les affiches
        if(this.gust){
            const gust = document.createElement('div');
            gust.innerHTML = ` <div class="d-flex align-items-center">
                <i class="bi bi-compass mx-2"></i>
                <span>Rafales: ${Math.floor(this.speed * 3.6)} km/h</span>
            </div>
            `;

            wind.appendChild(gust);
        
    }

        return wind;
}

}

export default Wind