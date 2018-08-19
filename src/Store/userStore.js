import { observable, action } from 'mobx';
import axios from '../config/Axios/axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import isEmpty from '../utils/isEmpty';

class UserStore {
  @observable isAuth = false;
  @observable errors = {};
  @observable user = {};

  @action
  registerUser = (user, history) => {
    axios
      .post('/register', user)
      .then(res => {
        this.errors = {};
        history.push('/login');
      })
      .catch(err => {
        this.errors = { ...err.response.data };
      });
  };

  @action
  loginUser = (user, redirectPath, history) => {
    axios
      .post('/login', user)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        this.setCurrentUser(decoded);
        this.refreshToken(3000 * 1000);
        if (redirectPath && redirectPath !== '') {
          this.errors = {};
          history.push(redirectPath);
        } else {
          this.errors = {};
          history.push('/');
        }
      })
      .catch(err => {
        this.errors = { ...err.response.data };
      });
  };

  @action
  setCurrentUser = decoded => {
    this.user = { ...decoded };
    this.isAuth = !isEmpty(decoded);
  };

  @action
  logoutUser = history => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    this.setCurrentUser({});
    history.push('/login');
  };

  refreshToken = (interval = 600 * 1000) => {
    setInterval(() => {
      axios
        .get('/refreshtoken')
        .then(res => {
          const { token } = res.data;
          localStorage.setItem('jwtToken', token);
          setAuthToken(token);
        })
        .catch(err => {
          this.errors = { ...err.response.data };
        });
    }, interval);
  };
}

const Store = new UserStore();

export default Store;
