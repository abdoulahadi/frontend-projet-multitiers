import axiosClient from "../axios-client";

class ProductsService {
  constructor() {
    this.api = '/produits';
    this.client = axiosClient;
  }

  async getProducts() {
    try {
      const response = await this.client.get(this.api);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      throw new Error('Erreur lors de la récupération des produits');
    }
  }

  async getProduct(productId) {
    try {
      const response = await this.client.get(`${this.api}/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      throw new Error('Erreur lors de la récupération des produits');
    }
  }

  async getProductByCommande(commandeId) {
    try {
      const response = await this.client.get(`${this.api}/bycategorie/${commandeId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      throw new Error('Erreur lors de la récupération des produits');
    }
  }

  async createProduct(productData) {
    try {
      const response = await this.client.post(this.api, productData);
      if (response.status === 201) {
        return true;
      } else {
        throw new Error('Erreur lors de la création du produit');
      }
    } catch (error) {
      console.error('Erreur lors de la création du produit:', error);
      throw new Error('Erreur lors de la création du produit');
    }
  }

  async updateProduct(productId, updatedData) {
    try {
      const response = await this.client.put(`${this.api}/${productId}`, updatedData);
      if (response.status === 200) {
        return true;
      } else {
        throw new Error('Erreur lors de la mise à jour du produit');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit:', error);
      throw new Error('Erreur lors de la mise à jour du produit');
    }
  }

  async deleteProduct(productId) {
    try {
      const response = await this.client.delete(`${this.api}/${productId}`);
      if (response.status === 204) {
        return true;
      } else {
        throw new Error('Erreur lors de la suppression du produit');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
      throw new Error('Erreur lors de la suppression du produit');
    }
  }
}

export default new ProductsService();
