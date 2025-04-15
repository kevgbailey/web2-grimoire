import { createContext } from "react";
import PropTypes from "prop-types";
import { useGame } from "@hooks/useGame";

export const GameContext = createContext(null);

const GameProvider = ({ children }) => {
  const { game, isLoading, error, setGame, saveGame } = useGame(null);

  const updateGameState = async (newGameState) => {
    console.log('Updating game state:', newGameState);
    try {
      setGame(newGameState);
      await saveGame();
    } catch (err) {
      console.error('Failed to update game state:', err);
    }
  };

  return (
    <GameContext.Provider
      value={{
        game,
        isLoading,
        error,
        updateGameState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameProvider;
