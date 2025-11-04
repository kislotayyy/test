import React, { useState, useEffect } from 'react';
import { GameBoard } from './GameBoard';
import { GameInfo } from './GameInfo';
import { GameControls } from './GameControls';
import { GameSettings } from './GameSettings';
import { GameOverModal } from './GameOverModal';
import { useGame } from '../../store/GameContext';
import './Game.css';

export const Game: React.FC = () => {
  const { state, makeMove, resetGame } = useGame();
  const [showSettings, setShowSettings] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);

  useEffect(() => {
    if (state.status === 'won' || state.status === 'draw') {
      setShowGameOver(true);
    }
  }, [state.status]);

  const isBoardDisabled = state.status !== 'playing';

  const handleNewGame = () => {
    resetGame();
    setShowGameOver(false);
  };

  const handleCloseGameOver = () => {
    setShowGameOver(false);
  };

  return (
    <div className="game">
      <div className="game-header">
        <h1> 4 в ряд</h1>
        <button 
          className="settings-button"
          onClick={() => setShowSettings(true)}
        >
           Настройки
        </button>
      </div>

      <GameSettings 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
      
      <GameOverModal
        isOpen={showGameOver}
        winner={state.winner}
        onClose={handleCloseGameOver}
        onNewGame={handleNewGame}
      />
      
      <GameInfo 
        currentPlayer={state.currentPlayer}
        status={state.status}
        winner={state.winner}
      />
      
      <GameBoard 
        board={state.board}
        onCellClick={makeMove}
        winningPositions={state.winner?.positions || []}
        disabled={isBoardDisabled}
      />
      
      <GameControls />
    </div>
  );
};