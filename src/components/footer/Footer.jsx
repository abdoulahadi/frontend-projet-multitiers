import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <ul className="list-unstyled d-flex gap-4">
              <li><a href="#">Contactez-nous</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Liens légaux</a></li>
            </ul>
          </div>
          <div className="col-md-4 text-center">
            <p className="copyright">2023 M2 GDIL</p>
          </div>
          <div className="col-md-4 text-right">
            <ul className="list-inline social-icons">
              <li className="list-inline-item">
                <a href="#">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
