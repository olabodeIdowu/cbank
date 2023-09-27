import { useForm } from 'react-hook-form';
import SpinnerMini from '../../../ui/SpinnerMini';
import { useCreateTerminal } from './useCreateTerminal';
import { useSelectProperty } from './useSelectProperty';

export default function CreateTerminalForm({ property, onCloseModal }) {
  const { isCreating, createTerminal } = useCreateTerminal();

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    createTerminal(data);
    reset();
    onCloseModal?.();
  }

  function onError(err) {
    console.log(err);
  }
  console.log(property);

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

        <h5>Create Terminal</h5>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)} id='form'>
        <div>
          <label>Enter Serial No</label>
          <input
            type='text'
            {...register('serial_number', {
              required: 'This field is required',
            })}
            disabled={isCreating}
          />
        </div>
        <div>
          <label>Select Pos Type</label>
          <select
            {...register('pos_type', {
              required: 'This field is required',
            })}
            disabled={isCreating}
          >
            <option value='--Select--'>--Select--</option>
            {property?.pos_type.map((postype) => {
              return (
                <option key={postype.id} value={postype.id}>
                  {postype.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>Select Your State</label>
          <select
            {...register('state', {
              required: 'This field is required',
            })}
            disabled={isCreating}
          >
            <option value='--Select--'>--Select--</option>
            {property?.state.map((s) => {
              return (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              );
            })}
          </select>
        </div>

        <button>{isCreating ? <SpinnerMini /> : 'Create Terminal'}</button>
      </form>
    </main>
  );
}
