import styled from 'styled-components';
import Pagination from '../../../ui/Pagination';
import { useState } from 'react';
import Spinner from '../../../ui/Spinner';

const RoleTable = styled.table`
  font-family: sans-serif;
  border-collapse: collapse;
  margin: 25px 0;
  width: 70%;
  border-radius: 5px 5px 0 0;
  overflow: hidden;

  & th,
  td {
    padding: 1rem 2rem;
  }

  & tbody,
  tr {
    border-bottom: 1px solid #dddddd;
  }
  & th {
    color: #222;
    font-weight: 500;
    font-size: 1.55rem;
  }
  & td {
    color: #666;
    font-size: 1.35rem;
  }
  & tbody tr:last-of-type {
    /* border-bottom: 2px solid #dddddd; */
  }
`;
export default function Permissions() {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <Spinner />;

  return (
    <section id='roles'>
      <div className='roles-nav'>
        <h5>All Permissions</h5>
      </div>
      <RoleTable>
        <thead style={{ textAlign: 'left' }}>
          <tr>
            <th>Permissions</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <div>
            <div id='emptyTd'></div>
            <div id='emptyTd'></div>
          </div>
          <tr>
            <td>Users View Any</td>
            <td>Not Available</td>
          </tr>
          <tr>
            <td>Users View</td>
            <td>Not Available</td>
          </tr>
          <tr>
            <td>Accounts View Any</td>
            <td>Not Available</td>
          </tr>
        </tbody>
      </RoleTable>
      <Pagination count={30} />
    </section>
  );
}
