import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';
import { getIdUsuario, getTipoUsuario } from '../../services/auth';

import { useParams } from 'react-router-dom';

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
  formControl:{
    width: '100%'
  },
  button: {
    padding: 15,
  }
  
}));

export default function LotesEditar() {
  const classes = useStyles();

  const [numero, setNumero] = useState('');
  const [granjaId, setGranjaId] = useState('');

  const [granjas, setGranjas] = useState([]);

  const {idLote} = useParams();

  useEffect(() =>{

    async function loadLote(){
      
      const response = await api.get("/api/lote/"+idLote);
      setNumero(response.data.numero);
      setGranjaId(response.data.granjaId);

    }

    async function loadGranjas(){
      const params = {};

      if(getTipoUsuario() === 2){
        params = {
          UsuarioId: getIdUsuario()
        };
      }
      
      const response = await api.get("/api/granja/",{
        params: params
      });
      setGranjas(response.data);
    }
    loadLote();
    loadGranjas();
  }, []);
  
  async function handleSubmit(){
    const data = {
      numero: numero,
      granjaId: granjaId
    };

    const response = await api.put('/api/lote/'+idLote, data);

    if(response.status === 400){
      alert(response.message );
    }else{
      window.location.href='/lotes';
    }

  }

  return (
    <div className={classes.root}>
      
      <MenuAdmin title={"LOTES"} />
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
                <h2>Cadastrar Lote</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="numero"
                      name="numero"
                      label="numero"
                      fullWidth
                      autoComplete="given-name"
                      value={numero}
                      onChange={e => setNumero(e.target.value)}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={3}>
                
                  <InputLabel id="granjaId">Granja</InputLabel>
                    <Select
                      labelId="granjaId"
                      id="granjaId"
                      value={granjaId}
                      onChange={e => setGranjaId(e.target.value)}
                      fullWidth  
                      input={<Input />}
                    >
                      {granjas.map((granja) => (
                        <MenuItem key={granja.id} value={granja.id}>
                          Granja: {granja.id} - Cap:{granja.capacidade}
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


