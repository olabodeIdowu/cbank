import styled from 'styled-components';
import { formatDate } from '../../utils/helpers';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import Menus from '../../ui/Menus';
import { useNavigate } from 'react-router-dom';
import EditAccountForm from './EditAccountForm';

const TableRow = styled.div`
  display: grid;
  /* grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr; */
  grid-template-columns: 2.2fr 1.6fr 1.2fr 1.2fr 1.2fr 1.2fr 1.2fr 10px;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-300);
  }
`;

const AccountName = styled.div`
  font-size: 1.6rem;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Date = styled.div`
  text-transform: upperCase;
  color: #333;
  font-weight: 1.6rem;
`;

const AccountNumber = styled.div`
  font-size: 1.6rem;
`;

const Status = styled.div`
  width: fit-content;
  font-weight: 400;
  padding: 0.3rem 1rem;
  border-radius: 6px;
`;

const Type = styled.div`
  font-size: 1.5rem;
`;
const BookBalance = styled.div`
  font-size: 1.5rem;
`;
const Provider = styled.div`
  font-size: 1.5rem;
`;

function AccountRow({ account }) {
  const navigate = useNavigate();
  const {
    id: accountId,
    account_name,
    account_number,
    book_balance,
    provider,
    status,
    created_at,
  } = account;

  return (
    <TableRow className='tablerow'>
      <AccountName onClick={() => navigate(`/accounts/${accountId}`)}>
        {account_name}
      </AccountName>
      <AccountNumber>{account_number}</AccountNumber>
      <Type>{account?.type?.name}</Type>
      <Provider>{provider}</Provider>
      <Status
        style={
          status === 'active'
            ? { backgroundColor: '#2eb85c', color: '#ffffff' }
            : { backgroundColor: '#e9e9e9dd', color: '#888484' }
        }
      >
        {status}
      </Status>
      {/* <PND>{post_no_debit_enabled}</PND> */}
      <BookBalance>{book_balance}</BookBalance>
      <Date>{formatDate(created_at)}</Date>
    </TableRow>
  );
}

export default AccountRow;
