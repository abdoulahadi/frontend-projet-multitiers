import React, { useState, useEffect } from 'react';
import ClientsService from '../../../services/Clients.service';

const ClientComponent = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [clientData, setClientData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    telephone: '',
    email: '',
    user: {},
  });
  const [editMode, setEditMode] = useState(false);
  const [currentClientId, setCurrentClientId] = useState('');

  const handleClose = () => {
    setShowModal(false);
    setClientData({
      nom: '',
      prenom: '',
      adresse: '',
      telephone: '',
      email: '',
      user: '',
    });
    setEditMode(false);
    setCurrentClientId('');
    document.body.classList.remove('modal-open');
  };

  const handleShow = () => {
    setShowModal(true);
    document.body.classList.add('modal-open');
  }

  const fetchClients = async () => {
    try {
      const data = await ClientsService.getClients();
      setClients(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des clients:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleCreateClient = async () => {
    try {
      await ClientsService.createClient(clientData);
      fetchClients();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la création du client:', error);
    }
  };

  const handleUpdateClient = async () => {
    try {
      await ClientsService.updateClient(currentClientId, clientData);
      fetchClients();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du client:', error);
    }
  };

  const handleDeleteClient = async (clientId) => {
    try {
      await ClientsService.deleteClient(clientId);
      fetchClients();
    } catch (error) {
      console.error('Erreur lors de la suppression du client:', error);
    }
  };

  const handleEditClient = (client) => {
    setClientData({ ...client });
    setEditMode(true);
    setCurrentClientId(client.id);
    handleShow();
  };

  return (
    <div className={`container mt-4 ${showModal ? 'modal-open' : ''}`}>
      <h2>Liste des clients</h2>
      <button className="btn btn-primary mb-3" onClick={handleShow}>
        Ajouter un client
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            {/* <th>Nom</th> */}
            <th>Prénom</th>
            {/* <th>Adresse</th> */}
            <th>Téléphone</th>
            <th>Email</th>
            <th>ID Utilisateur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              {/* <td>{client.nom}</td> */}
              <td>{client.prenom}</td>
              {/* <td>{client.adresse}</td> */}
              <td>{client.telephone}</td>
              <td>{client.email}</td>
              <td>{client.user!==null ? client.user.id :""}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleEditClient(client)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteClient(client.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
  <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            {editMode ? 'Modifier le client' : 'Ajouter un client'}
          </h5>
          <button type="button" className="btn-close" onClick={handleClose}></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="clientId" className="form-label">ID:</label>
              <input
                type="text"
                className="form-control"
                id="clientId"
                value={clientData.user !==null ? clientData.user.id : ""}
                disabled
                onChange={(e) => setClientData({ ...clientData, user:{id: e.target.value} })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="clientName" className="form-label">Nom:</label>
              <input
                type="text"
                className="form-control"
                id="clientName"
                value={clientData.nom}
                onChange={(e) => setClientData({ ...clientData, nom: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="clientLastName" className="form-label">Prénom:</label>
              <input
                type="text"
                className="form-control"
                id="clientLastName"
                value={clientData.prenom}
                onChange={(e) => setClientData({ ...clientData, prenom: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="clientAddress" className="form-label">Adresse:</label>
              <input
                type="text"
                className="form-control"
                id="clientAddress"
                value={clientData.adresse}
                onChange={(e) => setClientData({ ...clientData, adresse: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="clientPhone" className="form-label">Téléphone:</label>
              <input
                type="text"
                className="form-control"
                id="clientPhone"
                value={clientData.telephone}
                onChange={(e) => setClientData({ ...clientData, telephone: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="clientEmail" className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                id="clientEmail"
                value={clientData.email}
                onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="clientUserId" className="form-label">ID Utilisateur:</label>
              <input
                type="text"
                className="form-control"
                id="clientUserId"
                disabled
                value={clientData.user!==null ? clientData.user.id : ""}
                onChange={(e) => setClientData({ ...clientData, user:{id: e.target.value} })}
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleClose}>
            Annuler
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={editMode ? handleUpdateClient : handleCreateClient}
          >
            {editMode ? 'Modifier' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default ClientComponent;
