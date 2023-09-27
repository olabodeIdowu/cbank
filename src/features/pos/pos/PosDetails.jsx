import { useParams } from 'react-router-dom';
import { useMoveBack } from '../../../hooks/useMoveBack';
import { axiosPrivate } from '../../../services/axios';
import Spinner from '../../../ui/Spinner';
import { useState } from 'react';
import { useEffect } from 'react';
import { formatCurrency, formatDate } from '../../../utils/helpers';
import EditPosForm from './EditPosForm';
import styled from 'styled-components';

const RequestDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
`;

const PosTerminalOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const PosTerminalTable = styled.div`
  padding: 1.5rem 2rem;

  & h5 {
    font-size: 1.6rem;
    padding: 1rem 1rem;
    border-bottom: 1px solid grey;
  }
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
export default function PosDetails() {
  const [posTerminalData, setPosTerminalData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('pos_details');
  const { posDetails } = useParams();
  const moveBack = useMoveBack();

  console.log(posDetails);

  useEffect(() => {
    async function getPosDetails() {
      try {
        setIsLoading(true);
        const data = await axiosPrivate.get(`/admin/pos/${posDetails}`);
        if (!data) throw new Error(`data not found`);
        setIsLoading(false);
        // console.log(data?.data?.data?.pos);
        setPosTerminalData(data?.data?.data?.pos);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }
    getPosDetails();
  }, [posDetails]);

  if (isLoading) return <Spinner />;

  console.log(posTerminalData);

  return (
    <section>
      <button onClick={moveBack} id='move-back'>
        <span>&larr; </span>
        Back
      </button>

      <ul className='pos-terminal-details-nav'>
        <li className='pos-terminal-details-navLink terminal-details-navLink__active'>
          Pos Details
        </li>
      </ul>

      <ul className='pos-terminal-details-nav'>
        <li
          onClick={() => setActiveTab('pos_details')}
          className={`tab-details-navLink ${
            activeTab === 'pos_details' ? 'tab-details-navLink__active' : ''
          }`}
        >
          Pos Details
        </li>
        <li
          onClick={() => setActiveTab('pos_account')}
          className={`tab-details-navLink ${
            activeTab === 'pos_account' ? 'tab-details-navLink__active' : ''
          }`}
        >
          Pos Account Details
        </li>
        <li
          onClick={() => setActiveTab('pos_type')}
          className={`tab-details-navLink ${
            activeTab === 'pos_type' ? 'tab-details-navLink__active' : ''
          }`}
        >
          Pos Type Details
        </li>
        <li
          onClick={() => setActiveTab('user')}
          className={`tab-details-navLink ${
            activeTab === 'user' ? 'tab-details-navLink__active' : ''
          }`}
        >
          User
        </li>
      </ul>

      <main id='pos-terminal-details'>
        {activeTab === 'pos_details' && (
          <PosTerminalTable>
            <p className='terminal-details-sec-header'>
              Basic information about the account like pos details
            </p>
            <h3>Pos Terminal Details</h3>
            <ul className='pos-terminal-details-list'>
              <li>
                <p>Pos Type ID</p>
                <h6>{posTerminalData?.pos_type_id}</h6>
              </li>
              <li>
                <p>Terminal ID</p>
                <h6>{posTerminalData?.terminal_id}</h6>
              </li>
              <li>
                <p>Register By ID</p>
                <h6>{posTerminalData?.register_by_id}</h6>
              </li>

              <li>
                <p>Caution Fee</p>
                <h6>
                  {posTerminalData?.caution_fee === null
                    ? '₦'
                    : formatCurrency(posTerminalData?.caution_fee)}
                </h6>
              </li>
              <li>
                <p>Charged At</p>
                <h6>
                  {posTerminalData?.charged_at === null
                    ? '₦'
                    : formatCurrency(posTerminalData?.charged_at)}
                </h6>
              </li>
              <li>
                <p>Client</p>
                <h6>{posTerminalData?.client}</h6>
              </li>
              <li>
                <p>Price</p>
                <h6>
                  {posTerminalData?.type?.price === null
                    ? '₦'
                    : formatCurrency(posTerminalData?.type?.price)}
                </h6>
              </li>
              <li>
                <p>Active</p>
                <h6
                  style={
                    posTerminalData?.is_active === true
                      ? {
                          background: '#2eb85c',
                          color: '#ffffff',
                          borderRadius: '4px',
                          padding: '0.1rem 0.8rem',
                          fontSize: '1.3rem',
                        }
                      : {
                          background: '#e55353',
                          color: '#ffffff',
                          borderRadius: '4px',
                          padding: '0.1rem 0.8rem',
                          fontSize: '1.3rem',
                        }
                  }
                >{`${posTerminalData?.is_active}`}</h6>
              </li>
              <li>
                <p>Pos Payemnt Method</p>
                <h6>{posTerminalData?.pos_payment_method}</h6>
              </li>
              <li>
                <p>Installment Amount</p>
                <h6>
                  {posTerminalData?.installment_amount === null
                    ? '₦'
                    : formatCurrency(posTerminalData?.installment_amount)}
                </h6>
              </li>
              <li>
                <p>Installment Threshold Amount</p>
                <h6>
                  {formatCurrency(
                    posTerminalData?.installment_threshold_amount
                  )}
                </h6>
              </li>
              <li>
                <p>Delivery Fee</p>
                <h6>
                  {posTerminalData?.delivery_fee === null
                    ? '₦'
                    : formatCurrency(posTerminalData?.delivery_fee)}
                </h6>
              </li>
              <li>
                <p>Paper Display Fee</p>
                <h6>
                  {posTerminalData?.paper_display_fee === null
                    ? '₦'
                    : formatCurrency(posTerminalData?.paper_display_fee)}
                </h6>
              </li>
              <li>
                <p>Stand Fee</p>
                <h6>
                  {posTerminalData?.stand_fee === null
                    ? '₦'
                    : formatCurrency(posTerminalData?.stand_fee)}
                </h6>
              </li>
              <li>
                <p>Request</p>
                <h6>{posTerminalData?.request}</h6>
              </li>
              <li>
                <p>Request ID</p>
                <h6>{posTerminalData?.request_id}</h6>
              </li>
              <li>
                <p>State ID</p>
                <h6>{posTerminalData?.state_id}</h6>
              </li>
              <li>
                <p>Country ID</p>
                <h6>{posTerminalData?.country_id}</h6>
              </li>
              <li>
                <p>Referrer ID</p>
                <h6>{posTerminalData?.referrer_id}</h6>
              </li>
              <li>
                <p>Repayment Duration</p>
                <h6>{posTerminalData?.repayment_duration}</h6>
              </li>
              <li>
                <p>Remaining Due Date</p>
                <h6>{formatDate(posTerminalData?.remaining_due_date)}</h6>
              </li>
              <li>
                <p>Repayment Due Date</p>
                <h6>{formatDate(posTerminalData?.repayment_due_date)}</h6>
              </li>

              <li>
                <p>Count Date</p>
                <h6>{formatDate(posTerminalData?.count_date)}</h6>
              </li>
              <li>
                <p>Created At</p>
                <h6>{formatDate(posTerminalData?.created_at)}</h6>
              </li>
            </ul>
          </PosTerminalTable>
        )}

        {activeTab === 'pos_account' && (
          <PosTerminalTable>
            <p className='terminal-details-sec-header'>
              Basic information about the account like pos account details
            </p>
            <h3>Pos Terminal Account Details</h3>
            <ul className='pos-terminal-details-list'>
              <li>
                <p>Account ID</p>
                <h6>{posTerminalData?.account?.id}</h6>
              </li>
              <li>
                <p>Account Name</p>
                <h6>{posTerminalData?.account?.account_name}</h6>
              </li>
              <li>
                <p>Account Number</p>
                <h6>{posTerminalData?.account?.account_number}</h6>
              </li>
              <li>
                <p>Account Balance</p>
                <h6>
                  {formatCurrency(posTerminalData?.account?.available_balance)}
                </h6>
              </li>
              <li>
                <p>Block Amount</p>
                <h6>
                  {formatCurrency(posTerminalData?.account?.block_amount)}
                </h6>
              </li>
              <li>
                <p>Book Balance</p>
                <h6>
                  {formatCurrency(posTerminalData?.account?.book_balance)}
                </h6>
              </li>
              <li>
                <p>Created At</p>
                <h6>{formatDate(posTerminalData?.account?.created_at)}</h6>
              </li>
              <li>
                <p>Daily Transfer Limits</p>
                <h6>
                  {posTerminalData?.account?.daily_transfer_limit === null
                    ? '₦'
                    : formatCurrency(
                        posTerminalData?.account?.daily_transfer_limit
                      )}
                </h6>
              </li>
              <li>
                <p>Interest Enabled</p>
                <h6
                  style={
                    posTerminalData?.account?.interest_enabled === 'active'
                      ? {
                          background: '#2eb85c',
                          color: '#ffffff',
                          borderRadius: '4px',
                          padding: '0.1rem 0.8rem',
                          fontSize: '1.3rem',
                        }
                      : {
                          background: '#e55353',
                          color: '#ffffff',
                          borderRadius: '4px',
                          padding: '0.1rem 0.8rem',
                          fontSize: '1.3rem',
                        }
                  }
                >{`${posTerminalData?.account?.interest_enabled}`}</h6>
              </li>
              <li>
                <p>Old Account</p>
                <h6>{`${posTerminalData?.account?.old_account}`}</h6>
              </li>
              <li>
                <p>Overdrawn Enabled</p>
                <h6
                  style={
                    posTerminalData?.account?.overdraw_enabled === true
                      ? {
                          background: '#2eb85c',
                          color: '#ffffff',
                          borderRadius: '4px',
                          padding: '0.1rem 0.8rem',
                          fontSize: '1.3rem',
                        }
                      : {
                          background: '#e55353',
                          color: '#ffffff',
                          borderRadius: '4px',
                          padding: '0.1rem 0.8rem',
                          fontSize: '1.3rem',
                        }
                  }
                >{`${posTerminalData?.account?.overdraw_enabled}`}</h6>
              </li>
              <li>
                <p>Created PND</p>
                <h6>{posTerminalData?.account?.post_no_debit_created_at}</h6>
              </li>
              <li>
                <p>PND Enabled</p>
                <h6
                  style={
                    posTerminalData?.account?.post_no_debit_enabled === true
                      ? {
                          background: '#2eb85c',
                          color: '#ffffff',
                          borderRadius: '4px',
                          padding: '0.1rem 0.8rem',
                          fontSize: '1.3rem',
                        }
                      : {
                          background: '#e55353',
                          color: '#ffffff',
                          borderRadius: '4px',
                          padding: '0.1rem 0.8rem',
                          fontSize: '1.3rem',
                        }
                  }
                >{`${posTerminalData?.account?.post_no_debit_enabled}`}</h6>
              </li>
              <li>
                <p>Provider</p>
                <h6>{posTerminalData?.account?.provider}</h6>
              </li>
              <li>
                <p>Provider</p>
                <h6>{posTerminalData?.account?.provider}</h6>
              </li>
              <li>
                <p>Status</p>
                <h6
                  style={
                    posTerminalData?.account?.status === 'active'
                      ? {
                          background: '#2eb85c',
                          color: '#ffffff',
                          borderRadius: '4px',
                          padding: '0.1rem 0.8rem',
                          fontSize: '1.3rem',
                        }
                      : {
                          background: '#e55353',
                          color: '#ffffff',
                          borderRadius: '4px',
                          padding: '0.1rem 0.8rem',
                          fontSize: '1.3rem',
                        }
                  }
                >{`${posTerminalData?.account?.status}`}</h6>
              </li>
              <li>
                <p>Transfer Limit Enabled</p>
                <h6
                  style={
                    posTerminalData?.account?.transfer_limit_enabled === true
                      ? {
                          background: '#2eb85c',
                          color: '#ffffff',
                          borderRadius: '4px',
                          padding: '0.1rem 0.8rem',
                          fontSize: '1.3rem',
                        }
                      : {
                          background: '#e55353',
                          color: '#ffffff',
                          borderRadius: '4px',
                          padding: '0.1rem 0.8rem',
                          fontSize: '1.3rem',
                        }
                  }
                >{`${posTerminalData?.account?.transfer_limit_enabled}`}</h6>
              </li>
            </ul>
          </PosTerminalTable>
        )}

        {activeTab === 'pos_type' && (
          <PosTerminalTable>
            <p className='terminal-details-sec-header'>
              Basic information about pos type terminal details
            </p>
            <h3>Pos Type Terminal Details</h3>
            <ul className='pos-terminal-details-list'>
              <li>
                <p>Pos Type ID</p>
                <h6>{posTerminalData?.type?.pos_id}</h6>
              </li>
              <li>
                <p>Name</p>
                <h6>{posTerminalData?.type?.name}</h6>
              </li>
              <li>
                <p>Price</p>
                <h6>{formatCurrency(posTerminalData?.type?.price)}</h6>
              </li>
              <li>
                <p>Provider</p>
                <h6>{posTerminalData?.type?.provider}</h6>
              </li>
            </ul>
          </PosTerminalTable>
        )}

        {activeTab === 'user' && (
          <PosTerminalTable>
            <p className='terminal-details-sec-header'>
              Basic information about pos type terminal user's details
            </p>
            <h3>Pos Type Terminal User Details</h3>
            <ul className='pos-terminal-details-list'>
              <li>
                <p>Pos Terminal User ID</p>
                <h6>{posTerminalData?.user_id}</h6>
              </li>
              <li>
                <p>First Name</p>
                <h6>{posTerminalData?.user?.first_name}</h6>
              </li>
              <li>
                <p>Last Name</p>
                <h6>{posTerminalData?.user?.last_name}</h6>
              </li>
              <li>
                <p>Full Name</p>
                <h6>{posTerminalData?.user?.full_name}</h6>
              </li>
              <li>
                <p>Telephone</p>
                <h6>{posTerminalData?.user?.telephone}</h6>
              </li>
              <li>
                <p>Telephone Verifed At</p>
                <h6>
                  {formatDate(posTerminalData?.user?.telephone_verified_at)}
                </h6>
              </li>
              <li>
                <p>Email</p>
                <h6>{posTerminalData?.user?.email}</h6>
              </li>
              <li>
                <p>Gender</p>
                <h6>{posTerminalData?.user?.gender}</h6>
              </li>
              <li>
                <p>Identity Card</p>
                <h6>{posTerminalData?.user?.identity_card}</h6>
              </li>
              <li>
                <p>Image</p>
                <img src={posTerminalData?.user?.image} alt='user' />
              </li>
              <li>
                <p>Email Verified At</p>
                <h6>{posTerminalData?.user?.email_verified_at}</h6>
              </li>
              <li>
                <p>Date of Birth</p>
                <h6>{posTerminalData?.user?.date_of_birth}</h6>
              </li>
              <li>
                <p>Occupation</p>
                <h6>{posTerminalData?.user?.occupation}</h6>
              </li>
              <li>
                <p>Referrer Code</p>
                <h6>{posTerminalData?.user?.referral_code}</h6>
              </li>
              <li>
                <p>thumbnail</p>
                <h6>{posTerminalData?.user?.thumbail}</h6>
              </li>
              <li>
                <p>Utility Bill</p>
                <h6>{posTerminalData?.user?.utility_bill}</h6>
              </li>
              <li>
                <p>Address Line One</p>
                <h6>{posTerminalData?.user?.address_line_one}</h6>
              </li>
              <li>
                <p>Address Line Two</p>
                <h6>{posTerminalData?.user?.address_line_two}</h6>
              </li>
              <li>
                <p>Business Name</p>
                <h6>{posTerminalData?.user?.business_name}</h6>
              </li>
              <li>
                <p>Business Logo</p>
                <img src={posTerminalData?.user?.logo} alt='logo' />
              </li>
              <li>
                <p>City</p>
                <h6>{posTerminalData?.user?.city}</h6>
              </li>
              <li>
                <p>State</p>
                <h6>{posTerminalData?.user?.state}</h6>
              </li>
              <li>
                <p>Country</p>
                <h6>{posTerminalData?.user?.country}</h6>
              </li>
              <li>
                <p>Referrer ID</p>
                <h6>{posTerminalData?.user?.referrer_id}</h6>
              </li>
              <li>
                <p>Skip Kyc Verification</p>
                <h6
                  style={
                    posTerminalData?.user?.skip_kyc_verification === true
                      ? {
                          background: '#2eb85c',
                          color: '#ffffff',
                          borderRadius: '4px',
                          padding: '0.1rem 0.8rem',
                          fontSize: '1.3rem',
                        }
                      : {
                          background: '#e55353',
                          color: '#ffffff',
                          borderRadius: '4px',
                          padding: '0.1rem 0.8rem',
                          fontSize: '1.3rem',
                        }
                  }
                >
                  {`${posTerminalData?.user?.skip_kyc_verification}`}
                </h6>
              </li>

              <li>
                <p>Transaction Pin Enabled</p>
                <h6
                  style={
                    posTerminalData?.user?.has_transaction_pin === true
                      ? {
                          background: '#2eb85c',
                          color: '#ffffff',
                          borderRadius: '4px',
                          padding: '0.1rem 0.8rem',
                          fontSize: '1.3rem',
                        }
                      : {
                          background: '#e55353',
                          color: '#ffffff',
                          borderRadius: '4px',
                          padding: '0.1rem 0.8rem',
                          fontSize: '1.3rem',
                        }
                  }
                >
                  {`${posTerminalData?.user?.has_transaction_pin}`}
                </h6>
              </li>
              <li>
                <p>Created At</p>
                <h6>{formatDate(posTerminalData?.user?.created?.at)}</h6>
              </li>
              <li>
                <p>Updated At</p>
                <h6>{formatDate(posTerminalData?.user?.updated_at)}</h6>
              </li>
              <li>
                <p>Deleted At</p>
                <h6>{formatDate(posTerminalData?.user?.deleted_at)}</h6>
              </li>
            </ul>
          </PosTerminalTable>
        )}
      </main>
    </section>
  );
}
