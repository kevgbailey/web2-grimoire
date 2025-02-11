import PropTypes from "prop-types";
import "./RoleToken.css";
import iconMapper from "../../models/iconMapper.js";

const RoleToken = ({ role, className, onClick }) => {
  let imagePath = new URL(`../../assets/icons/${iconMapper[role.id]}`, import.meta.url).href;
  return (
    <div className={"role-token-root " + className} onClick={onClick}>
      <svg viewBox="0 0 200 200" width="200" height="200">
        <defs>
          {/* Define a full circle path with radius = 50 */}
          <path
            id="circlePath"
            d="
              M 100,100
              m -50,0
              a 50,50 0 1,1 100,0
              a 50,50 0 1,1 -100,0
            "
            transform="rotate(-90, 100, 100)"
          />
        </defs>

        {/* Optional 'background' circle with radius = 75 */}
        <circle cx="100" cy="100" r="75" fill="#ffe396" stroke="none" />

        <text fontSize="20" fill="#000">
          <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
            {role.name.toUpperCase()}
          </textPath>
        </text>
        <image href={imagePath} x="30" y="45" width="140" height="140" />
      </svg>
    </div>
  );
};

RoleToken.propTypes = {
  role: PropTypes.object.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default RoleToken;
