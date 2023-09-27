import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const DDMAcct = styled.h4`
  color: #777;
  font-weight: 400;
  font-size: 1.8rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #888;
`;

export default function DDMAccountForm() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [DDMAcc, setDDMAcc] = useState();

  function handleDDMAccountForm() {}

  return (
    <section id='filter_DDMAccountForm'>
      <form onSubmit={handleDDMAccountForm} id='form' className='verify-form'>
        <DDMAcct>Create Debit Mandate</DDMAcct>
        <div>
          <label>Mandate Type</label>
          <select
            name='mandate_type'
            // onChange={handleFilterChange}
            // disabled={isFilterAccountForm}
            // value={filterAccountForm.status}
          >
            <option value=''>--Select--</option>
            <option value='Internal'>Internal</option>
            <option value='External'>External</option>
          </select>
        </div>

        <main id='input-form'>
          <h6 className='input-form--header'>Account Number</h6>
          <input
            type='text'
            name='account_number'
            // value={accountForm.weekly_transfer_limit}
            // onChange={handleAccountChange}
            // disabled={isEditingAccount}
          />
        </main>
        <main id='input-form'>
          <h6 className='input-form--header'>Description</h6>
          <input
            type='text'
            name='description'
            // value={accountForm.weekly_transfer_limit}
            // onChange={handleAccountChange}
            // disabled={isEditingAccount}
          />
        </main>
        <div>
          <label>Start Date *</label>
          <DatePicker
            selectsStart
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            startDate={startDate}
            dateFormat='dd/MM/yyyy'
          />
        </div>

        <div>
          <label>End Date *</label>
          <DatePicker
            selectsEnd
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            endDate={endDate}
            startDate={startDate}
            minDate={startDate}
            dateFormat='dd/MM/yyyy'
          />
        </div>

        <main id='input-form'>
          <h6 className='input-form--header'>Enter Amount</h6>
          <input
            type='text'
            name='amount'
            // value={accountForm.weekly_transfer_limit}
            // onChange={handleAccountChange}
            // disabled={isEditingAccount}
          />
        </main>

        <div>
          <label>Schedule Transfer</label>
          <select
            name='schedule'
            // onChange={handleFilterChange}
            // disabled={isFilterAccountForm}
            // value={filterAccountForm.type}
          >
            <option value=''>--Select--</option>
          </select>
        </div>

        <main id='input-form'>
          <h6 className='input-form--header'>Enter Pin</h6>
          <input
            type='text'
            name='pin'
            // value={accountForm.weekly_transfer_limit}
            // onChange={handleAccountChange}
            // disabled={isEditingAccount}
          />
        </main>
        <figure id='inputForm-checkbox'>
          <input
            type='checkbox'
            name='remember'
            // checked={accountForm.interest_status}
            // disabled={isEditingAccount}
            // onChange={handleAccountChange}
          />
          <h6 className='input-form--header'>Remember</h6>
        </figure>
        <button>
          {/* {isLoading ? <SpinnerMini /> : 'Submit'} <span>&rarr;</span> */}
          Submit
        </button>
      </form>
    </section>
  );
}
