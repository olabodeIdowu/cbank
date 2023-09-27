import Spinner from '../../../ui/Spinner';
import Empty from '../../../ui/Empty';
import Pagination from '../../../ui/Pagination';
import styled from 'styled-components';
import { usePosPayment } from './usePosPayment';
import Menus from '../../../ui/Menus';
import Table from '../../../ui/Table';
import PosPaymentRow from './PosPaymentRow';

export default function PosPaymentTable() {
  const { isLoading, posPayment } = usePosPayment();
  console.log(posPayment);
  if (isLoading) return <Spinner />;
  if (!posPayment.length) return <Empty resourceName='Pos Payment' />;
  return (
    // 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr

    <>
      <Menus>
        <Table columns='1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'>
          <Table.Header>
            <div>ID</div>
            <div>City</div>
            <div>State</div>
            <div>Country</div>
            <div>Status</div>
            <div>Delivery option</div>
            <div>Delivery fee</div>
            <div>Paper display fee</div>
            <div>Stand_fee</div>
            <div>Date</div>
          </Table.Header>

          <Table.Body
            // data={cabins}
            // data={filteredCabins}
            data={posPayment}
            render={(pos_payment) => (
              <PosPaymentRow pos_Payment={pos_payment} key={pos_payment.id} />
            )}
          />
        </Table>
      </Menus>
      <Pagination count={posPayment.length} />
    </>
  );
}
