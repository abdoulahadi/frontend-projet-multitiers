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
    

}

export default new UsersService();