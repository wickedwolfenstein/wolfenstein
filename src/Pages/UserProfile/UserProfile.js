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

export class UserProfile extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { activeItem } = this.state;
    const errMessages = null;
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
              <Form onSubmit={this.handleSubmit} error={false}>
                <Message error>
                  <Message.Header>Error Occured</Message.Header>
                  <Message.List>{errMessages ? errMessages : ''}</Message.List>
                </Message>
                <Form.Field error={false}>
                  <label>Old Password</label>
                  <input
                    type="password"
                    placeholder="Old Password"
                    name="oldpassword"
                    onChange={this.handleInputChange}
                    value={this.state.oldpassword}
                  />
                </Form.Field>
                <Form.Field error={false}>
                  <label>New Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleInputChange}
                    value={this.state.password}
                  />
                </Form.Field>
                <Form.Field error={false}>
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleInputChange}
                    value={this.state.password}
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
