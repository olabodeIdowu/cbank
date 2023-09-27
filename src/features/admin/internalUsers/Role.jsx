import { useState } from 'react';
import Pagination from '../../../ui/Pagination';
import Spinner from '../../../ui/Spinner';
import { RoleTable } from './Roles';
import ModalInternalUser from '../../../ui/ModaI-InternalUser';
import { useMoveBack } from '../../../hooks/useMoveBack';

export default function Role() {
  const [addPermissionsModal, setAddPermissionsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const moveBack = useMoveBack();

  function handleAddPermissionsModal() {
    setAddPermissionsModal(false);
  }

  if (isLoading) return <Spinner />;

  return (
    <section>
      <button onClick={moveBack} id='move-back'>
        <span>&larr; </span>
        Back
      </button>
      <figure id='role'>
        <div className='role-nav'>
          <div className='role-pri-header'>
            <p>Role Details</p>
          </div>
          <p className='role-sec-header'>
            Basic information about the role and its persmission
          </p>
          <ul className='role-list'>
            <li>
              <p>Role Name</p>
              <h6>account-manager</h6>
            </li>
            <li>
              <p>Description</p>
              <h6>Not Available</h6>
            </li>
          </ul>
          <h5>Permissions</h5>
          <p
            onClick={() => setAddPermissionsModal(true)}
            className='add-permission'
          >
            Add Permission
          </p>
        </div>

        <RoleTable id='role-table'>
          <thead style={{ textAlign: 'left' }}>
            <tr>
              <th>Permissions</th>
              <th>Description</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Users View Any</td>
              <td>Not Available</td>
              <td id='delete-button'>Delete</td>
            </tr>
            <tr>
              <td>Users View</td>
              <td>Not Available</td>
              <td id='delete-button'>Delete</td>
            </tr>
          </tbody>
        </RoleTable>
        <Pagination count={30} />
        {addPermissionsModal && (
          <ModalInternalUser onClose={handleAddPermissionsModal}>
            <main id='switch-team-modal'>
              <h5>Add Permissions to Internal User</h5>
              <form id='switch-team-form'>
                <select id='status'>
                  <option value='Select Permission'>Select Permission</option>
                  <option value='Users View Any'>Users View Any</option>
                  <option value='Users View'>Users View</option>
                </select>

                <button>Add Permission</button>
              </form>
            </main>
          </ModalInternalUser>
        )}
      </figure>
    </section>
  );
}
