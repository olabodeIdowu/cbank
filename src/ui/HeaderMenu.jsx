import Logout from '../features/authentication/Logout';
import { HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import SpinnerMini from '../ui/SpinnerMini';
import { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';

const LOGOUT_URL = '/logout';

function HeaderMenu() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  async function logout() {
    try {
      setIsLoading(true);
      await axiosPrivate.post(LOGOUT_URL);
      setIsLoading(false);
      setAuth({});
      navigate('/login');
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }

  return (
    <ul className='styledHeaderMenu'>
      <li>
        <button className='buttonIcon' onClick={() => navigate('/account')}>
          <HiOutlineUser />
        </button>
      </li>
      {/* <li>
        <DarkModeToggle />
      </li> */}

      <li onClick={logout}>{isLoading ? <SpinnerMini /> : <Logout />}</li>
    </ul>
  );
}

export default HeaderMenu;
