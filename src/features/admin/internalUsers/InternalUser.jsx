import { useRef, useState } from 'react';
import Pagination from '../../../ui/Pagination';
import Spinner from '../../../ui/Spinner';
import { RoleTable } from './Roles';
import ModalInternalUser from '../../../ui/ModaI-InternalUser';
import { useMoveBack } from '../../../hooks/useMoveBack';
import { AiOutlineDelete } from 'react-icons/ai';

export default function InternalUser() {
  const passkey = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [addPermissionsModal, setAddPermissionsModal] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [addRoleModal, setAddRoleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const moveBack = useMoveBack();

  function handleShowPassword() {
    if (passkey.current.type === 'password') {
      passkey.current.type = 'text';
    } else if (passkey.current.type === 'text') {
      passkey.current.type = 'password';
    }
    setShowPassword(!showPassword);
  }

  function handleDeleteUserModal() {
    setDeleteUserModal(false);
  }

  function handleAddRoleModal() {
    setAddRoleModal(false);
  }

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
      <figure id='internalUser'>
        <div className='internalUser-nav'>
          <div className='internalUser-pri-header'>
            <p>Internal User Information</p>
          </div>

          <div className='delete-user_svg'>
            <h4>User Information</h4>
            <div id='delete-svg' onClick={() => setDeleteUserModal(true)}>
              <AiOutlineDelete />
            </div>
          </div>

          <p className='internalUser-sec-header'>
            Basic information about the role and its persmission
          </p>
          <ul className='internalUser-list'>
            <li>
              <p>Name</p>
              <h6>Test Manager2</h6>
            </li>
            <li>
              <p>Gender</p>
              <h6>Male</h6>
            </li>
            <li>
              <p>Email</p>
              <h6>testmanager@net.com</h6>
            </li>
            <li>
              <p>Phone Number</p>
              <h6>Not Available</h6>
            </li>
            <li>
              <p>Role</p>
              <h6>Not Available</h6>
            </li>
            <li>
              <p>Date Created</p>
              <h6>20-Aug-2023</h6>
            </li>
          </ul>
          <ul className='internalUser-tabs'>
            <li
              onClick={() => setDeleteUserModal(true)}
              className='delete-user'
            >
              Delete User
            </li>
            <li onClick={() => setAddRoleModal(true)} className='add-role'>
              Add Role
            </li>
            <li
              onClick={() => setAddPermissionsModal(true)}
              className='add-permission'
            >
              Add Permission
            </li>
          </ul>
        </div>

        <h5>Internal User Roles</h5>

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

        <h5>Internal User Permissions</h5>
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

        {deleteUserModal && (
          <ModalInternalUser onClose={handleDeleteUserModal}>
            <main id='switch-team-modal'>
              <h5 style={{ background: '#eec5c5' }}>
                Delete Internal Dashboard User
              </h5>
              <form id='switch-team-form'>
                <label>
                  <input
                    ref={passkey}
                    type='password'
                    disabled={false}
                    placeholder='Enter Password to Delete Account'
                  />
                  <p onClick={handleShowPassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </p>
                </label>

                <button style={{ background: '#df3131' }}>Delete User</button>
              </form>
            </main>
          </ModalInternalUser>
        )}

        {addRoleModal && (
          <ModalInternalUser onClose={handleAddRoleModal}>
            <main id='switch-team-modal'>
              <h5>Add Roles to Internal User</h5>
              <form id='switch-team-form'>
                <select id='status'>
                  <option value='Select Permission'>Select Role</option>
                  <option value='Users View Any'>Users View Any</option>
                  <option value='Users View'>Users View</option>
                </select>
                <button>Add Role</button>
              </form>
            </main>
          </ModalInternalUser>
        )}

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
