import { useEffect, useState } from 'react';
import { axiosPrivate } from '../../services/axios';
import { useParams, useSearchParams } from 'react-router-dom';
import { useMoveBack } from '../../hooks/useMoveBack';
import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import Table from '../../ui/Table';
import { useAccounts } from './useAccounts';
import Modal from '../../ui/Modal';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import DeleteAccountForm from './DeleteAccountForm';
import EditAccountForm from './EditAccountForm';
import VerifyAccountForm from './VerifyAccountForm';
import EnableAccountForm from './EnableAccountForm';
import PNDAccountForm from './PNDAccounForm';
import DDMAccountForm from './DDMAccountForm';
import FilterTransactionForm from './FilterTransactionForm';
import FilterInvestmentForm from './FilterInvestmentForm';
import FilterInterestForm from './FilterInterestForm';
import { AiFillCaretDown } from 'react-icons/ai';
import Button from '../../ui/Button';
import TransactionRow from './TransactionRow';
import { PAGE_SIZE } from '../../utils/constants';
import InvestmentRow from './InvestmentRow';
import BlockFundRow from './BlockFundRow';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const NavHeaderDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;

  & div {
    margin-bottom: 1.5rem;
  }
  & h5 {
    font-size: 2rem;
    font-weight: 500;
  }
`;

const AdditionalInformation = styled.h4`
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 500;
  color: #888;
  padding: 3.8rem 0 2rem 2rem;
`;

const NavHeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const AcctStatus = styled.h4`
  color: #ffffff;
  background: #2eb85c;
  border-radius: 4px;
  padding: 0.1rem 0.8rem;
  font-size: 1.3rem;
  /* @media only screen and (max-width: 768px) {
    color: red;
  } */
`;

const Overdraw = styled.h4`
  color: #ffffff;
  background: #e55353;
  border-radius: 4px;
  padding: 0.1rem 0.8rem;
  font-size: 1.3rem;
`;

const PND = styled.h4`
  color: #ffffff;
  background: #e55353;
  border-radius: 4px;
  padding: 0.1rem 0.8rem;
  font-size: 1.3rem;
`;
const DDM = styled.h4`
  color: #ffffff;
  background: #e55353;
  border-radius: 4px;
  padding: 0.1rem 0.8rem;
  font-size: 1.3rem;
`;

const AccountTable = styled.div`
  padding: 1.5rem 1rem;
`;

const Edit = styled.div`
  & svg {
    width: 3rem;
    height: 3rem;
    padding: 0.5rem 0.5rem;
    cursor: pointer;
  }
  & svg:hover {
    background: #e4e0e0;
  }
`;

const Delete = styled.div`
  & svg {
    width: 3rem;
    height: 3rem;
    fill: red;
    padding: 0.5rem 0.5rem;
    cursor: pointer;
  }
  & svg:hover {
    background: #e4e0e0;
  }
`;

const Verify = styled.p`
  color: #777;
`;
const PNDAcc = styled.p`
  color: #777;
`;
const DDMAcc = styled.p`
  color: #777;
`;

const Enable = styled.p`
  color: #777;
`;

const ViewCAC = styled.p`
  padding: 0.2rem 1rem;
`;

const VerifyComment = styled.p`
  padding: 0.2rem 1rem;
  font-weight: 700;
  margin-top: 3rem;
`;

const DetailsHeader = styled.div`
  padding: 0.2rem 1.5rem;
  & h5 {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  & p {
    color: #888;
  }
`;

const DetailsFilterButton = styled.div`
  margin-bottom: 1.2rem;
  border-bottom: 1px solid grey;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 1rem;
  margin-block: 1rem 1.8rem;
  & input {
    border: none;
    padding: 0.8rem 4rem 0.8rem 1rem;
    background: none;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
    background-color: white;
  }
`;

export default function AccountDetails() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  let page = Number(searchParams.get('page'));

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { isLoading: isLoadingAccounts, accounts } = useAccounts();

  const [acctDetails, setAcctDetails] = useState({});
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [isLoadingTransactionDetails, setIsLoadingTransactionDetails] =
    useState(false);
  const [investmentDetails, setInvestmentDetails] = useState([]);
  const [isLoadingInvestmentDetails, setIsLoadingInvestmentDetails] =
    useState(false);

  const [blockFundsDetails, setBlockFundsDetails] = useState([]);
  const [isLoadingBlockFundDetails, setIsLoadingBlockFundDetails] =
    useState(false);
  const [activeTab, setActiveTab] = useState('accounts');

  const moveBack = useMoveBack();
  const { accountDetails } = useParams();
  console.log(accountDetails);

  useEffect(() => {
    console.log(accountDetails);
    async function getAccountDetails() {
      try {
        setIsLoadingDetails(true);
        const data = await axiosPrivate.get(
          `/admin/accounts/${accountDetails}?include=transferLimits`
        );

        console.log(data?.data?.data?.account);
        setIsLoadingDetails(false);
        setAcctDetails(data?.data?.data?.account);
        // return data?.data?.data?.accounts?.data;
      } catch (err) {
        setIsLoadingDetails(false);
        console.log(err);
      }
    }
    getAccountDetails();
  }, [accountDetails]);

  useEffect(() => {
    async function getAccountTransactionDetails() {
      try {
        setIsLoadingTransactionDetails(true);
        const data = await axiosPrivate.get(
          `/admin/accounts/${accountDetails}/transactions`
        );
        console.log(data);
        console.log(data?.data?.data?.transactions);
        setIsLoadingTransactionDetails(false);
        setTransactionDetails(data?.data?.data?.transactions?.data);
        // return data?.data?.data?.accounts?.data;
      } catch (err) {
        setIsLoadingTransactionDetails(false);
        console.log(err);
      }
    }
    getAccountTransactionDetails();
  }, [accountDetails]);

  useEffect(() => {
    async function getAccountInvestmentDetails() {
      try {
        setIsLoadingInvestmentDetails(true);
        const data = await axiosPrivate.get(
          `/admin/accounts/${accountDetails}/investments`,
          { 'Content-Type': 'application/json', Accept: 'application/json' }
        );
        console.log(data);
        console.log(data?.data?.data?.investments);
        setIsLoadingInvestmentDetails(false);
        setInvestmentDetails(data?.data?.data?.investments?.data);
        // return data?.data?.data?.accounts?.data;
      } catch (err) {
        setIsLoadingInvestmentDetails(false);
        console.log(err);
      }
    }
    getAccountInvestmentDetails();
  }, [accountDetails]);

  useEffect(() => {
    async function getAccountBlockFundsDetails() {
      try {
        setIsLoadingBlockFundDetails(true);
        const data = await axiosPrivate.get(
          `/admin/accounts/${accountDetails}/block-fund`
        );

        setIsLoadingBlockFundDetails(false);
        console.log(data);
        setBlockFundsDetails(data?.data?.data?.Blocked_funds);

        // return data?.data?.data?.Block_Funds;
      } catch (err) {
        setIsLoadingBlockFundDetails(false);
        console.log(err);
      }
    }
    getAccountBlockFundsDetails();
  }, [accountDetails]);

  // function filter() {
  //   // Declare variables
  //   let filter, table, tr, td, i, txtValue;
  //   filter = myBlockFundInput.current.value.toUpperCase();
  //   table = document.getElementById('myBlockFundTable');
  //   // tr = document.querySelectorAll('.tablerow');
  //   console.log(filter, table, tr);

  //   // Loop through all table rows, and hide those who don't match the search query
  //   for (i = 0; i < tr.length; i++) {
  //     td = tr[i];
  //     if (td) {
  //       txtValue = td.textContent || td.textContent;
  //       if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //         tr[i].style.display = '';
  //       } else {
  //         tr[i].style.display = 'none';
  //       }
  //     }
  //   }
  // }

  console.log(
    accounts,
    acctDetails,
    acctDetails?.interest_enabled,
    transactionDetails,
    blockFundsDetails
  );

  if (
    isLoadingDetails ||
    isLoadingTransactionDetails ||
    isLoadingBlockFundDetails ||
    isLoadingAccounts
  ) {
    return <Spinner />;
  }

  return (
    <section>
      <button onClick={moveBack} id='move-back'>
        <span>&larr; </span>
        Back
      </button>

      <ul className='account-details-nav'>
        <li
          onClick={() => setActiveTab('accounts')}
          className={`tab-details-navLink ${
            activeTab === 'accounts' ? 'tab-details-navLink__active' : ''
          }`}
        >
          Account Details
        </li>
        <li
          onClick={() => setActiveTab('transactions')}
          className={`tab-details-navLink ${
            activeTab === 'transactions' ? 'tab-details-navLink__active' : ''
          }`}
        >
          Transactions
        </li>
        <li
          onClick={() => setActiveTab('investments')}
          className={`tab-details-navLink ${
            activeTab === 'investments' ? 'tab-details-navLink__active' : ''
          }`}
        >
          Investments
        </li>
        <li
          onClick={() => setActiveTab('interest')}
          className={`tab-details-navLink ${
            activeTab === 'interest' ? 'tab-details-navLink__active' : ''
          }`}
        >
          Interest
        </li>
        <li
          onClick={() => setActiveTab('account_statement')}
          className={`tab-details-navLink ${
            activeTab === 'account_statement'
              ? 'tab-details-navLink__active'
              : ''
          }`}
        >
          Account Statement
        </li>
        <li
          onClick={() => setActiveTab('debit_mandate')}
          className={`tab-details-navLink ${
            activeTab === 'debit_mandate' ? 'tab-details-navLink__active' : ''
          }`}
        >
          Debit Mandate
        </li>
        <li
          onClick={() => setActiveTab('block_funds')}
          className={`tab-details-navLink ${
            activeTab === 'block_funds' ? 'tab-details-navLink__active' : ''
          }`}
        >
          Block Funds
        </li>
      </ul>

      <main id='account-details'>
        {activeTab === 'accounts' && (
          <AccountTable>
            <NavHeaderDetails>
              <div>
                <h5>Account Information</h5>
                <p>
                  Basic information about the account like the name, number,
                  type and balance
                </p>
              </div>

              <NavHeaderButtons>
                <div>
                  <Modal>
                    <Modal.Open opens='editAccount-form'>
                      <Edit>
                        <HiPencil />
                      </Edit>
                    </Modal.Open>
                    <Modal.Window name='editAccount-form'>
                      <EditAccountForm account={acctDetails} />
                    </Modal.Window>
                  </Modal>
                </div>

                <div>
                  <Modal>
                    <Modal.Open opens='deleteAccount-form'>
                      <Delete>
                        <HiTrash />
                      </Delete>
                    </Modal.Open>
                    <Modal.Window name='deleteAccount-form'>
                      <DeleteAccountForm />
                    </Modal.Window>
                  </Modal>
                </div>
              </NavHeaderButtons>
            </NavHeaderDetails>

            <ul className='account-details-list'>
              <li>
                <p>Owner ID</p>
                <h6>{acctDetails?.user_id}</h6>
              </li>
              <li>
                <p>Account Type</p>
                <h6>{acctDetails?.type?.name}</h6>
              </li>
              <li>
                <p>Account Name</p>
                <h6>{acctDetails?.account_name}</h6>
              </li>
              <li>
                <p>Account Number</p>
                <h6>{acctDetails?.account_number}</h6>
              </li>
              <li>
                <p>Book Balance</p>
                <h6>{acctDetails?.bsook_balance}</h6>
              </li>
              <li>
                <p>Account Balance</p>
                <h6>{acctDetails?.available_balance}</h6>
              </li>
            </ul>

            <AdditionalInformation>
              Additional Information
            </AdditionalInformation>

            <ul className='account-details-list'>
              <li>
                <p>Transfer Limit Enabled</p>
                <h6>{`${acctDetails?.transfer_limit_enabled}`}</h6>
              </li>
              <li>
                <p>Daily Limit Enabled</p>
                <h6>{`${
                  acctDetails?.daily_transfer_limit === null
                    ? '₦'
                    : acctDetails?.daily_transfer_limit
                }`}</h6>
              </li>
              <li>
                <p>Interest Enabled</p>
                <h6>{`${acctDetails?.interest_enabled}`}</h6>
              </li>
              <li>
                <p>Account Status</p>
                <AcctStatus>{acctDetails?.status}</AcctStatus>
              </li>
              <li>
                <p>Book Balance</p>
                <h6>{acctDetails?.book_balance}</h6>
              </li>
              <li>
                <p>Account Balance</p>
                <h6>{acctDetails?.available_balance}</h6>
              </li>
            </ul>

            <div className='account_header_nav'>
              <h4>Verification</h4>

              <div>
                <Modal>
                  <Modal.Open opens='verifyAccount-form'>
                    <Verify>Verify Account</Verify>
                  </Modal.Open>
                  <Modal.Window name='verifyAccount-form'>
                    <VerifyAccountForm />
                  </Modal.Window>
                </Modal>
              </div>
            </div>

            <div>
              <ul className='account-details-list'>
                <li>
                  <p>Status</p>
                  <h6>{`${acctDetails?.overdraw_enabled}`}</h6>
                </li>
              </ul>
              <ViewCAC>View CAC Document</ViewCAC>
              <VerifyComment>Comments</VerifyComment>
            </div>

            <div className='account_header_nav'>
              <h4>Overdraft</h4>

              <div>
                <Modal>
                  <Modal.Open opens='enableAccount-form'>
                    <Enable>Enable</Enable>
                  </Modal.Open>
                  <Modal.Window name='enableAccount-form'>
                    <EnableAccountForm />
                  </Modal.Window>
                </Modal>
              </div>
            </div>

            <ul className='account-details-list'>
              <li>
                <p>Status</p>
                <Overdraw>{`${acctDetails?.overdraw_enabled}`}</Overdraw>
              </li>
            </ul>

            <div className='account_header_nav'>
              <h4>Post No Debit</h4>

              <div>
                <Modal>
                  <Modal.Open opens='PNDAccount-form'>
                    <PNDAcc>Create PND</PNDAcc>
                  </Modal.Open>
                  <Modal.Window name='PNDAccount-form'>
                    <PNDAccountForm />
                  </Modal.Window>
                </Modal>
              </div>
            </div>

            <ul className='account-details-list'>
              <li>
                <p>Status</p>
                <PND>{`${acctDetails?.post_no_debit_enabled}`}</PND>
              </li>
            </ul>

            <div className='account_header_nav'>
              <h4>Direct Debit Mandate</h4>

              <div>
                <Modal>
                  <Modal.Open opens='DDMAccount-form'>
                    <DDMAcc>Create</DDMAcc>
                  </Modal.Open>
                  <Modal.Window name='DDMAccount-form'>
                    <DDMAccountForm />
                  </Modal.Window>
                </Modal>
              </div>
            </div>

            <ul className='account-details-list'>
              <li>
                <p>Status</p>
                <DDM>{`${acctDetails?.post_no_debit_enabled}`}</DDM>
              </li>
            </ul>
          </AccountTable>
        )}

        {activeTab === 'transactions' && (
          <AccountTable>
            <DetailsHeader>
              <h5>Transaction</h5>
              <p>
                A look at all the transactions that have been carried out on the
                account
              </p>
            </DetailsHeader>
            <DetailsFilterButton>
              <Modal>
                <Modal.Open opens='account-transactionform'>
                  <Button
                    style={{
                      marginTop: '5rem',
                      marginBottom: '2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      background: 'none',
                      backgroundColor: 'grey',
                    }}
                  >
                    Advanced Filter
                    <span>
                      <AiFillCaretDown />
                    </span>
                  </Button>
                </Modal.Open>
                <Modal.Window name='account-transactionform'>
                  <FilterTransactionForm
                    transactions={transactionDetails}
                    isLoadingTransactionDetails={isLoadingTransactionDetails}
                  />
                </Modal.Window>
              </Modal>
            </DetailsFilterButton>

            <main>
              <Menus>
                <Table columns='1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'>
                  <Table.Header id='myTable'>
                    <div>Refrence</div>
                    <div>Credit Bank</div>
                    <div>Credit Account</div>
                    <div>Credit Account Name</div>
                    <div>Debit Account</div>
                    <div>Debit Account Name</div>
                    <div>Amount(₦)</div>
                    <div>Balance Before(₦)</div>
                    <div>Balance After(₦)</div>
                    <div>Debit Bank(₦)</div>
                    <div>Type</div>
                    <div>Status</div>
                    <div>Date</div>
                  </Table.Header>
                  {!transactionDetails.length ? (
                    <Empty resourceName='Transactions' />
                  ) : (
                    <Table.Body
                      data={transactionDetails.slice(from, to)}
                      render={(transactions) => (
                        <TransactionRow
                          transactions={transactions}
                          key={transactions.id}
                        />
                      )}
                    />
                  )}
                </Table>
              </Menus>
              <Pagination count={transactionDetails.length} />
            </main>
          </AccountTable>
        )}

        {activeTab === 'investments' && (
          <AccountTable>
            <DetailsHeader>
              <h5>Investments</h5>
              <p>All account investments</p>
            </DetailsHeader>
            <DetailsFilterButton>
              <Modal>
                <Modal.Open opens='account-investmentform'>
                  <Button
                    style={{
                      marginTop: '5rem',
                      marginBottom: '2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      background: 'none',
                      backgroundColor: 'grey',
                    }}
                  >
                    Advanced Filter
                    <span>
                      <AiFillCaretDown />
                    </span>
                  </Button>
                </Modal.Open>
                <Modal.Window name='account-investmentform'>
                  <FilterInvestmentForm
                    investment={investmentDetails}
                    isLoadingInvestmentDetails={isLoadingInvestmentDetails}
                  />
                </Modal.Window>
              </Modal>
            </DetailsFilterButton>

            <main>
              <Menus>
                <Table columns='1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'>
                  <Table.Header id='myTable'>
                    <div>Investment Type</div>
                    <div>Source Account</div>
                    <div>Beneficiary Account</div>
                    <div>Title</div>
                    <div>Amount(₦)</div>
                    <div>Rollover Type</div>
                    <div>Status</div>
                    <div>Date</div>
                  </Table.Header>
                  {!investmentDetails.length ? (
                    <Empty resourceName='Investments' />
                  ) : (
                    <Table.Body
                      data={investmentDetails.slice(from, to)}
                      render={(investment) => (
                        <InvestmentRow
                          investment={investment}
                          key={investment.id}
                        />
                      )}
                    />
                  )}
                </Table>
              </Menus>
              <Pagination count={investmentDetails.length} />
            </main>
          </AccountTable>
        )}
        {activeTab === 'interest' && (
          <AccountTable>
            <DetailsHeader>
              <h5>Interest</h5>
              <p>All interest accrued on this account</p>
            </DetailsHeader>
            <DetailsFilterButton>
              <Modal>
                <Modal.Open opens='account-interestform'>
                  <Button
                    style={{
                      marginTop: '5rem',
                      marginBottom: '2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      background: 'none',
                      backgroundColor: 'grey',
                    }}
                  >
                    Advanced Filter
                    <span>
                      <AiFillCaretDown />
                    </span>
                  </Button>
                </Modal.Open>
                <Modal.Window name='account-interestform'>
                  <FilterInterestForm
                  // interest={interestDetails}
                  // isLoadingInterestDetails={isLoadingInterestDetails}
                  />
                </Modal.Window>
              </Modal>
            </DetailsFilterButton>
          </AccountTable>
        )}
        {activeTab === 'account_statement' && (
          <AccountTable>
            <section id=''>
              <form
                // onSubmit={handleDDMAccountForm}
                id='form'
                className='verify-form'
              >
                <p>Request an account statement for this account</p>

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

                <div>
                  <label>Send To Account Owner</label>
                  <select
                    name='account_owner'
                    // onChange={handleFilterChange}
                    // disabled={isFilterAccountForm}
                    // value={filterAccountForm.type}
                  >
                    <option value=''>--Select--</option>
                  </select>
                </div>

                <button>
                  {/* {isLoading ? <SpinnerMini /> : 'Submit'} <span>&rarr;</span> */}
                  Submit Request
                </button>
              </form>
            </section>
          </AccountTable>
        )}
        {activeTab === 'debit_mandate' && (
          <AccountTable>
            <DetailsHeader>
              <h5>Transaction</h5>
              <p>Account's Debit Mandate</p>
            </DetailsHeader>
            <Filter>
              <label>Filter</label>
              <input
                // onChange={() => filter()}
                // ref={myDebitMandateInput}
                type='text'
                placeholder='type string'
              />
            </Filter>

            <main>
              <Menus>
                <Table columns='1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'>
                  <Table.Header id='myTable'>
                    <div>Source Name</div>
                    <div>Source Account</div>
                    <div>Beneficiary Name</div>
                    <div>Beneficiary Account</div>
                    <div>Beneficiary Bank</div>
                    <div>Amount</div>
                    <div>Balance(₦)</div>
                    <div>Status</div>
                    <div>Date Created</div>
                    <div>Start Date</div>
                    <div>End Date</div>
                    <div>Schedule</div>
                  </Table.Header>
                  {/* {!transactionDetails.length ? (
                    <Empty resourceName='Transactions' />
                  ) : (
                    <Table.Body
                      data={transactionDetails.slice(from, to)}
                      render={(transactions) => (
                        <TransactionRow
                          transactions={transactions}
                          key={transactions.id}
                        />
                      )}
                    />
                  )} */}

                  <Empty resourceName='Debit Mandate' />
                </Table>
              </Menus>
              <Pagination count={transactionDetails.length} />
            </main>
          </AccountTable>
        )}

        {activeTab === 'block_funds' && (
          <AccountTable>
            <DetailsHeader>
              <h5>Block Fund</h5>
              <p>Block user's fund</p>
            </DetailsHeader>
            <Filter>
              <label>Filter</label>
              <input
                // onChange={() => filter()}
                // ref={myBlockFundInput}
                type='text'
                placeholder='type string'
              />
            </Filter>

            <main>
              <Menus>
                <Table columns='1fr 1fr 1fr 1fr 1fr 1fr 1fr'>
                  <Table.Header id='myBlockFundTable'>
                    <div>Refrence</div>
                    <div>Amount(₦)</div>
                    <div>Status</div>
                    <div>Reason</div>
                    <div>Action</div>
                    <div>Date Created</div>
                    <div>Date Updated</div>
                  </Table.Header>
                  {!blockFundsDetails.length ? (
                    <Empty resourceName='Block Funds' />
                  ) : (
                    <Table.Body
                      data={blockFundsDetails.slice(from, to)}
                      render={(blockFund) => (
                        <BlockFundRow
                          blockFund={blockFund}
                          key={blockFund.id}
                        />
                      )}
                    />
                  )}
                </Table>
              </Menus>
              <Pagination count={blockFundsDetails.length} />
            </main>
          </AccountTable>
        )}
      </main>
    </section>
  );
}
