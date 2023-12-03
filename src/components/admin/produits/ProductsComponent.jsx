import React, { useState, useEffect } from 'react';
import ProductsService from '../../../services/Products.service';

const ProductsComponent = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productData, setProductData] = useState({
    nomProduit: '',
    descriptionProduit: '',
    prixProduit: '',
    imagesProduit: [],
    idCategorie: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState('');
  const [imageFiles, setImageFiles] = useState([]);

  const handleClose = () => {
    setShowModal(false);
    setProductData({
      nomProduit: '',
      descriptionProduit: '',
      prixProduit: '',
      imagesProduit: [],
      idCategorie: '',
    });
    setEditMode(false);
    setCurrentProductId('');
    setImageFiles([]);
    document.body.classList.remove('modal-open');
  };

  const handleShow = () => {
    setShowModal(true);
    document.body.classList.add('modal-open');
  };

  const fetchProducts = async () => {
    try {
      const data = await ProductsService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateProduct = async () => {
    try {
      const newProductData = {
        ...productData,
        imagesBase64: imageFiles.map((file) => file.base64).join("*"), 
      };
      
      console.log(newProductData)
      await ProductsService.createProduct(newProductData);
      fetchProducts();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la création du produit:', error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const updatedProductData = {
        ...productData,
        imagesBase64: imageFiles.map((file) => file.base64).join("*"),
      };
      await ProductsService.updateProduct(currentProductId, updatedProductData);
      fetchProducts();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await ProductsService.deleteProduct(productId);
      fetchProducts();
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
    }
  };

  const handleEditProduct = (product) => {
    setProductData({ ...product });
    setEditMode(true);
    setCurrentProductId(product.idProduit);
    handleShow();
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;

    if (files) {
      const filesArray = Array.from(files);
      setImageFiles(filesArray); 

      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          file.base64 = reader.result; 
        };
        reader.readAsDataURL(file); 
      });
    }
  };

  return (
    <div className={`container mt-4 ${showModal ? 'modal-open' : ''}`}>
      <h2>Liste des produits</h2>
      <button className="btn btn-primary mb-3" onClick={handleShow}>
        Ajouter un produit
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Image</th>
            <th>Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.idProduit}>
              <td>{product.idProduit}</td>
              <td>{product.nomProduit}</td>
              <td>{product.descriptionProduit}</td>
              <td>{product.prixProduit}</td>
              <td>{product.imageProduit}</td>
              <td>{product.idCategorie}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleEditProduct(product)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteProduct(product.idProduit)}
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
                  {editMode ? 'Modifier le produit' : 'Ajouter un produit'}
                </h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                <form>
                <div className="mb-3">
      <label htmlFor="productName" className="form-label">Nom du produit:</label>
      <input
        type="text"
        className="form-control"
        id="productName"
        value={productData.nomProduit}
        onChange={(e) => setProductData({ ...productData, nomProduit: e.target.value })}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="productDescription" className="form-label">Description du produit:</label>
      <input
        type="text"
        className="form-control"
        id="productDescription"
        value={productData.descriptionProduit}
        onChange={(e) => setProductData({ ...productData, descriptionProduit: e.target.value })}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="productPrice" className="form-label">Prix du produit:</label>
      <input
        type="number"
        step="0.01"
        className="form-control"
        id="productPrice"
        value={productData.prixProduit}
        onChange={(e) => setProductData({ ...productData, prixProduit: e.target.value })}
      />
    </div>
                  <div className="mb-3">
                    <label htmlFor="productImages" className="form-label">
                      Télécharger plusieurs images:
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="productImages"
                      onChange={handleImageUpload}
                      multiple 
                      accept='image/*'
                    />
                  </div>
                  {imageFiles.length > 0 && (
                    <div className="mb-3">
                      <div className="d-flex flex-wrap">
                        {imageFiles.map((file, index) => (
                          <div key={index} className="m-2">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Uploaded ${index}`}
                              style={{ maxWidth: '100px', maxHeight: '100px' }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mb-3">
      <label htmlFor="categoryId" className="form-label">ID de la catégorie:</label>
      <input
        type="text"
        className="form-control"
        id="categoryId"
        value={productData.idCategorie}
        onChange={(e) => setProductData({ ...productData, idCategorie: e.target.value })}
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
                  onClick={editMode ? handleUpdateProduct : handleCreateProduct}
                >
                  {editMode ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsComponent;
