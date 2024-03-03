import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { REGISTER_PATH } from '../constant';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();

  const handleSubmit = (e, obj) => {
    e.preventDefault();
    dispatch(asyncSetAuthUser({ email: obj.email, password: obj.password }));
  };

  return (
    <div className="w-2/5">
      <div className="my-3 font-bold text-xl text-blue-700">Welcome! ~</div>
      <div className="flex flex-col gap-2">
        <LoginInput submit={handleSubmit} />
        <div className="text-sm">
          don&apos;t have an account?
          <Link to={REGISTER_PATH} className="mx-2 no-underline font-semibold text-blue-500 hover:text-blue-600">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
