import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Build,
  Person
} from '@material-ui/icons/';

import { 
  Paper, 
  Button,
  ButtonGroup,
  Grid, 
  Container, 
  Box, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@material-ui/core';


import Footer from '../../components/footer-admin';
import MenuAdmin from '../../components/menu-admin';

import api from '../../services/api';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%' 
  },
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
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
  
}));


export default function PropriedadesListar() {
  const classes = useStyles();
  
  const [propriedades, setPropriedades] = useState([])

  async function loadPropriedades(){
    const response = await api.get("/api/propriedade/");
    setPropriedades(response.data);
    console.log(response);
  }

  useEffect(() =>{
    loadPropriedades();
  }, [])

  async function handleDelete(id){
    if(window.confirm("Deseja realmente excluir este usuário? ")) {
      var result = await api.delete("/api/propriedade/"+id);
      if(result.status === 200){
        alert("Sucesso!");
        loadPropriedades();
      }else{
        alert("Ocorreu um erro!");
      }
    }

  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'PROPRIEDADES'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Listar Propriedades</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" href={'/propriedades/cadastrar/'} >
                        +Cadastrar
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} size="medium" aria-label="a simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Código</TableCell>
                          <TableCell align="center">Endereço</TableCell>
                          <TableCell align="center">Proprietário</TableCell>
                          <TableCell align="center">Criado em</TableCell>
                          <TableCell align="center">Opções</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {propriedades.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row" align="center">
                              {row.id}
                            </TableCell>
                            <TableCell align="center">{row.endereco}</TableCell>
                            <TableCell align="center">{row.usuario.nome}</TableCell>
                            <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br') }</TableCell>
                            <TableCell align="center">
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                              <Button color='primary' href={'/propriedades/editar/'+row.id} >Editar</Button>
                              <Button color='secondary' onClick={() => handleDelete(row.id) }>Excluir</Button>
                            </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
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