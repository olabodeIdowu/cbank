import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAccounts } from './useAccounts';
import styled from 'styled-components';
import SpinnerMini from '../../ui/SpinnerMini';
import { axiosPrivate } from '../../services/axios';

const MainFilterButton = styled.div``;
const ResetFilterButton = styled.div``;
const SubmitFilterButton = styled.button``;

const DateFlex = styled.div`
  display: flex;
  gap: 4rem;
`;

export default function FilterAccountForm() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const { isLoading, accounts } = useAccounts();
  console.log(accounts);
  const [filterAccountForm, setFilterAccountForm] = useState({
    account_name: '',
    account_number: '',
    type: '',
    status: '',
    state: '',
    startDate,
    endDate,
  });
  const start_date = startDate?.toISOString();
  const end_date = endDate?.toISOString();

  const [isFilterAccountForm, setIsFilterAccountForm] = useState(false);

  function handleFilterChange(e) {
    const { value, name, checked, type } = e.target;
    setFilterAccountForm((prev) => {
      return {
        ...prev,

        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }

  let accountForm = { start_date, end_date, ...filterAccountForm };

  async function handleFilterAccountForm(e) {
    e.preventDefault();
    console.log(accountForm);

    try {
      // setIsFilterAccountForm(true);
      const data = await axiosPrivate.get(
        `/admin/accounts?filter[account_number]=${accountForm?.account_number}&filter[name]=${accountForm?.account_name}&filter[type.name]=${accountForm?.type}&filter[status]=${accountForm?.status}`
      );
      console.log(data?.data?.data?.accounts?.data);
      return data?.data?.data?.accounts?.data;

      // setIsFilterAccountForm(false);
    } catch (err) {
      // setIsFilterAccountForm(false);
      console.log(err);
    }
  }

  // functionhandleFilterChange() {

  // }

  if (isLoading) return <SpinnerMini />;

  return (
    <section id='filter_account_Form'>
      <form onSubmit={handleFilterAccountForm} id='form'>
        <main id='input-form'>
          <h6 className='input-form--header'>Account Name</h6>
          <input
            type='text'
            name='account_name'
            value={accountForm.account_name}
            onChange={handleFilterChange}
            disabled={isFilterAccountForm}
          />
        </main>

        <main id='input-form'>
          <h6 className='input-form--header'>Account Number</h6>
          <input
            type='text'
            name='account_number'
            value={accountForm.account_number}
            onChange={handleFilterChange}
            disabled={isFilterAccountForm}
          />
        </main>

        <div>
          <label>Account Type</label>
          <select
            name='type'
            onChange={handleFilterChange}
            disabled={isFilterAccountForm}
            value={accountForm.type}
          >
            <option value='--Select--'>--Select--</option>
            {accounts.map((a, index) => {
              return (
                <option key={index} value={a?.type?.name}>
                  {a?.type?.name}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label>Account Status</label>
          <select
            name='status'
            onChange={handleFilterChange}
            disabled={isFilterAccountForm}
            value={accountForm.status}
          >
            <option value='--Select--'>--Select--</option>
            {accounts.map((a, index) => {
              return (
                <option key={index} value={a?.status}>
                  {a?.status}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label>Account State</label>
          <select
            name='state'
            onChange={handleFilterChange}
            disabled={isFilterAccountForm}
            value={accountForm.state}
          >
            <option value='--Select--'>--Select--</option>
            {accounts.map((a, index) => {
              return (
                <option key={index} value={a?.state?.id}>
                  {a?.state?.name}
                </option>
              );
            })}
          </select>
        </div>

        <DateFlex>
          <div>
            <label>Start Date</label>
            <DatePicker
              selectsStart
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              startDate={startDate}
              dateFormat='dd/MM/yyyy'
            />
          </div>

          <div>
            <label>End Date</label>
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
        </DateFlex>

        <MainFilterButton
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15rem',
            marginBlock: '1rem 2rem',
          }}
        >
          <ResetFilterButton
            style={{
              color: '#321fdb',
              fontSize: '1.6rem',
              width: 'fit-content',
              cursor: 'pointer',
            }}
            className='reset-filter-btn'
            type='reset'
          >
            Reset Filter
          </ResetFilterButton>
          <SubmitFilterButton
            className='submit-filter-btn'
            type='submit'
            style={{
              display: 'block',
              color: '#ffffff',
              backgroundColor: '#3c4b64',
              fontSize: '1.4rem',
              background: 'gray',
              padding: '0.4rem 1rem',
              borderRadius: '6px',
              width: 'fit-content',
              // marginBlock: '-2rem',
            }}
          >
            {isFilterAccountForm ? <SpinnerMini /> : 'Submit'}
          </SubmitFilterButton>
        </MainFilterButton>
      </form>
    </section>
  );
}
