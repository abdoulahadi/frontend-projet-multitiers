import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import './header.css';
import {Link} from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

const Header = () => {
  const {token, setToken} = useStateContext()
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Nike"
    },
    {
      id: 2,
      name: "Adidas"
    },
    {
      id: 3,
      name: "autres catégories"
    }
  ]);

  const handleLogout = () => {
    // Déconnexion de l'utilisateur
    setToken(false);
  };

  return (
    <div className="fixed-top header-container">
      <div className="container-fluid">
        <div className="row align-items-center part1 m-0">
          <div className="col-md-3">
          <Link className="nav-link" href="/">
            <img src={logo}alt="Logo" className="logo" />
          </Link>
          </div>
          <div className="col-md-9">
            <ul className="nav justify-content-end">
              {token ? (
                <>
                <li className="nav-item">
                  <button className="nav-link" onClick={handleLogout}>
                    Se déconnecter
                  </button>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/mon-espace">
                    Mon Espace
                  </Link>
                </li>
                </>
              ) : (
                <>
                <li className="nav-item">
                <Link to="/login" className="nav-link">Se connecter</Link>
                </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">Créer un compte</Link>
              </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Nouvelle rangée pour le menu des catégories avec parallaxe */}
        <div className="row part2">
          <div className="col-md-12 p-0">
            <ul className="nav flex-row menu-transparent">
              {categories.map((category) => (
                <li className="nav-item" key={category.id}>
                  <Link className="nav-link" to={`/categorie/${category.name}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
