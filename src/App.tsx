import React, {useEffect, useState} from 'react';
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

let doublePokemons: Array<PokemonType> = shuffle([...pokemons, ...pokemons]);

export default function App(): JSX.Element {

  const [opened, setOpened] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const flipCard = (index: number): void => {
    if (matched.length !== pokemons.length) setMoves(moves => moves + 1);
    setOpened(opened => [...opened, index]);
  }
  const restart = () => {
    setMatched([]);
    setOpened([]);
    setMoves(0);
    doublePokemons = shuffle([...pokemons, ...pokemons])
  }

  // check if is a match
  useEffect(() => {
    if (opened.length < 2) return;

    const firstPokemon: PokemonType = doublePokemons[opened[0]];
    const secondPokemon: PokemonType = doublePokemons[opened[1]];

    if (firstPokemon.name === secondPokemon.name) {
      setMatched(matched => [...matched, secondPokemon.id])
    }
  }, [opened])

  // clear cards if no match
  useEffect(() => {
    if (opened.length === 2) setTimeout(() => setOpened([]), 800);

  }, [opened])

  // // check if is a winner
  // useEffect(() => {
  //   if(matched.length === pokemons.length) alert('You won!');
  // },[matched])

  return (
      <div className="app">
        {matched.length >= pokemons.length
            ? (<div className="btn-restart">
              <button
                  className="restart"
                  onClick={() => restart()}
              >
                Play again!
              </button>
            </div>)
            : (<h1 className="play">Lets play!</h1>)
        }
        <p>{moves}<strong>moves</strong></p>
        <div className="cards">
          {doublePokemons.map((pokemon, index) => {
                let isFlipped = false;

                if (opened.includes(index)) isFlipped = true;
                if (matched.includes(pokemon.id)) isFlipped = true;

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
      <button
          onClick={() => flipCard(index)}
          className={`pokemon-card ${isFlipped ? 'flipped' : ''}`}
          disabled={isFlipped}
      >
        <div className="inner">
          <div className="front">
            <img
                src={`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
                width="100"
            />
          </div>
          <div className="back">?</div>
        </div>
      </button>

  )
}
