import React, { useEffect, useState } from 'react'
import { Accordion, Paper, Container, Grid, AccordionSummary, Typography, makeStyles, withStyles } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GameTab from '../../components/GameTab/GameTab'

const useStyles = makeStyles((theme) =>({
    month:{
        backgroundColor: "#7f7f7f",
        color: "white"
    },
    monthTitle:{
        [theme.breakpoints.down('sm')]:{
            fontSize: "1em"
        },
        fontWeight: "bolder"
    }
}))


function Games(props) {

    const [data, setData] = useState([])
    const styles = useStyles()
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    useEffect(() => {
        setData(props.info)
    }, [props.info])

    return (
        <div>
            <Grid container spacing={1}>
                {
                    Object.values(data).map((monthGame, key) => {
                        return (
                        <Grid item xs={12} key={key}>
                            <Accordion expanded={true}>
                                <AccordionSummary className={styles.month}>
                                    <Typography variant={"h5"} className={styles.monthTitle}>{months[key]}</Typography>
                                </AccordionSummary>
                                {monthGame.map((game, idx) =>{
                                    return(
                                        <GameTab data={game} key={idx}/>
                                    )

                                })}
                            </Accordion>
                        </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}

export default withStyles(useStyles) (Games)