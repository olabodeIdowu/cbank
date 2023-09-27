import { useEffect, useState } from 'react';
import Modal from '../../../ui/Modal';
import { useCreateMerchantPos } from './useCreateMerchantPos';
import { useCreateAgentPos } from './useCreateAgentPos';
import SpinnerMini from '../../../ui/SpinnerMini';
import Spinner from '../../../ui/Spinner';
import styled from 'styled-components';
import { axiosPrivate } from '../../../services/axios';

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

export default function MerchantForm({ terminal, pos_pos, onCloseModal }) {
  console.log(pos_pos);

  const [isLoadingTerminalDetails, setIsLoadingTerminalDetails] =
    useState(false);
  const [availableTerminals, setAvailableTerminals] = useState([]);

  const [merchantForm, setMerchantForm] = useState({
    account_number: '',
    pos_type: '',
    serial_number: '',
    paper_display: false,
    stand: false,
    client: 'merchant',
    referrer_code: '',
  });

  const { isCreatingMerchant, createMerchantPos } = useCreateMerchantPos();

  function handleMerchantChange(e) {
    const { value, name, checked, type } = e.target;
    setMerchantForm((data) => {
      return {
        ...data,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }

  function handleMerchant(e) {
    e.preventDefault();
    console.log(merchantForm);
    createMerchantPos(merchantForm);
    onCloseModal?.();
  }

  useEffect(() => {
    console.log(merchantForm?.type, merchantForm?.state);
    async function getAvailableTerminal() {
      try {
        setIsLoadingTerminalDetails(true);
        const data = await axiosPrivate.get(
          `/admin/terminals/available?type_id=${merchantForm?.type}&state_id=${
            merchantForm?.state ? merchantForm.state : ''
          }`
        );
        setIsLoadingTerminalDetails(false);
        setAvailableTerminals(data?.data?.data?.available_terminals);
        return data?.data?.data?.available_terminals;
      } catch (err) {
        setIsLoadingTerminalDetails(false);
        console.log(err);
      }
    }
    getAvailableTerminal();
  }, [merchantForm.type, merchantForm?.state]);

  if (isLoadingTerminalDetails) return <SpinnerMini />;

  return (
    <Modal onClose={onCloseModal}>
      <main id='pos--modal'>
        <div className='modal-nav'>
          <button
            onClick={() => onCloseModal()}
            className='cancel-modal'
            type='reset'
          >
            cancel
          </button>

          <h5 className=''>Register Pos</h5>
        </div>

        <main>
          <form onSubmit={handleMerchant} id='form'>
            <main id='input-form'>
              <h6 className='input-form--header'>Account No</h6>
              <input
                type='text'
                name='account_number'
                required
                onChange={handleMerchantChange}
                disabled={isCreatingMerchant}
              />
            </main>

            <div>
              <label>Select Pos Type</label>
              <select
                required
                name='pos_type'
                onChange={handleMerchantChange}
                disabled={isCreatingMerchant}
                value={merchantForm.pos_type}
              >
                <option value=''>--Select--</option>
                {pos_pos.pos_types.map((pt) => {
                  return (
                    <option key={pt?.id} value={pt?.id}>
                      {pt?.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label>Select Terminal Serial No</label>
              <select
                required
                name='serial_number'
                onChange={handleMerchantChange}
                disabled={isCreatingMerchant}
                value={merchantForm.serial_number}
              >
                <option value=''>--Select--</option>

                {availableTerminals.map((at) => {
                  return (
                    <option key={at?.serial_number} value={at?.serial_number}>
                      {at?.serial_number}
                    </option>
                  );
                })}
              </select>
            </div>

            <main id='input-form'>
              <h6 className='input-form--header'>Enter Referrer Code</h6>
              <input
                type='text'
                name='referrer_code'
                onChange={handleMerchantChange}
                disabled={isCreatingMerchant}
              />
            </main>
            <figure id='inputForm-checkbox'>
              <input
                type='checkbox'
                name='paper_display'
                checked={merchantForm.paper_display}
                disabled={isCreatingMerchant}
                onChange={handleMerchantChange}
                required
              />
              <h6 className='input-form--header'>Paper Display</h6>
            </figure>
            <figure id='inputForm-checkbox'>
              <input
                type='checkbox'
                name='stand'
                checked={merchantForm.stand}
                disabled={isCreatingMerchant}
                required
                onChange={handleMerchantChange}
              />
              <h6 className='input-form--header'>Stand Fee</h6>
            </figure>

            <button>
              {isCreatingMerchant ? <SpinnerMini /> : 'Create Merchant'}
            </button>
          </form>
        </main>
      </main>
    </Modal>
  );
}
