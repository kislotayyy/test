import React from 'react';
import { Game } from './components/game/Game';
import { GameProvider } from './store/GameContext';
import './styles/global.css';

function App() {
  return (
    <GameProvider>
      <div className="app">
        <header className="app-header">
          <h1> 4 в ряд</h1>
          <p>Собери 4 фишки в ряд по горизонтали, вертикали или диагонали!</p>
        </header>
        <main className="app-main">
          <Game />
        </main>
      </div>
    </GameProvider>
  );
}

export default App;