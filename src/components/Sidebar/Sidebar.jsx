import React, { useState, Fragment, Component } from 'react'
import clsx from 'clsx'
import {
  withStyles, Toolbar,
  Drawer, Typography, List, ListItem, ListItemAvatar,
  ListItemText, IconButton, AppBar,
  Hidden, Divider, useTheme, makeStyles
} from '@material-ui/core'

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

// const styles = theme => ({
//     root: {
//       flexGrow: 1
//     },
//     flex: {
//       flex: 1
//     },
//     drawerPaper: {
//       position: "relative",
//       width: drawerWidth
//     },
//     menuButton: {
//       marginLeft: -12,
//       marginRight: 20
//     },
//     toolbarMargin: theme.mixins.toolbar,
//     aboveDrawer: {
//       zIndex: theme.zIndex.drawer + 1
//     }
// });
// const drawerWidth = 240;

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
    padding: theme.spacing(3),
  },
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
      <div className={classes.toolbar} />
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

// const MyToolbar = withStyles(styles)(
//     ({ classes, title, onMenuClick }) => (
//       <Fragment>
//         <AppBar className={classes.aboveDrawer}>
//           <Toolbar>
//             <IconButton
//               className={classes.menuButton}
//               color="inherit"
//               aria-label="Menu"
//               onClick={onMenuClick}
//             >
//               <MenuIcon />
//             </IconButton>
//             {/* <Typography
//               variant="h6"
//               color="inherit"
//               className={classes.flex}
//             >
//               {title}
//             </Typography> */}
//           </Toolbar>
//         </AppBar>
//         <div className={classes.toolbarMargin} />
//       </Fragment>
//     )
//   );

//   const MyDrawer = withStyles(styles)(
//     ({ classes, variant, open, onClose, onItemClick }) => (
//       <Router history={history}>
//       <Drawer variant={variant} open={open} onClose={onClose}
//                   classes={{
//                     paper: classes.drawerPaper
//                   }}
//       >
//         <div
//           className={clsx({
//             [classes.toolbarMargin]: variant === 'persistent'
//           })}
//         />
//         <List>
//             {routes.map( rt =>{
//                 return(
//                     <ListItem button component={Link} to={rt.path} onClick={onItemClick(rt.name)}>
//                         <ListItemText>{rt.name}</ListItemText>
//                     </ListItem>
//                 )
//             })}
//           {/* <ListItem button component={Link} to="/" onClick={onItemClick('Home')}>
//             <ListItemText>Home</ListItemText>
//           </ListItem> */}
//           {/* <ListItem button component={Link} to="/Grid" onClick={onItemClick('Page 2')}>
//             <ListItemText>Page 2</ListItemText>
//           </ListItem>
//           <ListItem button onClick={onItemClick('Page 3')}>
//             <ListItemText>Page 3</ListItemText>
//           </ListItem> */}
//         </List>
//       </Drawer>
//       <main className={classes.content}>
//           {
//               routes.map(rt =>{
//                   return <Route exact path={rt.path} component={rt.component} />
//               })
//           }
//           {/* <Route exact path="/" component={Home} /> */}
//           {/* <Route path="/grid" component={Grid} /> */}
//       </main>
//       </Router>
//     )
//   );

//   function AppBarInteraction({ classes, variant }) {
//     const [drawer, setDrawer] = useState(false);
//     const [title, setTitle] = useState('Home');

//     const toggleDrawer = () => {
//       setDrawer(!drawer);
//     };

//     const onItemClick = title => () => {
//       setTitle(title);
//       setDrawer(variant === 'temporary' ? false : drawer);
//       setDrawer(!drawer);
//     };

//     return (
//       <div className={classes.root}>
//         <MyToolbar title={title} onMenuClick={toggleDrawer} />
//         <MyDrawer
//           open={drawer}
//           onClose={toggleDrawer}
//           onItemClick={onItemClick}
//           variant={variant}
//         />
//       </div>
//     );
//   }

//   export default withStyles(styles)(AppBarInteraction);