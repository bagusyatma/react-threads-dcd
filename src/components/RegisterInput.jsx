import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

export default function RegisterInput({ submit }) {
  const [name, nameChange] = useInput('');
  const [email, emailChange] = useInput('');
  const [password, passwordChange] = useInput('');

  const disabledSubmit = (obj) => {
    if (!obj.name || !obj.email || !obj.password) {
      return true;
    }

    return false;
  };

  return (
    <form className="flex flex-col gap-2">
      <div>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={nameChange}
          className="w-full border-2 rounded-md px-2 py-1 focus:outline-none focus:border-blue-300 text-base placeholder:italic"
          placeholder="type your name..."
          autoComplete="off"
          data-testid="name-input"
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={emailChange}
          className="w-full border-2 rounded-md px-2 py-1 focus:outline-none focus:border-blue-300 text-base placeholder:italic"
          placeholder="type your email..."
          autoComplete="off"
          data-testid="email-input"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={passwordChange}
          className="w-full border-2 rounded-md px-2 py-1 focus:outline-none focus:border-blue-300 text-base placeholder:italic"
          placeholder="type your password..."
          autoComplete="off"
          data-testid="password-input"
        />
      </div>
      <div>
        <button
          type="submit"
          onClick={(e) => submit(e, { name, email, password })}
          className={`${
            disabledSubmit({ name, email, password }) ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          } px-2 py-1 rounded-md font-semibold text-white`}
          disabled={disabledSubmit({ name, email, password })}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}

RegisterInput.propTypes = {
  submit: PropTypes.func.isRequired,
};
