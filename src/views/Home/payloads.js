import axios from 'axios'

async function getGames(){
    // const headers = {headers:{ 'Accept': 'application/json'}}
    const result = await axios.get("https://venados.dacodes.mx/api/games", 
    {headers:{
        'Accept' : 'application/json',
        'Access-Control-Allow-Origin' : '*'
    }}
    )
    .then(()=>{
        console.log(result)
    })
    return result
}


export {
    getGames
}