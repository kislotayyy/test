import { GameState, GameAction, Player, Theme } from '../types/game.types';
import { checkWinner, isBoardFull } from '../utils/gameLogic';

const ROWS = 6;
const COLUMNS = 7;

export const initialGameState: GameState = {
  board: Array(ROWS).fill(null).map(() => Array(COLUMNS).fill(null)),
  currentPlayer: 'player_1',
  status: 'playing',
  winner: null,
  moves: [],
  history: [],
  isThinking: false,
  settings: {
    theme: 'light',
    playerColors: {
      player_1: '#ff6b6b',
      player_2: '#48dbfb'
    },
    playerNames: {
      player_1: 'Игрок 1',
      player_2: 'Игрок 2'
    }
  }
};

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'MAKE_MOVE':
      return makeMoveReducer(state, action.payload.column);
    
    case 'RESET_GAME':
      return { 
        ...initialGameState,
        settings: state.settings
      };
    
    case 'UNDO_MOVE':
      return undoMoveReducer(state);
    
    case 'SET_THINKING':
      return {
        ...state,
        isThinking: action.payload.isThinking
      };
    
    case 'CHANGE_THEME':
      return {
        ...state,
        settings: {
          ...state.settings,
          theme: action.payload.theme
        }
      };
    
    case 'CHANGE_PLAYER_COLOR':
      return {
        ...state,
        settings: {
          ...state.settings,
          playerColors: {
            ...state.settings.playerColors,
            [action.payload.player]: action.payload.color
          }
        }
      };
    
    case 'CHANGE_PLAYER_NAME':
      return {
        ...state,
        settings: {
          ...state.settings,
          playerNames: {
            ...state.settings.playerNames,
            [action.payload.player]: action.payload.name
          }
        }
      };
    
    default:
      return state;
  }
};

const makeMoveReducer = (state: GameState, column: number): GameState => {
  if (state.status !== 'playing' || column < 0 || column >= COLUMNS || state.isThinking) {
    return state;
  }

  const newBoard = state.board.map(row => [...row]);
  let row = -1;

  for (let i = ROWS - 1; i >= 0; i--) {
    if (newBoard[i][column] === null) {
      newBoard[i][column] = state.currentPlayer;
      row = i;
      break;
    }
  }

  if (row === -1) return state;

  const newMoves = [...state.moves, column];
  const winner = checkWinner(newBoard, row, column);

  let status: GameState['status'] = 'playing';
  if (winner) {
    status = 'won';
  } else if (isBoardFull(newBoard)) {
    status = 'draw';
  }

  const nextPlayer = state.currentPlayer === 'player_1' ? 'player_2' : 'player_1';

  const historyItem = {
    board: JSON.parse(JSON.stringify(state.board)) as (Player | null)[][],
    currentPlayer: state.currentPlayer,
    moves: [...state.moves]
  };

  const newState = {
    board: newBoard,
    currentPlayer: status === 'playing' ? nextPlayer : state.currentPlayer,
    status,
    winner,
    moves: newMoves,
    history: [...state.history, historyItem],
    isThinking: false,
    settings: state.settings
  };

  return newState;
};

const undoMoveReducer = (state: GameState): GameState => {
  if (state.history.length === 0) {
    return state;
  }

  const lastState = state.history[state.history.length - 1];
  
  return {
    board: lastState.board,
    currentPlayer: lastState.currentPlayer,
    status: 'playing',
    winner: null,
    moves: lastState.moves,
    history: state.history.slice(0, -1),
    isThinking: false,
    settings: state.settings
  };
};