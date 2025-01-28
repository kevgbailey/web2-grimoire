import { useState } from 'react';
import Header from '../../Header/Header';
import roles from "../../../models/roles.js"
import RoleToken from '../../RoleToken/RoleToken.jsx';

const GameForm = () => {
  const [step, setStep] = useState(1);
  const [numPlayers, setNumPlayers] = useState(0);
  const [playerNames, setPlayerNames] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const handleNumPlayersSubmit = (e) => {
    e.preventDefault();
    setPlayerNames(Array(numPlayers).fill(''));
    setStep(2);
  };

  const handlePlayerNamesSubmit = (e) => {
    e.preventDefault();
    setSelectedRoles(Array(numPlayers).fill(''));
    setStep(3);
  };

  const handleRolesSubmit = (e) => {
    e.preventDefault();
    console.log('Roles:', selectedRoles);
    // Handle the final submission
  };

  return (
    <>
      {step === 1 && (
        <>
          <Header text="How many players are you playing with?" />
          <form onSubmit={handleNumPlayersSubmit}>
            <label htmlFor="numPlayers">Number of Players:</label>
            <input
              type="number"
              id="numPlayers"
              name="numPlayers"
              min="1"
              onChange={(e) => setNumPlayers(Number(e.target.value))}
            />
            <button type="submit">Submit</button>
          </form>
        </>
      )}
      {step === 2 && (
        <>
          <Header text="Enter the names of the players" />
          <form onSubmit={handlePlayerNamesSubmit}>
            {playerNames.map((name, index) => (
              <div key={index}>
                <label htmlFor={`playerName${index}`}>Player {index + 1}:</label>
                <input
                  type="text"
                  id={`playerName${index}`}
                  name={`playerName${index}`}
                  value={name}
                  onChange={(e) => {
                    const newPlayerNames = [...playerNames];
                    newPlayerNames[index] = e.target.value;
                    setPlayerNames(newPlayerNames);
                  }}
                />
              </div>
            ))}
            <button type="submit">Submit</button>
          </form>
        </>
      )}
      {step === 3 && (
        <>
          <Header text="Select the roles for each player" />
          <form onSubmit={handleRolesSubmit}>
            <Header text = "Townsfolk"/>
            {roles.townsfolk.map((role, index) => (
                <RoleToken key={index} role={role} />
            ))}
            <Header text = "Outsiders"/>
            {roles.outsiders.map((role, index) => (
                <RoleToken key={index + roles.townsfolk.length} role={role} />
            ))}
            <Header text = "Minions"/>
            {roles.minions.map((role, index) => (
                <RoleToken key={index + roles.townsfolk.length + roles.outsiders.length} role={role} />
            ))}
            <Header text = "Demons"/>
            {roles.demons.map((role, index) => (
                <RoleToken key={index + roles.townsfolk.length + roles.outsiders.length + roles.minions.length} role={role} />
            ))}
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </>
  );
};

export default GameForm;