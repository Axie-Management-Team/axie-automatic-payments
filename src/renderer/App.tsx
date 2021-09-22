import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.global.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { injectStyle } from 'react-toastify/dist/inject-style';
import styled from 'styled-components';
import Home from './views/Home';
import store from './state/index';
import GenerateSecrets from './views/GenerateSecrets';
import LoadPayments from './views/LoadPayments';
import Logo from './components/Logo';

const LogoWrapper = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;
const Header = styled.h1`
  padding-left: 15px;
`;

export default function App() {
  injectStyle();

  return (
    <Provider store={store}>
      <ToastContainer />
      <LogoWrapper>
        <Logo />
        <Header>Scholar Tracker Manager</Header>
      </LogoWrapper>
      <Router>
        <Switch>
          <Route path="/load/payments" component={LoadPayments} />
          <Route path="/generate/secrets" component={GenerateSecrets} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}
