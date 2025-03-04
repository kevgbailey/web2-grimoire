import { useState, useEffect } from "react";

export const useTestUser = (count = 1) => {
  const [testUsers, setTestUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rerollTrigger, setRerollTrigger] = useState(0);

  //useEffect hook to fetch the users data when the component mounts, not when the user wants it
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://randomuser.me/api/?results=${count}`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        console.log(data);
        setTestUsers(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const rerollUsers = () => {
      setRerollTrigger(prevTrigger => prevTrigger + 1);
    };

    useEffect(() => {
      fetchUsers();
    }, [count, rerollTrigger]);

  return { testUsers, isLoading, error, rerollUsers };
};
