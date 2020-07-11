import React, { useEffect, useState } from 'react'
import { makeStyles, withStyles, Table, TableContainer, Grid, TableHead, TableRow, TableCell, Paper, TableBody, Typography } from '@material-ui/core'
import axios from 'axios'
import soccer from '../../assets/imgs/grass2.jpg'

const useStyles = makeStyles(theme => ({
    margins: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: "240px"
        },
        marginTop: "4em"
    },
    textTeam: {
        [theme.breakpoints.down('sm')]: {
            fontSize: "1em",
            textAlign: "left",
            margin: "1em 0em 1em"
        },
        fontSize: "2em",
        margin: "0.5em 0em 0.5em",
        fontWeight: "bolder",
        color: "#ffffff"
    },
    logoTeam: {
        [theme.breakpoints.down('sm')]: {
            width: "95%"
        },
        margin: "0.5em 0em 0.5em"
    },
    textNumber: {
        [theme.breakpoints.down('sm')]: {
            fontSize: "1.2em",
            textAlign: "center",
            margin: "1em 0em 1em"
        },
        fontSize: "2em",
        margin: "0.5em 0em 0.5em",
        fontWeight: "bolder",
        color: "#ffffff"
    },
    cells: {
        backgroundImage: `url(${soccer})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    },
    tableHead: {
        backgroundColor: "#7f7f7f",
    },
    textTableHead: {
        [theme.breakpoints.down('sm')]: {
            fontSize: "1em"
        },
        color: "#ffffff",
        fontWeight: "bolder",
        fontSize: "1.5em"
    }
}))

const Estadisticas = (props) => {

    const styles = useStyles()
    const [data, setData] = useState([])
    const [inicialized, setInicialized] = useState(false)

    function fetchData() {
        setInicialized(true)
        axios.get("/statistics",
            {
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then((result) => {
                setData(result.data.data.statistics)
            })
    }

    useEffect(() => {
        if (!inicialized) {
            fetchData()
        }
    })

    return (
        <div className={styles.margins}>
            <TableContainer component={Paper}>
                <Table size="medium">
                    <TableHead className={styles.tableHead}>
                        <TableRow>
                            <TableCell className={styles.textTableHead}>Tabla General</TableCell>
                            <TableCell className={styles.textTableHead}>JJ</TableCell>
                            <TableCell className={styles.textTableHead}>DG</TableCell>
                            <TableCell className={styles.textTableHead}>PTS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map(((team, key) => (
                                <TableRow key={key} className={styles.cells}>
                                    <TableCell component="th">
                                        <Grid container>
                                            <Grid item xs={2} md={1}><Typography className={styles.textTeam}>{team.position}</Typography> </Grid>
                                            <Grid item xs={4} md={1}><img src={team.image} className={styles.logoTeam} alt=""/></Grid>
                                            <Grid item xs={6} md={10}><Typography className={styles.textTeam}>{team.team}</Typography></Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell component="th">
                                        <Typography className={styles.textNumber}>
                                            {team.games}
                                        </Typography>
                                    </TableCell>
                                    <TableCell component="th">
                                        <Typography className={styles.textNumber}>
                                            {team.score_diff}
                                        </Typography>
                                    </TableCell>
                                    <TableCell component="th">
                                        <Typography className={styles.textNumber}>
                                            {team.points}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default withStyles(useStyles)(Estadisticas)