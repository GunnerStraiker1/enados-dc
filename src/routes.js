import Home from './views/Home/Home'

export const routes = [
    {
        name: "Home",
        path: "/",
        component: Home
    },
    {
        name: "Estadisticas",
        path: '/stadistics',
        component: Home
    },
    {
        name: "Jugadores",
        path: '/players',
        component: Home
    },
]

export default {routes}