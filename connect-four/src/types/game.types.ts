export type Player = 'player_1' | 'player_2';
export type GameStatus = 'waiting' | 'playing' | 'won' | 'draw';
export type Theme = 'light' | 'dark';

export interface Position {
  row: number;
  column: number;
}

export interface Winner {
  player: Player;
  positions: Position[];
}

export interface GameSettings {
  theme: Theme;
  playerColors: Record<Player, string>;
  playerNames: Record<Player, string>;
}

export interface GameState {
  board: (Player | null)[][];
  currentPlayer: Player;
  status: GameStatus;
  winner: Winner | null;
  moves: number[];
  history: GameHistoryItem[];
  isThinking: boolean;
  settings: GameSettings;
}

export interface GameHistoryItem {
  board: (Player | null)[][];
  currentPlayer: Player;
  moves: number[];
}

export type GameAction = 
  | { type: 'MAKE_MOVE'; payload: { column: number } }
  | { type: 'RESET_GAME' }
  | { type: 'UNDO_MOVE' }
  | { type: 'SET_THINKING'; payload: { isThinking: boolean } }
  | { type: 'CHANGE_THEME'; payload: { theme: Theme } }
  | { type: 'CHANGE_PLAYER_COLOR'; payload: { player: Player; color: string } }
  | { type: 'CHANGE_PLAYER_NAME'; payload: { player: Player; name: string } };