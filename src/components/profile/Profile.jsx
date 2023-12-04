import React, { useRef } from 'react';
import './profile.css'; // Assurez-vous d'importer le fichier CSS pour les styles

const Profile = ({ client, onUpdateClient, orders }) => {
  const { id, prenom, nom, adresse, telephone, email, user } = client;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  // Créez des refs pour les champs de saisie
  const nomRef = useRef(null);
  const prenomRef = useRef(null);
  const adresseRef = useRef(null);
  const telephoneRef = useRef(null);
  const emailRef = useRef(null);
  const userRef = useRef(null);
  console.log(orders)
  const handleUpdate = () => {
    const updatedClient = {
      id,
      prenom: nomRef.current.value,
      prenom: prenomRef.current.value,
      nom: adresseRef.current.value,
      telephone: telephoneRef.current.value,
      email: emailRef.current.value,
      user: userRef.current.value,
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
                <input type="text" className="form-control" defaultValue={user} ref={userRef} />
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
            <table className="table">
            <thead>
              <tr>
                <th>Date de commande</th>
                <th>ID du produit</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{formatDate(order.dateCommande)}</td>
                  <td>{order.produits !== null ? order.produits.id : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
