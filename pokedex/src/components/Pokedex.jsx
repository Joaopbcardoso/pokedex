import React, {useState, useEffect} from "react";
import style, { styled } from 'styled-components'
import {motion} from 'framer-motion'

const Spinner = style (motion.div)`
  width: 50px;
  height: 50px;
  border: 4px solid black;
  border-radius: 50%;
  border-top: 4px solid red;
  display: insline-block;
`;

const Container = style.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;


export default function Pokedex(){
 const [id, setId] = useState(1);
 const [pokemon, setPokemon] = useState(null);
 const [carregando, setCarregando] = useState(true);

 useEffect(() => {
    const tempo = setTimeout(() =>{
      setCarregando(false);

    }, 5000)
    return () => clearTimeout(tempo)
  }, [])


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

    const prevPokemon = () =>{
        setId(id-1)
    }
    
    return(
        <div>
                {pokemon && (
          
            <div className="pokemon">
                <header>

                    <h1><img className="title" src="pokemon.png" alt="" /></h1>
                </header>
                <main>
                    <p className="name">{pokemon.name}</p>
                    <p className="peso">Peso: {pokemon.weight}</p>
                    <div className="select-pokemon"> 
                        <a onClick={prevPokemon}>🢔</a>
                    <img className="pokemon-img" src={pokemon.sprites.front_default} alt="Pokemon" />
                    <a onClick={nextPokemon}>🢖</a> 
                    </div>
                </main>
                <footer>
                    <img src="pokemon.png" alt="" />
                </footer>
                
            </div>
            )}
        </div>
        
    )
}