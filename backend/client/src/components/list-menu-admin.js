import React , { useState } from 'react';

import DashboardIcon from '@material-ui/icons/Dashboard';
import  PeopleIcon from '@material-ui/icons/People';
import  ExitToAppIcon from '@material-ui/icons/ExitToApp';
import  HouseIcon from '@material-ui/icons/House';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider,
  Dialog,
  DialogActions,
  DialogTitle
} from '@material-ui/core/';



import api from '../services/api';
import {getToken, logout} from '../services/auth';



export default function ListMenuAdmin(){ 

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  async function handleConfirm() {
    console.log("TESTE");
    const response = await api.get('/api/destroyToken', {headers: {token: getToken}});
    setOpen(false);
    if(response.status === 200){
      logout();
      window.location.href = '/';
    }else{
      alert("Não foi possivel fazer logout");
    }
  }

  return (
      <div>

        <ListItem button component="a" href="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component="a" href="/usuarios">
          <ListItemIcon>
          <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Usuários" />
        </ListItem>
        <ListItem button component="a" href="/propriedades">
          <ListItemIcon>
          <LocationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Propriedades" />
        </ListItem>
        <ListItem button component="a" href="/granjas">
          <ListItemIcon>
          <HouseIcon />
          </ListItemIcon>
          <ListItemText primary="Granjas" />
        </ListItem>
        <ListItem button component="a" href="/lotes">
          <ListItemIcon>
          <NextWeekIcon />
          </ListItemIcon>
          <ListItemText primary="Lotes" />
        </ListItem>
        <Divider />
        <ListSubheader inset>Opções</ListSubheader>
        <ListItem button onClick={handleClickOpen}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItem>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Você deseja fazer Logout?"}</DialogTitle>
          
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Não
              </Button>
              <Button onClick={handleConfirm} color="primary" autoFocus>
                Sim
              </Button>
            </DialogActions>
          </Dialog>
      </div>
  );
}






