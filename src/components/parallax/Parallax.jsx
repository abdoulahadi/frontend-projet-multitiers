import React from 'react';
import "./parallax.css";

const Parallax = ({title}) => {
  return (
    <div
      className="parallax"
    >
      {/* Contenu à afficher sur le parallaxe */}
      <div className="container-fluid p-0 m-0">
        <h1>{title}</h1>
        <p>Description</p>
      </div>
    </div>
  );
};

export default Parallax;
