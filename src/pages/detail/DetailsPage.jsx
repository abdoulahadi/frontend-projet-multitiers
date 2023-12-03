import React, { useEffect, useState } from 'react';
import './detailspage.css'; // Import du fichier CSS pour les styles spécifiques
import Parallax from '../../components/parallax/Parallax';
import { useStateContext } from '../../contexts/ContextProvider';
import ProductsService from '../../services/Products.service';
import { useLocation } from 'react-router-dom';

const DetailsPage = () => {
  const location = useLocation();
  // const [] = useStateContext();
  const [product, setProduct] = useState([]);
  const productId = location.pathname.split("/")[location.pathname.split("/").length -1]

  const fetchProducts = async () => {
    try {
      const data = await ProductsService.getProduct(productId);
      setProduct(data);
    } catch (error) {
      console.error('Erreur lors de la récupération du Product:', error);
    }
  };

  useEffect(()=>{
    fetchProducts()
  },[])

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleAddToCart = () => {
    if (!userLoggedIn) {
      // history.push('/connexion');
      alert('Veuillez vous connecter pour ajouter l\'article au panier.');
    } else {
      alert('Article ajouté à la table d\'achat !');
    }
  };

  const itemDetails = {
    name: 'Nom de l\'article',
    price: '$19.99',
    description: 'Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...',
    images: [
      'https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310_1280.png',
      'https://cdn.pixabay.com/photo/2023/05/03/22/43/tennis-7968714_1280.png',
      'https://cdn.pixabay.com/photo/2016/07/20/16/41/shoe-1530678_1280.png',
    ]
  };

  const [currentImage, setCurrentImage] = useState(itemDetails.images[0]);

  const changeImage = (newImage) => {
    setCurrentImage(newImage);
  };

  return (
    <><Parallax title={"Détails Page"} />
    <div className="container mt-4 mb-4">
      <div className="row">
        <div className="col-md-6">
          <div className="main-image">
            <img src={currentImage} alt="Image de l'article" className="img-fluid" />
          </div>
          <div className="d-flex mt-2 secondary-images">
            {itemDetails.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                onClick={() => changeImage(image)}
                className={`img-thumbnail ${image === currentImage ? 'active' : ''}`}
                style={{ cursor: 'pointer', marginRight: '5px' }}
              />
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <div className="item-details">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2>{itemDetails.name}</h2>
              <p>{itemDetails.price}</p>
            </div>
            <hr />
            <p>{itemDetails.description}</p>
            <div className="mt-3">
              <button onClick={handleAddToCart} className="btn btn-primary">
                AJOUTER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default DetailsPage;
