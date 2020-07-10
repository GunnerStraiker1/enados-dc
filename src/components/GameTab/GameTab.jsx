import React, { useEffect, useState } from 'react'
import { Accordion, Paper, Container, Grid, AccordionDetails, withStyles, makeStyles, Typography, Icon } from '@material-ui/core'
import logo from '../../assets/imgs/logo.png'
import soccer from '../../assets/imgs/grass2.jpg'

const useStyle = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1)
    },
    input: {
        display: "none"
    },
    margins: {
        marginTop: "5em"
    },
    accordionDetails: {
        backgroundImage: `url(${soccer})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        color: "white",
        fontWeight: "bolder",
        // marginBottom: "1em",
        textAlign: "center"
    },

    textTeam: {
        [theme.breakpoints.down('sm')]: {
            fontSize: "0.8em"
        },
        fontSize: "2.4em"
    },
    textScore: {
        [theme.breakpoints.down('sm')]: {
            fontSize: "2em"
        },
        fontSize: "6em"
    },
    logoTeam:{
        [theme.breakpoints.down('sm')]:{
            width: "70%"
        },
        width:"25%"
    },
    textDate:{
        [theme.breakpoints.down('sm')]:{
            fontSize:"1.3em"
        },
        fontSize:"3em"
    },
    iconCalendar:{
        [theme.breakpoints.down('sm')]:{
            fontSize: "2em !important"
        },
        fontSize: "3em !important",
        color: "white",
        
    }
}));

function GameTab(props) {

    const [gameData, setGameData] = useState('')
    const styles = useStyle()
    const days = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SÁB','DOM']

    useEffect(() => {
        setGameData(props)
    }, { props })

    return (
        <AccordionDetails className={styles.accordionDetails}>
            {gameData.data != undefined ?
                <Grid container>
                    <Grid item xs={3} md={2}>
                        <Grid container>
                            <Grid item xs={12}><Icon className={`fa fa-calendar ${styles.iconCalendar}`}/></Grid>
                            <Grid item xs={12}>
                                <Typography className={styles.textDate}>{new Date(gameData.data.datetime).getDate()}</Typography>
                                <Typography className={styles.textDate}>{days[new Date(gameData.data.datetime).getDay()]}</Typography>
                            </Grid>
                            
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        {
                            gameData.data.local ?
                                <Grid container >
                                    <Grid item xs={12}><img src={logo} className={styles.logoTeam}/></Grid>
                                    <Grid item xs={12}><Typography className={styles.textTeam}>Venados F.C.</Typography></Grid>
                                </Grid>
                                :
                                <Grid container >
                                    <Grid item xs={12}><img src={gameData.data.opponent_image} className={styles.logoTeam}/></Grid>
                                    <Grid item xs={12}><Typography className={styles.textTeam}>{gameData.data.opponent}</Typography></Grid>
                                </Grid>
                        }

                    </Grid>
                    <Grid item xs={3} md={4}>
                        <Typography className={styles.textScore}>{gameData.data.home_score + " - " + gameData.data.away_score}</Typography>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        {
                            gameData.data.local ?
                                // <Grid container >
                                <div>
                                    <Grid item xs={12}><img src={gameData.data.opponent_image} className={styles.logoTeam}/></Grid>
                                    <Grid item xs={12}><Typography className={styles.textTeam}>{gameData.data.opponent}</Typography></Grid>
                                </div>
                                // </Grid> 
                                :
                                // <Grid container >
                                <div>
                                    <Grid item xs={12}><img src={logo} className={styles.logoTeam}/></Grid>
                                    <Grid item xs={12}><Typography className={styles.textTeam}>Venados F.C.</Typography></Grid>
                                    </div> // // </Grid> 
                        }
                    </Grid>
                </Grid>
                : <div></div>

            }


        </AccordionDetails>
    )
}

export default withStyles(useStyle)(GameTab)