import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import Shop from './pages/shop/Shop';

import './App.css';
import Header from './components/header/Header';
import SigninSignup from './pages/sign-in-sign-up/SigninSignup';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    //listening to authentication state changes
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //checks if the user is already in database and returns snaphot of it, which than sets in state for currentUser
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }
      else {
        this.setState({ currentUser: userAuth })
      }
    })
  }

  //close current subscription in auth
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={Shop} />
          <Route path='/signin' component={SigninSignup} />
        </Switch>
      </div>
    );
  }
}

export default App;
