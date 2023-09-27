import Modal from '../../../ui/Modal';
import { useState } from 'react';
import SpinnerMini from '../../../ui/SpinnerMini';
import styled from 'styled-components';

import { useForm } from 'react-hook-form';
import { useEditPosType } from './useEditPosType';
import { useSelectProvider } from './useSelectProvider';

export default function EditPosTypeForm({
  posType = {},
  onCloseModal,
  providers,
}) {
  const { id: posTypeId, ...editValues } = posType;
  const editSession = Boolean(posTypeId);

  console.log(posTypeId, editValues, editSession);
  const { isEditing, editPosType } = useEditPosType();
  console.log(editValues);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: editSession ? editValues : {},
  });

  function onSubmit(data) {
    console.log(posTypeId, data);
    editPosType({ posTypeId, data });
    reset();
    onCloseModal?.();
  }

  function onError(err) {
    console.log(err);
  }

  return (
    <Modal onClose={onCloseModal}>
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

        <form onSubmit={handleSubmit(onSubmit, onError)} id='form'>
          <div>
            <label>Enter Name</label>
            <input type='text' {...register('name')} disabled={isEditing} />
          </div>

          <div>
            <label>Select Provider</label>
            <select {...register('provider')} disabled={isEditing}>
              <option value={providers.ERRANDPAY}>{providers.ERRANDPAY}</option>
              <option value={providers.GLOBAL_ACCELEREX}>
                {providers.GLOBAL_ACCELEREX}
              </option>
            </select>
          </div>

          <div>
            <label>Enter Price</label>
            <input type='text' {...register('price')} disabled={isEditing} />
          </div>

          <button>{isEditing ? <SpinnerMini /> : 'Edit Pos Type'}</button>
        </form>
      </main>
    </Modal>
  );
}
