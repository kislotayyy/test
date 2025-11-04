import React, { memo } from 'react';
import { useGame } from '../../store/GameContext';
import './GameControls.css';

export const GameControls: React.FC = memo(() => {
  const { resetGame, undoMove, state } = useGame();

  return (
    <div className="game-controls">
      <button 
        className="control-button undo" 
        onClick={undoMove}
        disabled={state.history.length === 0}
      >
        Отменить ход ↩
      </button>
      
      <button 
        className="control-button reset" 
        onClick={resetGame}
      >
        Новая игра
      </button>
    </div>
  );
});

GameControls.displayName = 'GameControls';