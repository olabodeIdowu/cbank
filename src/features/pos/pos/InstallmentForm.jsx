import { useEffect, useState } from 'react';
import Modal from '../../../ui/Modal';
import { useCreateAgentPos } from './useCreateAgentPos';
import SpinnerMini from '../../../ui/SpinnerMini';
import { axiosPrivate } from '../../../services/axios';
import styled from 'styled-components';

const PosTypeSelect = styled.div`
  display: flex;
  & input {
    border: none;
  }
  & select {
    border: none;
  }
`;
export default function InstallmentForm({ terminal, pos_pos, onCloseModal }) {
  console.log(pos_pos);

  const [isLoadingTerminalDetails, setIsLoadingTerminalDetails] =
    useState(false);
  const [availableTerminals, setAvailableTerminals] = useState([]);
  const [agentForm, setAgentForm] = useState({
    account_number: '',
    pos_type: '',
    serial_number: '',
    pos_payment_method: '',
    repayment_duration: '',
    installment_amount: '',
    down_payment_amount: '',
    paper_display: false,
    stand: false,
    client: 'agent',
    referrer_code: '',
    delivery_option: '',
    existing_address: true,
    address_line_one: '',
    city: '',
    state: '',
    newState: '',
    country: '',
  });

  const { isCreatingAgent, createAgentPos } = useCreateAgentPos();

  function handleAgentChange(e) {
    const { value, name, checked, type } = e.target;
    setAgentForm((data) => {
      return {
        ...data,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }

  function handleAgent(e) {
    e.preventDefault();
    console.log(agentForm);
    createAgentPos(agentForm);
    onCloseModal?.();
  }

  // pos_pos?.state.map((s) => {
  //   console.log(s);
  //   return s;
  //   //  return <option value={s?.id}>{s?.name}</option>;
  // });

  useEffect(() => {
    console.log(agentForm?.pos_type, agentForm?.newState);
    async function getAvailableTerminal() {
      try {
        setIsLoadingTerminalDetails(true);
        const data = await axiosPrivate.get(
          `/admin/terminals/available?type_id=${agentForm?.pos_type}&state_id=${
            agentForm?.newState ? agentForm.newState : ''
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
  }, [agentForm.pos_type, agentForm?.newState]);

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
          <form onSubmit={handleAgent} id='form'>
            <main id='input-form'>
              <main id='input-form'>
                <h6 className='input-form--header'>Account No</h6>
                <input
                  type='text'
                  name='account_number'
                  value={agentForm.account_number}
                  required
                  onChange={handleAgentChange}
                  disabled={isCreatingAgent}
                />
              </main>

              <label>Select Pos Type</label>
              <figure id='pos-select-type'>
                <select
                  required
                  name='pos_type'
                  onChange={handleAgentChange}
                  disabled={isCreatingAgent}
                  value={agentForm.pos_type}
                >
                  <option value='--Select--'>--Select--</option>
                  {pos_pos.pos_types.map((pt) => {
                    return (
                      <option key={pt?.id} value={pt?.id}>
                        {pt?.name}
                      </option>
                    );
                  })}
                </select>

                <input
                  type='text'
                  name='newState'
                  value={agentForm.newState}
                  required
                  onChange={handleAgentChange}
                  disabled={isCreatingAgent}
                  placeholder='Enter State'
                  //  {pos_pos?.state.map((s) => {
                  //       return <option value={s?.id}>{s?.name}</option>;
                  //     })}
                />
              </figure>

              <div>
                <label>Select Terminal Serial No</label>
                <select
                  required
                  name='serial_number'
                  onChange={handleAgentChange}
                  disabled={isCreatingAgent}
                  value={agentForm.serial_number}
                >
                  <option value='--Select--'>--Select--</option>

                  {availableTerminals.map((at, index) => {
                    return (
                      <option key={index} value={at?.serial_number}>
                        {at?.serial_number}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label>Pos Payment Method </label>
                <select
                  required
                  name='pos_payment_method'
                  onChange={handleAgentChange}
                  disabled={isCreatingAgent}
                  value={agentForm.pos_payment_method}
                >
                  <option value='--Select--'>--Select--</option>

                  <option value={pos_pos?.payment_methods?.INSTALLMENT_PAYMENT}>
                    {pos_pos?.payment_methods?.INSTALLMENT_PAYMENT}
                  </option>
                </select>
              </div>

              {agentForm.pos_payment_method === 'installment' && (
                <>
                  <div>
                    <label>Installment Amount </label>
                    <select
                      required
                      name='installment_amount'
                      onChange={handleAgentChange}
                      disabled={isCreatingAgent}
                      value={agentForm.installment_amount}
                    >
                      <option value='--Select--'>--Select--</option>
                      {Object.entries(pos_pos?.installment_amount_options).map(
                        (ent) => {
                          console.log(ent);
                          return (
                            <option value={Number(ent[0])}>{ent[1]}</option>
                          );
                        }
                      )}
                    </select>
                  </div>

                  <div>
                    <label>Down Payment Amount</label>
                    <select
                      required
                      name='down_payment_amount'
                      onChange={handleAgentChange}
                      disabled={isCreatingAgent}
                      value={agentForm.down_payment_amount}
                    >
                      <option value='--Select--'>--Select--</option>
                      {Object.entries(pos_pos?.down_payment_amount).map(
                        (ent, index) => {
                          console.log(ent);
                          return (
                            <option key={index} value={Number(ent[0])}>
                              {ent[1]}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>
                </>
              )}

              <div>
                <label>Repayment Duration</label>
                <select
                  required
                  name='repayment_duration'
                  onChange={handleAgentChange}
                  disabled={isCreatingAgent}
                  value={agentForm.repayment_duration}
                >
                  <option value='--Select--'>--Select--</option>
                  {Object.entries(pos_pos?.repayment_duration).map(
                    (ent, index) => {
                      console.log(ent);
                      return (
                        <option key={index} value={Number(ent[0])}>
                          {ent[1]}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>

              <main id='input-form'>
                <h6 className='input-form--header'>Enter Referrer Code</h6>
                <input
                  type='text'
                  name='referrer_code'
                  onChange={handleAgentChange}
                  disabled={isCreatingAgent}
                  value={agentForm.referrer_code}
                />
              </main>

              <div>
                <label>Delivery Options</label>
                <select
                  required
                  name='delivery_option'
                  onChange={handleAgentChange}
                  disabled={isCreatingAgent}
                  value={agentForm.delivery_option}
                >
                  <option value=''>--Select--</option>
                  <option value={pos_pos?.delivery_options?.DISPATCH}>
                    {pos_pos?.delivery_options?.DISPATCH}
                  </option>
                </select>
              </div>

              {agentForm.delivery_option === 'dispatch' && (
                <>
                  <figure id='inputForm-checkbox'>
                    <input
                      type='checkbox'
                      checked={agentForm.existing_address}
                      name='existing_address'
                      disabled={isCreatingAgent}
                      onChange={handleAgentChange}
                    />
                    <h6 className='input-form--header'>Existing Address</h6>
                  </figure>
                </>
              )}

              {!agentForm.existing_address && (
                <>
                  <main id='input-form'>
                    <h6 className='input-form--header'>Address</h6>
                    <input
                      type='text'
                      name='address_line_one'
                      onChange={handleAgentChange}
                      disabled={isCreatingAgent}
                      value={agentForm.address_line_one}
                    />
                  </main>
                  <main id='input-form'>
                    <h6 className='input-form--header'>City</h6>
                    <input
                      type='text'
                      name='city'
                      onChange={handleAgentChange}
                      disabled={isCreatingAgent}
                      value={agentForm.city}
                    />
                  </main>

                  <div>
                    <label>State</label>
                    <select
                      name='state'
                      onChange={handleAgentChange}
                      disabled={isCreatingAgent}
                      value={agentForm.state}
                    >
                      <option value=''>--Select--</option>
                      {pos_pos?.state.map((s) => {
                        return <option value={s?.id}>{s?.name}</option>;
                      })}
                    </select>
                  </div>

                  <div>
                    <label>Country</label>
                    <select
                      name='country'
                      onChange={handleAgentChange}
                      disabled={isCreatingAgent}
                      value={agentForm.country}
                    >
                      <option value=''>--Select--</option>
                      <option value={pos_pos?.country?.id}>
                        {pos_pos?.country?.name}
                      </option>
                    </select>
                  </div>
                </>
              )}

              <figure id='inputForm-checkbox'>
                <input
                  type='checkbox'
                  name='paper_display'
                  checked={agentForm.paper_display}
                  disabled={isCreatingAgent}
                  onChange={handleAgentChange}
                />
                <h6 className='input-form--header'>Paper Display</h6>
              </figure>

              <figure id='inputForm-checkbox'>
                <input
                  type='checkbox'
                  name='stand'
                  checked={agentForm.stand}
                  disabled={isCreatingAgent}
                  onChange={handleAgentChange}
                />
                <h6 className='input-form--header'>Stand Fee</h6>
              </figure>
            </main>
            <button>
              {isCreatingAgent ? <SpinnerMini /> : 'Create Agent'}
            </button>
          </form>
        </main>
      </main>
    </Modal>
  );
}
