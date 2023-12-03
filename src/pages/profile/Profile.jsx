import React, { useEffect, useState } from 'react';
import Profile from '../../components/profile/Profile';
import Parallax from '../../components/parallax/Parallax';
import ClientsService from '../../services/Clients.service';
import CommandeService from '../../services/Commande.service';

const ClientProfile = () => {
  const [client, setClient] = useState([]);
  const [Commandes, setCommandes] = useState([]);

  const fetchClient = async () => {
    try {
      const data = await ClientsService.getClient();
      setClient(data);
    } catch (error) {
      console.error('Erreur lors de la récupération du Client:', error);
    }
  };

  const fetchCommandeByClient = async () => {
    try {
      const data = await CommandeService.getCommande()
      setCommandes(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
    }
  };

  useEffect(()=>{
    fetchClient()
    fetchCommandeByClient()
  },[])
  const clientDetails = {
    idClient: 1,
    nom: 'Dupont',
    prenom: 'Jean',
    adresse: '123 Rue de la République',
    telephone: '0123456789',
    email: 'jean.dupont@example.com',
    idUser: 'jd123'
  };

  
  const clientOrders = [
    { id: 1, date: '2023-11-15', totalAmount: 150 },
    { id: 2, date: '2023-11-18', totalAmount: 200 },
    // Ajoutez d'autres détails des commandes ici
  ];

  return (
    <>
    <Parallax title={"Mon Espace"}/>
    <div className='container'>
      <Profile client={clientDetails} orders={clientOrders} />
    </div>
    </>
  );
};

export default ClientProfile;
