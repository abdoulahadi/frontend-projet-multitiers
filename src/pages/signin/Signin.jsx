import { useRef, useState } from "react";
import logo from "../../assets/form_logo.svg";
import { Link } from "react-router-dom";
import AuthentificationService from "../../services/Authentification.service";
import { useStateContext } from "../../contexts/ContextProvider";
import UsersService from "../../services/Users.service";

export default function Signin() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext();

    const [errors, setErrors] = useState(null);
    // const { setUser, setToken } = useStateContext();

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
        const payload = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            rememberMe:true
        };

        try {
            AuthentificationService.login(payload)
            .then(({data}) =>{
                setToken(data.id_token)
                fetchClient()
            })
            .catch((error)=>{
                console.log(error)
            })
          } 
          catch (error) {
            console.error('Erreur lors de la récupération des clients:', error);
          }
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form d-flex flex-column justify-content-center align-items-center">
            <img src={logo}alt="Logo" className="logo" height={50} />
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login into your account</h1>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <input type="text" ref={usernameRef} placeholder="username" />
                    <input
                        type="password"
                        ref={passwordRef}
                        placeholder="password"
                    />
                    <button className="btn btn-block">
                        {isLoading ? (
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : null}
                        <span>Login</span>
                    </button>
                    <p className="message">
                        Not Registered ?{" "}
                        <Link to="/register">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
