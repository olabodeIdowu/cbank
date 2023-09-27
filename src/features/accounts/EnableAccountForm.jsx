import { useState } from 'react';
import styled from 'styled-components';

const EnableAcct = styled.h4`
  color: #777;
  font-weight: 400;
  font-size: 1.8rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #888;
`;

export default function EnableAccountForm() {
  const [enableAcc, setEnableAcc] = useState();

  function handleEnableAccountForm() {}
  return (
    <form onSubmit={handleEnableAccountForm} id='form' className='verify-form'>
      <EnableAcct>Account Overdraft</EnableAcct>
      <div>
        <label>Status</label>
        <select
          name='status'
          // onChange={handleFilterChange}
          // disabled={isFilterAccountForm}
          // value={filterAccountForm.status}
        >
          <option value='--Select--'>--Select--</option>
          <option value='Verified'>Enable</option>
          <option value='Failed'>Disable</option>
        </select>
      </div>

      <main id='input-form'>
        <h6 className='input-form--header'>Enter Password</h6>
        <input
          type='text'
          name='password'
          // value={accountForm.weekly_transfer_limit}
          // onChange={handleAccountChange}
          // disabled={isEditingAccount}
        />
      </main>
      <button>
        {/* {isLoading ? <SpinnerMini /> : 'Submit'} <span>&rarr;</span> */}
        Submit
      </button>
    </form>
  );
}
