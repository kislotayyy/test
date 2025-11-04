import React from 'react';
import { Winner } from '../../types/game.types';
import { useGame } from '../../store/GameContext';
import './GameOverModal.css';

interface GameOverModalProps {
  isOpen: boolean;
  winner: Winner | null;
  onClose: () => void;
  onNewGame: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  winner,
  onClose,
  onNewGame
}) => {
  const { state } = useGame();

  if (!isOpen) return null;

  const winnerName = winner ? state.settings.playerNames[winner.player] : '';
  const winnerColor = winner ? state.settings.playerColors[winner.player] : '';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="game-over-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Игра завершена!</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="modal-content">
          {winner ? (
            <div className="winner-info">
              <div 
                className="winner-token"
                style={{ background: winnerColor }}
              />
              <h3>Победил {winnerName}!</h3>
              <p>Поздравляем с победой!</p>
            </div>
          ) : (
            <div className="draw-info">
              <div className="draw-icon"></div>
              <h3>Ничья!</h3>
              <p>Отличная игра! Поле полностью заполнено.</p>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="modal-button secondary" onClick={onClose}>
            Закрыть
          </button>
          <button className="modal-button primary" onClick={onNewGame}>
            Новая игра
          </button>
        </div>
      </div>
    </div>
  );
};