import React from 'react';
import logo from './logo.svg';
import clsx from 'clsx';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink,
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    }
  }
});

class AppShell extends React.Component {
  render() {
    return (<HomePage />);
  }
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuBarShown: false,
    };
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => { this.handleMenuIconClick() }} style={this.state.isMenuBarShown ? { display: 'none' } : {}}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">Stock</Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="persistent" anchor="left" open={this.state.isMenuBarShown}>
          <p>Test</p>
        </Drawer>
      </ThemeProvider>
    );
  }

  handleMenuIconClick() {
    this.setState({ isMenuBarShown: true });
  }
}

export default AppShell;
