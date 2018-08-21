import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import UserStore from '../../Store/userStore';
import setAuthToken from '../../utils/setAuthToken';
import {
  Button,
  Form,
  Grid,
  Segment,
  Message,
  Header,
} from 'semantic-ui-react';
import { observer } from 'mobx-react';

@observer
class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    from: '',
  };

  componentDidMount() {
    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        UserStore.logoutUser(this.props.history);
      } else {
        setAuthToken(localStorage.jwtToken);
        UserStore.setCurrentUser(decoded);
      }
    }
    if (UserStore.isAuth) {
      this.props.history.push('/');
    }
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  registerButtonClickHandler = e => {
    e.preventDefault();
    this.props.history.push('/register');
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    let redirPath = '/';
    if (
      ((((this.props || {}).location || {}).state || {}).from || {}).pathname
    ) {
      redirPath = this.props.location.state.from.pathname;
    }
    UserStore.loginUser(user, redirPath, this.props.history);
  };

  render() {
    const keys = Object.keys(UserStore.errors);
    const errMessages = keys.map(x => {
      return <Message.Item key={x}>{UserStore.errors[x]}</Message.Item>;
    });
    return (
      <Grid doubling stackable className={'takeFullHeight'}>
        <Grid.Row centered columns={3}>
          <Grid.Column tablet={2} computer={3} only="computer tablet" />
          <Grid.Column
            mobile={16}
            tablet={12}
            computer={10}
            className={'create-post-editor'}
          >
            <Segment textAlign="left" raised className="formSegment">
              <Header size="medium" className="textCenterAlign">
                Login
              </Header>
              <Form onSubmit={this.handleSubmit} error={keys.length > 0}>
                <Message error>
                  <Message.Header>Error Occured</Message.Header>
                  <Message.List>{errMessages ? errMessages : ''}</Message.List>
                </Message>
                <Form.Field
                  error={
                    UserStore.errors && UserStore.errors.email ? true : false
                  }
                >
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={this.handleInputChange}
                    value={this.state.email}
                  />
                </Form.Field>
                <Form.Field
                  error={
                    UserStore.errors && UserStore.errors.password ? true : false
                  }
                >
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleInputChange}
                    value={this.state.password}
                  />
                </Form.Field>
                <Button type="submit">Login</Button>
                <Button
                  floated="right"
                  type="button"
                  onClick={this.registerButtonClickHandler}
                >
                  Register
                </Button>
              </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column tablet={2} computer={3} only="computer tablet" />
        </Grid.Row>
      </Grid>
    );
  }
}

export default Login;
