import { useState } from "react";
import Header from "../../Header/Header";
import roles from "../../../models/roles.js";
import roleAmountLogic from "../../../models/roleAmountLogic.js";
import RoleToken from "../../RoleToken/RoleToken.jsx";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import "./GameForm.css";
import RoleAssignmentScreen from "../../RoleAssignmentScreen/RoleAssignmentScreen.jsx";
import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext/AuthContext";

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
  const { userId } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [numPlayers, setNumPlayers] = useState(10);
  const [playerNames, setPlayerNames] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [roleAmounts, setRoleAmounts] = useState({});
  const [selectedTownsfolk, setSelectedTownsfolk] = useState([]);
  const [selectedOutsiders, setSelectedOutsiders] = useState([]);
  const [selectedMinions, setSelectedMinions] = useState([]);
  const [selectedDemons, setSelectedDemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleNumPlayersSubmit = (e) => {
    e.preventDefault();
    setPlayerNames(Array(numPlayers).fill(""));
    setRoleAmounts(roleAmountLogic(numPlayers));
    setStep(2);
  };

  const handlePlayerNamesSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleRolesSubmit = (e) => {
    e.preventDefault();
    if(selectedRoles.length === numPlayers) {
      setStep(4);
    }
  };

  const getRoleById = (roleId) => {
    for (const category in roles) {
      const role = roles[category].find(r => r.id === roleId);
      if (role) return role;
    }
    return null;
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
  
  const handleNumPlayersChange = async (e) => {
    const newCount = Number(e.target.value);
    setNumPlayers(newCount);
    setPlayerNames(Array(newCount).fill(""));
  };

  const handleGenerateTestNames = async () => {
    setIsLoading(true);
    
    try {
      // Use the randomuser.me API directly
      const response = await fetch(`https://randomuser.me/api/?results=${numPlayers}`);
      if (!response.ok) {
        throw new Error("Failed to fetch test users");
      }
      
      const data = await response.json();
      const names = data.results.map(user => `${user.name.first} ${user.name.last}`);
      setPlayerNames(names);
    } catch (error) {
      console.error("Error fetching test users:", error);
    } finally {
      setIsLoading(false);
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
              className="custom-range"
              name="numPlayers"
              min="5"
              max="15"
              defaultValue="10"
              onChange={handleNumPlayersChange}
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
            <Button 
              text={isLoading ? "Loading..." : "Generate Test Names"}
              onClick={handleGenerateTestNames}
              disabled={isLoading}
            />
            <form className="d-flex flex-column align-items-center">
              {Array(numPlayers).fill(null).map((_, index) => (
                <div key={index}>
                  <Input
                    placeholder={`Player ${index + 1}`}
                    id={`playerName${index}`}
                    name={`playerName${index}`}
                    value={playerNames[index] || ""}
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
            <div className="role-token-container d-flex flex-wrap gap-4">
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
              className="m-5 position-fixed bottom-0 mb-5"
            />
          </form>
        </>
      )}
      {step === 4 && (
        <>
          <RoleAssignmentScreen 
            selectedRoles={selectedRoles} 
            playerNames={playerNames} 
            userId={userId}
            getRoleById={getRoleById}
          />
        </>
      )}
    </>
  );
};

export default GameForm;
