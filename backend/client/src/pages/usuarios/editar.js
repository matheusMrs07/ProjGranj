import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';

import { useParams} from 'react-router-dom';

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

export default function UsuariosEditar() {
  const classes = useStyles();


  const {idUsuario} = useParams();
  
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('');
  
  async function handleSubmit(){
    const data = {
      nome: nome,
      cpf: cpf,
      telefone: telefone,
      email: email,
      tipo: tipo
    };

    if(senha){
      data.senha = senha;
    }
    const response = await api.put('/api/usuarios/'+idUsuario, data);

    if(response.status === 400){
      alert(response.message );
    }else{
      window.location.href='/usuarios';
    }

  }

 
  useEffect(() => {
    async function getUsuario(){
      var response = await api.get('api/usuarios/'+idUsuario);
      
      setNome(response.data.nome);
      setCpf(response.data.cpf);
      setTelefone(response.data.telefone);
      setEmail(response.data.email); 
      setTipo(response.data.tipo);
    }

    getUsuario();
  },[]);

  return (
    <div className={classes.root}>
      
      <MenuAdmin title={"Usuários"} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid className={classes.button} xs={12} sm={12}>
              <Button variant="contained" href="/usuarios"  color="defauf">
                Voltar
              </Button>
            </Grid>
            <Grid item sm={12} spacing={3}>
              <Paper className={classes.paper}>
                <h2>Editar Usuário</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome Completo"
                      fullWidth
                      autoComplete="given-name"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      id="cpf"
                      name="cpf"
                      label="CPF"
                      fullWidth
                      autoComplete="cpf"
                      value={cpf}
                      onChange={e => setCpf(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      id="telefone"
                      name="telefone"
                      label="Telefone"
                      fullWidth
                      autoComplete="telefone"
                      value={telefone}
                      onChange={e => setTelefone(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="E-mail"
                      type="email"
                      fullWidth
                      autoComplete="email@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      id="senha"
                      name="senha"
                      label="Senha"
                      type="password"
                      fullWidth
                      autoComplete="senha"
                      value={senha}
                      onChange={e => setSenha(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                    <Select
                      labelId="tipo"
                      id="tipo"
                      value={tipo}
                      fullWidth
                      onChange={e => setTipo(e.target.value)}
                    >
                      <MenuItem value={null}></MenuItem>
                      <MenuItem value={1}>Administrador</MenuItem>
                      <MenuItem value={2}>Produtor</MenuItem>
                    </Select>
                  </FormControl>
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


