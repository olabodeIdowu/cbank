import { useForm } from 'react-hook-form';
import SpinnerMini from '../../../ui/SpinnerMini';
import { useEditPos } from './useEditPos';
// import { useSelectProvider } from './useSelectProvider';
import Spinner from '../../../ui/Spinner';

export default function EditPosForm({ pos = {}, onCloseModal }) {
  const { id: posId, ...editValues } = pos;
  const { isEditing, editPos } = useEditPos();
  // const { isLoading, providers } = useSelectProvider();
  const editSession = Boolean(posId);

  console.log(posId, editValues, editSession);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: editSession ? editValues : {},
  });

  const { errors } = formState;

  function onSubmit(data) {
    console.log(posId, data);
    editPos({ posId, data });
    reset();
    onCloseModal?.();
  }

  function onError(err) {
    console.log(err);
  }

  // if (isLoading) return;

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

        <h5>Edit Pos Type</h5>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)} className='new-userForm'>
        <main id='input-form'>
          <h6 className='input-form--header'>Enter Serial No</h6>
          <input
            type='text'
            {...register('serial_number')}
            disabled={isEditing}
          />
        </main>

        <button>{isEditing ? <SpinnerMini /> : 'Detach Pos'}</button>
      </form>
    </main>
  );
}
