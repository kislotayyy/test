import React, { memo } from 'react';
import { Player, Position } from '../../types/game.types';
import { useGame } from '../../store/GameContext';
import './GameBoard.css';

interface GameBoardProps {
  board: (Player | null)[][];
  onCellClick: (column: number) => void;
  winningPositions: Position[];
  disabled: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = memo(({
  board,
  onCellClick,
  winningPositions,
  disabled
}) => {
  const { state } = useGame();

  const isWinningCell = (row: number, column: number): boolean => {
    return winningPositions.some(pos => pos.row === row && pos.column === column);
  };

  const getCellStyle = (player: Player | null) => {
    if (!player) return {};
    const color = state.settings.playerColors[player];
    return {
      background: color,
      backgroundImage: `radial-gradient(circle at 30% 30%, ${color}CC, ${color})`
    };
  };

  return (
    <div className="game-board">
      <div className="board-columns">
        {board[0].map((_, columnIndex) => (
          <button
            key={columnIndex}
            className="column-button"
            onClick={() => onCellClick(columnIndex)}
            disabled={disabled}
            aria-label={`Бросить фишку в колонку ${columnIndex + 1}`}
          >
            ↓
          </button>
        ))}
      </div>
      
      <div className="board-grid">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, columnIndex) => (
              <div
                key={`${rowIndex}-${columnIndex}`}
                className={`cell ${cell || 'empty'} ${
                  isWinningCell(rowIndex, columnIndex) ? 'winning' : ''
                }`}
                style={getCellStyle(cell)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

GameBoard.displayName = 'GameBoard';