import axiosClient from "../axios-client";

class AuthentificationService{
    constructor(){
        this.api = "/authenticate"
        this.client = axiosClient
    }

    async login(credentials) {
        try {
          const response = await this.client.post(this.api, credentials);
          if (response.status === 200) {
            return response;
          } else {
            throw new Error('Erreur lors de l\'authentification de l\'utilisateur');
          }
        } catch (error) {
          console.error('Erreur lors de l\'authentification de l\'utilisateur:', error);
          throw new Error('Erreur lors de l\'authentification de l\'utilisateur');
        }
      }

      async user() {
        try {
          const response = await this.client.get(this.api);
          if (response.status === 201) {
            return response;
          } else {
            throw new Error('Erreur lors de la récupérationde l\'utilisateur');
          }
        } catch (error) {
          console.error('Erreur lors de la récupération de l\'utilisateur:', error);
          throw new Error('Erreur lors de la récupération de l\'utilisateur');
        }
      }

      async register(credentials) {
        try {
          const response = await this.client.post(`${this.api}/register`, credentials);
          if (response.status === 201) {
            //En fonction de ce que le backEnd va renvoyer
            return true;
          } else {
            throw new Error('Erreur lors de l\'authentification de l\'utilisateur');
          }
        } catch (error) {
          console.error('Erreur lors de l\'authentification de l\'utilisateur:', error);
          throw new Error('Erreur lors de l\'authentification de l\'utilisateur');
        }
      }
    

}

export default new AuthentificationService();