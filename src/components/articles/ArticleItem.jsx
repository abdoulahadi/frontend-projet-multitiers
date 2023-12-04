import React from "react";
import "./articles.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const ArticleItem = ({ items, horizontale }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);

  const articleCards = items.map((item) => (
    <div key={item.id} className={`article-card ${!horizontale ? "w-50" : ""}`}>
      <Link className="nav-link" to={`/articles/details/${item.id}`}>
        <div className="card-content">
          {isLoading ? (
          <>
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-6"></span>
          </h5>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-6"></span>
            <span className="placeholder col-8"></span>
          </p>
          <a href="#" className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
        </>
          ) : (
            <>
              <div className="image-container">
                <img src={item.imageProduit.split("*")[0]} alt={item.nomProduit} className="card-image" />
              </div>
              <div className="card-details">
                <h3 className="card-title">{item.nomProduit}</h3>
                <p className="card-price">Prix : {item.prixProduit} $</p>
              </div>
            </>
          )}
        </div>
      </Link>
    </div>
  ));

  return (
    <div className="articles">
      {/* <h2>{title}</h2> */}
      <div className={`card-container ${!horizontale ? " d-flex justify-content-center align-items-center flex-colum gap-3" : ""}`}>
        {articleCards}
      </div>
    </div>
  );
};

export default ArticleItem;
