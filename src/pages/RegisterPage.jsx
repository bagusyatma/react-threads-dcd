import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { DEFAULT_PATH } from '../constant';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e, obj) => {
    e.preventDefault();

    if (obj.name && obj.email && obj.password) {
      dispatch(asyncRegisterUser({ name: obj.name, email: obj.email, password: obj.password }));
      navigate(DEFAULT_PATH);
    }
  };

  return (
    <div className="w-2/5">
      <div className="my-3 text-xl font-bold text-blue-700">Join Space! ~</div>
      <div className="flex flex-col gap-2">
        <RegisterInput submit={handleSubmit} />
        <div className="text-sm">
          have an account already?
          <Link to={DEFAULT_PATH} className="mx-2 font-semibold text-blue-500 no-underline hover:text-blue-600">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
