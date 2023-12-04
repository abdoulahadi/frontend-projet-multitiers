import React, { useState, useEffect } from 'react';
import CategoriesService from '../../../services/Categories.service';

const CategoriesComponent = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [updateCategoryId, setUpdateCategoryId] = useState('');
  const [updateCategoryName, setUpdateCategoryName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setNewCategoryName('');
    setUpdateCategoryId('');
    setUpdateCategoryName('');
    document.body.classList.remove('modal-open');
  };

  // Simulated categories for demonstration
  const fakeCategories = [
    { idCategorie: 1, nomCategorie: 'Fruits' },
    { idCategorie: 2, nomCategorie: 'Légumes' },
    { idCategorie: 3, nomCategorie: 'Électronique' },
  ];

  const handleShow = ()=> {
    setShowModal(true);
    document.body.classList.add('modal-open');
  }

  const fetchCategories = async () => {
    try {
      const data = await CategoriesService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
    }
  };

  const handleCreateCategory = async () => {
    try {
      await CategoriesService.createCategory(newCategoryName);
      fetchCategories();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie:', error);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      await CategoriesService.updateCategory(updateCategoryId, updateCategoryName);
      fetchCategories();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la modification de la catégorie:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await CategoriesService.deleteCategory(categoryId);
      if(response){
        fetchCategories();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={`container mt-4 ${showModal ? 'modal-open' : ''}`}>
      <h2>Liste des catégories</h2>
      <button className="btn btn-primary mb-3" onClick={handleShow}>
        Ajouter une catégorie
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom de la catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.nomCategorie}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => {
                    setUpdateCategoryId(category.id);
                    setUpdateCategoryName(category.nomCategorie);
                    handleShow();
                  }}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
  <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            {updateCategoryId ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
          </h5>
          <button type="button" className="btn-close" onClick={handleClose}></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="categoryName" className="form-label">Nom de la catégorie:</label>
              <input
                type="text"
                className="form-control"
                id="categoryName"
                value={updateCategoryId ? updateCategoryName : newCategoryName}
                onChange={(e) => {
                  updateCategoryId ?
                  setUpdateCategoryName(e.target.value)
                  :setNewCategoryName(e.target.value)
                }}
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleClose}>
            Annuler
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={updateCategoryId ? handleUpdateCategory : handleCreateCategory}
          >
            {updateCategoryId ? 'Modifier' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default CategoriesComponent;
