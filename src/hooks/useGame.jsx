import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const useGame = (initialGame) => {
  const [game, setGame] = useState(initialGame);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const saveGame = useCallback(async () => {
    console.log("Saving game:", game);
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/game/store_game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(game),
      });

      if (!response.ok) {
        throw new Error("Failed to save game");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [game]);

  useEffect(() => {
    if (game !== null) {
      saveGame();
    }
  }, [game, saveGame]);

  return { game, isLoading, error, setGame, saveGame };
};

export const useGameHistory = () => {
  const [gameHistory, setGameHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGameHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/game/get_games`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch game history");
      }
      const data = await response.json();
      console.log("Fetched game history:", data);
      setGameHistory(data);
    }
      catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
    return;
  }, []);

  useEffect(() => {
    fetchGameHistory();
  }, [fetchGameHistory]);

  return { gameHistory, isLoading, error, fetchGameHistory };
};

export const useGetGame = (gameId) => {
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGame = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/game/get_game/${gameId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch game");
      }
      const data = await response.json();
      setGame(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [gameId]);

  useEffect(() => {
    fetchGame();
  }, [fetchGame])

  return { game, isLoading, error, fetchGame };

}
