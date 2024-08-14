import { useState } from 'react'
import './App.css'


const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({children, isSelected, updateBoard, index}) =>{
  const className =`square ${isSelected ? 'is-selected': ''}`;
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],//Horizontal
  [0,3,6],
  [1,4,7],
  [2,5,8],//Vertical
  [0,4,8],
  [2,4,6]//Diagonal
]

function App() {
//TABLERO
const [board, setBoard] = useState(
  Array(9).fill(null));

//TURNO
const [turn, setTurn] = useState(TURNS.X);
const updateBoard = (index) =>{//Jugada y cambio de turno
  //Actualizar tablero
  if(board[index] || winner) return;//Si ya existe una jugada en la celda no pinta nada (Para no sobrescribir)
  const newBoard = [...board];//Copia el tablero (RECUERDA que no se deben alterar los props de un componente)
   newBoard[index] = turn;//Pinta 'x' u 'o' segun el turno
  setBoard(newBoard);//Actualiza el tablero
 
  //Cambio de turno
  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
  setTurn(newTurn);

  //Revisar Ganador
  const newWinner = checkWinner(newBoard);
  if(newWinner){
    alert(`El ganador es ${newWinner}`);
    setWinner((newWinner));
  }
}
//GANADOR
const [winner, setWinner] = useState(null);
const checkWinner = (boardToCheck) => {
  for (const combo of WINNNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  return null;
}

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <section className='game'>
      {
        board.map((_, index) => {
          return (
            <Square 
            key={index}
            index={index}
            updateBoard = {updateBoard}
            >
              {board[index]}
            </Square>
          )
        })
      }
      </section>
      <section className='turn'>
        <Square isSelected= {turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected= {turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
    
  )
}

export default App
