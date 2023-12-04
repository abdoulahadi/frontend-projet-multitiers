import { useRef, useState } from "react";
import logo from "../../assets/form_logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import AuthentificationService from "../../services/Authentification.service";
import UsersService from "../../services/Users.service";
import ClientsService from "../../services/Clients.service";

export default function Signup() {
    const usernameRef = useRef();
    const firstNameRef = useRef();
    const adresseRef = useRef();
    const telRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);

    const navigate = useNavigate()
    
    // const {setUser, setToken} = useStateContext();

    const [isLoading, setIsLoading] = useState(false);

    const fetchClient = async () => {
        try {
          const data = await UsersService.getAccount()
          setUser(data);
        } catch (error) {
          console.error('Erreur lors de la récupération du Product:', error);
        }
      };
    
    const onSubmit = (ev) => {
        setIsLoading(true);
        ev.preventDefault();
    
        try {
            const payload_account = {
                lastName: lastNameRef.current.value,
                firstName: firstNameRef.current.value,
                login: usernameRef.current.value,
                email: emailRef.current.value,
                activated: true,
                langkey: "fr",
                authorities: ["ROLE_USER"],
                password: passwordRef.current.value,
            };
    
            UsersService.register(payload_account)
                .then((data ) => {
                    const payload_client = {
                        nom: lastNameRef.current.value,
                        prenom: firstNameRef.current.value,
                        adresse: adresseRef.current.value,
                        telephone: telRef.current.value,
                        email: emailRef.current.value,
                        user: data,
                    };
                    return ClientsService.createClient(payload_client); // Retourne la promesse pour la chaîner
                })
                .then((data ) => {
                    if(data){
                        const payload = {
                            username: usernameRef.current.value,
                            password: passwordRef.current.value,
                            rememberMe:true
                        };
                        AuthentificationService.login(payload)
                        .then(({data}) =>{
                            setToken(data.id_token)
                            fetchClient()
                            if(localStorage.getItem("MEMO_URL")){
                                navigate(localStorage.getItem("MEMO_URL"))
                                localStorage.removeItem("MEMO_URL")
                            }
                        })
                        .catch((error)=>{
                            console.log(error)
                        })
                    }
                })
                .catch((error) => {
                    console.error('Erreur lors de l\'enregistrement du client:', error);
                    // Gérer les erreurs ici
                });
        } catch (error) {
            console.error('Erreur lors de la récupération des clients:', error);
            // Gérer les erreurs ici
        }
    };
    
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form  d-flex flex-column justify-content-center align-items-center">
            <img src={logo}alt="Logo" className="logo" height={50} />
                <form onSubmit={onSubmit}>
                    <h1 className="title">Create an account</h1>
                    {errors && <div className="alert">
                        {Object.keys(errors).map(key=>(
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                        </div>}
                    <input
                        ref={firstNameRef}
                        type="text"
                        placeholder="First Name"
                        required
                    />
                    <input
                        ref={lastNameRef}
                        type="text"
                        placeholder="Last Name"
                        required
                    />
                    <input
                        ref={adresseRef}
                        type="text"
                        placeholder="Adresse"
                        required
                    />
                    <input
                        ref={telRef}
                        type="tel"
                        placeholder="Téléphone"
                        required
                    />
                    <input
                        ref={usernameRef}
                        type="text"
                        placeholder="Username"
                        required
                    />
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email"
                        required

                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        required
                    />
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Password Confirmation"
                        required
                    />
                    <button className="btn btn-block">
                    {isLoading ? (
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : null}
                        <span>Signup</span>
                    </button>
                    <p className="message">
                        Already Registered ? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
