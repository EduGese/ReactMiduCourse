import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti';
import { Square } from './components/Square';
import { TURNS } from './constants.js';
import { checkWinner, checkEndGame} from './logic/board.js';
import { WinnerModal } from './components/WinnerModal.jsx';


function App() {
//TABLERO
const [board, setBoard] = useState(()=>{
  const boardFromStorage = window.localStorage.getItem('board');
  return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
})
//TURNO
const [turn, setTurn] = useState(()=>{
  const turnFromStorage = window.localStorage.getItem('turn');
  return turnFromStorage ? turnFromStorage : TURNS.X;
});
const updateBoard = (index) =>{//Jugada y cambio de turno
  //Actualizar tablero
  if(board[index] || winner) return;//Si ya existe una jugada en la celda no pinta nada (Para no sobrescribir)
  const newBoard = [...board];//Copia el tablero (RECUERDA que no se deben alterar los props de un componente)
   newBoard[index] = turn;//Pinta 'x' u 'o' segun el turno
  setBoard(newBoard);//Actualiza el tablero
 
  //Cambio de turno
  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
  setTurn(newTurn);

  //Guardar partida
  window.localStorage.setItem('board', JSON.stringify(newBoard));
  window.localStorage.setItem('turn', newTurn);

  //Revisar Ganador
  const newWinner = checkWinner(newBoard);
  if(newWinner){
    setWinner((newWinner));
    confetti();
  }else if(checkEndGame(newBoard)){
    setWinner(false);//empate
  }
}
//GANADOR
const [winner, setWinner] = useState(null);


const resetGame = () => {
  setBoard(Array(9).fill(null));
  setTurn(TURNS.X);
  setWinner(null);
  window.localStorage.removeItem('board');
  window.localStorage.removeItem('turn');
}
  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset Juego</button>
      <section className='game'>
      {
        board.map((square, index) => {
          return (
            <Square 
            key={index}
            index={index}
            updateBoard = {updateBoard}
            >
              {square}
            </Square>
          )
        })
      }
      </section>
      <section className='turn'>
        <Square isSelected= {turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected= {turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
    
  )
}

export default App
