import React from 'react';

import { BrowserRouter, Switch, Route} from 'react-router-dom';


import Dashboard from './pages/dashboard';


import Usuarios from './pages/usuarios';
import UsuariosEditar from './pages/usuarios/editar';
import UsuariosCadastrar from './pages/usuarios/cadastrar';

import Propriedades from './pages/propriedades';
import PropriedadesEditar from './pages/propriedades/editar';
import PropriedadesCadastrar from './pages/propriedades/cadastrar';

import Granjas from './pages/granjas';
import GranjasEditar from './pages/granjas/editar';
import GranjasCadastrar from './pages/granjas/cadastrar';

import Lotes from './pages/lotes';
import LotesEditar from './pages/lotes/editar';
import LotesCadastrar from './pages/lotes/cadastrar';

import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/login/signup';


import PrivateRoute from './services/wAuth';


export default function Routes(){

    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />

                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />

                <PrivateRoute path="/dashboard" exact component={Dashboard} />
                
                <PrivateRoute path="/usuarios" exact component={Usuarios} />
                <PrivateRoute path="/usuarios/cadastrar" exact component={UsuariosCadastrar} />
                <PrivateRoute path="/usuarios/editar/:idUsuario" exact component={UsuariosEditar} />

                
                <PrivateRoute path="/propriedades" exact component={Propriedades} />
                <PrivateRoute path="/propriedades/cadastrar" exact component={PropriedadesCadastrar} />
                <PrivateRoute path="/propriedades/editar/:idPropriedade" exact component={PropriedadesEditar} />

                
                <PrivateRoute path="/granjas" exact component={Granjas} />
                <PrivateRoute path="/granjas/cadastrar" exact component={GranjasCadastrar} />
                <PrivateRoute path="/granjas/editar/:idGranja" exact component={GranjasEditar} />
                

                
                <PrivateRoute path="/lotes" exact component={Lotes} />
                <PrivateRoute path="/lotes/cadastrar" exact component={LotesCadastrar} />
                <PrivateRoute path="/lotes/editar/:idLote" exact component={LotesEditar} />
                
                
                
            </Switch>
        </BrowserRouter>
    )
}