import React, { memo } from 'react';
import { Player, Winner } from '../../types/game.types';
import { useGame } from '../../store/GameContext';
import './GameInfo.css';

interface GameInfoProps {
  currentPlayer: Player;
  status: 'waiting' | 'playing' | 'won' | 'draw';
  winner: Winner | null;
}

export const GameInfo: React.FC<GameInfoProps> = memo(({
  currentPlayer,
  status,
  winner
}) => {
  const { state } = useGame();

  const getStatusMessage = () => {
    switch (status) {
      case 'won':
        return `Победил ${state.settings.playerNames[winner!.player]}!`;
      case 'draw':
        return 'Ничья!';
      case 'playing':
        return `Сейчас ходит: ${state.settings.playerNames[currentPlayer]}`;
      default:
        return 'Готов к игре!';
    }
  };

  return (
    <div className="game-info">
      <div className="status-message">
        {getStatusMessage()}
      </div>
      
      <div className="player-indicators">
        <div className={`player-indicator ${currentPlayer === 'player_1' && status === 'playing' ? 'active' : ''}`}>
          <div 
            className="token" 
            style={{ background: state.settings.playerColors.player_1 }}
          ></div>
          <span>{state.settings.playerNames.player_1}</span>
        </div>
        
        <div className={`player-indicator ${currentPlayer === 'player_2' && status === 'playing' ? 'active' : ''}`}>
          <div 
            className="token" 
            style={{ background: state.settings.playerColors.player_2 }}
          ></div>
          <span>{state.settings.playerNames.player_2}</span>
        </div>
      </div>
    </div>
  );
});

GameInfo.displayName = 'GameInfo';