import styled from 'styled-components';
import { formatDate } from '../../../utils/helpers';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import Modal from '../../../ui/Modal';
import Menus from '../../../ui/Menus';
import { useNavigate } from 'react-router-dom';
import EditPosForm from './EditPosForm';

const TableRow = styled.div`
  display: grid;
  /* grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr; */
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
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

function PosRow({ pos }) {
  const navigate = useNavigate();
  const {
    id: posId,
    account_number,
    pos_type,
    terminal_id,
    client,
    pos_payment_method,
    is_active,
    created_at,
  } = pos;

  return (
    <TableRow>
      <ID onClick={() => navigate(`/pos/${posId}`)}>
        {pos?.account?.account_number}
      </ID>
      <SerialNo>{pos?.type?.name}</SerialNo>
      <SerialNo>{terminal_id}</SerialNo>
      <SerialNo>{client}</SerialNo>
      <SerialNo>{pos_payment_method}</SerialNo>
      <SerialNo>{`${is_active}`}</SerialNo>
      <SerialNo>{formatDate(created_at)}</SerialNo>
    </TableRow>
  );
}

export default PosRow;
