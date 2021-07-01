import React from 'react';
import shuffle from 'lodash.shuffle';
import './App.css';

// image for the pokemon
// https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png

type PokemonType = {
  id: number
  name: string
}

const pokemons: Array<PokemonType> = [
  {id: 4, name: 'charizard'},
  {id: 10, name: 'caterpie'},
  {id: 77, name: 'ponyta'},
  {id: 108, name: 'lickitung'},
  {id: 132, name: 'ditto'},
  {id: 133, name: 'eevee'},
];

const doublePokemons: Array<PokemonType> = shuffle([ ...pokemons, ...pokemons ]);

export default function App(): JSX.Element {
  return (
      <div className="app">
        <div className="cards">
          {doublePokemons.map((pokemon, index) => (
              <PokemonCard pokemon={pokemon} key={index}/>
          ))}
        </div>
      </div>
  );
}

const PokemonCard = (props: { pokemon: PokemonType; }): JSX.Element => {
  const { pokemon } = props;
  return (
      <div className="pokemon-card">
        <div className="inner">
          <div className="front">
            <img
                src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
                width="100"
            />
          </div>
          <div className="back">?</div>
        </div>
      </div>

  )
}
