import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
  TableRow
} from '@material-ui/core';

import TemperaturaCadastrar from '../temperatura/cadastrar_modal';

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


export default function GranjasListar() {
  const classes = useStyles();
  
  const [granjas, setGranja] = useState([])

  const [openDialog, setOpenDialog] = useState(false);


  const dialogOpen = () => {
    setOpenDialog(true);
  };

  const dialogClose = () => {
    setOpenDialog(false);
  };



  async function loadGranja(){
    const response = await api.get("/api/granja/");
    setGranja(response.data);
  }

  useEffect(() =>{
    loadGranja();
  }, [])

  async function handleDelete(id){
    if(window.confirm("Deseja realmente excluir este usuário? ")) {
      var result = await api.delete("/api/granja/"+id);
      if(result.status === 200){
        alert("Sucesso!");
        loadGranja();
      }else{
        alert("Ocorreu um erro!");
      }
    }

  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'GRANJAS'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Listar Granjas</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" href={'/granjas/cadastrar/'} >
                        +Cadastrar
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} size="medium" aria-label="a simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Código</TableCell>
                          <TableCell align="center">Capacidade</TableCell>
                          <TableCell align="center">Propriedade</TableCell>
                          <TableCell align="center">Criado em</TableCell>
                          <TableCell align="center">Opções</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {granjas.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              {row.id}
                            </TableCell>
                            <TableCell align="center">{row.capacidade}</TableCell>
                            <TableCell align="center">{row.propriedade.endereco}</TableCell>
                            <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br') }</TableCell>
                            <TableCell align="center">
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                              <Button color="action"  onClick={dialogOpen}> </Button>
                              <Button color='primary' href={'/granjas/editar/'+row.id} > <EditIcon/></Button>
                              <Button color='secondary' onClick={() => handleDelete(row.id) }><DeleteIcon/></Button>
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
        
       <TemperaturaCadastrar open={openDialog} />
      </main>
    </div>
  );
}