import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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

export default function FilterInterestForm({
  interest,
  isLoadingInterestDetails,
}) {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  console.log(interest);
  const [filterInterestAccountForm, setFilterInterestAccountForm] = useState({
    amount: '',
    month: '',
    year: '',
    status: '',
    startDate,
    endDate,
  });

  const start_date = startDate?.toISOString();
  const end_date = endDate?.toISOString();

  const [isFilterInterestAccountForm, setIsFilterInterestAccountForm] =
    useState(false);

  function handleFilterChange(e) {
    const { value, name, checked, type } = e.target;
    setFilterInterestAccountForm((prev) => {
      return {
        ...prev,

        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }

  let interestAccountForm = {
    start_date,
    end_date,
    ...filterInterestAccountForm,
  };

  async function handleFilterInterestAccountForm(e) {
    e.preventDefault();
    console.log(filterInterestAccountForm);

    try {
      // setIsFilterAccountForm(true);
      const data = await axiosPrivate.get(
        `/admin/accounts?filter[account_number]=${interestAccountForm?.account_number}&filter[name]=${interestAccountForm?.account_name}&filter[type.name]=${interestAccountForm?.type}&filter[status]=${interestAccountForm?.status}`
      );
      console.log(data?.data?.data?.interest?.data);
      return data?.data?.data?.interest?.data;

      // setIsFilterAccountForm(false);
    } catch (err) {
      // setIsFilterAccountForm(false);
      console.log(err);
    }
  }

  // functionhandleFilterChange() {

  // }

  if (isLoadingInterestDetails) return <SpinnerMini />;

  return (
    <section id='filter_account_Form'>
      <form onSubmit={handleFilterInterestAccountForm} id='form'>
        <main id='input-form'>
          <h6 className='input-form--header'>Amount</h6>
          <input
            type='text'
            name='amount'
            value={interestAccountForm.amount}
            onChange={handleFilterChange}
            disabled={isFilterInterestAccountForm}
          />
        </main>

        <main id='input-form'>
          <h6 className='input-form--header'>Month</h6>
          <input
            type='text'
            name='month'
            value={interestAccountForm.month}
            onChange={handleFilterChange}
            disabled={isFilterInterestAccountForm}
          />
        </main>

        <main id='input-form'>
          <h6 className='input-form--header'>Year</h6>
          <input
            type='text'
            name='year'
            value={interestAccountForm.year}
            onChange={handleFilterChange}
            disabled={isFilterInterestAccountForm}
          />
        </main>

        <div>
          <label>Status</label>
          <select
            name='status'
            onChange={handleFilterChange}
            disabled={isFilterInterestAccountForm}
            value={interestAccountForm.status}
          >
            <option value='--Select--'>--Select--</option>
            {/* {accounts.map((a, index) => {
              return (
                <option key={index} value={a?.status}>
                  {a?.status}
                </option>
              );
            })} */}
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
            {isFilterInterestAccountForm ? <SpinnerMini /> : 'Submit'}
          </SubmitFilterButton>
        </MainFilterButton>
      </form>
    </section>
  );
}
