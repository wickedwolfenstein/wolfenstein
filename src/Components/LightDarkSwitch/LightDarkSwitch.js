import React, { Component } from 'react';
import Store from '../../Store/themeStore';
import { observer } from 'mobx-react';

@observer
export class LightDarkSwitch extends Component {
  clickHandler = () => {
    Store.toggleTheme();
  };
  checkboChangedhandler = () => {};
  render() {
    return (
      <div className="wrapperLDS">
        <input
          id="dn"
          type="checkbox"
          onChange={this.checkboChangedhandler}
          checked={Store.themeToggle}
        />
        <label className={Store.themeToggle ? 'toggle' : ''} htmlFor="dn">
          <span className="toggle--handler" onClick={this.clickHandler} />
        </label>
      </div>
    );
  }
}

export default LightDarkSwitch;
