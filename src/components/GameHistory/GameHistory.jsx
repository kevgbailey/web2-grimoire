import Header from "../Header/Header";
import { useState } from "react";
import { useGameHistory } from "../../hooks/useGame";
import "./GameHistory.css";
import PlayGame from "./PlayGame";

const GameHistory = () => {
  const { gameHistory, isLoading, error } = useGameHistory();
  const [showPlayGameScreen, setShowPlayGameScreen] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);

  if (isLoading) {
    return <Header text="Loading..."></Header>;
  }

  if (error) {
    return <Header text={`Error: ${error}`}></Header>;
  }

  const handleGameClick = (game_id) => {
    setSelectedGameId(game_id);
    setShowPlayGameScreen(true);
  };

  return (
    <div className="history-container">
      <Header text="Your Game History" className="mb-4" />
      <div className="game-list">
        {gameHistory.map(game => (
          <div 
            key={game.game_id} 
            className="game-card"
            onClick={() => handleGameClick(game.game_id)}
          >
            <h3>Game #{game.game_id}</h3>
            <p>Date: {game.startDate}</p>
            <p>Players: {game.numPlayers}</p>
            <p>Status: {game.status}</p>
          </div>
        ))}
      </div>
      {showPlayGameScreen && (
        <PlayGame gameId={selectedGameId} setShowPlayGameScreen={setShowPlayGameScreen} />
      )}
    </div>
  );
};

export default GameHistory;
