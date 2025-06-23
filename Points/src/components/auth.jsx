import {Navigate, Outlet} from "react-router-dom"

export const Auth=({isAuth, redirect="/"}) =>{
    if(!isAuth){
        return <Navigate to={redirect} />
    }
    return <Outlet/>
}