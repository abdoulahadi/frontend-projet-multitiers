import axiosClient from "../axios-client";


class UsersService{
    constructor(){
        this.api = "/account"
        this.client = axiosClient
    }

    async getAccount(){
        try {
            const response = await this.client.get(this.api);
            return response.data;
          } catch (error) {
            console.error('Erreur lors de la récupération du comptes:', error);
            throw new Error('Erreur lors de la récupération du comptes');
          }
    }

    async register(credentials){
        try {
            const response = await this.client.post("/register", credentials);
            if (response.status === 201) {
              return response.data;
            } else {
              throw new Error('Erreur lors de la création du compte');
            }
          } catch (error) {
            console.error('Erreur lors de la création du compte:', error);
            throw new Error('Erreur lors de la création du compte');
          }
    }
    

}

export default new UsersService();