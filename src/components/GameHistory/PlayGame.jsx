import React from 'react'
import { useGetGame } from '../../hooks/useGame';
import Header from '../Header/Header';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import "./PlayGame.css";

const PlayGame = ({ gameId, setShowPlayGameScreen }) => {
    const { game, isGameLoading, isGameError, fetchGame } = useGetGame(gameId);
    const navigate = useNavigate();

    const handleYes = () => {
        fetchGame();
        console.log('Yes button clicked', game);
        if (game) {
            navigate('/grimoire', { 
                state: { 
                    gameState: game,
                    roleAssignments: game.players.map(player => ({
                        name: player.name,
                        id: player.role_id
                    }))
                } 
            });
        }
    };

    const handleNo = () => {
        setShowPlayGameScreen(false);
    }
    
  return (
    <div className="play-game-overlay">
      <div className="play-game-modal">
        <Header text="Play Game?" />
        <div className="button-container">
          <Button text="Yes" onClick={handleYes} className="play-game-button" />
          <Button text="No" onClick={handleNo} className="play-game-button" />
        </div>
      </div>
    </div>
  );
}

export default PlayGame;