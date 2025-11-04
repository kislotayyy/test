import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { GameState, GameAction, Theme, Player } from '../types/game.types';
import { gameReducer, initialGameState } from '../reducers/gameReducer';

interface GameContextType {
  state: GameState;
  makeMove: (column: number) => void;
  resetGame: () => void;
  undoMove: () => void;
  changeTheme: (theme: Theme) => void;
  changePlayerColor: (player: Player, color: string) => void;
  changePlayerName: (player: Player, name: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  useEffect(() => {
    document.body.className = `app ${state.settings.theme}`;
    console.log('Theme applied:', state.settings.theme);
  }, [state.settings.theme]);

  const makeMove = useCallback((column: number) => {
    console.log('Player move:', column);
    dispatch({ type: 'MAKE_MOVE', payload: { column } });
  }, []);

  const resetGame = useCallback(() => {
    console.log('Reset game');
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const undoMove = useCallback(() => {
    console.log('Undo move');
    dispatch({ type: 'UNDO_MOVE' });
  }, []);

  const changeTheme = useCallback((theme: Theme) => {
    console.log('Changing theme to:', theme);
    dispatch({ type: 'CHANGE_THEME', payload: { theme } });
  }, []);

  const changePlayerColor = useCallback((player: Player, color: string) => {
    console.log('Changing color for', player, 'to', color);
    dispatch({ type: 'CHANGE_PLAYER_COLOR', payload: { player, color } });
  }, []);

  const changePlayerName = useCallback((player: Player, name: string) => {
    console.log('Changing name for', player, 'to', name);
    dispatch({ type: 'CHANGE_PLAYER_NAME', payload: { player, name } });
  }, []);

  return (
    <GameContext.Provider value={{ 
      state, 
      makeMove, 
      resetGame, 
      undoMove,
      changeTheme,
      changePlayerColor,
      changePlayerName
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};