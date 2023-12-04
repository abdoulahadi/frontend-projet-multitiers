import axiosClient from "../axios-client";

class CommandeService{
    constructor(){
        this.api = "/commandes"
        this.commande = axiosClient
    }

    async getCommandes() {
        try {
          const response = await this.commande.get(this.api);
          return response.data;
        } catch (error) {
          console.error('Erreur lors de la récupération des commandes:', error);
          throw new Error('Erreur lors de la récupération des commandes');
        }
      }

      async getCommande(idCommande) {
        try {
          const response = await this.commande.get(`${this.api}/${idCommande}`);
          return response.data;
        } catch (error) {
          console.error('Erreur lors de la récupération des commandes:', error);
          throw new Error('Erreur lors de la récupération des commandes');
        }
      }

      async getCommandeDetails() {
        try {
          const response = await this.commande.get(`${this.api}/details`);
          return response.data;
        } catch (error) {
          console.error('Erreur lors de la récupération des commandes:', error);
          throw new Error('Erreur lors de la récupération des commandes');
        }
      }

      async getBestProductCommanded() {
        try {
          const response = await this.commande.get(`${this.api}/sortByProduit`);
          return response.data;
        } catch (error) {
          console.error('Erreur lors de la récupération des commandes:', error);
          throw new Error('Erreur lors de la récupération des commandes');
        }
      }

      async getCommandeByClient(clientId) {
        try {
          const response = await this.commande.get(`${this.api}/byclientId/${clientId}`);
          return response.data;
        } catch (error) {
          console.error('Erreur lors de la récupération des commandes:', error);
          throw new Error('Erreur lors de la récupération des commandes');
        }
      }
      async createCommande(commandeData) {
        try {
          const response = await this.commande.post(this.api, commandeData);
          if (response.status === 201) {
            return true;
          } else {
            throw new Error('Erreur lors de la création du commande');
          }
        } catch (error) {
          console.error('Erreur lors de la création du commande:', error);
          throw new Error('Erreur lors de la création du commande');
        }
      }
    
      async updateCommande(commandeId, updatedData) {
        try {
          const response = await this.commande.put(`${this.api}/${commandeId}`, updatedData);
          if (response.status === 200) {
            return true;
          } else {
            throw new Error('Erreur lors de la mise à jour du commande');
          }
        } catch (error) {
          console.error('Erreur lors de la mise à jour du commande:', error);
          throw new Error('Erreur lors de la mise à jour du commande');
        }
      }
    
      async deleteCommande(commandeId) {
        try {
          const response = await this.commande.delete(`${this.api}/${commandeId}`);
          if (response.status === 200) {
            return true;
          } else {
            throw new Error('Erreur lors de la suppression du commande');
          }
        } catch (error) {
          console.error('Erreur lors de la suppression du commande:', error);
          throw new Error('Erreur lors de la suppression du commande');
        }
      }
}


export default new CommandeService()