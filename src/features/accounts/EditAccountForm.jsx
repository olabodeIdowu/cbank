import Modal from '../../ui/Modal';

import SpinnerMini from '../../ui/SpinnerMini';
import Spinner from '../../ui/Spinner';
import styled from 'styled-components';
import { useUpdateAccountName } from './useUpdateAccountName';
import { useUpdateAccount } from './useUpdateAccount';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';

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

const AccountLimitFlex = styled.aside`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block: 0.4rem;
`;

export default function EditAccountForm({ account = {}, onCloseModal }) {
  const { id: accountId, ...editValues } = account;
  const editSession = Boolean(accountId);

  // defaultValues: editSession ? editValues : {},

  const [active, setActive] = useState('Account');
  const [enableDaily, setEnableDaily] = useState(false);
  const [enableMonthly, setEnableMonthly] = useState(false);
  const [enableWeekly, setEnableWeekly] = useState(false);

  const [accountForm, setAccountForm] = useState({
    transfer_limit_status: '',
    interest_status: '',
    daily_transfer_limit: '',
    weekly_transfer_limit: '',
    monthly_transfer_limit: '',
    password: '',
  });

  const [accountNameForm, setAccountNameForm] = useState({
    account_name: editValues?.account_name,
  });

  const { isEditingAccount, editAccount } = useUpdateAccount();
  const { isEditingAccountName, editAccountName } = useUpdateAccountName();

  function handleAccountChange(e) {
    const { value, name, checked, type } = e.target;
    setAccountForm((data) => {
      return {
        ...data,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }

  function handleAccountNameChange(e) {
    const { value, name, checked, type } = e.target;
    setAccountNameForm((data) => {
      return {
        ...data,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }

  function handleAccount(e) {
    e.preventDefault();
    console.log(accountForm);
    editAccount(accountForm);
    onCloseModal?.();
  }

  function handleAccountName(e) {
    e.preventDefault();
    console.log(accountNameForm);
    editAccountName(accountNameForm);
    onCloseModal?.();
  }

  // if (isLoadingTerminalDetails) return <SpinnerMini />;

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

          <h5 className=''>Edit Account</h5>
        </div>

        <main>
          <PosNav>
            <li
              style={
                active === 'Account'
                  ? { color: 'green', background: '#cfe3d6' }
                  : { color: 'grey' }
              }
              onClick={() => setActive('Account')}
            >
              Edit Account
            </li>
            <li
              style={
                active === 'Account_Name'
                  ? { color: 'green', background: '#cfe3d6' }
                  : { color: 'grey' }
              }
              onClick={() => setActive('Account_Name')}
            >
              Edit Account Name
            </li>
          </PosNav>

          {active === 'Account' && (
            <form onSubmit={handleAccount} id='form'>
              <main id='input-form'>
                <div>
                  <label>Interest Status</label>
                  <select
                    name='interest_status'
                    onChange={handleAccountChange}
                    disabled={isEditingAccount}
                    value={accountForm.interest_status}
                  >
                    <option value=''>--Select--</option>
                    <option value='true'>Enabled</option>
                    <option value='false'>Disabled</option>
                  </select>
                </div>

                <div>
                  <label>Transfer Limit Status</label>
                  <select
                    name='transfer_limit_status'
                    onChange={handleAccountChange}
                    disabled={isEditingAccount}
                    value={accountForm.transfer_limit_status}
                  >
                    <option value=''>--Select--</option>
                    <option value='true'>Enabled</option>
                    <option value='false'>Disabled</option>
                  </select>
                </div>

                {accountForm.transfer_limit_status === 'true' ? (
                  <section>
                    <main id='input-form'>
                      <AccountLimitFlex>
                        <h6 className='input-form--header'>
                          Daily Transfer Limit
                        </h6>
                        {enableDaily ? (
                          <BsToggleOn
                            onClick={() => setEnableDaily(!enableDaily)}
                            className='bstoggleon'
                          />
                        ) : (
                          <BsToggleOff
                            onClick={() => setEnableDaily(!enableDaily)}
                            className='bstoggleoff'
                          />
                        )}
                      </AccountLimitFlex>

                      <input
                        type='number'
                        min='1'
                        step='1'
                        name='daily_transfer_limit'
                        value={Number(accountForm.daily_transfer_limit)}
                        onChange={handleAccountChange}
                        disabled={isEditingAccount}
                      />
                    </main>

                    <main id='input-form'>
                      <AccountLimitFlex>
                        <h6 className='input-form--header'>
                          Weekly Transfer Limit Amount
                        </h6>
                        {enableWeekly ? (
                          <BsToggleOn
                            onClick={() => setEnableWeekly(!enableWeekly)}
                            className='bstoggleon'
                          />
                        ) : (
                          <BsToggleOff
                            onClick={() => setEnableWeekly(!enableWeekly)}
                            className='bstoggleoff'
                          />
                        )}
                      </AccountLimitFlex>

                      <input
                        type='number'
                        min='1'
                        step='1'
                        name='daily_transfer_limit'
                        value={accountForm.weekly_transfer_limit}
                        onChange={handleAccountChange}
                        disabled={isEditingAccount}
                      />
                    </main>

                    <main id='input-form'>
                      <AccountLimitFlex>
                        <h6 className='input-form--header'>
                          Monthly Transfer Limit Amount
                        </h6>
                        {enableMonthly ? (
                          <BsToggleOn
                            onClick={() => setEnableMonthly(!enableMonthly)}
                            className='bstoggleon'
                          />
                        ) : (
                          <BsToggleOff
                            onClick={() => setEnableMonthly(!enableMonthly)}
                            className='bstoggleoff'
                          />
                        )}
                      </AccountLimitFlex>
                      <input
                        type='number'
                        min='1'
                        step='1'
                        name='monthly_transfer_limit'
                        value={accountForm.monthly_transfer_limit}
                        onChange={handleAccountChange}
                        disabled={isEditingAccount}
                      />
                    </main>
                  </section>
                ) : (
                  ''
                )}
                <main id='input-form'>
                  <h6 className='input-form--header'>Password </h6>
                  <input
                    type='text'
                    name='password'
                    value={accountForm.password}
                    onChange={handleAccountChange}
                    disabled={isEditingAccount}
                  />
                </main>
              </main>
              <button>
                {isEditingAccount ? (
                  <SpinnerMini />
                ) : (
                  'Yes I am sure, I want to update this account'
                )}
              </button>
            </form>
          )}
          {active === 'Account_Name' && (
            <form onSubmit={handleAccountName} id='form'>
              <main id='input-form'>
                <h6 className='input-form--header'>Enter Account Name</h6>
                <input
                  type='text'
                  name='account_name'
                  onChange={handleAccountNameChange}
                  disabled={isEditingAccountName}
                  value={accountNameForm?.account_name}
                />
              </main>

              <button>
                {isEditingAccountName ? <SpinnerMini /> : 'Edit Account Name'}
              </button>
            </form>
          )}
        </main>
      </main>
    </Modal>
  );
}
