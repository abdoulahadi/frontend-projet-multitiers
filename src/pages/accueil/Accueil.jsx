import React, { useEffect, useState } from 'react';
import ArticleItem from '../../components/articles/ArticleItem';
import Parallax from '../../components/parallax/Parallax';
import ProductsService from '../../services/Products.service';
import CommandeService from '../../services/Commande.service';

const Accueil = () => {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await ProductsService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Erreur lors de la récupération du Product:', error);
    }
  };

  const fetchBestProducts = async () => {
    try {
      const data = await CommandeService.getBestProductCommanded();
      setBestProducts(data);
    } catch (error) {
      console.error('Erreur lors de la récupération du Product:', error);
    }
  };

  const RecentProducts = async () => {
    try {
      const data = await ProductsService.getRecentProduct();
      setRecentProducts(data);
    } catch (error) {
      console.error('Erreur lors de la récupération du Product:', error);
    }
  };

  useEffect(()=>{
    fetchProducts()
    fetchBestProducts()
    RecentProducts()
  },[])

  
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
              {bestProducts && bestProducts.length > 0 ? (
                <ArticleItem items={bestProducts} horizontale={true}/>
              ) : (
                <p>Pas d'articles les plus vendus pour le moment</p>
              )}
            </div>
          </section>
          <section className="mb-5">
            <h2 className="mb-3">Tous les Produits</h2>
            <div className="row">
              {products && products.length > 0 ? (
                <ArticleItem items={products} horizontale={true}/>
              ) : (
                <p>Pas d'articles </p>
              )}
            </div>
          </section>
          
        </div>

        {/* Section des articles récents */}
        <div className="col-md-4">
          <section className="bg-light">
            <h2 className="text-center mb-3">Articles récents</h2>
            {recentProducts && recentProducts.length > 0 ? (
              <ArticleItem items={recentProducts}  horizontale={false}/>
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
