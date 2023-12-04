import React, { useEffect, useState } from 'react';
import Profile from '../../components/profile/Profile';
import Parallax from '../../components/parallax/Parallax';
import ClientsService from '../../services/Clients.service';
import CommandeService from '../../services/Commande.service';
import { useStateContext } from '../../contexts/ContextProvider';

const ClientProfile = () => {
  const [client, setClient] = useState([]);
  const [Commandes, setCommandes] = useState([]);

  const {user} = useStateContext()
  
  const fetchCommandeByClient = async () => {
    try {
      const data = await CommandeService.getCommandeByClient(client.id)
      console.log(data)
      setCommandes(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
    }
  };

  const fetchClientByUserId = async () => {
    try {
      const data = await ClientsService.getClientByUserId(user.id);
      setClient(data[0])
    } catch (error) {
      console.error('Erreur lors de la récupération du Product:', error);
    }
  };

  useEffect(()=>{
    fetchClientByUserId()
    fetchCommandeByClient()
  },[client.id])
  const clientOrders = [
    { id: 1, date: '2023-11-15', totalAmount: 150 },
    { id: 2, date: '2023-11-18', totalAmount: 200 },
    // Ajoutez d'autres détails des commandes ici
  ];

  return (
    <>
    <Parallax title={"Mon Espace"}/>
    <div className='container'>
      <Profile client={client} orders={Commandes} />
    </div>
    </>
  );
};

export default ClientProfile;
