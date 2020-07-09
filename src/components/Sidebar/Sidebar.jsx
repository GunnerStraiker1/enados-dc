import React, { useState, Fragment, Component } from 'react'
import clsx from 'clsx'
import {
  withStyles, Toolbar,
  Drawer, Typography, List, ListItem, ListItemAvatar,
  ListItemText, IconButton, AppBar,
  Hidden, Divider, useTheme, makeStyles
} from '@material-ui/core'
import logo from '../../assets/imgs/logo.png'

import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { routes } from '../../routes'

import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu'
import MailIcon from '@material-ui/icons/Mail';

import Home from '../../views/Home/Home'

const drawerWidth = 240
const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "white !important",
    boxShadow: "0px 0px 0px 0px"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    color: "gray"
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },

  logo:{
    width: "100%"
  }
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      {/* <div className={classes.toolbar} /> */}
      <List>
        <ListItem>
          <img src={logo} className={classes.logo} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {routes.map((route, index) => (
          <ListItem button key={index} component={Link} to={route.path}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <Router history={history}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        {/* Routes */}
        <main className={classes.content}>
          {
            routes.map(rt => {
              return <Route exact path={rt.path} component={rt.component} />
            })
          }
          {/* <Route exact path="/" component={Home} /> */}
          {/* <Route path="/grid" component={Grid} /> */}
        </main>
      </Router>
    </div>
  );
}

export default (ResponsiveDrawer);