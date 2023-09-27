import { useForm } from 'react-hook-form';
import SpinnerMini from '../../../ui/SpinnerMini';
import { useCreatePosType } from './useCreatePosType';

export default function CreatePosTypeForm({ providers, onCloseModal }) {
  const { isCreating, createPosType } = useCreatePosType();
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    createPosType(data);

    reset();
    onCloseModal?.();
  }

  function onError(err) {
    console.log(err);
  }
  // console.log(providers);

  return (
    <main id='internalUsers-modal'>
      <div className='modal-nav'>
        <button
          onClick={() => onCloseModal()}
          className='cancel-modal'
          type='reset'
        >
          cancel
        </button>

        <h5>Create Pos Type</h5>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)} id='form'>
        <div>
          <label>Enter Name</label>
          <input
            type='text'
            {...register('name', {
              required: 'This field is required',
            })}
            disabled={isCreating}
          />
        </div>

        <div>
          <label>Select Provider</label>
          <select
            {...register('provider', {
              required: 'This field is required',
            })}
            disabled={isCreating}
          >
            <option value='--Select--'>--Select--</option>
            <option value={providers.ERRANDPAY}>{providers.ERRANDPAY}</option>
            <option value={providers.GLOBAL_ACCELEREX}>
              {providers.GLOBAL_ACCELEREX}
            </option>
          </select>
        </div>

        <div>
          <label>Enter Price</label>
          <input
            type='text'
            {...register('Enter Price', {
              required: 'This field is required',
            })}
            disabled={isCreating}
          />
        </div>

        <button>{isCreating ? <SpinnerMini /> : 'Create Pos Type'}</button>
      </form>
    </main>
  );
}
