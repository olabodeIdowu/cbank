import Modal from '../../../ui/Modal';
import { useState } from 'react';
import SpinnerMini from '../../../ui/SpinnerMini';
import styled from 'styled-components';

import { useForm } from 'react-hook-form';
import { useEditTerminal } from './useEditTerminal';
import { useSelectProperty } from './useSelectProperty';

export default function EditTerminalForm({
  terminal = {},
  onCloseModal,
  property,
}) {
  const { id: terminalId, ...editValues } = terminal;

  const editSession = Boolean(terminalId);

  console.log(terminal);

  console.log(terminalId, editValues, editSession);
  const { isEditing, editTerminal } = useEditTerminal();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: editSession ? editValues : {},
  });

  function onSubmit(data) {
    console.log(terminalId, data);
    editTerminal({ terminalId, data });
    reset();
    onCloseModal?.();
  }

  function onError(err) {
    console.log(err);
  }

  console.log(property);

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

          <h5>Edit terminals</h5>
        </div>

        <form onSubmit={handleSubmit(onSubmit, onError)} id='form'>
          <div>
            <label>Enter Serial No</label>
            <input
              type='text'
              {...register('serial_number')}
              // value={terminal?.serial_number}
              disabled={isEditing}
            />
          </div>
          <div>
            <label>Select Pos Type</label>
            <select {...register('pos_type')} disabled={isEditing}>
              <option value={terminal?.type?.id}>{terminal?.type?.name}</option>
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
            <select {...register('state')} disabled={isEditing}>
              <option value={terminal?.state?.id}>
                {terminal?.state?.name}
              </option>
              {property?.state.map((s) => {
                return (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                );
              })}
            </select>
          </div>

          <button>{isEditing ? <SpinnerMini /> : 'Edit Terminal'}</button>
        </form>
      </main>
    </Modal>
  );
}
