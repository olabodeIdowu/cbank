import styled from 'styled-components';
import { formatDate } from '../../../utils/helpers';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import Modal from '../../../ui/Modal';
import Menus from '../../../ui/Menus';
import ConfirmDelete from '../../../ui/ConfirmDelete';
import EditTerminalForm from './EditTerminalForm';
import { useDeleteTerminal } from './useDeleteTerminal';
import { useNavigate } from 'react-router-dom';
import { useSelectProperty } from './useSelectProperty';
import Spinner from '../../../ui/Spinner';

const TableRow = styled.div`
  display: grid;
  /* grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr; */
  grid-template-columns: 2fr 2fr 2fr 2fr 2fr 2fr 0.5fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-300);
  }
`;

const PosType = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
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
  font-size: 1.6rem;
  color: #555;
`;

const State = styled.div`
  font-size: 1.6rem;
  color: #555;
`;

const Price = styled.div`
  font-size: 1.6rem;
  color: #333;
`;

const Status = styled.div`
  width: fit-content;
  font-weight: 400;
  padding: 0.3rem 1rem;
  border-radius: 6px;
`;

function TerminalRow({ terminal }) {
  const { isLoading, property } = useSelectProperty();
  const navigate = useNavigate();
  const { id: terminalId, serial_number, status, created_at } = terminal;

  console.log(terminal);

  const { isDeleting, deleteTerminal } = useDeleteTerminal();

  if (isLoading) return <Spinner />;

  return (
    <TableRow>
      <PosType onClick={() => navigate(`/terminal/${terminalId}`)}>
        {terminal?.type?.name}
      </PosType>
      <SerialNo>{serial_number}</SerialNo>
      <Price>{terminal?.type?.price}</Price>
      <Status
        style={
          status === 'available'
            ? { backgroundColor: '#2eb85c', color: '#ffffff' }
            : { backgroundColor: '#e9e9e9dd', color: '#888484' }
        }
      >
        {status}
      </Status>
      <State>{terminal?.state?.name}</State>
      <Date>{formatDate(created_at)}</Date>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={terminalId} />

            <Menus.List id={terminalId}>
              <Modal.Open opens='edit'>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens='delete'>
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name='edit'>
              <EditTerminalForm property={property} terminal={terminal} />
            </Modal.Window>

            <Modal.Window name='delete'>
              <ConfirmDelete
                resourceName='Terminal'
                disabled={isDeleting}
                onConfirm={() => deleteTerminal(terminalId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </TableRow>
  );
}

export default TerminalRow;
