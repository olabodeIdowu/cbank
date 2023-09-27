import Spinner from '../../../ui/Spinner';
import Empty from '../../../ui/Empty';
import Pagination from '../../../ui/Pagination';
import styled from 'styled-components';
import { usePosRequest } from './usePosRequest';
import PosRequestRow from './PosRequestRow';
import Menus from '../../../ui/Menus';
import Table from '../../../ui/Table';

export default function PosRequestTable() {
  const { isLoading, posRequest } = usePosRequest();
  console.log(posRequest);
  if (isLoading) return <Spinner />;
  if (!posRequest.length) return <Empty resourceName='Pos Request' />;
  return (
    <>
      <Menus>
        <Table columns='1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'>
          <Table.Header>
            <div>ID</div>
            <div>City</div>
            <div>Status</div>
            <div>Delivery option</div>
            <div>Delivery fee</div>
            <div>Date</div>
            <div>Installment amount</div>
            <div>Pos payment method</div>
            <div></div>
          </Table.Header>

          <Table.Body
            // data={cabins}
            // data={filteredCabins}
            data={posRequest}
            render={(pos_request) => (
              <PosRequestRow pos_request={pos_request} key={pos_request.id} />
            )}
          />
        </Table>
      </Menus>
      <Pagination count={posRequest.length} />
    </>
  );
}
