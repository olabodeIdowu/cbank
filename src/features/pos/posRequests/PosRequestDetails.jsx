import { useParams } from 'react-router-dom';
import { useMoveBack } from '../../../hooks/useMoveBack';
import { axiosPrivate } from '../../../services/axios';
import Spinner from '../../../ui/Spinner';
import { useState } from 'react';
import { useEffect } from 'react';
import { formatCurrency, formatDate } from '../../../utils/helpers';
import { useDeletePosRequest } from './useDeletePosRequest';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import styled from 'styled-components';

const RequestDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
`;

const PosRequestOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const PosRequestTable = styled.div`
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

export default function PosRequestDetails() {
  const [posRequestData, setPosRequestData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('pos_request');
  const { posRequestDetails } = useParams();
  const moveBack = useMoveBack();

  console.log(posRequestDetails);

  const { isDeleting, deletePosRequest } = useDeletePosRequest();

  useEffect(() => {
    async function getPosRequestDetails() {
      try {
        setIsLoading(true);
        const data = await axiosPrivate.get(
          `/admin/pos-requests/${posRequestDetails}`
        );
        if (!data) throw new Error(`data not found`);
        setIsLoading(false);
        console.log(data);
        setPosRequestData(data?.data?.data?.pos_request);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }
    getPosRequestDetails();
  }, [posRequestDetails]);

  if (isLoading) return <Spinner />;

  console.log(
    posRequestData,
    posRequestData?.account?.id,
    posRequestData?.account,
    posRequestData?.account?.type,
    posRequestData?.pos_type
  );

  const { id: posRequestID } = posRequestData;
  console.log(posRequestID);

  return (
    <section>
      <button onClick={moveBack} id='move-back'>
        <span>&larr; </span>
        Back
      </button>

      <ul className='posrequest-details-nav'>
        <li
          onClick={() => setActiveTab('pos_request')}
          className={`tab-details-navLink ${
            activeTab === 'pos_request' ? 'tab-details-navLink__active' : ''
          }`}
        >
          Pos Request Details
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
      </ul>

      <main id='pos-request-details'>
        <RequestDetails>
          <h3>Pos Request Details</h3>
          <PosRequestOptions>
            <Edit>
              <HiPencil />
            </Edit>
            <Delete>
              <HiTrash />
            </Delete>
          </PosRequestOptions>
        </RequestDetails>

        <p className='posrequest-details-sec-header'>
          Basic information about the account like pos request details
        </p>
        {activeTab === 'pos_request' && (
          <PosRequestTable>
            <h5>Pos Request</h5>
            <ul className='posrequest-details-list'>
              <li>
                <p>Pos user ID</p>
                <h6>{posRequestData?.user_id}</h6>
              </li>
              <li>
                <p>Pos state ID</p>
                <h6>{posRequestData?.state_id}</h6>
              </li>
              <li>
                <p>Pos country ID</p>
                <h6>{posRequestData?.country_id}</h6>
              </li>
              <li>
                <p>Delivery option</p>
                <h6>{posRequestData?.delivery_option}</h6>
              </li>
              <li>
                <p>Status</p>
                <h6>{posRequestData?.status}</h6>
              </li>
              <li>
                <p>Pos payment method</p>
                <h6>{posRequestData?.pos_payment_method}</h6>
              </li>

              <li>
                <p>Delivery fee</p>
                <h6>{posRequestData?.delivery_fee}</h6>
              </li>
              <li>
                <p>Paper display fee</p>
                <h6>{posRequestData?.paper_display_fee}</h6>
              </li>
              <li>
                <p>Installment amount</p>
                <h6>{posRequestData?.installment_amount}</h6>
              </li>
              <li>
                <p>Repayment_duration</p>
                <h6>{posRequestData?.repayment_duration}</h6>
              </li>
              <li>
                <p>Stand_fee</p>
                <h6>{posRequestData?.stand_fee}</h6>
              </li>
              <li>
                <p>Repayment_due_date</p>
                <h6>{formatDate(posRequestData?.repayment_due_date)}</h6>
              </li>
              <li>
                <p>Remaining due date</p>
                <h6>{formatDate(posRequestData?.remaining_due_date)}</h6>
              </li>
              <li>
                <p>Repayment_due_date</p>
                <h6>{formatDate(posRequestData?.repayment_due_date)}</h6>
              </li>
              <li>
                <p>Created_at</p>
                <h6>{formatDate(posRequestData?.created_at)}</h6>
              </li>
              <li>
                <p>Updated_at</p>
                <h6>{formatDate(posRequestData?.updated_at)}</h6>
              </li>
            </ul>
          </PosRequestTable>
        )}

        {activeTab === 'pos_account' && (
          <PosRequestTable>
            <h5>Account</h5>
            <ul className='posrequest-details-list'>
              <li>
                <p>Account ID</p>
                <h6>{posRequestData?.account?.id}</h6>
              </li>
              <li>
                <p>Account number</p>
                <h6>{posRequestData?.account?.account_number}</h6>
              </li>
              <li>
                <p>Account name</p>
                <h6>{posRequestData?.account?.account_name}</h6>
              </li>
              <li>
                <p>Book balance</p>
                <h6>{posRequestData?.account?.book_balance}</h6>
              </li>
              <li>
                <p>Daily transfer limit</p>
                <h6>{posRequestData?.account?.daily_transfer_limit}</h6>
              </li>
              <li>
                <p>Block amount</p>
                <h6>{posRequestData?.account?.block_amount}</h6>
              </li>
              <li>
                <p>Account status</p>
                <h6>{posRequestData?.account?.status}</h6>
              </li>
              <li>
                <p>Account provider</p>
                <h6>{posRequestData?.account?.provider}</h6>
              </li>
              <li>
                <p>Old account</p>
                <h6>{posRequestData?.account?.old_account}</h6>
              </li>
              <li>
                <p>Interest enabled</p>
                <h6>{posRequestData?.account?.interest_enabled}</h6>
              </li>
              <li>
                <p>Overdraw enabled</p>
                <h6>{posRequestData?.account?.overdraw_enabled}</h6>
              </li>
              <li>
                <p>Created_at</p>
                <h6>{formatDate(posRequestData?.account?.created_at)}</h6>
              </li>
              <li>
                <p>Updated_at</p>
                <h6>{formatDate(posRequestData?.account?.updated_at)}</h6>
              </li>
              <li>
                <p>Deleted_at</p>
                <h6>{formatDate(posRequestData?.account?.deleted_at)}</h6>
              </li>
            </ul>
          </PosRequestTable>
        )}

        {activeTab === 'pos_type' && (
          <PosRequestTable>
            <h5>Pos Type</h5>
            <ul className='posrequest-details-list'>
              <li>
                <p>Pos Type ID</p>
                <h6>{posRequestData?.pos_type?.id}</h6>
              </li>
              <li>
                <p>Name</p>
                <h6>{posRequestData?.pos_type?.name}</h6>
              </li>
              <li>
                <p>Price</p>
                <h6>{formatCurrency(posRequestData?.pos_type?.price)}</h6>
              </li>
              <li>
                <p>Created_at</p>
                <h6>{formatDate(posRequestData?.pos_type?.created_at)}</h6>
              </li>
            </ul>
          </PosRequestTable>
        )}

        {/* 
         <div>
          <h5>Account Type</h5>
          <ul>
            <li>
              <p>Account Type ID</p>
              <h6>{posRequestData?.account?.type?.id}</h6>
            </li>
            <li>
              <p>Account Type Name</p>
              <h6>{posRequestData?.account?.type?.name}</h6>
            </li>
            <li>
              <p>Created_at</p>
              <h6>{formatDate(posRequestData?.account?.type?.created_at)}</h6>
            </li>
            <li>
              <p>Currency</p>
              <h6>{posRequestData?.account?.type?.currency}</h6>
            </li>
            <li>
              <p>Account daily transfer limit</p>
              <h6>{posRequestData?.account?.type?.daily_transfer_limit}</h6>
            </li>
            <li>
              <p>Interest rate</p>
              <h6>{posRequestData?.account?.type?.interest_rate}</h6>
            </li>
            <li>
              <p>Maintenance charge</p>
              <h6>{posRequestData?.account?.type?.maintenance_charge}</h6>
            </li>
            <li>
              <p>Minimum balance</p>
              <h6>{posRequestData?.account?.type?.maximum_balance}</h6>
            </li>
            <li>
              <p>Maximum number of accounts</p>
              <h6>
                {posRequestData?.account?.type?.maximum_number_of_accounts}
              </h6>
            </li>
          </ul>
        </div>

        
        */}
      </main>
    </section>
  );
}
