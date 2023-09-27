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

export default function FilterTransactionForm({
  transactions,
  isLoadingTransactionDetails,
}) {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  console.log(transactions);
  const [filterTransactionAccountForm, setFilterTransactionAccountForm] =
    useState({
      transaction_refrence: '',
      credit_account_number: '',
      credit_account_name: '',
      debit_account_name: '',
      amount: '',
      bank: '',
      transaction_type: '',
      transaction_status: '',
      startDate,
      endDate,
    });

  const start_date = startDate?.toISOString();
  const end_date = endDate?.toISOString();

  const [isFilterTransactionAccountForm, setIsFilterTransactionAccountForm] =
    useState(false);

  function handleFilterChange(e) {
    const { value, name, checked, type } = e.target;
    setFilterTransactionAccountForm((prev) => {
      return {
        ...prev,

        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }

  let transactionAccountForm = {
    start_date,
    end_date,
    ...filterTransactionAccountForm,
  };

  async function handleFilterTransactionAccountForm(e) {
    e.preventDefault();
    console.log(filterTransactionAccountForm);

    try {
      // setIsFilterAccountForm(true);
      const data = await axiosPrivate.get(
        `/admin/accounts?filter[account_number]=${transactionAccountForm?.account_number}&filter[name]=${transactionAccountForm?.account_name}&filter[type.name]=${transactionAccountForm?.type}&filter[status]=${transactionAccountForm?.status}`
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

  if (isLoadingTransactionDetails) return <SpinnerMini />;

  return (
    <section id='filter_account_Form'>
      <form onSubmit={handleFilterTransactionAccountForm} id='form'>
        <main id='input-form'>
          <h6 className='input-form--header'>Transaction Refrence</h6>
          <input
            type='text'
            name='transaction_refrence'
            value={transactionAccountForm.transaction_refrence}
            onChange={handleFilterChange}
            disabled={isFilterTransactionAccountForm}
          />
        </main>

        <main id='input-form'>
          <h6 className='input-form--header'>Credit Account Number</h6>
          <input
            type='text'
            name='credit_account_number'
            value={transactionAccountForm.credit_account_number}
            onChange={handleFilterChange}
            disabled={isFilterTransactionAccountForm}
          />
        </main>

        <main id='input-form'>
          <h6 className='input-form--header'>Credit Account Name</h6>
          <input
            type='text'
            name='credit_account_name'
            value={transactionAccountForm.credit_account_name}
            onChange={handleFilterChange}
            disabled={isFilterTransactionAccountForm}
          />
        </main>

        <main id='input-form'>
          <h6 className='input-form--header'>Debit Account Number</h6>
          <input
            type='text'
            name='debit_account_number'
            value={transactionAccountForm.debit_account_number}
            onChange={handleFilterChange}
            disabled={isFilterTransactionAccountForm}
          />
        </main>

        <main id='input-form'>
          <h6 className='input-form--header'>Debit Account Name</h6>
          <input
            type='text'
            name='debit_account_name'
            value={transactionAccountForm.debit_account_name}
            onChange={handleFilterChange}
            disabled={isFilterTransactionAccountForm}
          />
        </main>

        <main id='input-form'>
          <h6 className='input-form--header'>Amount(₦)</h6>
          <input
            type='text'
            name='amount'
            value={transactionAccountForm.amount}
            onChange={handleFilterChange}
            disabled={isFilterTransactionAccountForm}
          />
        </main>
        <main id='input-form'>
          <h6 className='input-form--header'>Bank</h6>
          <input
            type='text'
            name='bank'
            value={transactionAccountForm.bank}
            onChange={handleFilterChange}
            disabled={isFilterTransactionAccountForm}
          />
        </main>

        <div>
          <label>Transaction Type</label>
          <select
            name='transaction_type'
            onChange={handleFilterChange}
            disabled={isFilterTransactionAccountForm}
            value={transactionAccountForm.transaction_type}
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

        <div>
          <label>Transaction Status</label>
          <select
            name='transaction_status'
            onChange={handleFilterChange}
            disabled={isFilterTransactionAccountForm}
            value={transactionAccountForm.transaction_status}
          >
            <option value='--Select--'>--Select--</option>
            {/* {accounts.map((a, index) => {
              return (
                <option key={index} value={a?.state?.id}>
                  {a?.state?.name}
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
            {isFilterTransactionAccountForm ? <SpinnerMini /> : 'Submit'}
          </SubmitFilterButton>
        </MainFilterButton>
      </form>
    </section>
  );
}
