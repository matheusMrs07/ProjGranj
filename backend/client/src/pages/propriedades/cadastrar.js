import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';
import Marker from '../../components/marker';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Geocode from "react-geocode";



import GoogleMapReact from 'google-map-react';

import { 
  Paper, 
  Button, 
  TextField,
  Grid, 
  Container, 
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input
} from '@material-ui/core';


import Footer from '../../components/footer-admin';
import MenuAdmin from '../../components/menu-admin';
import {getTipoUsuario, getIdUsuario} from '../../services/auth';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 50,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl: {
    width: '100%',
  }
  ,
  mapa: {
    height: '400px',
    align: '100%'
  }
  
}));


Geocode.setApiKey("AIzaSyBfA2WDFP3LEDyq7KbbdFTZL4cgHUyR9fQ");

Geocode.setLanguage("pt-BR");
Geocode.enableDebug();  
Geocode.setRegion("br");



//const Marker = () => <div><LocationOnIcon/></div>;

export default function PropriedadesCadastrar() {
  const classes = useStyles();

  const tipo_usuario = getTipoUsuario();


  const [center, setCenter] = useState({
    lat: -25.461935, 
    lng: -50.270116
  });
  const [zoom, setZoom] = useState(6);

  const [endereco, setEndereco] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [usuarios, setUsuarios] = useState([]);



  function _onClick(obj){ 
    setLatitude(obj.lat);
    setLongitude(obj.lng);
    
    Geocode.fromLatLng(obj.lat, obj.lng).then(
      (response) => {
        setEndereco(response.results[0].formatted_address);
        //const address = response.results[0].formatted_address;
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }


  function buscaMapa(){ 
    
    
    Geocode.fromAddress(endereco).then(
      (response) => {
        var coords = response.results[0].geometry.location;
        setLatitude(coords.lat);
        setLongitude(coords.lng);

        setCenter(coords);
        setZoom(15);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  

  useEffect(() =>{

    async function loadUsuarios(){
      
      const response = await api.get("/api/usuarios/",{
        params: {
          tipo: 2
        }
      });
      setUsuarios(response.data);
    }

    loadUsuarios();
  }, []);
  
  async function handleSubmit(){
    
    if(tipo_usuario === 2){
      setUsuarioId(getIdUsuario());
    }
    const data = {
      latitude: latitude,
      longitude: longitude,
      endereco: endereco,
      usuarioId: usuarioId
    };

    const response = await api.post('/api/propriedade/', data);

    if(response.status === 400){
      alert(response.message );
    }else{
      window.location.href='/propriedades';
   }

  }


  return (
    <div className={classes.root}>
      
      <MenuAdmin title={"Usuários"} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Cadastrar Propriedade</h2>
                <Grid container spacing={3}>
                
            
                  <Grid item xs={12} sm={12} >
                    <div   className={classes.mapa}>
                    <GoogleMapReact
                      bootstrapURLKeys={{   
                        key: "AIzaSyBRQ7ND0hvJuziaq4Dtw-GRod6vv5bTqQw",
                        libraries:['places', 'geometry', 'drawing', 'visualization'] 
                      }}
                      defaultCenter={center}
                      defaultZoom={zoom}
                      onClick = {_onClick}
                      
                    >
                      <Marker
                          lat={latitude}
                          lng={longitude}
                          name="Local"
                          color="blue"
                        />
                      
                    </GoogleMapReact>
                    </div>
                  </Grid>
                  
                  <Grid item xs={12} sm={8}>
                    <TextField
                      required
                      id="endereco"
                      name="endereco"
                      label="Endereço"
                      fullWidth
                      autoComplete="Endereço"
                      value={endereco}
                      onChange={e => setEndereco(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Button variant="contained" onClick={buscaMapa} >
                      Buscar no mapa
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                  <InputLabel id="usuario_id">Usuário</InputLabel>
                    <Select
                      labelId="usuario_id"
                      id="usuario_id"
                      value={usuarioId}
                      onChange={e => setUsuarioId(e.target.value)}
                      fullWidth  
                      input={<Input />}
                    >
                      {usuarios.map((usuario) => (
                        <MenuItem key={usuario.id} value={usuario.id}>
                          {usuario.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  
                  
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" onClick={handleSubmit} color="primary">
                      Salvar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}


