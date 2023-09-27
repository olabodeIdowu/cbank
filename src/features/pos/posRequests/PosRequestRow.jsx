import styled from 'styled-components';
import { formatDate } from '../../../utils/helpers';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import Modal from '../../../ui/Modal';
import Menus from '../../../ui/Menus';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import { useDeletePosRequest } from './useDeletePosRequest';
import { useNavigate } from 'react-router-dom';
import EditPosRequestForm from './EditPosRequestForm';

const TableRow = styled.div`
  display: grid;
  /* grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr; */
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
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
  font-size: 1.3rem;
`;

const Status = styled.div`
  width: fit-content;
  font-weight: 400;
  padding: 0.3rem 1.4rem;
  border-radius: 50px;
`;

function PosRequestRow({ pos_request }) {
  const navigate = useNavigate();
  const {
    id: posRequestId,
    account_id,
    city,
    delivery_option,
    pos_payment_method,
    delivery_fee,
    installment_amount,
    status,
    created_at,
  } = pos_request;

  const { isDeleting, deletePosRequest } = useDeletePosRequest();

  return (
    <TableRow>
      <ID
        onClick={() => navigate(`/pos-request/${posRequestId}`)}
      >{`${account_id.split('-').slice(0, 1).join('')}...`}</ID>
      <SerialNo>{city}</SerialNo>
      <Status
        style={
          status === 'dispatched'
            ? { backgroundColor: '#edf4f0', color: '#2eb85c' }
            : status === 'delivered'
            ? { backgroundColor: '#edf4f0', color: '#0d4720' }
            : status === 'processed'
            ? { backgroundColor: '#edf4f0', color: 'blue' }
            : status === 'processing'
            ? { backgroundColor: '#edf4f0', color: 'red' }
            : { backgroundColor: '#e9e9e9dd', color: '#888484' }
        }
      >
        {status}
      </Status>
      <SerialNo>{delivery_option}</SerialNo>
      <SerialNo>{delivery_fee}</SerialNo>

      <Date>{formatDate(created_at)}</Date>

      <SerialNo>{installment_amount}</SerialNo>
      <SerialNo>{pos_payment_method}</SerialNo>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={posRequestId} />

            <Menus.List id={posRequestId}>
              <Modal.Open opens='edit'>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens='delete'>
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name='edit'>
              <EditPosRequestForm pos_request={pos_request} />
            </Modal.Window>

            <Modal.Window name='delete'>
              <ConfirmDelete
                resourceName='Pos Request'
                disabled={isDeleting}
                onConfirm={() => deletePosRequest(posRequestId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </TableRow>
  );
}

export default PosRequestRow;
