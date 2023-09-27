import { useState } from 'react';
import Spinner from '../../../ui/Spinner';
import Empty from '../../../ui/Empty';
import Pagination from '../../../ui/Pagination';
import styled from 'styled-components';
import Modal from '../../../ui/Modal';
import { useTerminal } from './useTerminal';
import TerminalRow from './TerminalRow';
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

export default function TerminalTable() {
  const { isLoading, terminal } = useTerminal();
  console.log(terminal);

  if (isLoading) return <Spinner />;
  if (!terminal.length) return <Empty resourceName='Terminal' />;
  return (
    // 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr
    <>
      <Menus>
        <Table columns='2fr 2fr 2fr 2fr 2fr 2fr 0.5fr'>
          <Table.Header>
            <div>Name</div>
            <div>Serial Number</div>
            <div>Price</div>
            <div>Status</div>
            <div>State</div>
            <div>Date</div>
            <div></div>
          </Table.Header>

          <Table.Body
            // data={cabins}
            // data={filteredCabins}
            data={terminal}
            render={(terminal) => (
              <TerminalRow terminal={terminal} key={terminal.id} />
            )}
          />
        </Table>
      </Menus>
      <Pagination count={terminal.length} />
    </>
  );
}
