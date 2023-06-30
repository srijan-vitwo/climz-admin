// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "./hooks/useAuth";

// const RequireAuth = () => {
//     const { auth } = useAuth();
//     const location = useLocation();
//     // console.log(auth, 'fff')


//     return (
//         auth?.roles
//             ? <Outlet />
//             : auth?.user
//                 ? <Navigate to="/unauthorized" state={{ from: location }} replace />
//                 : <Navigate to="/login" state={{ from: location }} replace />
//     );
// }

// export default RequireAuth;



import { useLocation, Navigate } from "react-router-dom";
import React, { useState } from 'react'
import Globalllayout from './pages/global/css/globalllayout';

const RequireAuth = () => {
    const location = useLocation();
    const user = localStorage.getItem("user");
    let token = localStorage.getItem("token");


    return (
        token && user
            ?
            <Globalllayout /> : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
