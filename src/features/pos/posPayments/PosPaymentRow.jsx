import styled from 'styled-components';
import { formatDate } from '../../../utils/helpers';
import { useNavigate } from 'react-router-dom';

const TableRow = styled.div`
  display: grid;
  /* grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr; */
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-300);
  }
`;

const ID = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Date = styled.div`
  text-transform: upperCase;
  font-size: 1.65rem;
  font-weight: 500;
`;

const SerialNo = styled.div`
  font-weight: 500;
  text-transform: upperCase;
  font-size: 1.6rem;
`;

const Status = styled.div`
  width: fit-content;
  font-weight: 400;
  padding: 0.3rem 1.4rem;
  border-radius: 50px;
`;

//  {
//       "id": "a121ecae-4d0b-4acd-a510-6db1a6bfef1b",
//       "pos_type_id": "cc39490f-5f90-420f-8712-9d1bc8e8fda2",
//       "account_id": "15c03587-69d0-4717-a06b-b0de5005f7de",
//       "state_id": null,
//       "country_id": null,
//       "status": "pending",
//       "address_line_one": null,
//       "address_line_two": null,
//       "city": null,
//       "delivery_option": "pickup",
//       "delivery_fee": null,
//       "paper_display_fee": "7500.00",
//       "stand_fee": "500.00",
//       "is_editable": true,
//       "is_cancellable": true,
//       "created_at": "2022-03-17T10:56:24.000000Z",
//       "updated_at": "2022-03-17T10:56:24.000000Z"
//     }
function PosPaymentRow({ pos_payment }) {
  const navigate = useNavigate();
  const {
    id: posPaymentId,
    account_id,
    state_id,
    country_id,
    city,
    delivery_option,
    delivery_fee,
    paper_display_fee,
    stand_fee,
    status,
    created_at,
  } = pos_payment;

  return (
    <TableRow>
      <ID
        onClick={() => navigate(`/pos-payments/${posPaymentId}`)}
      >{`${account_id.split('-').slice(0, 1).join('')}...`}</ID>
      <SerialNo>{state_id}</SerialNo>
      <SerialNo>{country_id}</SerialNo>
      <SerialNo>{city}</SerialNo>
      <SerialNo>{delivery_option}</SerialNo>
      <SerialNo>{delivery_fee}</SerialNo>
      <SerialNo>{paper_display_fee}</SerialNo>
      <SerialNo>{stand_fee}</SerialNo>
      <Status
        style={
          status === 'available'
            ? { backgroundColor: '#d8e9de', color: '#2eb85c' }
            : { backgroundColor: '#e9e9e9dd', color: '#888484' }
        }
      >
        {status}
      </Status>
      <Date>{formatDate(created_at)}</Date>
    </TableRow>
  );
}

export default PosPaymentRow;
