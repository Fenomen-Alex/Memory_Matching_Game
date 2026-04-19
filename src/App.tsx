import React, {useEffect, useState} from 'react';
import shuffle from 'lodash.shuffle';
import './App.css';

// Using cute animal emojis for memory matching game
// Alternative: Can use picsum.photos or other free image services

type CardType = {
  id: number
  name: string
  emoji: string
}

const cards: Array<CardType> = [
  {id: 1, name: 'dog', emoji: '🐶'},
  {id: 2, name: 'cat', emoji: '🐱'},
  {id: 3, name: 'panda', emoji: '🐼'},
  {id: 4, name: 'fox', emoji: '🦊'},
  {id: 5, name: 'lion', emoji: '🦁'},
  {id: 6, name: 'tiger', emoji: '🐯'},
];

let doubleCards: Array<CardType> = shuffle([...cards, ...cards]);

export default function App(): React.JSX.Element {

  const [opened, setOpened] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const flipCard = (index: number): void => {
    if (matched.length !== cards.length && opened.length < 2 && !opened.includes(index)) {
      setMoves(moves => moves + 1);
      setOpened(opened => [...opened, index]);
    }
  }
  const restart = () => {
    setMatched([]);
    setOpened([]);
    setMoves(0);
    setIsWon(false);
    doubleCards = shuffle([...cards, ...cards])
  }

  // check if is a match
  useEffect(() => {
    if (opened.length < 2) return;

    const firstCard: CardType = doubleCards[opened[0]];
    const secondCard: CardType = doubleCards[opened[1]];

    if (firstCard.name === secondCard.name) {
      setMatched(matched => [...matched, firstCard.id])
    }
  }, [opened])

  // clear cards if no match
  useEffect(() => {
    if (opened.length === 2) setTimeout(() => setOpened([]), 800);

  }, [opened])

  // check if is a winner
  useEffect(() => {
    if (matched.length === cards.length && matched.length > 0) {
      setIsWon(true);
    }
  }, [matched])

  return (
      <div className="app">
        {isWon
            ? (<div className="win-screen">
              <h2 className="win-message">🎉 Congratulations! 🎉</h2>
              <p className="win-stats">You completed in {moves} moves!</p>
              <button
                  className="restart-btn"
                  onClick={() => restart()}
              >
                Play Again
              </button>
            </div>)
            : (<>
              <div className="game-header">
                <h1 className="game-title">Memory Match</h1>
                <div className="moves-counter">
                  <span className="moves-label">Moves:</span>
                  <span className="moves-value">{moves}</span>
                </div>
              </div>
        <div className="cards">
          {doubleCards.map((card, index) => {
                let isFlipped = false;

                if (opened.includes(index)) isFlipped = true;
                if (matched.includes(card.id)) isFlipped = true;

                return (
                    <MemoryCard
                        key={index}
                        card={card}
                        isFlipped={isFlipped}
                        flipCard={flipCard}
                        index={index}
                    />
                )
              }
          )}
        </div>
              </>)
        }
      </div>
  );
}

const MemoryCard = (props: {
  card: CardType;
  isFlipped: boolean;
  flipCard: Function;
  index: number;
}): React.JSX.Element => {

  const {card, isFlipped, flipCard, index} = props;
  return (
      <button
          onClick={() => flipCard(index)}
          className={`memory-card ${isFlipped ? 'flipped' : ''}`}
          disabled={isFlipped}
      >
        <div className="card-inner">
          <div className="card-front">
            <span className="card-emoji">{card.emoji}</span>
          </div>
          <div className="card-back">
            <span className="question-mark">?</span>
          </div>
        </div>
      </button>
  )
}
