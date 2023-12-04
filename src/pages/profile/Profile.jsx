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
