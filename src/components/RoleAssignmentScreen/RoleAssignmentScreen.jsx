import { useState, useContext } from 'react';
import Header from "../Header/Header"
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import './RoleAssignmentScreen.css';
import roles from "../../models/roles.js";
import Button from "../Button/Button";
import { GameContext } from "../../contexts/GameContext/GameContext";

const RoleAssignmentScreen = ({ selectedRoles, playerNames, userId, getRoleById }) => {
    const [shuffledRoles, setShuffledRoles] = useState([...selectedRoles]);
    const navigate = useNavigate();
    const { updateGameState } = useContext(GameContext);

    const shuffleArray = (array) => {
        for (var i = array.length - 1; i >= 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    const rerollRoles = () => {
        const newShuffledRoles = [...selectedRoles];
        shuffleArray(newShuffledRoles);
        setShuffledRoles(newShuffledRoles);
    };

    const getRoleNameById = (roleId) => {
        for (const category in roles) {
            const role = roles[category].find(role => role.id === roleId);
            if (role) return role.name;
        }
        return roleId; // Fallback to roleId if not found
    };

    const handleStartGame = () => {
        const roleAssignments = playerNames.map((name, index) => ({
            name: name,
            id: parseInt(shuffledRoles[index])
        }));

        const game_id = Math.floor(Math.random() * 1000000);
        const gameState = {
            game: {
                game_id: game_id,
                storyteller_id: userId || 1,
                night: 0,
                status: 'active'
            },
            players: playerNames.map((name, index) => ({
                player_id: index + 1,
                game_id: game_id,
                name: name,
                role_id: parseInt(shuffledRoles[index]),
                isDead: false,
                drunkRole: null,
                hasVote: true
            })),
            statusEffects: [],
            roles: shuffledRoles.map(roleId => {
                const role = getRoleById(roleId);
                return {
                    role_id: parseInt(roleId),
                    name: role.name,
                    description: role.description,
                    night_order: null,
                    first_night_order: null
                };
            })
        };
        
        updateGameState(gameState);
        navigate('/grimoire', { 
            state: { 
                gameState,
                roleAssignments 
            } 
        });
    };

    return (
      <>
        <Header text="Role Assignments:" className="d-flex justify-content-center p-3 display-2" />
        <div className="role-assignment-screen d-flex flex-column align-items-center">
            {playerNames.map((playerName, index) => (
                <div key={index} className="player-role">
                    <Header text ={`${playerName}: ${getRoleNameById(shuffledRoles[index])}`} />
                </div>
            ))}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <Button text="Reroll" onClick={rerollRoles} className="reroll-button mx-3" />
          <Button text ="Start Game" onClick={handleStartGame} className="start-button mx-3" />
        </div>
      </>
    );
}

RoleAssignmentScreen.propTypes = {
  selectedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  userId: PropTypes.number,
  getRoleById: PropTypes.func.isRequired
}

export default RoleAssignmentScreen