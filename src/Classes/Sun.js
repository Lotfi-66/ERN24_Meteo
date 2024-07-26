class Sun {
    //properties
    sunset;
    sunrise;
    timezone;

    constructor(sunData) {
        this.sunset = sunData.sunset;
        this.sunrise = sunData.sunrise;
        this.timezone = sunData.timezone;
    }

    //méthode pour convertir les timestamp en heure:minutes
    getTimeFromTimestamp(timestamp) {
        // on convertit le timestamp en millisecond
        const date = new Date((timestamp + this.timezone)* 1000);

        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
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