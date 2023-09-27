import { AiOutlineMail } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';
import SpinnerMini from '../../ui/SpinnerMini';

import { useResetPassword } from './useResetPassword';

import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

export default function ResetPassword() {
  const { register, handleSubmit, reset } = useForm();

  const { isLoading, resetPassword } = useResetPassword();

  function onSubmit(data) {
    console.log(data, data?.token, data?.password, data?.username);
    // if (!data?.token || !data.password || !!data?.username) {
    //   return toast.error('input a valid code, password or username');
    // }
    resetPassword(data);
    reset();
  }

  function onError(err) {
    console.log(err);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className='resetLoginForm'
      >
        <h2>Reset Your Password</h2>
        <p className='resetPassword-paragraph-header'>
          We have sent you a verification code to your mail, inout it in the
          verification code input below
        </p>
        <h6 className='resetPassword-pri-header'>Verification Code</h6>
        <label>
          <div>
            <BsFillPencilFill />
          </div>

          <input
            type='text'
            {...register('token', {
              required: 'Input a valid verfication code',
            })}
            disabled={isLoading}
          />
        </label>
        <h6 className='resetPassword-pri-header'>Email</h6>
        <label>
          <div>
            <AiOutlineMail />
          </div>

          <input
            type='email'
            {...register('username', {
              required: 'Input a valid username',
            })}
            disabled={isLoading}
          />
        </label>
        <h6 className='resetPassword-pri-header'>Confirm New Password</h6>
        <label>
          <div>
            <BsFillPencilFill />
          </div>

          <input
            type='password'
            {...register('password', {
              required: 'Input a valid new password',
            })}
            disabled={isLoading}
          />
        </label>

        <button>{isLoading ? <SpinnerMini /> : 'Reset password'}</button>
      </form>
    </div>
  );
}
