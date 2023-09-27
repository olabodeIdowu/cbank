import { useState } from 'react';
import styled from 'styled-components';

const VerifyAcct = styled.h4`
  color: #777;
  font-weight: 400;
  font-size: 1.8rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #888;
`;

export default function VerifyAccountForm() {
  const [verifyAcc, setVerifyAcc] = useState();

  function handleVerifyAccountForm() {}
  return (
    <form onSubmit={handleVerifyAccountForm} id='form' className='verify-form'>
      <VerifyAcct>Verify Account</VerifyAcct>
      <div>
        <label>Status</label>
        <select
          name='status'
          // onChange={handleFilterChange}
          // disabled={isFilterAccountForm}
          // value={filterAccountForm.status}
        >
          <option value='--Select--'>--Select--</option>
          <option value='Verified'>Verified</option>
          <option value='Failed'>Failed</option>
        </select>
      </div>

      <main id='input-form'>
        <h6 className='input-form--header'>Add Comment</h6>
        <textarea
          type='text'
          name='add_comment'
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
