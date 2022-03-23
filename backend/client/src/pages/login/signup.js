import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {login, setIdUsuario, setNomeUsuario} from '../../services/auth';

import {  
  Button, 
  TextField,
  Grid, 
  Container, 
  Box,
  CssBaseline,
  Avatar,
  Typography
} from '@material-ui/core';



import Footer from '../../components/footer-admin';




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  }
  
}));

export default function UsuariosCadastrar() {
  const classes = useStyles();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');


  async function mekeLogin(email, senha){
    await api.post("/api/login", {email,senha})
    .then(res =>{
        if(res.status === 200){
            if(res.data.status === 1){
                login(res.data.token);
                setIdUsuario(res.data.id_client);
                setNomeUsuario(res.data.user_name);

                window.location.href = '/dashboard';

            }
        }
    })
  }

  
  async function handleSubmit(){
    const data = {
      nome: nome,
      cpf: cpf,
      telefone: telefone,
      email: email,
      senha: senha,
      tipo: 2
    };

    const response = await api.post('/api/usuarios/', data);

    if(response.status === 400){
      alert(response.message );
    }else{
      mekeLogin(email,senha);
      window.location.href='/dashboard';
    }

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={12}>
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
            <Grid item xs={12} sm={12}>
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
            <Grid item xs={12} sm={12}>
              <Button variant="contained"  onClick={handleSubmit} color="primary">
                Cadastrar
              </Button>
            </Grid>
          </Grid>
      </div>
      <Box mt={5}>
        <Footer />
      </Box>
    </Container>
    
  );
}


