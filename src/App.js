import React from "react"
import Dice from './Dice'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [game, setGame] = React.useState(false)

  React.useEffect(() => {
    const allHold = dice.every(die => die.isHold)
    const firstValue = dice[0].value

    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHold && allSameValue) {
      setGame(true)
    }
  }, [dice])


  function generateDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHold: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    let dice = [];
    for (let i = 0; i < 10; i++) {
      dice.push(generateDie())
    }
    return dice;
  }

  function rollDice() {
    if (!game) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHold ? die : generateDie()
      }))
    }
    else {
      setGame(false)
      setDice(allNewDice())
    }
  }


  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? { ...die, isHold: !die.isHold } : die
    }))
  }
  const diceElements = dice.map(die => <Dice key={die.id} value={die.value} isHold={die.isHold} holdDice={() => holdDice(die.id)} />)


  return (
    <div>
      <main>
        {game && <Confetti />}
        <h1 className="title"><u>Dice Game</u></h1>
        <p className="instruction">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>
        <button className="dice-roll" onClick={rollDice}>
          {game ? "New Game" : "Roll"}</button>
      </main >

    </div>
  )
}


