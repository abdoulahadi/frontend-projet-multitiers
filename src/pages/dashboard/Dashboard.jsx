import React from 'react';
import { useEffect, useState } from "react";
import ProductsService from '../../services/Products.service';
import CategoriesService from '../../services/Categories.service';
import ClientsService from '../../services/Clients.service';
import CommandeService from '../../services/Commande.service';

export default function Dashboard() {
    const [commandeCount, setCommandeCount] = useState(0);
    const [produitCount, setProduitCount] = useState(0);
    const [clientCount, setClientCount] = useState(0);
    const [categorieCount, setCategorieCount] = useState(0);
    const [commandes, setCommandes] = useState([]);

    const fetchCountProducts = async () => {
        try {
          const data = await ProductsService.getProducts();
          setProduitCount(data.length)
        } catch (error) {
          console.error('Erreur lors de la récupération du Product:', error);
        }
      };

      const fetchCommandes = async () => {
        try {
          const data = await CommandeService.getCommandeDetails();
          console.log(data)
          setCommandes(data)
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
      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
      };


      useEffect(()=>{
        fetchCountProducts()
        fetchCountCommandes()
        fetchCountCategories()
        fetchCountClients()
        fetchCommandes()
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
            <th>Produit</th>
            <th>Catégorie</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Téléphone</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((commande) => (
            <tr key={commande.id}>
              <td>{commande.produits.nomProduit}</td>
              <td>{commande.id}</td>
              <td>{commande.clients.prenom}</td>
              <td>{commande.clients.nom}</td>
              <td>{commande.clients.telephone}</td>
              <td>{formatDate(commande.dateCommande)}</td>
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
