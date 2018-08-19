import { observable, action } from 'mobx';

class ThemeStore {
  THEMES = {
    BLUE: 'blue',
    RED: 'red',
  };
  STARS = {
    BLUE: 'rgba(5, 200, 200, .8)',
    RED: 'rgba(200, 5, 5, .8)',
  };
  LINES = {
    BLUE: 'rgba(10, 222, 222, .8)',
    RED: 'rgba(255, 71, 26, .8)',
  };
  BG = {
    BLUE: 'cat1.png',
    RED: 'Wickedity.png',
  };

  @observable headerColor = 'blue';
  @observable themeToggle = true;
  @observable imageUrl = this.BG.BLUE;
  @observable star = 'rgba(5, 200, 200, .8)';
  @observable line = 'rgba(10, 222, 222, .8)';

  constructor() {
    const localStorageThemeColor = localStorage.getItem('theme');
    if (localStorageThemeColor === this.THEMES.RED) {
      this.headerColor = this.THEMES.RED;
      this.themeToggle = false;
      this.star = this.STARS.RED;
      this.line = this.LINES.RED;
      this.imageUrl = this.BG.RED;
    } else {
      this.headerColor = this.THEMES.BLUE;
      this.themeToggle = true;
      this.star = this.STARS.BLUE;
      this.line = this.LINES.BLUE;
      this.imageUrl = this.BG.BLUE;
    }
  }

  @action
  toggleTheme = () => {
    this.themeToggle = !this.themeToggle;
    this.headerColor = this.themeToggle ? this.THEMES.BLUE : this.THEMES.RED;
    this.imageUrl = this.themeToggle ? this.BG.BLUE : this.BG.RED;
    localStorage.setItem('theme', this.headerColor);
  };
}

const Store = new ThemeStore();

export default Store;