import axiosClient from "../axios-client";


class CategoriesService {
  constructor() {
    this.api = '/categories';
    this.client = axiosClient;
  }

  async getCategories() {
    try {
      const response = await this.client.get(this.api);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      throw new Error('Erreur lors de la récupération des catégories');
    }
  }

  async getCategorie(categoryId) {
    try {
      const response = await this.client.get(`${this.api}/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      throw new Error('Erreur lors de la récupération des catégories');
    }
  }

  async createCategory(categoryName) {
    try {
      const response = await this.client.post(this.api, { nomCategorie: categoryName });
      if (response.status === 201) {
        return true;
      } else {
        throw new Error('Erreur lors de la création de la catégorie');
      }
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie:', error);
      throw new Error('Erreur lors de la création de la catégorie');
    }
  }

  async updateCategory(categoryId, newName) {
    try {
      const response = await this.client.put(`${this.api}/${categoryId}`, { id:categoryId, nomCategorie: newName });
      if (response.status === 200) {
        return true;
      } else {
        throw new Error('Erreur lors de la modification de la catégorie');
      }
    } catch (error) {
      console.error('Erreur lors de la modification de la catégorie:', error);
      throw new Error('Erreur lors de la modification de la catégorie');
    }
  }

  async deleteCategory(categoryId) {
    try {
      const response = await this.client.delete(`${this.api}/${categoryId}`);
      if (response.status === 204) {
        return true;
      } else {
        throw new Error('Erreur lors de la suppression de la catégorie');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
      throw new Error('Erreur lors de la suppression de la catégorie');
    }
  }
}

export default new CategoriesService();
