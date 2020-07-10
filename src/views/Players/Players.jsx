import React, { useState, useEffect } from 'react'
import { withStyles, makeStyles, Typography, Grid, Paper, ListItem, ListItemText, List, ListItemAvatar, Avatar, Container, Modal, Backdrop, Fade } from '@material-ui/core'
import axios from 'axios'
import soccer from '../../assets/imgs/grass2.jpg'
import PlayerModal from '../../components/PlayerModal/PlayerModal'

const useStyles = makeStyles((theme) => ({
    margins: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: "240px"
        },
        marginTop: "5em"
    },
    backgroundContainer: {
        backgroundImage: `url(${soccer})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        // position: "fixed",
        // height: "100%"
    },
    playerContainer:{
        marginTop: "2rem",
        marginBottom: "2rem"
    },
    textPlayer:{
        [theme.breakpoints.down('sm')]:{
            fontSize:"1.1em",
            fontWeight: "bolder"
        },
        fontSize:"2em",
        color: "white",
        textAlign:"center",
    },
    imageContainer:{
        [theme.breakpoints.down('sm')]:{
            width: "5rem",
            height: "5rem",
            padding: 0
        },
        borderRadius: "50%",
        width: "15rem",
        height: "15rem",
        padding: 0
        
        
    },
    imagePlayer:{
        borderRadius: "inherit",
        width: "inherit",
        height: "inherit",
    },
    modal:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper:{
        backgroundColor: "#ffffff"
    }
}))

const Players = () => {

    const styles = useStyles()
    const [inicialized, setInicialized] = useState(false)
    const [dataCenters, setDataCenters] = useState([])
    const [dataCoaches, setDataCoaches] = useState([])
    const [dataDefenses, setDataDefenses] = useState([])
    const [dataForwards, setDataForwards] = useState([])
    const [dataGoal, setDataGoal] = useState([])
    const [modalInfo, setModalInfo] = useState()
    const [open, setOpen] = useState(false)

    function fetchData() {
        setInicialized(true)
        axios.get("/players",
            {
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then((result) => {
                console.log(result.data)
                // console.log(Object.values(result.data.data.team))
                setDataCenters(result.data.data.team.centers)
                setDataCoaches(result.data.data.team.coaches)
                setDataDefenses(result.data.data.team.defenses)
                setDataForwards(result.data.data.team.forwards)
                setDataGoal(result.data.data.team.goalkeepers)
            })
    }

    useEffect(() => {
        if (!inicialized) {
            fetchData()
        }
    })

    const handleOpen = (data) =>{
        console.log(data)
        setModalInfo(data)
        setOpen(true)
    }

    const handleClose = () =>{
        setOpen(false)
    }

    return (
        <div className={styles.margins}>
                <Paper><Typography>DELANTEROS</Typography></Paper>
                <Grid container className={styles.backgroundContainer}>
                {
                    dataForwards.map((player, idx) =>{
                        return(
                            <Grid item md={3} xs={4} className={styles.playerContainer}>
                                <Container fixed className={styles.imageContainer} maxWidth={"xs"} component={"button"} onClick={() => handleOpen(player)}>
                                    <img src={player.image} className={styles.imagePlayer}/>
                                </Container>
                                
                                <Typography className={styles.textPlayer}>{player.position}</Typography>
                                <Typography className={styles.textPlayer}>{player.name + " " + player.first_surname}</Typography>

                            </Grid>
                        )
                    })
                }
                </Grid>
                <Paper><Typography>MEDIOCAMPISTAS</Typography></Paper>
                <Grid container className={styles.backgroundContainer}>
                {
                    dataCenters.map((player, idx) =>{
                        return(
                            <Grid item md={3} xs={4} className={styles.playerContainer}>
                                <Container fixed className={styles.imageContainer} maxWidth={"xs"} component={"button"} onClick={() => handleOpen(player)}>
                                    <img src={player.image} className={styles.imagePlayer}/>
                                </Container>
                                
                                <Typography className={styles.textPlayer}>{player.position}</Typography>
                                <Typography className={styles.textPlayer}>{player.name + " " + player.first_surname}</Typography>
                            </Grid>
                        )
                    })
                }
                </Grid>
                <Paper><Typography>DEFENSAS</Typography></Paper>
                <Grid container className={styles.backgroundContainer}>
                {
                    dataDefenses.map((player, idx) =>{
                        return(
                            <Grid item md={3} xs={4} className={styles.playerContainer}>
                                <Container fixed className={styles.imageContainer} maxWidth={"xs"} component={"button"} onClick={() => handleOpen(player)}>
                                    <img src={player.image} className={styles.imagePlayer}/>
                                </Container>
                                
                                <Typography className={styles.textPlayer}>{player.position}</Typography>
                                <Typography className={styles.textPlayer}>{player.name + " " + player.first_surname}</Typography>
                            </Grid>
                        )
                    })
                }
                </Grid>
                <Paper><Typography>PORTEROS</Typography></Paper>
                <Grid container className={styles.backgroundContainer}>
                {
                    dataGoal.map((player, idx) =>{
                        return(
                            <Grid item md={3} xs={4} className={styles.playerContainer}>
                                <Container fixed className={styles.imageContainer} maxWidth={"xs"} component={"button"} onClick={() => handleOpen(player)}>
                                    <img src={player.image} className={styles.imagePlayer}/>
                                </Container>
                                
                                <Typography className={styles.textPlayer}>{player.position}</Typography>
                                <Typography className={styles.textPlayer}>{player.name + " " + player.first_surname}</Typography>
                            </Grid>
                        )
                    })
                }
                </Grid>
                <Paper><Typography>ENTRENADORES</Typography></Paper>
                <Grid container className={styles.backgroundContainer}>
                {
                    dataCoaches.map((player, idx) =>{
                        return(
                            <Grid item md={3} xs={4} className={styles.playerContainer}>
                                <Container fixed className={styles.imageContainer} maxWidth={"xs"} component={"button"} onClick={() => handleOpen(player)}>
                                    <img src={player.image} className={styles.imagePlayer}/>
                                </Container>
                                
                                <Typography className={styles.textPlayer}>{player.position}</Typography>
                                <Typography className={styles.textPlayer}>{player.name + " " + player.first_surname}</Typography>
                            </Grid>
                        )
                    })
                }
                </Grid>

                <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{timeout: 500}}
                className={styles.modal}
                >
                    <Fade in={open}>
                        <div>
                            {
                            modalInfo !== undefined ? 
                                <PlayerModal player={modalInfo}/>
                            :
                            <div></div>
                            }
                            
                        </div>
                    </Fade>

                </Modal>
        </div>
    )
}

export default withStyles(useStyles)(Players)