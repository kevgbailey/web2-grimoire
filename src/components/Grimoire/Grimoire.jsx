import PropTypes from "prop-types";
import { useDrop, useDrag } from "react-dnd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ItemTypes } from "../../models/ItemTypes";
import { Tooltip } from "react-tooltip";
import RoleToken from "../RoleToken/RoleToken";
import "./Grimoire.css";
import roles from "../../models/roles";
import { getEmptyImage } from 'react-dnd-html5-backend';

const DraggableRoleToken = ({ id, left, top, role, name, moveToken }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );


  return (
    <div
      ref={drag}
      className="draggable-token"
      style={{
        position: "absolute",
        left,
        top,
        opacity: isDragging ? 0 : 1, // Fades when dragging
        cursor: "move",
      }}
      data-tooltip-id={`tooltip-${id}`}
    >
      <RoleToken role={role} />
      <Tooltip id={`tooltip-${id}`} content={name} className="tooltip" />
    </div>
  );
};

DraggableRoleToken.propTypes = {
  id: PropTypes.number.isRequired,
  role: PropTypes.object.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  moveToken: PropTypes.func.isRequired,
};

const Grimoire = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const gameState = location.state?.gameState;
  const roleAssignments = location.state?.roleAssignments || [];

  const [tokens, setTokens] = useState(
    roleAssignments.map((assignment, index) => ({
      playerName: assignment.name,
      id: assignment.id,
      left: 100 + index * 70,
      top: 100 + index * 70,
    }))
  );

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BOX, // Accepts draggable items of type 'BOX'
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (!delta) return;

      setTokens((prev) =>
        prev.map((token) =>
          token.id === item.id
            ? {
                ...token,
                left: Math.max(0, token.left + delta.x),
                top: Math.max(0, token.top + delta.y),
              }
            : token
        )
      );
    },
  }));

  const getRoleById = (roleId) => {
    for (const category in roles) {
      const role = roles[category].find((role) => role.id === roleId);
      if (role) return role;
    }
    return { id: roleId, name: "Unknown Role" };
  };

  if (!gameState || roleAssignments.length === 0) {
    navigate("/");
    return null;
  }

  return (
    <div
      className="grimoire-dnd-root bg-dark"
      ref={drop}
    >
      {tokens.map((role) => (
        <DraggableRoleToken
          key={role.id}
          id={role.id}
          role={getRoleById(role.id)}
          left={role.left}
          top={role.top}
          name={role.playerName}
          moveToken={() => {}}
        />
      ))}
    </div>
  );
};

export default Grimoire;
