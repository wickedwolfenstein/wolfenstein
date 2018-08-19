import React, { Component } from 'react';
import { Menu, Segment, Button } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import Store from '../../Store/themeStore';
import userStore from '../../Store/userStore';
import LightDarkSwitch from '../LightDarkSwitch/LightDarkSwitch';
import { observer } from 'mobx-react';
@withRouter
@observer
export class Header extends Component {
  render() {
    return (
      <Segment
        inverted
        fixed={'top'}
        color={Store.headerColor}
        className="customheader"
      >
        <Menu inverted secondary color={Store.headerColor}>
          <NavLink exact={true} to="/">
            <Menu.Item>
              <img src="/WolfLogo_1x.png" width={'32px'} alt={'logo'} />
            </Menu.Item>
          </NavLink>
          <NavLink
            exact={true}
            activeClassName="active"
            className="item"
            to="/"
          >
            Home
          </NavLink>
          {userStore.isAuth ? (
            <NavLink
              exact={true}
              activeClassName="active"
              className="item"
              to="/createpost"
            >
              Add
            </NavLink>
          ) : (
            undefined
          )}
          <NavLink
            exact={true}
            activeClassName="active"
            className="item"
            to="/posts"
          >
            Posts
          </NavLink>
          {userStore.isAuth ? (
            <NavLink
              exact={true}
              activeClassName="active"
              className="item"
              to="/profile"
            >
              Profile
            </NavLink>
          ) : (
            undefined
          )}
          {/* <NavLink
            exact={true}
            activeClassName="active"
            className="item"
            to="/register"
          >
            Register
          </NavLink>
          <NavLink
            exact={true}
            activeClassName="active"
            className="item"
            to="/login"
          >
            Login
          </NavLink> */}
          <Menu.Menu position="right" className="LDSHeader">
            {userStore.isAuth ? (
              <Menu.Item
                onClick={() => userStore.logoutUser(this.props.history)}
              >
                <Button basic circular icon="power off" />
              </Menu.Item>
            ) : (
              undefined
            )}
            <Menu.Item className="hideOnMob">
              <LightDarkSwitch />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}

export default Header;
