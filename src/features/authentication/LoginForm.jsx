import { useRef, useState, useEffect } from 'react';
import { BsLock } from 'react-icons/bs';
import { IoPersonOutline } from 'react-icons/io5';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../../services/axios';

import SpinnerMini from '../../ui/SpinnerMini';
import { toast } from 'react-hot-toast';

const LOGIN_URL = '/admin/login';

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const userRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        LOGIN_URL,
        {
          email: user,
          password: pwd,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          // withCredentials: true,
        }
      );
      toast.success('You have successfully logged in');
      setIsLoading(false);
      console.log(response);

      const token = response?.data?.data?.token;
      const refresh_token = response?.data?.data?.refresh_token;
      const roles = response?.data?.data?.user?.roles;
      const permissions = response?.data?.data?.user?.permissions;

      setAuth({ user, pwd, roles, token, refresh_token, permissions });
      setUser('');
      setPwd('');
      navigate('/dashboard');
      // navigate('/dashboard');
    } catch (err) {
      setIsLoading(false);
      if (!err?.response) {
        toast.error('No Server Response');
        // setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        toast.error('Missing Username or Password');
        // setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        toast.error('Unauthorized');
        // setErrMsg('Unauthorized');
      } else {
        toast.error('Login Failed');
        // setErrMsg('Login Failed');
      }
      // errRef.current.focus();
    }
  };

  return (
    <div>
      {/* <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live='assertive'
      >
        {errMsg}
      </p> */}

      <form onSubmit={handleSubmit} className='loginForm'>
        <label htmlFor='username'>
          <div>
            <IoPersonOutline />
          </div>
          <input
            type='text'
            id='username'
            ref={userRef}
            autoComplete='off'
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
        </label>
        <label htmlFor='password'>
          <div>
            <BsLock />
          </div>
          <input
            type='password'
            id='password'
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
        </label>
        <aside>
          <button>
            {isLoading ? <SpinnerMini /> : 'Login'} <span>&rarr;</span>
          </button>

          <Link className='forgot-password-link' to='/forgot-password'>
            Forgot password
          </Link>
        </aside>
      </form>
    </div>
  );
};

export default Login;
