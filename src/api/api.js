const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-url.com/api' 
  : 'http://localhost:3000/api';

/**
 * Base API class for handling HTTP requests
 */
class API {
  /**
   * Makes a fetch request with the specified options
   * @param {string} endpoint - The API endpoint
   * @param {Object} options - Fetch options
   * @returns {Promise<any>} Response data
   * 
   */
  private authToken
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  /**
   * Game-related API calls
   */
  static GameAPI = {
    createGame: async (gameData) => {
      return API.request('/games', {
        method: 'POST',
        body: JSON.stringify(gameData)
      });
    },

    getGameDetails: async (gameId) => {
      return API.request(`/games/${gameId}`);
    },

    updateGameState: async (gameId, gameState) => {
      return API.request(`/games/${gameId}`, {
        method: 'PUT',
        body: JSON.stringify(gameState)
      });
    }
  };

  /**
   * Authentication-related API calls
   */
  static AuthAPI = {
    login: async (credentials) => {
      return API.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
    },

    register: async (userData) => {
      return API.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
    },

    logout: async () => {
      return API.request('/auth/logout', {
        method: 'POST'
      });
    }
  };

  /**
   * Role-related API calls
   */
//   static RolesAPI = {
//     getAllRoles: async () => {
//       return API.request('/roles');
//     },

//     getRoleById: async (roleId) => {
//       return API.request(`/roles/${roleId}`);
//     }
//   };

//   /**
//    * Player-related API calls
//    */
//   static PlayersAPI = {
//     getPlayers: async (gameId) => {
//       return API.request(`/games/${gameId}/players`);
//     },

//     updatePlayerRole: async (gameId, playerId, roleId) => {
//       return API.request(`/games/${gameId}/players/${playerId}`, {
//         method: 'PUT',
//         body: JSON.stringify({ roleId })
//       });
//     }
//   };
}

export default API;