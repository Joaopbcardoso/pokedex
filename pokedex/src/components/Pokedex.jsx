import { useState, useEffect } from "react"


export default function Pokedex(){
 const [id, setId] = useState(1);
 const [pokemon, setPokemon] = useState(null);


 const fetchData = async () => { // função assincrona para encontrar dados e conectar na API
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`) 
        const data = await response.json();
        setPokemon(data)
    }catch(error){
        console.error(error);
    }
 }

    useEffect(() => {
        fetchData()
    }), [id]

    const nextPokemon = () =>{
        setId(id+1)
    }
    
    return(
        <div>
                {pokemon && (
          
            <div className="pokemon">
                <h1><img className="title" src="pokemon.png" alt="" /></h1>
                <p className="name">{pokemon.name}</p>
                <p>Peso: {pokemon.weigth}</p>
                <img className="pokemon-img" src={pokemon.sprites.front_default} alt="Pokemon" />
                <button onClick={nextPokemon}>Próximo</button>
            </div>
            )}
        </div>
        
    )
}