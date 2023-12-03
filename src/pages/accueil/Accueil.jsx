import React, { useEffect, useState } from 'react';
import ArticleItem from '../../components/articles/ArticleItem';
import Parallax from '../../components/parallax/Parallax';
import ProductsService from '../../services/Products.service';

const Accueil = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const data = await ProductsService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Erreur lors de la récupération du Product:', error);
    }
  };

  useEffect(()=>{
    fetchProducts()
  },[])
  // 'bestSellingItems' et 'recentItems' sont passés en tant que props
  const bestSellingItems = [
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

  const recentItems = [
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
    <Parallax title={"Bienvenue dans XelKoom-Shop"}/>
    <div className="container-fluid">
      <div className="row m-0 p-4">
        {/* Section des articles les plus vendus */}
        <div className="col-md-8">
          <section className="mb-5">
            <h2 className="mb-3">Les plus vendus</h2>
            <div className="row">
              {bestSellingItems && bestSellingItems.length > 0 ? (
                <ArticleItem items={bestSellingItems} horizontale={true}/>
              ) : (
                <p>Pas d'articles les plus vendus pour le moment</p>
              )}
            </div>
          </section>
        </div>

        {/* Section des articles récents */}
        <div className="col-md-4">
          <section className="bg-light">
            <h2 className="text-center mb-3">Articles récents</h2>
            {recentItems && recentItems.length > 0 ? (
              <ArticleItem items={recentItems}  horizontale={false}/>
            ) : (
              <p>Pas d'articles récents pour le moment</p>
            )}
          </section>
        </div>
      </div>
    </div>
    </>
  );
};

export default Accueil;
