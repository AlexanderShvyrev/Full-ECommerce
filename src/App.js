import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import Shop from './pages/shop/Shop';

import './App.css';
import Header from './components/header/Header';
import SigninSignup from './pages/sign-in-sign-up/SigninSignup';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={Shop} />
        <Route path='/signin' component={SigninSignup} />
      </Switch>
    </div>
  );
}

export default App;
