import { useState } from 'react';
import validator from 'validator';
import { MdAlternateEmail } from 'react-icons/md';
import { IoPersonOutline } from 'react-icons/io5';
import { AiFillCaretDown } from 'react-icons/ai';
import Spinner from '../../../ui/Spinner';
import InernalTable from '../../../ui/InternalTable';
import Pagination from '../../../ui/Pagination';
import ModalInternalUser from '../../../ui/ModaI-InternalUser';
import { useForm } from 'react-hook-form';

export default function InternalUsers() {
  const [isLoading, setIsLoading] = useState(false);

  const [createUserModal, setCreateUserModal] = useState(false);

  const [filterUserModal, setFilterUserModal] = useState(false);

  const { register, handleSubmit, reset, getValues } = useForm();

  // count is the length of the internerusers Array
  function handleCreateUserModal(e) {
    setCreateUserModal(false);
  }

  function handleFilterUserModal() {
    setFilterUserModal(false);
  }

  async function onSubmit(data) {
    // setIsLoading(true);
    // console.log(data);
    // await signup(data);
    // setIsLoading(false);
    reset();
    handleCreateUserModal(false);
  }

  function onError(err) {
    console.log(err);
  }

  if (isLoading) return <Spinner />;

  return (
    <section id='internal-user'>
      <div className='internal-user-nav'>
        <h3>Admin Users</h3>
        <h5 onClick={() => setCreateUserModal(true)}>Create Internal Users</h5>
        <div
          onClick={() => setFilterUserModal(true)}
          className='inter-user-filter'
        >
          <p>Advanced Filter</p>
          <AiFillCaretDown />
        </div>
      </div>
      <InernalTable />
      <Pagination count={30} />

      {createUserModal && (
        <ModalInternalUser onClose={handleCreateUserModal}>
          <main id='internalUsers-modal'>
            <h5>Create a new user</h5>
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className='new-userForm'
            >
              <label>
                <div>
                  <IoPersonOutline />
                </div>

                <input
                  type='text'
                  placeholder='First Name'
                  disabled={isLoading}
                  {...register('first_name', {
                    required: 'This field is required',
                  })}
                />
              </label>
              <p style={{ color: '#b91c1c' }}></p>

              <label>
                <div>
                  <IoPersonOutline />
                </div>

                <input
                  type='text'
                  placeholder='Last Name'
                  disabled={isLoading}
                  {...register('last_name', {
                    required: 'This field is required',
                  })}
                />
              </label>
              {/* {errors?.last_name?.message} */}
              <label>
                <div>
                  <MdAlternateEmail />
                </div>

                <input
                  type='text'
                  placeholder='Email'
                  disabled={isLoading}
                  {...register('email', {
                    required: 'This field is required',
                    validate: (value) =>
                      validator.isEmail(getValues().email) || 'wrong email',
                  })}
                />
              </label>
              {/* {errors?.email?.message} */}
              <label>
                <select
                  {...register('gender', {
                    required: 'This field is required',
                  })}
                >
                  <option value='Choose Gender'>Choose Gender</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                </select>
              </label>
              {/* {errors?.gender?.message} */}
              <label>
                <select
                  {...register('role', {
                    required: 'This field is required',
                  })}
                >
                  <option value='Select Role'>Select Role</option>
                  <option value='account manager'>account manager</option>
                  <option value='treasury'>treasury</option>
                  <option value='admin'>admin</option>
                  <option value='verification'>verification</option>
                  <option value='marketing'>marketing</option>
                  <option value='customer experience'>
                    customer experience
                  </option>
                  <option value='internal control'>internal control</option>
                  <option value='general marketer'>general marketer</option>
                  <option value='special user'>special user</option>
                  <option value='tech support'>tech support</option>
                </select>
              </label>
              <label>
                {/* {errors?.role?.message} */}
                <select
                  {...register('make_team_lead', {
                    required: 'This field is required',
                  })}
                >
                  <option value='Make Team Lead'>Make Team Lead</option>
                  <option value='yes'>yes</option>
                  <option value='no'>no</option>
                </select>
              </label>
              {/* {errors?.make_team_lead?.message} */}
              <button>Create User</button>
            </form>
          </main>
        </ModalInternalUser>
      )}

      {filterUserModal && (
        <ModalInternalUser onClose={handleFilterUserModal}>
          <main id='filterUsers-modal'>
            <h5>Advanced Filter</h5>
            <form id='filter-form'>
              <label htmlFor='email'>Email</label>
              <input id='email' type='text' disabled={isLoading} />
              <label htmlFor='name'>Name</label>
              <input id='name' type='text' disabled={isLoading} />

              <label htmlFor='status'>Account Status</label>
              <select id='status'>
                <option value='All'>All</option>
                <option value='Active'>Active</option>
                <option value='Deleted'>Deleted</option>
              </select>

              <aside>
                <button disabled={isLoading} type='reset'>
                  Reset Filter
                </button>
                <button disabled={isLoading} type='submit'>
                  Submit
                </button>
              </aside>
            </form>
          </main>
        </ModalInternalUser>
      )}
    </section>
  );
}
