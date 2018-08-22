import React, { Component, Fragment } from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { Route, Switch, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './App.css';
import EditPost from './Pages/EditPost/EditPost';
import PostsList from './Pages/PostsList/PostsList';
import ViewPost from './Pages/ViewPost/ViewPost';
import Registration from './Pages/Registration/Registration';
import Login from './Pages/Login/Login';
import UserProfile from './Pages/UserProfile/UserProfile';
import UserPosts from './Pages/UserPosts/UserPosts';
import Store from './Store/userStore';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import { HomePage } from './Pages/HomePage/HomePage';
import ErrorPage from './Pages/ErrorPage/ErrorPage';

class App extends Component {
  componentWillMount() {
    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        Store.logoutUser(this.props.history);
      } else {
        setAuthToken(localStorage.jwtToken);
        Store.setCurrentUser(decoded);
      }
    }
  }
  componentDidUpdate() {
    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        Store.logoutUser(this.props.history);
      } else {
        setAuthToken(localStorage.jwtToken);
        Store.setCurrentUser(decoded);
      }
    }
  }

  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <PrivateRoute
            exact
            authed={Store.isAuth}
            path="/profile/posts/:postId"
            component={EditPost}
            redirectPathname={'/login'}
          />
          <PrivateRoute
            exact
            authed={Store.isAuth}
            path="/profile/posts"
            component={UserPosts}
            redirectPathname={'/login'}
          />
          <PrivateRoute
            exact
            authed={Store.isAuth}
            path="/profile"
            component={UserProfile}
            redirectPathname={'/login'}
          />
          <PrivateRoute
            exact
            authed={Store.isAuth}
            path="/createpost"
            component={EditPost}
            redirectPathname={'/login'}
          />
          <Route
            exact
            path="/posts/:category/:postId/:postTitle"
            component={ViewPost}
          />
          <Route exact path="/posts/:category" component={PostsList} />
          <Route exact path="/posts" component={PostsList} />
          <PrivateRoute
            authed={!Store.isAuth}
            path="/register"
            component={Registration}
            redirectPathname={'/'}
          />
          <PrivateRoute
            authed={!Store.isAuth}
            path="/login"
            component={Login}
            redirectPathname={'/'}
          />
          <Route exact path="/terms" component={ViewPost} />
          <Route exact path="/aboutus" component={ViewPost} />
          <Route exact path="/privacy" component={ViewPost} />
          <Route exact path="/contactus" component={ViewPost} />
          <Route exact path="/500" component={ErrorPage} />
          <Route exact path="/404" component={PageNotFound} />
          <Route exact path="/google177ceb4e4924b877.html" />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
        <Footer />
      </Fragment>
    );
  }
}

export default withRouter(App);
