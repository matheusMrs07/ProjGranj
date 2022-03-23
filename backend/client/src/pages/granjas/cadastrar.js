import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';
import { getIdUsuario, getTipoUsuario } from '../../services/auth';


import { 
  Paper, 
  Button, 
  TextField,
  Grid, 
  Container, 
  Box,
  Input,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';



import Footer from '../../components/footer-admin';
import MenuAdmin from '../../components/menu-admin';


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
    padding: 15,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl: {
    width: '100%',
  },
  button:{
    padding: 15
  }
  
  
}));

export default function GranjasCadastrar() {
  const classes = useStyles();

  const [capacidade, setCapacidade] = useState('');
  const [propriedadeId, setPropriedadeId] = useState('');

  const [propriedades, setPropriedades] = useState([]);



  useEffect(() =>{

    async function loadPropriedades(){
      const params = {};

      if(getTipoUsuario() === 2){
        params = {
          UsuarioId: getIdUsuario()
        };
      }
      
      const response = await api.get("/api/propriedade/",{
        params: params
      });
      setPropriedades(response.data);
    }

    loadPropriedades();
  }, []);
  
  async function handleSubmit(){
    const data = {
      capacidade: capacidade,
      propriedadeId: propriedadeId
    };

    const response = await api.post('/api/granja/', data);

    if(response.status === 400){
      alert(response.message );
    }else{
      window.location.href='/granjas';
    }

  }

  return (
    <div className={classes.root}>
      
      <MenuAdmin title={"GRANJAS"} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid className={classes.button} xs={12} sm={12}>
              <Button variant="contained" href="/granjas"  color="defauf">
                Voltar
              </Button>
            </Grid>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Cadastrar Granja</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      required
                      id="capacidade"
                      name="capacidade"
                      label="Capacidade"
                      type="number"
                      fullWidth
                      autoComplete="given-name"
                      value={capacidade}
                      onChange={e => setCapacidade(e.target.value)}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                
                  <InputLabel id="propriedadeId">Propriedade</InputLabel>
                    <Select
                      labelId="propriedadeId"
                      id="propriedadeId"
                      value={propriedadeId}
                      onChange={e => setPropriedadeId(e.target.value)}
                      fullWidth  
                      input={<Input />}
                    >
                      {propriedades.map((propriedade) => (
                        <MenuItem key={propriedade.id} value={propriedade.id}>
                          {propriedade.endereco}
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


