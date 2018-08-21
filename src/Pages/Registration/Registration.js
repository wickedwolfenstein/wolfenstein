import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import setAuthToken from '../../utils/setAuthToken';
import UserStore from '../../Store/userStore';
import {
  Button,
  Form,
  Grid,
  Segment,
  Message,
  Header,
} from 'semantic-ui-react';

@observer
class Registeration extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password_confirm: '',
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

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm,
    };
    UserStore.registerUser(user, this.props.history);
  };

  render() {
    const keys = Object.keys(UserStore.errors);
    const errMessages = keys.map(x => {
      return <Message.Item key={x}>{UserStore.errors[x]}</Message.Item>;
    });
    return (
      <Grid className={'takeFullHeight'}>
        <Grid.Row centered columns={3}>
          <Grid.Column tablet={2} computer={3} only="computer" />
          <Grid.Column
            mobile={16}
            tablet={12}
            computer={10}
            className={'create-post-editor'}
          >
            <Segment textAlign="left" raised className="formSegment">
              <Header size="medium" className="textCenterAlign">
                Register
              </Header>
              <Form onSubmit={this.handleSubmit} error={keys.length > 0}>
                <Message error>
                  <Message.Header>Error Occured</Message.Header>
                  <Message.List>{errMessages}</Message.List>
                </Message>
                <Form.Field
                  error={
                    UserStore.errors && UserStore.errors.name ? true : false
                  }
                >
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    name="name"
                    onChange={this.handleInputChange}
                    value={this.state.name}
                  />
                </Form.Field>
                <Form.Field
                  error={
                    UserStore.errors && UserStore.errors.email ? true : false
                  }
                >
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
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
                    className="form-control"
                    name="password"
                    onChange={this.handleInputChange}
                    value={this.state.password}
                  />
                </Form.Field>
                <Form.Field
                  error={
                    UserStore.errors && UserStore.errors.password_confirm
                      ? true
                      : false
                  }
                >
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control"
                    name="password_confirm"
                    onChange={this.handleInputChange}
                    value={this.state.password_confirm}
                  />
                </Form.Field>
                <Button type="submit">Register</Button>
              </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column tablet={2} computer={3} only="computer tablet" />
        </Grid.Row>
      </Grid>
    );
  }
}

export default withRouter(Registeration);
