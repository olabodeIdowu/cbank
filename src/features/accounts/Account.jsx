import { useRef } from 'react';
import AccountTable from './AccountTable';
import AddAccount from './AddAccount';
import styled from 'styled-components';

const AccountHeader = styled.h4`
  padding-block: 1rem 1rem;
  border-bottom: 1px solid #adabab;
  font-size: 2.2rem;
  font-weight: 500;
  margin-bottom: 1.8rem;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 1rem;
  margin-block: 1rem 1.8rem;
  & input {
    border: none;
    padding: 0.8rem 4rem 0.8rem 1rem;
    background: none;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
    background-color: white;
  }
`;
function Account() {
  const myInput = useRef(null);
  // ------------------------>
  //search table
  //------------------------->

  function filter() {
    // Declare variables
    let filter, table, tr, td, i, txtValue;
    filter = myInput.current.value.toUpperCase();
    table = document.getElementById('myTable');
    tr = document.querySelectorAll('.tablerow');
    console.log(filter, table, tr);

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i];
      if (td) {
        txtValue = td.textContent || td.textContent;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  }

  return (
    <>
      <AccountHeader>Accounts</AccountHeader>
      <Filter>
        <label>Filter</label>
        <input
          onChange={() => filter()}
          ref={myInput}
          type='text'
          placeholder='type string'
        />
      </Filter>
      <AddAccount />
      <AccountTable />
    </>
  );
}

export default Account;
