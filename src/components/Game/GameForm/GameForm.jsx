import { useState } from 'react';
import Header from '../../Header/Header';
import roles from "../../../models/roles.js"
import roleAmountLogic from '../../../models/roleAmountLogic.js'; 
import RoleToken from '../../RoleToken/RoleToken.jsx';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import './GameForm.css';

const GameForm = () => {
  const [step, setStep] = useState(1);
  const [numPlayers, setNumPlayers] = useState(10);
  const [playerNames, setPlayerNames] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [roleAmounts, setRoleAmounts] = useState({});
  const [selectedTownsfolk, setSelectedTownsfolk] = useState([]);
  const [selectedOutsiders, setSelectedOutsiders] = useState([]);
  const [selectedMinions, setSelectedMinions] = useState([]);
  const [selectedDemons, setSelectedDemons] = useState([]);

  const handleNumPlayersSubmit = (e) => {
    e.preventDefault();
    setPlayerNames(Array(numPlayers).fill(''));
    setRoleAmounts(roleAmountLogic(numPlayers));
    console.log(roleAmounts);
    setStep(2);
  };

  const handlePlayerNamesSubmit = (e) => {
    e.preventDefault();
    setSelectedRoles(Array(numPlayers).fill(''));
    setStep(3);
  };

  const handleRolesSubmit = (e) => {
    e.preventDefault();
    // Handle the final submission
  };

  const handleRoleSelection = (roleId) => {
    const resultArray = selectedRoles;
    resultArray.push(roleId)
    setSelectedRoles(resultArray);
    console.log(selectedRoles);
  }

  return (
    <>
      {step === 1 && (
        <>
          <Header text="How many players are you playing with?" />
          <Header text={numPlayers}/>
          <form>
            <input
              type="range"
              className="custom-range" //no bootstrap here, they don't have much for sliders
              name="numPlayers"
              min="5"
              max="15"
              defaultValue="10"
              onChange={(e) => setNumPlayers(Number(e.target.value))}
            />
            <Button text="Submit" onClick={handleNumPlayersSubmit}/>
          </form>
        </>
      )}
      {step === 2 && (
        <>
            <div className="d-flex flex-column justify-content-center">
          <Header text="Enter the names of the players" />
          <form>
            {playerNames.map((name, index) => (
              <div key={index}>
                <Input
                  placeholder={`Player ${index + 1}`}
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
            <Button text="Submit" onClick={handlePlayerNamesSubmit}/>
          </form>
            </div>
        </>
      )}
      {step === 3 && (
        <>
          <Header text="Select the roles to be used in the game" />
          <form onSubmit={handleRolesSubmit}>
            <Header text = {`Townsfolk: ${roleAmounts.Townsfolk}`}/>
            <div className="role-token-container">
            {roles.townsfolk.map((role, index) => (
              <div className="role-token" key={index + roles.townsfolk.length + roles.outsiders.length + roles.minions.length + roles.demons.length}>
                <RoleToken key={index} role={role} className="token"/>
                <div>{role.description}</div>
              </div>
            ))}
            </div>
            <Header text = {`Outsiders: ${roleAmounts.Outsiders}`}/>
            <div className="role-token-container">
            {roles.outsiders.map((role, index) => (
              <div className="role-token" key={index + roles.townsfolk.length}>
                <RoleToken key={index + roles.townsfolk.length} role={role} className="token"/>
                <div>{role.description}</div>
              </div>
            ))}
            </div>
            <Header text = {`Minions: ${roleAmounts.Minions}`}/>
            <div className="role-token-container">
            {roles.minions.map((role, index) => (
              <div className="role-token" key={index + roles.townsfolk.length + roles.outsiders.length}>
                <RoleToken key={index + roles.townsfolk.length + roles.outsiders.length} role={role} className = "token"/>
                <div>{role.description}</div>
              </div>
            ))}
            </div>
            <Header text = {`Demons: ${roleAmounts.Demons}`}/>
            <div className="role-token-container">
            {roles.demons.map((role, index) => (
              <div className="role-token" key={index + roles.townsfolk.length + roles.outsiders.length + roles.minions.length}>
                <RoleToken key={index + roles.townsfolk.length + roles.outsiders.length + roles.minions.length} role={role} className="token"/>
                <div>{role.description}</div>
              </div>
            ))}
            </div>
            <button type="submit" >Submit</button>
          </form>
        </>
      )}
    </>
  );
};

export default GameForm;