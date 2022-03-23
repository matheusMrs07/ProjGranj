import React, {useEffect, useState} from 'react';
import api from './api';
import { login, getToken, logout } from './auth';
import { Route, Redirect } from 'react-router-dom';

export default function WAuth ({component: Component, ... rest}){
    const [ redirect, setRedirect ] = useState(false);
    const [ loading, setLoading] = useState(true);

    useEffect(() => {
        async function verify(){
            var res = await api.get('/api/checkToken', {headers:{token: getToken()}});
            if(res.data.status === 200){
                setLoading(false);
                setRedirect(false);
            }else{
                logout();
                setLoading(false);
                setRedirect(true);
            }
        }
        verify();
    }, []);

    return(
        loading?'Carregando...':<Route { ...rest }
        render={props => !redirect?(
                <Component { ...props }/>
            ):<Redirect to={{pathname: "/login", state:{from: props.location}}}/>
        }/> 
   )
}