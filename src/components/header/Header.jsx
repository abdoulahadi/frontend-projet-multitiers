import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import './header.css';
import {Link, Navigate} from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import CategoriesService from "../../services/Categories.service";
import AuthentificationService from "../../services/Authentification.service";
import UsersService from "../../services/Users.service";

const Header = () => {
  const {token, setToken, user, setUser} = useStateContext()
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const data = await CategoriesService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Erreur lors de la récupération du Product:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const data = await UsersService.getAccount();
      setUser(data);
    } catch (error) {
      console.error('Erreur lors de la récupération du Product:', error);
    }
  };

  useEffect(()=>{
    fetchCategories()
    fetchUser()
  },[])

  const handleLogout = () => {
    setToken(false);
    return <Navigate to="/"/>
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
                  <Link className="nav-link" to={user.authorities ? (user.authorities[0] === "ROLE_ADMIN" ? "/admin" : "/user") : ""}>
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
                  <Link className="nav-link" to={`/categorie/${category.id}`}>
                    {category.nomCategorie}
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
