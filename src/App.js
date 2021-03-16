import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from './pages/homepage/HomePage';
import Shop from './pages/shop/Shop';

import './App.css';
import Header from './components/header/Header';
import SigninSignup from './pages/sign-in-sign-up/SigninSignup';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props;
    //listening to authentication state changes
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //checks if the user is already in database and returns snaphot of it, which than sets in state for currentUser
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      else {
        setCurrentUser(userAuth)
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
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={Shop} />
          <Route path='/signin' component={SigninSignup} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
