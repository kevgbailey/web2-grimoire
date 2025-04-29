import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const useTestUser = (count) => {
  const [testUsers, setTestUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/game/get_testusers/${count}`, 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      console.log("Fetched test users:", data);
      
      // Format the names right in the hook
      const formattedUsers = data.results.map(user => `${user.name.first} ${user.name.last}`);
      setTestUsers(formattedUsers);
      return formattedUsers;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [count]);

  // We no longer auto-fetch on mount
  useEffect(() => {}, [fetchUsers]);

  return { testUsers, isLoading, error, rerollUsers: fetchUsers };
};
