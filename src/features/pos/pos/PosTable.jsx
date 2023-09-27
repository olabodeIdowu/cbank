import Spinner from '../../../ui/Spinner';
import Empty from '../../../ui/Empty';
import Pagination from '../../../ui/Pagination';
import styled from 'styled-components';
import { usePos } from './usePos';
import PosRow from './PosRow';
import Menus from '../../../ui/Menus';
import Table from '../../../ui/Table';

export default function PosTable() {
  const { isLoading, pos } = usePos();
  console.log(pos);

  if (isLoading) return <Spinner />;
  if (!pos.length) return <Empty resourceName='Pos' />;
  return (
    // 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr

    <>
      <Menus>
        <Table columns='1fr 1fr 1fr 1fr 1fr 1fr 1fr'>
          <Table.Header>
            <div>Account Number</div>
            <div>Pos Type</div>
            <div>Terminal ID</div>
            <div>Client</div>
            <div>Payment Method</div>
            <div>Active</div>
            <div>Date</div>
          </Table.Header>

          <Table.Body
            // data={cabins}
            // data={filteredCabins}
            data={pos}
            render={(pos) => <PosRow pos={pos} key={pos.id} />}
          />
        </Table>
      </Menus>
      <Pagination count={pos.length} />
    </>
  );
}
