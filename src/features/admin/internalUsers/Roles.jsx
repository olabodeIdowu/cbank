import styled from 'styled-components';
import Pagination from '../../../ui/Pagination';
import { useState } from 'react';
import Spinner from '../../../ui/Spinner';
import { useNavigate } from 'react-router-dom';

export const RoleTable = styled.table`
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
  & th {
    color: #222;
    font-weight: 500;
    font-size: 1.55rem;
  }
  & td {
    color: #666;
    font-size: 1.35rem;
  }

  & tbody,
  tr {
    border-bottom: 1px solid #dddddd;
  }

  & tbody tr:hover {
    background-color: #f3f3f3;
  }
`;

export default function Roles() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  return (
    <section id='roles'>
      <div className='roles-nav'>
        <h5>Current Roles</h5>
      </div>
      <RoleTable>
        <thead style={{ textAlign: 'left' }}>
          <tr>
            <th>Roles</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={() => navigate('/roles/1')}>
            <td>Account Manager</td>
            <td>Not Available</td>
          </tr>
          <tr onClick={() => navigate('/roles/2')}>
            <td>Treasury</td>
            <td>Not Available</td>
          </tr>
        </tbody>
      </RoleTable>
      <Pagination count={30} />
    </section>
  );
}
