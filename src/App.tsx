import React, {MouseEventHandler, useEffect, useState} from 'react';
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

const doublePokemons: Array<PokemonType> = shuffle([...pokemons, ...pokemons]);

export default function App(): JSX.Element {

  const [opened, setOpened] = useState<number[]>([]);

  const flipCard = (index: number): void => {
    setOpened(opened => [...opened, index]);
  }

  useEffect(() => {
    if (open.length === 2) setTimeout(() => setOpened([]), 800);

  }, [opened])

  return (
      <div className="app">
        <div className="cards">
          {doublePokemons.map((pokemon, index) => {
                let isFlipped = false;

                if (opened.includes(index)) isFlipped = true;

                return (
                    <PokemonCard
                        key={index}
                        pokemon={pokemon}
                        isFlipped={isFlipped}
                        flipCard={flipCard}
                        index={index}
                    />
                )
              }
          )}
        </div>
      </div>
  );
}

const PokemonCard = (props: {
                       pokemon: PokemonType;
                       isFlipped: boolean;
                       flipCard: Function;
                       index: number;
                     }): JSX.Element => {

  const {pokemon, isFlipped, flipCard, index} = props;
  return (
      <button onClick={() => flipCard(index)} className={`pokemon-card ${isFlipped ? 'flipped' : ''}`}>
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
      </button>

  )
}
