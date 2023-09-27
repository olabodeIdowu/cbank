import { useState } from 'react';
import Modal from '../../../ui/Modal';
import { useEditManyPosRequest } from './useEditManyPosRequest';
import { useEditSinglePosRequest } from './useEditSinglePosRequest';
import SpinnerMini from '../../../ui/SpinnerMini';
import Spinner from '../../../ui/Spinner';
import styled from 'styled-components';
import { useSelectPosRequest } from './useSelectPosRequest';

const PosNav = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rem;
  padding-block: 1rem 1rem;

  & li {
    padding: 0.2rem 1.4rem;
    border: 1px solid gray;
    border-radius: 50px;
    cursor: pointer;
    background: #ebeaea;
    margin-top: 2rem;
  }
`;

export default function EditPosRequestForm({ pos_request = {}, onCloseModal }) {
  const { isLoading, pos__request } = useSelectPosRequest();

  console.log(pos__request);
  const { id: posRequestId, ...editValues } = pos_request;
  const editSession = Boolean(posRequestId);

  console.log(posRequestId, editValues, editSession);
  const { isEditingSingle, editSinglePosRequest } = useEditSinglePosRequest();
  // const { isEditingMany, editManyPosRequest } = useEditManyPosRequest();

  const [singleForm, setSingleForm] = useState({
    old_status: editValues?.status,
    new_status: '',
    is_single: true,
    pos_request_id: posRequestId,
    pin: '',
  });

  // const [manyForm, setManyForm] = useState({
  //   old_status: editValues?.status,
  //   new_status: '',
  //   number: '',
  //   pin: '',
  // });

  // function handleManyRequest(data) {
  //   editManyPosRequest({ posRequestId, data });
  // }

  function handleSingleRequest(data) {
    editSinglePosRequest(data);
  }

  function handleSingleChange(e) {
    const { value, name, checked, type } = e.target;
    setSingleForm((prev) => {
      return {
        ...prev,

        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }

  // function handleManyChange(e) {
  //   const { value, name, checked, type } = e.target;
  //   setManyForm((prev) => {
  //     return {
  //       ...prev,

  //       [name]: type === 'checkbox' ? checked : value,
  //     };
  //   });
  // }

  if (isLoading) return <SpinnerMini />;

  return (
    <Modal onClose={onCloseModal}>
      <main id='pos-request-modal'>
        <div className='modal-nav'>
          <button
            onClick={() => onCloseModal()}
            className='cancel-modal'
            type='reset'
          >
            cancel
          </button>

          <h5>Edit Pos Request</h5>
        </div>

        <main>
          {/* <PosNav>
            <li
              style={
                active === 'Single'
                  ? { color: 'green', background: '#cfe3d6' }
                  : { color: 'grey' }
              }
              onClick={() => setActive('Single')}
            >
              Single Request
            </li>
            <li
              style={
                active === 'Many'
                  ? { color: 'green', background: '#cfe3d6' }
                  : { color: 'grey' }
              }
              onClick={() => setActive('Many')}
            >
              Many Request
            </li>
          </PosNav> */}

          <form onSubmit={handleSingleRequest} id='form'>
            <main id='input-form'>
              <h6 className='input-form--header'>Old Status</h6>
              <input
                type='text'
                name='old_status'
                disabled={isEditingSingle}
                value={singleForm.old_status}
                onChange={handleSingleChange}
              />
            </main>

            <div>
              <label>New Status</label>
              <select
                name='new_status'
                disabled={isEditingSingle}
                onChange={handleSingleChange}
                value={singleForm.new_status}
              >
                <option value=''>--Select--</option>
                {Object.entries(pos__request).map((entry) => {
                  return (
                    <option key={entry[0]} value={entry[1]}>
                      {entry[1]}
                    </option>
                  );
                })}
              </select>
            </div>

            <figure id='inputForm-checkbox'>
              <input
                type='checkbox'
                name='is_single'
                checked={singleForm.is_single}
                disabled={isEditingSingle}
                onChange={handleSingleChange}
              />
              <h6 className='input-form--header'>Single</h6>
            </figure>

            <main id='input-form'>
              <h6 className='input-form--header'>Pos Request ID</h6>
              <input
                type='text'
                name='pos_request_id'
                disabled={isEditingSingle}
                value={singleForm.pos_request_id}
                onChange={handleSingleChange}
              />
            </main>

            <main id='input-form'>
              <h6 className='input-form--header'>Pin</h6>
              <input
                type='text'
                name='pin'
                disabled={isEditingSingle}
                value={singleForm.pin}
                onChange={handleSingleChange}
              />
            </main>

            <button>
              {isEditingSingle ? <SpinnerMini /> : 'Edit Single Pos'}
            </button>
          </form>

          {/* 
          {active === 'Many' && (
            <form onSubmit={handleManyRequest} id='form'>
              <main id='input-form'>
                <h6 className='input-form--header'>Old Status</h6>
                <input
                  type='text'
                  name='old_status'
                  disabled={isEditingMany}
                  value={manyForm.old_status}
                  onChange={handleManyChange}
                />
              </main>

              <div>
                <label>New Status</label>
                <select
                  required
                  name='new_status'
                  disabled={isEditingMany}
                  onChange={handleManyChange}
                  value={manyForm.new_status}
                >
                  <option value='--Select--'>--Select--</option>
                  {Object.entries(pos__request).map((entry) => {
                    return (
                      <option key={entry[0]} value={entry[1]}>
                        {entry[1]}
                      </option>
                    );
                  })}
                </select>
              </div>

              <main id='input-form'>
                <h6 className='input-form--header'>Pos Request ID</h6>
                <input
                  type='text'
                  name='pos_request_id'
                  disabled={isEditingMany}
                  value={manyForm.pos_request_id}
                  onChange={handleManyChange}
                />
              </main>

              <main id='input-form'>
                <h6 className='input-form--header'>Pin</h6>
                <input
                  type='text'
                  name='pin'
                  disabled={isEditingMany}
                  value={manyForm.pin}
                  onChange={handleManyChange}
                />
              </main>

              <button>
                {isEditingMany ? <SpinnerMini /> : 'Edit Many Pos'}
              </button>
            </form>
          )} */}
        </main>
      </main>
    </Modal>
  );
}
