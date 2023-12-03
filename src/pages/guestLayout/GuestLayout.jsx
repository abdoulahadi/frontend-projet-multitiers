import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from "../../components/header/Header";
import { useStateContext } from '../../contexts/ContextProvider';
const GuestLayout = () => {
    const {token} = useStateContext()

    if (token){
        return <Navigate to="/"/>
    }
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
};

export default GuestLayout;