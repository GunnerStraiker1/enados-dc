import React from 'react'
import Home from '@material-ui/icons/Home'
import ShowChart from '@material-ui/icons/ShowChart'
import Group from '@material-ui/icons/Group'

export const routes = [
    {
        name: "Página Principal",
        path: "/",
        icon: <Home />
    },
    {
        name: "Estadisticas",
        path: '/stadistics',
        icon: <ShowChart />
    },
    {
        name: "Jugadores",
        path: '/players',
        icon: <Group />
    },
]

export default {routes}