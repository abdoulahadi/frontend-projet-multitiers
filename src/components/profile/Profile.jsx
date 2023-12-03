import React, { useRef } from 'react';
import './profile.css'; // Assurez-vous d'importer le fichier CSS pour les styles

const Profile = ({ client, onUpdateClient, orders }) => {
  const { idClient, nom, prenom, adresse, telephone, email, idUser } = client;

  // Créez des refs pour les champs de saisie
  const nomRef = useRef(null);
  const prenomRef = useRef(null);
  const adresseRef = useRef(null);
  const telephoneRef = useRef(null);
  const emailRef = useRef(null);
  const idUserRef = useRef(null);

  const handleUpdate = () => {
    const updatedClient = {
      idClient,
      nom: nomRef.current.value,
      prenom: prenomRef.current.value,
      adresse: adresseRef.current.value,
      telephone: telephoneRef.current.value,
      email: emailRef.current.value,
      idUser: idUserRef.current.value,
    };
    onUpdateClient(updatedClient);
  };

  return (
    <div className="container">
      <div className="row">
        {/* Profil du Client - Colonne à gauche */}
        <div className="col-md-6">
          <div className="card">
            <h2 className="card-header">Profil du Client</h2>
            <div className="card-body">
              <div className="form-group">
                <label>Nom:</label>
                <input type="text" className="form-control" defaultValue={nom} ref={nomRef} />
              </div>
              <div className="form-group">
                <label>Prénom:</label>
                <input type="text" className="form-control" defaultValue={prenom} ref={prenomRef} />
              </div>
              <div className="form-group">
                <label>Adresse:</label>
                <input type="text" className="form-control" defaultValue={adresse} ref={adresseRef} />
              </div>
              <div className="form-group">
                <label>Téléphone:</label>
                <input type="text" className="form-control" defaultValue={telephone} ref={telephoneRef} />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" className="form-control" defaultValue={email} ref={emailRef} />
              </div>
              <div className="form-group">
                <label>ID de l'Utilisateur:</label>
                <input type="text" className="form-control" defaultValue={idUser} ref={idUserRef} />
              </div>
              <button className="btn btn-primary" onClick={handleUpdate}>
                Mettre à jour
              </button>
            </div>
          </div>
        </div>
        {/* Liste des Commandes - Colonne à droite */}
        <div className="col-md-6">
          <div className="card">
            <h2 className="card-header">Liste des Commandes</h2>
            <div className="card-body">
              <ul className="list-group">
                {orders.map((order) => (
                  <li key={order.id} className="list-group-item">
                    {/* Affichage des détails de chaque commande */}
                    {/* Remplacez par les détails de vos commandes */}
                    {/* {order.date} - {order.totalAmount} */}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
