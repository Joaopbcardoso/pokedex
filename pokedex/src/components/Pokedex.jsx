import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Spinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 4px solid black;
  border-radius: 50%;
  border-top: 4px solid red;
  display: inline-block;
`;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export default function Pokedex() {
  const [id, setId] = useState(1);
  const [pokemon, setPokemon] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const tempo = setTimeout(() => {
      setCarregando(false);
    }, 5000);
    return () => clearTimeout(tempo);
  }, []);

  const fetchData = async () => {
    setCarregando(true); // Mostrar spinner enquanto carrega
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error(error);
    } finally {
      setCarregando(false); // Ocultar spinner após o carregamento
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const nextPokemon = () => {
    setId(id + 1);
  };

  const prevPokemon = () => {
    setId(id - 1);
  };

  return (
    <>
    <header>
        <h1><img className="title" src="pokemon.png" alt="Pokemon" /></h1>
    </header>
    <Container>
      {carregando ? (
        <Spinner
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
        />
      ) : (
        pokemon && (
          <div className="pokemon">
            <main>
              <p className="name">{pokemon.name}</p>
              <p className="peso">Peso: {pokemon.weight}</p>
              <div className="select-pokemon">
                <a onClick={prevPokemon}>🢔</a>
                <img className="pokemon-img" src={pokemon.sprites.front_default} alt={pokemon.name} />
                <a onClick={nextPokemon}>🢖</a>
              </div>
            </main>

          </div>
        )
      )}
    </Container>
                <footer>
                <img src="pokemon.png" alt="Pokemon" />
              </footer>
        </>
  );
  
}
