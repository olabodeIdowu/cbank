import { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PNDAcct = styled.h4`
  color: #777;
  font-weight: 400;
  font-size: 1.8rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #888;
`;

export default function PNDAccountForm() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [PNDAcc, setPNDAcc] = useState();

  function handleEnableAccountForm() {}
  return (
    <form onSubmit={handleEnableAccountForm} id='form' className='verify-form'>
      <PNDAcct>Post No Debit</PNDAcct>
      <div>
        <label>Choose Expiry Date and Time</label>
        <DatePicker
          selectsStart
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          startDate={startDate}
          dateFormat='dd/MM/yyyy'
        />
      </div>
      <main id='input-form'>
        <h6 className='input-form--header'>Add Reason for PNB</h6>
        <textarea
          type='text'
          name='add_comment'
          // value={accountForm.weekly_transfer_limit}
          // onChange={handleAccountChange}
          // disabled={isEditingAccount}
        />
      </main>
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
