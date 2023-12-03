import axiosClient from "../axios-client";

class ClientService {
  constructor() {
    this.api = '/clients';
    this.client = axiosClient;
  }

  async getClients() {
    try {
      const response = await this.client.get(this.api);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des clients:', error);
      throw new Error('Erreur lors de la récupération des clients');
    }
  }

  async getClient(clientId) {
    try {
      const response = await this.client.get(`${this.api}/${clientId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des clients:', error);
      throw new Error('Erreur lors de la récupération des clients');
    }
  }

  async createClient(clientData) {
    try {
      const response = await this.client.post(this.api, clientData);
      if (response.status === 201) {
        return true;
      } else {
        throw new Error('Erreur lors de la création du client');
      }
    } catch (error) {
      console.error('Erreur lors de la création du client:', error);
      throw new Error('Erreur lors de la création du client');
    }
  }

  async updateClient(clientId, updatedData) {
    try {
      const response = await this.client.put(`${this.api}/${clientId}`, updatedData);
      if (response.status === 200) {
        return true;
      } else {
        throw new Error('Erreur lors de la mise à jour du client');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du client:', error);
      throw new Error('Erreur lors de la mise à jour du client');
    }
  }

  async deleteClient(clientId) {
    try {
      const response = await this.client.delete(`${this.api}/${clientId}`);
      if (response.status === 200) {
        return true;
      } else {
        throw new Error('Erreur lors de la suppression du client');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du client:', error);
      throw new Error('Erreur lors de la suppression du client');
    }
  }
}

export default new ClientService();
