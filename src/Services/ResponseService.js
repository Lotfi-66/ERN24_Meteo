class ResponseService {
    ok; // boolean => renvoi true si la réponse est "OK"
    error; // si ok est false, renvoi un objet error
    data; // si ok est true, renvoi les données de la réponse de l'API

    constructor(ok, error, data) {
        this.ok = ok;
        this.error = error;
        this.data = data;
    }
}

export default ResponseService;