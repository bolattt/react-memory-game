import './App.css'
import { useEffect, useState} from 'react'
import SingleCard from './components/SingleCard'

const cardImages = [
  {src : '/img/helmet-1.png',matched:false},
  {src : '/img/potion-1.png',matched:false},
  {src : '/img/ring-1.png',matched:false},
  {src : '/img/scroll-1.png',matched:false},
  {src : '/img/shield-1.png',matched:false},
  {src : '/img/sword-1.png',matched:false},
]


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled ] = useState('')

  const shuffleCards = () => { 
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5 )
      .map((card) => ({...card, id: Math.random() }) )
    
      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }

  const handleChoice = (card) => { 
    choiceOne ?  setChoiceTwo(card) : setChoiceOne(card)
 
  }

  // compare two selected cards  
  useEffect(() =>{ 
    if(choiceOne && choiceTwo) { 
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src ) { 
        console.log('true')
        setCards(prevCards => { 
          return prevCards.map(card => { 
            if(card.src === choiceOne.src) { 
              return {...card, matched: true }
            } else {
              return card;
            }
          })
        })
        resetTurn();

      }else { 
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
  
    }
  },[choiceOne,choiceTwo])

  useEffect(() => {
    shuffleCards();
  },[])
  
  console.log(cards)

  const resetTurn = () => { 
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prev => prev + 1)
    setDisabled(false)
  }

  return (

    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
    
      <div className="card-grid">
        {cards.map(card => <SingleCard 
          card={card}
          key={card.id}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched }
          disabled={disabled} />
        )}
       </div>
       <p>Turns: {turns} </p>
    </div>
  );
}

export default App