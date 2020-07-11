import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import logo from '../../assets/imgs/logo.png'
import Games from '../Games/Games'
import axios from 'axios'
import { Grid, Paper, Tabs, Tab } from "@material-ui/core";
import TabPanel from "../../components/TabPanel/TabPanel";


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  margins: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: "240px"
    },
    marginTop: "4em"
  },
  tabs: {
    backgroundColor: "blue",
    color: "white"
  },

  logoContainer: {
    textAlign: "center"
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      width: "50%"
    },
    textAlign: "center",
    margin: 0,
    width: "15%"
  },
  tabsTitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize: "1rem",
    },
    fontSize: "3rem"
  }
});

const Home = props => {
  const [copaMx, setCopaMx] = useState([])
  const [ascensoMx, setAscensoMx] = useState([])
  const [value, setValue] = useState(0)
  const [inizialized, setInizialized] = useState(false)
  let dataAscMx = []
  let dataCopMx = []

  function fetchData() {
    setInizialized(true)
    axios.get("/games",
      {
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((result) => {
        result.data.data.games.map((game) => {
          game.league === "Copa MX" ? dataCopMx.push(game) : dataAscMx.push(game)
          return true
        })

        let grouppedAscMx = dataAscMx.reduce((acc, obj) => {
          (acc[obj['datetime'].split('T')[0].split('-')[1]] = acc[obj['datetime'].split('T')[0].split('-')[1]] || []).push(obj)
          return acc
        }, {}
        )

        let grouppedCopMx = dataCopMx.reduce((acc, obj) => {
          (acc[obj['datetime'].split('T')[0].split('-')[1]] = acc[obj['datetime'].split('T')[0].split('-')[1]] || []).push(obj)
          return acc
        }, {}
        )

        setCopaMx(grouppedCopMx)
        setAscensoMx(grouppedAscMx)
      })
  };

  useEffect(() => {
    if (!inizialized) {
      fetchData()
    }
  })

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }


  const { classes } = props;
  return (
    <div className={classes.margins}>
      <Grid container >
        <Grid item xs={12} className={classes.logoContainer}>
          <img src={logo} className={classes.logo} alt=""/>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Tabs centered variant="fullWidth" onChange={handleChange} value={value} className={classes.tabs}>
              <Tab label="Copa MX" {...a11yProps(0)} className={classes.tabsTitle} />
              <Tab label="Ascenso MX" {...a11yProps(1)} className={classes.tabsTitle} />
            </Tabs>
          </Paper>
        </Grid>
      </Grid>

      <TabPanel value={value} index={0}>
        <Games info={copaMx} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Games info={ascensoMx} />
      </TabPanel>

    </div>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);