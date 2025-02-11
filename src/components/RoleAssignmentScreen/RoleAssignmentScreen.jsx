import { useState } from 'react';
import Header from "../Header/Header"
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import './RoleAssignmentScreen.css';
import roles from "../../models/roles.js";
import Button from "../Button/Button";

const RoleAssignmentScreen = ({ selectedRoles, playerNames }) => {
    const [shuffledRoles, setShuffledRoles] = useState([...selectedRoles]);
    const navigate = useNavigate();

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
        let roleAssignmentArray = [];
        for(let i = 0; i < playerNames.length; i++) {
            roleAssignmentArray.push({name: playerNames[i], id: shuffledRoles[i]});
        }
        navigate("/grimoire", { state: { roleAssignments: roleAssignmentArray } });
    }

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
  playerNames: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default RoleAssignmentScreen