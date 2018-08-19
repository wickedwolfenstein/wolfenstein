import React, { Fragment } from 'react';
import { Segment, List } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
const Footer = props => {
  return (
    <Segment className={'footer'}>
      {window.innerWidth > 600 ? (
        <Fragment>
          <List floated="right" horizontal>
            <List.Item>
              <NavLink
                exact={true}
                activeClassName="active"
                className="item"
                to="/terms"
              >
                Terms
              </NavLink>
            </List.Item>
            <List.Item>
              <NavLink
                exact={true}
                activeClassName="active"
                className="item"
                to="/privacy"
              >
                Privacy
              </NavLink>
            </List.Item>
            <List.Item>
              <NavLink
                exact={true}
                activeClassName="active"
                className="item"
                to="/contactus"
              >
                Contact Us
              </NavLink>
            </List.Item>
            <List.Item disabled href="#">
              Created By Wolfenstein
            </List.Item>
          </List>
          <List horizontal relaxed>
            <List.Item>
              <NavLink
                exact={true}
                activeClassName="active"
                className="item"
                to="/aboutus"
              >
                About Us
              </NavLink>
            </List.Item>
          </List>
        </Fragment>
      ) : (
        <Fragment>
          <List horizontal className="textCenterAlign centerAlign">
            <List.Item>
              <NavLink
                exact={true}
                activeClassName="active"
                className="item"
                to="/terms"
              >
                Terms
              </NavLink>
            </List.Item>
            <List.Item>
              <NavLink
                exact={true}
                activeClassName="active"
                className="item"
                to="/privacy"
              >
                Privacy
              </NavLink>
            </List.Item>
            <List.Item>
              <NavLink
                exact={true}
                activeClassName="active"
                className="item"
                to="/contactus"
              >
                Contact Us
              </NavLink>
            </List.Item>
            <List.Item>
              <NavLink
                exact={true}
                activeClassName="active"
                className="item"
                to="/aboutus"
              >
                About Us
              </NavLink>
            </List.Item>
          </List>
          <List className="textCenterAlign">
            <List.Item disabled href="#">
              <p>Created By Wolfenstein</p>
            </List.Item>
          </List>
        </Fragment>
      )}
    </Segment>
  );
};

export default Footer;
