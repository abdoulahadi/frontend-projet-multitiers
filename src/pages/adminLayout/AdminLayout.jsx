import React, { useEffect } from 'react';
import { Link, Navigate, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { useStateContext } from '../../contexts/ContextProvider';
import UsersService from '../../services/Users.service';


export default function AdminLayout(){
    const navigate =useNavigate()
    // if(user.status!=='1'){
    //     return <Navigate to="/accueil"/>
    // }
    const {user,setUser, token} = useStateContext();

    const fetchUser = async () => {
        try {
          const data = await UsersService.getAccount();
          setUser(data);
          if (data.authorities[0] === "ROLE_USER"){
           navigate("/")
        }
        } catch (error) {
          console.error('Erreur lors de la récupération du Product:', error);
        }
      };
    
      useEffect(()=>{
        fetchUser()
      },[])
      if (!token){
        return <Navigate to="/"/>
    }
        return(
        
        <div id="defaultLayout">
            <aside>
                <Link to="/admin/dashboard">Dashboard</Link>
                <Link to="/admin/categorie">Catégorie</Link>
                <Link to="/admin/produit">Produit</Link>
                <Link to="/admin/client">Client</Link>
                <Link to="/accueil">Quitter</Link>
            </aside>
            <div className="content" >
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                    {user && user.username && (
                            <>
                                <span className="m-4">{user.username}</span>
                                <a className="btn-logout">
                                    Logout
                                </a>
                            </>
                        )}
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}