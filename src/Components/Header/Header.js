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
  menuClickHandler = e => {
    Store.toggleDropdown();
    e.preventDefault();
  };
  render() {
    return (
      <Segment
        inverted
        fixed={'top'}
        color={Store.headerColor}
        className="customheader"
      >
        <Menu inverted secondary color={Store.headerColor} stackable>
          <NavLink exact={true} to="/">
            <Menu.Item>
              <img src="/WolfLogo_1x.png" width={'32px'} alt={'logo'} />
              {userStore.isAuth ? (
                <Button
                  basic
                  circular
                  icon="power off"
                  className={'hideOnTabAbove'}
                  style={{ marginLeft: 'auto', marginRight: '1rem' }}
                  onClick={() => userStore.logoutUser(this.props.history)}
                />
              ) : (
                undefined
              )}
              <div
                id="nav-icon3"
                onClick={this.menuClickHandler}
                className={
                  (!userStore.isAuth ? 'navMarginLeft ' : '') +
                  (Store.dropdownMenuOpen ? 'open' : '')
                }
              >
                <span />
                <span />
                <span />
                <span />
              </div>
            </Menu.Item>
          </NavLink>
          <div
            className={
              !Store.dropdownMenuOpen ? 'hideHeaderDrop' : 'slideInDown'
            }
          >
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
          </div>
          <Menu.Menu position="right" className="LDSHeader hideOnMob">
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
