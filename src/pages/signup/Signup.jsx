import { useRef, useState } from "react";
import logo from "../../assets/form_logo.svg";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import AuthentificationService from "../../services/Authentification.service";

export default function Signup() {
    const nomRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);
    
    // const {setUser, setToken} = useStateContext();

    const [isLoading, setIsLoading] = useState(false);
    
    const onSubmit = (ev) => {
        setIsLoading(true);
        ev.preventDefault();

        const payload =
        {
            nom: nomRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        try {
            AuthentificationService.register(payload)
            .then(({data})=>{
                //En fonction de ce qui va être renvoyer
            })
            .catch((error)=>{
                console.log(error)
            })
          } catch (error) {
            console.error('Erreur lors de la récupération des clients:', error);
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
                        ref={nomRef}
                        type="text"
                        placeholder="nom"
                    />
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email Address "
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Password Confirmation"
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
