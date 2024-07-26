class Sun {
    //properties
    sunset;
    sunrise;

    constructor(sunData) {
        this.sunset = sunData.sunset;
        this.sunrise = sunData.sunrise;
    }

    //méthode pour convertir les timestamp en heure:minutes
    getTimeFromTimestamp(timestamp) {
        const date = new Date(timestamp * 1000);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    getDom() {
        const sun = document.createElement('div');
        sun.innerHTML = `
        <div class="d-flex flex-column">
          <div class="d-flex align-items-center">
            <i class="bi bi-sunrise mx-2"></i>
            <span>Levé du soleil: ${this.getTimeFromTimestamp(this.sunrise)}</span>
          </div>
          <div class="d-flex align-items-center">
            <i class="bi bi-sunset mx-2"></i>
            <span>Couché du soleil: ${this.getTimeFromTimestamp(this.sunset)}</span>
          </div>
        </div>
      `;
        return sun;
    }
}

export default Sun;