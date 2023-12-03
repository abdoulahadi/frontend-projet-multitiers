import { Navigate, createBrowserRouter } from "react-router-dom";
import Accueil from "./pages/accueil/Accueil";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import GuestLayout from "./pages/guestLayout/GuestLayout";
import PurchaseLayout from "./pages/purchaseLayout/PurchaseLayout";
import DetailsPage from "./pages/detail/DetailsPage";
import Categorie from "./pages/categorie/Categorie";
import ClientProfile from "./pages/profile/Profile";
import AdminLayout from "./pages/adminLayout/AdminLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import CategoriesComponent from "./components/admin/categories/CategoriesComponent";
import ProductsComponent from "./components/admin/produits/ProductsComponent";
import ClientComponent from "./components/admin/clients/ClientsComponent";

const router = createBrowserRouter([
    {
        path:"/",
        element: <PurchaseLayout/>,
        children:[
            {
                path:"/",
                element:<Navigate to="/accueil"/>
            }, 
            {
                path:"/accueil",
                element:<Accueil/>
            },
            {
                path:"/articles/details/*",
                element:<DetailsPage/>
            },
            {
                path:"/categorie/*",
                element:<Categorie/>
            },
            {
                path:"/mon-espace",
                element:<ClientProfile/>
            },
        ]
    },
    
    {
        path:"/",
        element:<AdminLayout/>,
        children:[ 
            {
                path:"/admin",
                element:<Navigate to="/admin/dashboard"/>
            },  
            {
                path:"/admin/dashboard",
                element:<Dashboard/>
            },  
            {
                path:"/admin/categorie",
                element:<CategoriesComponent/>
            },  
            {
                path:"/admin/produit",
                element:<ProductsComponent/>
            },  
            {
                path:"/admin/client",
                element:<ClientComponent/>
            }
        ]
    },
    {
        path:"/",
        element:<GuestLayout/>,
        children:[   
            {
                path:"/login",
                element:<Signin/>
            },
            {
                path:"/register",
                element:<Signup/>
            },
        ]
    },
    // {
    //     path:"/*",
    //     element:<NotFound/>
    // },
]);


export default router;