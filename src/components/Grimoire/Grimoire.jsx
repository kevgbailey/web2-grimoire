import PropTypes from "prop-types";
import { useDrop, useDrag } from "react-dnd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ItemTypes } from "../../models/ItemTypes";
import RoleToken from "../RoleToken/RoleToken";
import "./Grimoire.css";
import roles from "../../models/roles";

const DraggableRoleToken = ({ id, left, top, role, moveToken }) => {
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
        opacity: isDragging ? 0.5 : 1, // Fades when dragging
        cursor: "move",
      }}
    >
      <RoleToken role={role} />
    </div>
  );
};

DraggableRoleToken.propTypes = {
  id: PropTypes.number.isRequired,
  role: PropTypes.object.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  moveToken: PropTypes.func.isRequired,
};

const Grimoire = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialRoleAssignments = location.state?.roleAssignments || [];
  console.log("Initial Role Assignments:", initialRoleAssignments);

  const [roleAssignments, setRoleAssignments] = useState(
    initialRoleAssignments.map((assignment, index) => ({
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

      setRoleAssignments((prev) =>
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

  if (initialRoleAssignments.length === 0) {
    navigate("/"); // Redirect if no data is passed
    return null;
  }

  return (
    <div
      className="grimoire-dnd-root bg-dark text-white container-fluid d-flex justify-content-center align-items-center"
      ref={drop}
    >
      {roleAssignments.map((role) => (
        <DraggableRoleToken
          key={role.id}
          id={role.id}
          role={getRoleById(role.id)}
          left={role.left}
          top={role.top}
          moveToken={() => {}}
        />
      ))}
    </div>
  );
};

export default Grimoire;
