import { useState, useEffect, useCallback } from "react";

export const useTestUser = (count = 1) => {
  const [testUsers, setTestUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://randomuser.me/api/?results=${count}`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setTestUsers(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [count]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { testUsers, isLoading, error, rerollUsers: fetchUsers };
};
