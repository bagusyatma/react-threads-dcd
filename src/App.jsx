import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import Navigation from './components/Navigation';
import { ADD_PATH, DEFAULT_PATH, DETAIL_PATH, PUBLIC_PATH, REGISTER_PATH } from './constant';
import AddThreadPage from './pages/AddThreadPage';
import DetailThreadPage from './pages/DetailThreadPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ThreadsPage from './pages/ThreadsPage';
import { asyncUnsetAuthUser } from './states/authUser/action';
import { asyncPreloadProcess } from './states/isPreload/action';

function App() {
  const { authUser = null, isPreload = false } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const handleSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <Navigation authUser={authUser} />
        <div className="container mx-auto px-4 sm:px-12 md:px-24">
          <main>
            <Routes>
              <Route path={PUBLIC_PATH} element={<LoginPage />} />
              <Route path={REGISTER_PATH} element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Loading />
      <Navigation authUser={authUser} handleSignOut={handleSignOut} />
      <div className="container mx-auto px-4 sm:px-12 md:px-24">
        <main>
          <Routes>
            <Route path={DEFAULT_PATH} element={<ThreadsPage />} />
            <Route path={ADD_PATH} element={<AddThreadPage />} />
            <Route path={`${DETAIL_PATH}/:id`} element={<DetailThreadPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
