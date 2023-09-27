import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import Pagination from '../../ui/Pagination';
import styled from 'styled-components';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';
import { useAccounts } from './useAccounts';
import AccountRow from './AccountRow';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export default function AccountTable() {
  const { isLoading, accounts } = useAccounts();
  console.log(accounts);
  const [searchParams, setSearchParams] = useSearchParams();
  let page = Number(searchParams.get('page'));

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  if (isLoading) return <Spinner />;
  if (!accounts.length) return <Empty resourceName='Accounts' />;
  return (
    // 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr

    <>
      <Menus>
        <Table columns='2.2fr 1.6fr 1.2fr 1.2fr 1.2fr 1.2fr 1.1fr 10px'>
          <Table.Header id='myTable'>
            <div>Account Name</div>
            <div>Account Number</div>
            <div>Type</div>
            <div>Provider</div>
            <div>Status</div>
            <div>Book Balance(₦)</div>
            <div>Date</div>
          </Table.Header>

          <Table.Body
            data={accounts.slice(from, to)}
            render={(account) => (
              <AccountRow account={account} key={account.id} />
            )}
          />
        </Table>
      </Menus>
      <Pagination count={accounts.length} />
    </>
  );
}
