import React from "react";
import "./articles.css";
import { Link } from "react-router-dom";

const ArticleItem = ({ items, horizontale }) => {
  const articleCards = items.map((item) => (
    <div key={item.id} className={`article-card ${!horizontale ? "w-50" : ""}`}>
    <Link className="nav-link" to="/articles/details/1">
        <div className="card-content">
            <div className="image-container">
                <img src={item.image} alt={item.name} className="card-image" />
            </div>
            <div className="card-details">
                <h3 className="card-title">{item.name}</h3>
                <p className="card-price">Prix : {item.price} $</p>
            </div>
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
