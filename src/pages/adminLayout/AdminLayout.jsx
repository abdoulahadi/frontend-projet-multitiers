import React from 'react';
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { useStateContext } from '../../contexts/ContextProvider';


export default function AdminLayout(){
    // if(user.status!=='1'){
    //     return <Navigate to="/accueil"/>
    // }
    const {user,setUser} = useStateContext();
    
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