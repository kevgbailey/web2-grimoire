import PropTypes from 'prop-types'
import './RoleToken.css'
import iconMapper from "../../models/iconMapper.js"

const RoleToken = ({ role }) => {
  let imagePath = `/src/assets/icons/${iconMapper[role.id]}`;
  return (
    <div className="role-token-root">
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
        <circle cx="100" cy="100" r="75" fill="#ffe396" stroke="#ccc" />

        <text fontSize="20" fill="#000">
          <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
            {role.name.toUpperCase()}
          </textPath>
        </text>
        <image href={imagePath} x="35" y="50" width="135" height="135" />
      </svg>
    </div>
  );
}

RoleToken.propTypes = {
  role: PropTypes.object.isRequired,
}

export default RoleToken