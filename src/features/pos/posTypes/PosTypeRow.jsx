import styled from 'styled-components';

import { formatCurrency } from '../../../utils/helpers';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import Modal from '../../../ui/Modal';
import Menus from '../../../ui/Menus';
import EditPosTypeForm from './EditPosTypeForm';
import { useSelectProvider } from './useSelectProvider';
import Spinner from '../../../ui/Spinner';

const TableRow = styled.div`
  display: grid;
  /* grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr; */
  grid-template-columns: 2.2fr 2.2fr 2.2fr 0.5fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-300);
  }
`;

const Cabin = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Price = styled.div`
  font-weight: 600;
  font-size: 1.3rem;
`;

function PosTypeRow({ postype }) {
  const { id: posTypeId, name, provider, price } = postype;
  const { isLoading, providers } = useSelectProvider();

  if (isLoading) return <Spinner />;

  return (
    <TableRow>
      <Cabin>{name}</Cabin>
      <div>{provider}</div>
      <Price>{formatCurrency(price)}</Price>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={posTypeId} />

            <Menus.List id={posTypeId}>
              <Modal.Open opens='edit'>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              {/* <Modal.Open opens='delete'>
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open> */}
            </Menus.List>

            <Modal.Window name='edit'>
              <EditPosTypeForm providers={providers} posType={postype} />
            </Modal.Window>

            {/* <Modal.Window name='delete'>
              <ConfirmDelete
                resourceName='Pos Type'
                disabled={isDeleting}
                onConfirm={() => deletePosType(posTypeId)}
              />
            </Modal.Window> */}
          </Menus.Menu>
        </Modal>
      </div>
    </TableRow>
  );
}

export default PosTypeRow;
