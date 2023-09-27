import { BsLock } from 'react-icons/bs';
import { IoPersonOutline } from 'react-icons/io5';
import SpinnerMini from '../../ui/SpinnerMini';
import { useForm } from 'react-hook-form';

import { Link } from 'react-router-dom';
import { useLogin } from './useLogin';

export default function LoginForm() {
  const { isLoading, login } = useLogin();

  const { handleSubmit, reset, register } = useForm();

  function onSubmit(data) {
    console.log(data);
    login(data);
    reset();
  }

  function onError(err) {
    console.log(err);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)} className='loginForm'>
        <label>
          <div>
            <IoPersonOutline />
          </div>

          <input
            type='text'
            placeholder='Email'
            {...register('email', {
              required: 'This field is required',
            })}
            disabled={isLoading}
            defaultValue='admin@example.com'
          />
        </label>
        <label>
          <div>
            <BsLock />
          </div>
          <input
            type='password'
            {...register('password', {
              required: 'This field is required',
            })}
            placeholder='Password'
            disabled={isLoading}
            defaultValue='password'
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
}
