import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

export default function LoginInput({ submit }) {
  const [email, emailChange] = useInput('');
  const [password, passwordChange] = useInput('');

  return (
    <form className="flex flex-col gap-2">
      <div>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={emailChange}
          className="w-full border-2 rounded-md px-2 py-1 focus:outline-none focus:border-blue-300 text-base placeholder:italic"
          placeholder="type your email..."
          autoComplete="off"
          required
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
          required
          data-testid="password-input"
        />
      </div>
      <div>
        <button
          type="submit"
          onClick={(e) => submit(e, { email, password })}
          className="bg-blue-500 px-2 py-1 rounded-md font-semibold text-white hover:bg-blue-600"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}

LoginInput.propTypes = {
  submit: PropTypes.func.isRequired,
};
