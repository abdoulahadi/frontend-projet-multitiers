import React, { useEffect, useState } from 'react';
import './detailspage.css'; // Import du fichier CSS pour les styles spécifiques
import Parallax from '../../components/parallax/Parallax';
import ProductsService from '../../services/Products.service';
import { useLocation,useNavigate } from 'react-router-dom';
import CommandeService from '../../services/Commande.service';
import ClientsService from '../../services/Clients.service';
import { useStateContext } from '../../contexts/ContextProvider';

const DetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [client, setClient] = useState([]);
  const {user,token} = useStateContext()
  const [currentImage, setCurrentImage] = useState([]);
  const [tabImage, setTabImage] = useState([]);
  const productId = location.pathname.split("/")[location.pathname.split("/").length -1]

  const fetchProducts = async () => {
    try {
      const data = await ProductsService.getProduct(productId);
      setProduct(data);
      setCurrentImage(data.imageProduit.split("*")[0])
      setTabImage(data.imageProduit.split("*"))
    } catch (error) {
      console.error('Erreur lors de la récupération du Product:', error);
    }
  };

  const fetchClientByUserId = async () => {
    try {
      const data = await ClientsService.getClientByUserId(user.id);
      setClient(data[0])
      console.log(data[0])
    } catch (error) {
      console.error('Erreur lors de la récupération du Product:', error);
    }
  };

  useEffect(()=>{
    fetchProducts()
    fetchClientByUserId()
  },[])

  const handleAddToCart = () => {
    if (!token) {
      navigate("/login")
      localStorage.setItem("MEMO_URL",location.pathname)
    } else {
      const dateActuelle = new Date();
      const dateISO = dateActuelle.toISOString();

      const payload = {
        dateCommande:dateISO,
        produits: product,
        clients:client
      }
      CommandeService.createCommande(payload)
      .then((data)=>{
          navigate("/")
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  };

  // const itemDetails = {
  //   name: 'Nom de l\'article',
  //   price: '$19.99',
  //   description: 'Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...Description détaillée de l\'article...',
  //   images: [
  //     'https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310_1280.png',
  //     'https://cdn.pixabay.com/photo/2023/05/03/22/43/tennis-7968714_1280.png',
  //     'https://cdn.pixabay.com/photo/2016/07/20/16/41/shoe-1530678_1280.png',
  //   ]
  // };

  


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
            {tabImage && tabImage.map((image, index) => (
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
              <h2>{product.nomProduit}</h2>
              <p>{product.prixProduit} $</p>
            </div>
            <hr/>
            <p>{product.descriptionProduit}</p>
            <div className="mt-3">
              <button onClick={handleAddToCart} className="btn btn-primary">
                COMMANDER
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
