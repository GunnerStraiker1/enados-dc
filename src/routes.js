import Home from './views/Home/Home'
import Estadisticas from './views/Estadisticas/Estadisticas'

export const routes = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Estadisticas",
        path: '/stadistics',
    },
    {
        name: "Jugadores",
        path: '/players'
    },
]

export default {routes}