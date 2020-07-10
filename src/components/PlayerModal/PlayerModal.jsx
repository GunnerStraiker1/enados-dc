import React, { useEffect, useState } from 'react'
import { withStyles, makeStyles, Grid, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    containerImage:{
        [theme.breakpoints.down('sm')]:{
            padding: "1em, 2em"
        },
        backgroundColor: "#126839",
        padding: "2em 4em"
    },
    imagePlayer:{
        [theme.breakpoints.down('sm')]:{
        width: "10em",
        height: "10em",
        margin: "1em"
        },
        borderRadius: "50%",
        width: "20em",
        height: "20em",
        margin: "2em"
    },
    textTitle:{
        [theme.breakpoints.down('sm')]:{
            fontSize: "1em",
        },
        color:"white",
        fontSize:"2em",
        textAlign: "center",
        fontWeight: "bold"
    },
    playerText:{
        [theme.breakpoints.down('sm')]:{
            fontSize: "1em",
            fontWeight: "normal"
        },
        color:"white",
        fontSize:"1.5em",
        textAlign: "center",
        fontWeight: "bold"
    },
    containerInfo:{
        [theme.breakpoints.down('sm')]:{
            padding: 0
        },
        padding: "2em 4em"
    },
    textSubtitle:{
        [theme.breakpoints.down('sm')]:{
            fontSize:"1em"
        },
        fontSize:"1.8em",
        textAlign: "center",
    },
    textInfoPlayer:{
        [theme.breakpoints.down('sm')]:{
            fontSize: "0.8em"
        },
        fontSize:"1.3em",
        textAlign: "center",
    }

}))

const PlayerModal = (props) => {

    const styles = useStyles()
    const [player, setPlayer] = useState()
    const [date, setDate] = useState()
    const [inizialized, setInizialized] = useState(false)
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    function setData(props) {
        setPlayer(props.player)
        const dateObj = new Date(props.player.birthday)
        let day =  dateObj.getDate()
        let month = months[dateObj.getMonth()]
        let year = dateObj.getFullYear()
        let fullDate = day + "/" + month + "/" + year
        setDate(fullDate)
        setInizialized(true)
    }

    useEffect(() => {
        if (!inizialized) {
            setData(props)
        }
    }, [props])

    return (

        <Grid container>
            {player !== undefined && date !== undefined?
                <Grid item xs={12}>
                    <Paper className={styles.containerImage}> 
                        <Typography className={styles.textTitle}>FICHA TÉCNICA</Typography>
                        <img src={player.image} className={styles.imagePlayer}/>
                        <Typography className={styles.playerText}>{player.name + " " + player.first_surname + " " + player.second_surname}</Typography>
                        <Typography className={styles.playerText}>{player.position !== undefined ? player.position : player.role}</Typography>
                    </Paper>
                    <Paper className={styles.containerInfo}>
                        <Typography className={styles.textSubtitle}>FECHA DE NACIMIENTO</Typography>
                        <Typography className={styles.textInfoPlayer}>{date}</Typography>
                        <br/>
                        <Typography className={styles.textSubtitle}>LUGAR DE NACIMIENTO</Typography>
                        <Typography className={styles.textInfoPlayer}>{player.birth_place}</Typography>
                        <br/>
                        <Typography className={styles.textSubtitle}>PESO</Typography>
                        <Typography className={styles.textInfoPlayer}>{player.weight !== null ? player.weight + " KG" : "Sin Informacion"}</Typography>
                        <br/>
                        <Typography className={styles.textSubtitle}>ALTURA</Typography>
                        <Typography className={styles.textInfoPlayer}>{player.height !== null ? player.height + " M" : "Sin Informacion"}</Typography>
                        <br/>
                        <Typography className={styles.textSubtitle}>EQUIPO ANTERIOR</Typography>
                        <Typography className={styles.textInfoPlayer}>{player.last_team !== undefined ? player.last_team : "Sin Informacion"}</Typography>
                    </Paper>
                </Grid>
                : <div></div>

            }

        </Grid>
    )

}

export default withStyles(useStyles)(PlayerModal)