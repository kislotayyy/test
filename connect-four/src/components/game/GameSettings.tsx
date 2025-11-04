import React, { useState, useEffect } from 'react';
import { Theme, Player } from '../../types/game.types';
import { useGame } from '../../store/GameContext';
import './GameSettings.css';

interface GameSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GameSettings: React.FC<GameSettingsProps> = ({ isOpen, onClose }) => {
  const { state, changeTheme, changePlayerColor, changePlayerName } = useGame();
  const [activeTab, setActiveTab] = useState<'theme' | 'colors' | 'names'>('theme');
  const [nameInputs, setNameInputs] = useState({
    player_1: '',
    player_2: ''
  });
  useEffect(() => {
    if (isOpen) {
      setNameInputs({
        player_1: state.settings.playerNames.player_1,
        player_2: state.settings.playerNames.player_2
      });
    }
  }, [isOpen, state.settings.playerNames]);

  const themeOptions: { value: Theme; label: string}[] = [
    { value: 'light', label: 'Светлая'},
    { value: 'dark', label: 'Темная'}
  ];

  const colorPresets = [
    { name: 'Красный', value: '#ff6b6b' },
    { name: 'Синий', value: '#48dbfb' },
    { name: 'Зеленый', value: '#2ed573' },
    { name: 'Фиолетовый', value: '#a55eea' },
    { name: 'Оранжевый', value: '#ff9f43' },
    { name: 'Розовый', value: '#ff9ff3' },
    { name: 'Желтый', value: '#feca57' },
    { name: 'Бирюзовый', value: '#00d2d3' },
    { name: 'Пурпурный', value: '#e056fd' },
    { name: 'Голубой', value: '#74b9ff' }
  ];

  const handleNameChange = (player: Player, value: string) => {
    setNameInputs(prev => ({
      ...prev,
      [player]: value
    }));
  };

  const handleSaveName = (player: Player) => {
    const name = nameInputs[player].trim();
    if (name) {
      changePlayerName(player, name);
    }
  };

  const handleKeyPress = (player: Player, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveName(player);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={e => e.stopPropagation()}>
        <div className="settings-header">
          <h2> Настройки игры</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="settings-tabs">
          <button 
            className={`tab-button ${activeTab === 'theme' ? 'active' : ''}`}
            onClick={() => setActiveTab('theme')}
          >
            Тема
          </button>
          <button 
            className={`tab-button ${activeTab === 'colors' ? 'active' : ''}`}
            onClick={() => setActiveTab('colors')}
          >
            Цвета
          </button>
          <button 
            className={`tab-button ${activeTab === 'names' ? 'active' : ''}`}
            onClick={() => setActiveTab('names')}
          >
            Имена
          </button>
        </div>

        <div className="settings-content">
          {activeTab === 'theme' && (
            <div className="tab-content">
              <h3>Выберите тему оформления</h3>
              <div className="theme-options">
                {themeOptions.map(theme => (
                  <button
                    key={theme.value}
                    className={`theme-option ${state.settings.theme === theme.value ? 'active' : ''}`}
                    onClick={() => changeTheme(theme.value)}
                  >
                    <span className="theme-label">{theme.label}</span>
                    {state.settings.theme === theme.value && (
                      <span className="check-mark">✓</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="current-theme">
                Текущая тема: <strong>{state.settings.theme === 'light' ? 'Светлая' : 'Темная'}</strong>
              </div>
            </div>
          )}

          {activeTab === 'colors' && (
            <div className="tab-content">
              <div className="color-section">
                <h3>{state.settings.playerNames.player_1}</h3>
                <div className="color-presets-grid">
                  {colorPresets.map(color => (
                    <button
                      key={`player1-${color.value}`}
                      className={`color-preset ${state.settings.playerColors.player_1 === color.value ? 'active' : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => changePlayerColor('player_1', color.value)}
                      title={color.name}
                    >
                      {state.settings.playerColors.player_1 === color.value && (
                        <span className="color-check">✓</span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="current-color-display">
                  <div 
                    className="current-color-preview" 
                    style={{ backgroundColor: state.settings.playerColors.player_1 }}
                  />
                  <span>Текущий цвет</span>
                </div>
              </div>

              <div className="color-section">
                <h3>{state.settings.playerNames.player_2}</h3>
                <div className="color-presets-grid">
                  {colorPresets.map(color => (
                    <button
                      key={`player2-${color.value}`}
                      className={`color-preset ${state.settings.playerColors.player_2 === color.value ? 'active' : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => changePlayerColor('player_2', color.value)}
                      title={color.name}
                    >
                      {state.settings.playerColors.player_2 === color.value && (
                        <span className="color-check">✓</span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="current-color-display">
                  <div 
                    className="current-color-preview" 
                    style={{ backgroundColor: state.settings.playerColors.player_2 }}
                  />
                  <span>Текущий цвет</span>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'names' && (
            <div className="tab-content">
              <div className="name-section">
                <h3>Игрок 1</h3>
                <div className="name-input-container">
                  <input
                    type="text"
                    value={nameInputs.player_1}
                    onChange={(e) => handleNameChange('player_1', e.target.value)}
                    onKeyPress={(e) => handleKeyPress('player_1', e)}
                    onBlur={() => handleSaveName('player_1')}
                    className="name-input"
                    placeholder="Введите имя игрока 1"
                    maxLength={20}
                  />
                  <button 
                    className="save-name-btn"
                    onClick={() => handleSaveName('player_1')}
                    disabled={!nameInputs.player_1.trim()}
                  >
                    Сохранить
                  </button>
                </div>
                <div className="current-name-display">
                  Текущее имя: <strong>{state.settings.playerNames.player_1}</strong>
                </div>
              </div>

              <div className="name-section">
                <h3>Игрок 2</h3>
                <div className="name-input-container">
                  <input
                    type="text"
                    value={nameInputs.player_2}
                    onChange={(e) => handleNameChange('player_2', e.target.value)}
                    onKeyPress={(e) => handleKeyPress('player_2', e)}
                    onBlur={() => handleSaveName('player_2')}
                    className="name-input"
                    placeholder="Введите имя игрока 2"
                    maxLength={20}
                  />
                  <button 
                    className="save-name-btn"
                    onClick={() => handleSaveName('player_2')}
                    disabled={!nameInputs.player_2.trim()}
                  >
                    Сохранить
                  </button>
                </div>
                <div className="current-name-display">
                  Текущее имя: <strong>{state.settings.playerNames.player_2}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};