import { AiOutlineMail } from 'react-icons/ai';
import SpinnerMini from '../../ui/SpinnerMini';
import validator from 'validator';
import { useForgotPassword } from './useForgotPassword';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

export default function ForgotPassword() {
  const { register, handleSubmit, reset } = useForm();

  const { isLoading, forgotPassword } = useForgotPassword();

  function onSubmit(data) {
    // console.log(data, data?.username);
    if (!data || !validator.isEmail(data?.username)) {
      return toast.error('wrong data input');
    }
    forgotPassword(data);
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
        <h2>Reset Password</h2>
        <p>We will email you a verification code after you click submit</p>
        <label>
          <div>
            <AiOutlineMail />
          </div>

          <input
            type='text'
            {...register('username', {
              required: 'provide an email',
            })}
            disabled={isLoading}
          />
        </label>

        <button>
          {isLoading ? <SpinnerMini /> : 'Submit'} <span>&rarr;</span>
        </button>
      </form>
    </div>
  );
}
