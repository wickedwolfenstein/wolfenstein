import React, { Component } from 'react';
import {
  Grid,
  Header,
  Divider,
  Menu,
  Segment,
  Form,
  Message,
  Button,
} from 'semantic-ui-react';
import UserPosts from '../UserPosts/UserPosts';
import UserStore from '../../Store/userStore';
import { observer } from 'mobx-react';

@observer
export class UserProfile extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleSubmit = e => {
    const data = new FormData(e.target);
    if (data) {
      const old_password = data.get('old_password');
      const new_password = data.get('new_password');
      const new_password_confirm = data.get('new_password_confirm');
      UserStore.changePassword({
        old_password,
        new_password,
        new_password_confirm,
      });
    }
  };
  render() {
    const { activeItem } = this.state;
    const keys = Object.keys(UserStore.errors);
    const errMessages = keys.map(x => {
      return <Message.Item key={x}>{UserStore.errors[x]}</Message.Item>;
    });
    return (
      <Grid className={'gridpushup'}>
        <Grid.Row columns={3}>
          <Grid.Column tablet={2} computer={3} only="computer tablet" />
          <Grid.Column
            mobile={16}
            tablet={12}
            computer={10}
            className={'create-post-editor'}
          >
            <Header as="h1" className={'post-list'} content="User Settings" />
            <Menu pointing vertical>
              <Menu.Item
                name="account"
                active={activeItem === 'account'}
                onClick={this.handleItemClick}
              />
            </Menu>
            <Segment textAlign="left" raised className="formSegment">
              <Header size="medium" className="textCenterAlign">
                Change Password
              </Header>
              <Form onSubmit={this.handleSubmit} error={keys.length > 0}>
                <Message error className={'userProfileMessage'}>
                  <Message.Header>Error Occured</Message.Header>
                  <Message.List>{errMessages ? errMessages : ''}</Message.List>
                </Message>
                <Form.Field
                  error={
                    UserStore.errors && UserStore.errors.old_password
                      ? true
                      : false
                  }
                >
                  <label>Old Password</label>
                  <input
                    type="password"
                    placeholder="Old Password"
                    name="old_password"
                  />
                </Form.Field>
                <Form.Field
                  error={
                    UserStore.errors && UserStore.errors.new_password
                      ? true
                      : false
                  }
                >
                  <label>New Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="new_password"
                  />
                </Form.Field>
                <Form.Field
                  error={
                    UserStore.errors && UserStore.errors.new_password_confirm
                      ? true
                      : false
                  }
                >
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="new_password_confirm"
                  />
                </Form.Field>
                <Button type="submit">Change Password</Button>
              </Form>
            </Segment>
            <Divider hidden />
            <UserPosts />
          </Grid.Column>
          <Grid.Column tablet={2} computer={3} only="computer tablet" />
        </Grid.Row>
      </Grid>
    );
  }
}

export default UserProfile;
