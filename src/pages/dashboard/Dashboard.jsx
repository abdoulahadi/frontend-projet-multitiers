import React from 'react';
import { useEffect, useState } from "react";
import ProductsService from '../../services/Products.service';
import CommandeService from '../../services/Commande.service';
import CategoriesService from '../../services/Categories.service';
import ClientsService from '../../services/Clients.service';

export default function Dashboard() {
    const [commandeCount, setCommandeCount] = useState(0);
    const [produitCount, setProduitCount] = useState(0);
    const [clientCount, setClientCount] = useState(0);
    const [categorieCount, setCategorieCount] = useState(0);
    const [commande, setCommande] = useState([]);

    const fetchCountProducts = async () => {
        try {
          const data = await ProductsService.getProducts();
          setProduitCount(data.length)
        } catch (error) {
          console.error('Erreur lors de la récupération du Product:', error);
        }
      };

      const fetchCountCommandes = async () => {
        try {
          const data = await CommandeService.getCommandes();
          setCommandeCount(data.length)
        } catch (error) {
          console.error('Erreur lors du  Comptage des Catégorie:', error);
        }
      };

      const fetchCountCategories = async () => {
        try {
          const data = await CategoriesService.getCategories();
          setCategorieCount(data.length)
        } catch (error) {
          console.error('Erreur lors du  Comptage des Catégorie:', error);
        }
      };

      const fetchCountClients = async () => {
        try {
          const data = await ClientsService.getClients();
          setClientCount(data.length)
        } catch (error) {
          console.error('Erreur lors du  Comptage des Catégorie:', error);
        }
      };


      useEffect(()=>{
        fetchCountProducts()
        fetchCountCommandes()
        fetchCountCategories()
        fetchCountClients()
      },[])
    return (
        <>
            <div className="mb-4">
                <h1>Dashboard</h1>
            </div>
            <div className="row d-flex justify-content-around mb-4 animated fadeInDown">
                <div className="col-lg-2 col-md-6 shadow bg-success pt-1 mb-1">
                    <div className="row bg-light">
                        <span className="h4 d-flex justify-content-center">
                            Commandes
                        </span>
                        <span className="h1 d-flex justify-content-center">
                            {commandeCount}
                        </span>
                    </div>
                </div>

                <div className="col-lg-2 col-md-6 shadow bg-warning pt-1 mb-1">
                    <div className="row bg-light">
                        <span className="h4 d-flex justify-content-center">
                            Clients
                        </span>
                        <span className="h1 d-flex justify-content-center">
                            {clientCount}
                        </span>
                    </div>
                </div>
                <div className="col-lg-2 col-md-6 shadow bg-info pt-1 mb-1">
                    <div className="row bg-light">
                        <span className="h4 d-flex justify-content-center">
                            Produits
                        </span>
                        <span className="h1 d-flex justify-content-center">
                            {produitCount}
                        </span>
                    </div>
                </div>
                <div className="col-lg-2 col-md-6 shadow bg-danger pt-1 mb-1">
                    <div className="row bg-light">
                        <span className="h4 d-flex justify-content-center">
                            Catégories
                        </span>
                        <span className="h1 d-flex justify-content-center">
                            {categorieCount}
                        </span>
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-content-around mb-4  animated fadeInDown">
                <div className="col-md-12 m-4">
                    <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>Email</th>
            <th>ID Utilisateur</th>
          </tr>
        </thead>
        <tbody>
          {commande.map((client) => (
            <tr key={client.idClient}>
              <td>{client.idClient}</td>
              <td>{client.nom}</td>
              <td>{client.prenom}</td>
              <td>{client.adresse}</td>
              <td>{client.telephone}</td>
              <td>{client.email}</td>
              <td>{client.idUser}</td>
            </tr>
          ))}
        </tbody>
      </table>
                </div>
                {/* <div className="col-md-5">
                    <span className="h4 d-flex justify-content-center">
                        Figure Concernant ..............
                    </span>
                </div> */}
            </div>
        </>
    );
}
