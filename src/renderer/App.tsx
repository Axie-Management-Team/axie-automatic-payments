import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.global.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from 'react-toastify/dist/inject-style';
import styled from 'styled-components';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Toolbar,
} from '@mui/material';
import Home from './views/Home';
import store from './state/index';
import GenerateSecrets from './views/GenerateSecrets';
import Claims from './views/Claims';
import LoadPayments from './views/LoadPayments';
import Logo from './components/Logo';

const Header = styled.h1`
  padding-left: 15px;
`;

export default function App() {
  injectStyle();

  return (
    <Provider store={store}>
      <ToastContainer />

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <Logo />
            <Header>Scholar Tracker Manager</Header>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12}>
              <Router>
                <Switch>
                  <Route path="/load/payments" component={LoadPayments} />
                  <Route path="/generate/secrets" component={GenerateSecrets} />
                  <Route path="/claims" component={Claims} />
                  <Route path="/" component={Home} />
                </Switch>
              </Router>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Provider>
  );
}
