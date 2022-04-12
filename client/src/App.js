import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { Provider } from 'react-redux';
import store from './store';
import AdminHome from './pages/admin/home';
import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import PrivateRoute from './components/shared/Auth/PrivateRouter';
//import Register from './components/register/Register';
import NotFound from './components/shared/NotFound';


import newAdmin from './pages/admin/newAdmin';
import newPost from './pages/admin/newPost';
import Posts from './pages/admin/Posts';
import Admins from './pages/admin/Admins';
import HomeLanding from './pages/landing/HomeLanding';
import  Login  from './pages/admin/reg/Login';
import NewTag from './pages/admin/NewTag';
import EditPost from './pages/admin/EditPost';
import SinglePost from './pages/landing/SinglePost';
import Messages from './pages/admin/Messages';
import  Search  from './pages/landing/search';
import LoginClient from './pages/landing/Login';



//Check for token
if( localStorage.blogerman ){
  //Set auth token header auth
  setAuthToken( localStorage.blogerman );
  //Decode token and get user info and export
  const decoded = jwt_decode( localStorage.blogerman );
  //Set user and isAuthenticated
  store.dispatch( setCurrentUser( decoded ) );
  //console.log('not time out')
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if( decoded.exp < currentTime ){
    // Logout user
    console.log('time out')
    store.dispatch( logoutUser() );

    // Clear current profile
    store.dispatch( clearCurrentProfile() );

    // Redirect to login page
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
    <Provider store={ store }>
      <Router>
        <div className="App">
          <Header/>
            <div className="my-container">
              <Switch>
                <Route exact path="/" component={HomeLanding} />
                <Route exact path="/news/:id" component={SinglePost} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/auth_user" component={LoginClient} />
                <PrivateRoute exact path="/create/admin" component={newAdmin} />
                <PrivateRoute exact path="/create/tag" component={NewTag} />
                <PrivateRoute exact path="/admins/messages" component={Messages} />
                
                <PrivateRoute exact path="/edit/post/:id" component={EditPost} />
                <PrivateRoute exact path="/create/post" component={newPost} />
                <PrivateRoute exact path="/admin/posts" component={Posts} />
                <PrivateRoute exact path="/admins" component={Admins} />
                <PrivateRoute exact path="/admin/home" component={AdminHome} />
                <PrivateRoute exact path="/adm" component={ AdminHome } />
                <Route  path="" component={ NotFound }/>
              </Switch>
            </div>
          <Footer/>
        </div>
      </Router>
    </Provider>
    );
  }
}

export default App;
