import { useState } from 'react';
import Spinner from '../../../ui/Spinner';
import Empty from '../../../ui/Empty';
import Pagination from '../../../ui/Pagination';
import styled from 'styled-components';
import Modal from '../../../ui/Modal';
import { usePosType } from './usePosType';
import PosTypeRow from './PosTypeRow';
import Menus from '../../../ui/Menus';
import Table from '../../../ui/Table';

const AddPosButton = styled.button`
  background: none;
  border: none;
  background-color: #2eb85c;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
`;

export default function PosTypeTable() {
  const { isLoading, posType } = usePosType();
  console.log(posType);
  if (isLoading) return <Spinner />;
  if (!posType.length) return <Empty resourceName='pos' />;
  // 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr
  return (
    <>
      <Menus>
        <Table columns='2.2fr 2.2fr 2.2fr 0.5fr'>
          <Table.Header>
            <div>Name</div>
            <div>Provider</div>
            <div>Price</div>
            <div></div>
          </Table.Header>

          <Table.Body
            // data={cabins}
            // data={filteredCabins}
            data={posType}
            render={(postype) => (
              <PosTypeRow postype={postype} key={postype.id} />
            )}
          />
        </Table>
      </Menus>
      <Pagination count={posType.length} />
    </>
  );
}
