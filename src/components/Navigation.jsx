import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ADD_PATH, DEFAULT_PATH, REGISTER_PATH } from '../constant';

function Navigation({ authUser, handleSignOut }) {
  const styledButton = () => 'bg-blue-50 px-2 py-1 rounded text-blue-600 font-semibold hover:bg-blue-100';
  return (
    <div className="py-4">
      <div className="container px-4 mx-auto sm:px-12 md:px-24">
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold select-none text-blue-700">react-threads-dcd 🗒️</div>

            {authUser ? (
              <Link to={ADD_PATH}>
                <button type="button" className="px-2 py-1 font-semibold text-teal-600 rounded bg-teal-50 hover:bg-teal-100">
                  Add
                </button>
              </Link>
            ) : null}
          </div>
          <div className="flex items-center justify-end gap-3">
            {authUser ? (
              <Link to={DEFAULT_PATH}>
                <button type="button" className={styledButton()}>
                  Threads
                </button>
              </Link>
            ) : null}

            {!authUser ? (
              <Link to={DEFAULT_PATH}>
                <button type="button" className={styledButton()}>
                  Login
                </button>
              </Link>
            ) : null}

            {!authUser ? (
              <Link to={REGISTER_PATH}>
                <button type="button" className={styledButton()}>
                  Register
                </button>
              </Link>
            ) : null}

            {authUser ? (
              <button type="button" className="px-2 py-1 font-semibold text-red-600 rounded bg-red-50 hover:bg-red-100" onClick={() => handleSignOut()}>
                Sign Out
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape),
  handleSignOut: PropTypes.func,
};

export default Navigation;
