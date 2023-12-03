import React, { useEffect, useState } from "react";
import ArticleItem from "../../components/articles/ArticleItem";
import Parallax from "../../components/parallax/Parallax";
import ProductsService from "../../services/Products.service";
import { useLocation } from "react-router-dom";


const Categorie = () => {
  const location = useLocation();
  const [productByCommande, setProductByCommande] = useState([]);
  const categorie = location.pathname.split("/")[location.pathname.split("/").length -1]

  const fetchProductByCategorie = async () => {
    try {
      //On passe la categorie....
      const data = await ProductsService.getProducts();
      setProductByCommande(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
    }
  };

  useEffect(()=>{
    fetchProductByCategorie()
  },[])

    const categoryItems = [
    {
      id: 1,
      name: "Fila Disruptor Low",
      image: "https://cdn.pixabay.com/photo/2017/07/02/19/24/dumbbells-2465478_1280.jpg",
      price: 109.90,
    },
    {
      id: 2,
      name: "Le Coq Sportif Nylon/Gum",
      image: "https://cdn.pixabay.com/photo/2017/07/02/19/24/dumbbells-2465478_1280.jpg",
      price: 119.90,
    },
    {
      id: 3,
      name: "New Balance WL574 CRD",
      image: "https://cdn.pixabay.com/photo/2017/07/02/19/24/dumbbells-2465478_1280.jpg",
      price: 104.90,
    },
    {
      id: 4,
      name: "Le Coq Sportif Noah Club OG",
      image: "https://cdn.pixabay.com/photo/2017/07/02/19/24/dumbbells-2465478_1280.jpg",
      price: 94.90,
    },
    {
      id: 5,
      name: "Reebok Club C 85 MU",
      image: "https://cdn.pixabay.com/photo/2017/07/02/19/24/dumbbells-2465478_1280.jpg",
      price: 99.90,
    },
  ];
  return (
    <>
    <Parallax title={categorie}/>
    <div className="container mt-4">
        <ArticleItem items={categoryItems} horizontale={true} />
    </div>
    </>
  );
};

export default Categorie;
