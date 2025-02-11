import { useState } from "react";
import Header from "../../Header/Header";
import roles from "../../../models/roles.js";
import roleAmountLogic from "../../../models/roleAmountLogic.js";
import RoleToken from "../../RoleToken/RoleToken.jsx";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import "./GameForm.css";
import RoleAssignmentScreen from "../../RoleAssignmentScreen/RoleAssignmentScreen.jsx";

/**
 * GameForm component handles the setup process for a game, including:
 * - Selecting the number of players
 * - Entering player names
 * - Selecting roles for the game
 * - Displaying the role assignment screen
 *
 * State:
 * - step: Current step in the form process (1-4)
 * - numPlayers: Number of players in the game
 * - playerNames: Array of player names
 * - selectedRoles: Array of selected role IDs
 * - roleAmounts: Object containing the number of each role type
 * - selectedTownsfolk: Array of selected Townsfolk role IDs
 * - selectedOutsiders: Array of selected Outsider role IDs
 * - selectedMinions: Array of selected Minion role IDs
 * - selectedDemons: Array of selected Demon role IDs
 *
 * Handlers:
 * - handleNumPlayersSubmit: Handles submission of the number of players
 * - handlePlayerNamesSubmit: Handles submission of player names
 * - handleRolesSubmit: Handles submission of selected roles
 * - handleRoleSelection: Handles selection of a role
 *
 * @returns {JSX.Element} The rendered component
 */
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
    setPlayerNames(Array(numPlayers).fill(""));
    setRoleAmounts(roleAmountLogic(numPlayers));
    console.log(roleAmounts);
    setStep(2);
  };

  const handlePlayerNamesSubmit = (e) => {
    e.preventDefault();
    // Remove: setSelectedRoles(Array(numPlayers).fill(""));
    setStep(3);
  };

  const handleRolesSubmit = (e) => {
    e.preventDefault();
    if(selectedRoles.length === numPlayers) {
      setStep(4);
    }
  };

  const handleRoleSelection = (roleId, category) => {
    setSelectedRoles((prev) => {
      if (prev.includes(roleId)) return prev; // Prevent duplicate selection
      return [...prev, roleId];
    });

    if (category === "Townsfolk") {
      setSelectedTownsfolk((prev) => {
        if (prev.length >= roleAmounts.Townsfolk) return prev;
        return [...prev, roleId];
      });
    } else if (category === "Outsiders") {
      setSelectedOutsiders((prev) => {
        if (prev.length >= roleAmounts.Outsiders) return prev;
        return [...prev, roleId];
      });
    } else if (category === "Minions") {
      setSelectedMinions((prev) => {
        if (prev.length >= roleAmounts.Minions) return prev;
        return [...prev, roleId];
      });
    } else if (category === "Demons") {
      setSelectedDemons((prev) => {
        if (prev.length >= roleAmounts.Demons) return prev;
        return [...prev, roleId];
      });
    }
  };

  return (
    <>
      {step === 1 && (
        <div className="d-flex flex-column justify-content-center align-items-center gap-4">
          <Header text="How many players are you playing with?" />
          <Header text={numPlayers} className="number" />
          <form className="d-flex flex-column gap-5 align-items-center">
            <input
              type="range"
              className="custom-range" //no bootstrap here, they don't have much for sliders
              name="numPlayers"
              min="5"
              max="15"
              defaultValue="10"
              onChange={(e) => setNumPlayers(Number(e.target.value))}
            />
            <div>
              <Button text="Submit" onClick={handleNumPlayersSubmit} />
            </div>
          </form>
        </div>
      )}
      {step === 2 && (
        <>
          <div className="d-flex flex-column justify-content-center align-items-center gap-4">
            <Header text="Enter the names of the players:" />
            <form className="d-flex flex-column align-items-center">
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
              <Button
                text="Submit"
                onClick={handlePlayerNamesSubmit}
                className="m-4"
              />
            </form>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <Header text="Select the roles to be used in the game" />
          <form>
            <Header text={`Townsfolk: ${roleAmounts.Townsfolk}`} />
            <div className="role-token-container">
              {roles.townsfolk.map((role, index) => (
                <div
                  className="role-token"
                  key={
                    index +
                    roles.townsfolk.length +
                    roles.outsiders.length +
                    roles.minions.length +
                    roles.demons.length
                  }
                >
                  <RoleToken
                    key={index}
                    role={role}
                    className={`token ${
                      selectedRoles.includes(role.id) ? "disabled" : ""
                    }`}
                    onClick={
                      selectedTownsfolk.length < roleAmounts.Townsfolk
                        ? () => handleRoleSelection(role.id, "Townsfolk")
                        : {}
                    }
                  />
                  <div className="description">{role.description}</div>
                </div>
              ))}
            </div>
            <Header text={`Outsiders: ${roleAmounts.Outsiders}`} />
            <div className="role-token-container">
              {roles.outsiders.map((role, index) => (
                <div
                  className="role-token"
                  key={index + roles.townsfolk.length}
                >
                  <RoleToken
                    key={index + roles.townsfolk.length}
                    role={role}
                    className={`token ${
                      selectedRoles.includes(role.id) ? "disabled" : ""
                    }`}
                    onClick={
                      selectedOutsiders.length < roleAmounts.Outsiders
                        ? () => handleRoleSelection(role.id, "Outsiders")
                        : {}
                    }
                  />
                  <div className="description">{role.description}</div>
                </div>
              ))}
            </div>
            <Header text={`Minions: ${roleAmounts.Minions}`} />
            <div className="role-token-container">
              {roles.minions.map((role, index) => (
                <div
                  className="role-token"
                  key={index + roles.townsfolk.length + roles.outsiders.length}
                >
                  <RoleToken
                    key={
                      index + roles.townsfolk.length + roles.outsiders.length
                    }
                    role={role}
                    className={`token ${
                      selectedRoles.includes(role.id) ? "disabled" : ""
                    }`}
                    onClick={
                      selectedMinions.length < roleAmounts.Minions
                        ? () => handleRoleSelection(role.id, "Minions")
                        : {}
                    }
                  />
                  <div className="description">{role.description}</div>
                </div>
              ))}
            </div>
            <Header text={`Demons: ${roleAmounts.Demons}`} />
            <div className="role-token-container">
              {roles.demons.map((role, index) => (
                <div
                  className="role-token"
                  key={
                    index +
                    roles.townsfolk.length +
                    roles.outsiders.length +
                    roles.minions.length
                  }
                >
                  <RoleToken
                    key={
                      index +
                      roles.townsfolk.length +
                      roles.outsiders.length +
                      roles.minions.length
                    }
                    role={role}
                    className={`token ${
                      selectedRoles.includes(role.id) ? "disabled" : ""
                    }`}
                    onClick={
                      selectedDemons.length < roleAmounts.Demons
                        ? () => handleRoleSelection(role.id, "Demons")
                        : {}
                    }
                  />
                  <div className="description">{role.description}</div>
                </div>
              ))}
            </div>
            <div className="spacer"></div>
            <Button
              text="Submit"
              onClick={handleRolesSubmit}
              className="m-5 position-fixed bottom-0"
            />
          </form>
        </>
      )}
      {step === 4 && (
        <>
        <RoleAssignmentScreen selectedRoles={selectedRoles} playerNames={playerNames} />
        </>
      )}
    </>
  );
};

export default GameForm;
