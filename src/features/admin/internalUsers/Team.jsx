import { useRef, useState } from 'react';
import Pagination from '../../../ui/Pagination';
import InternalTable from '../../../ui/InternalTable';
import ModalInternalUser from '../../../ui/ModaI-InternalUser';
import Spinner from '../../../ui/Spinner';

export default function Team() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const passkey = useRef(null);
  const [switchTeamModal, setSwitchTeamModal] = useState(false);

  function handleShowPassword() {
    if (passkey.current.type === 'password') {
      passkey.current.type = 'text';
    } else if (passkey.current.type === 'text') {
      passkey.current.type = 'password';
    }
    setShowPassword(!showPassword);
  }

  function handleSwitchTeamModal() {
    setSwitchTeamModal(false);
  }

  if (isLoading) return <Spinner />;

  return (
    <section id='switch-team'>
      <div className='switch-team-nav'>
        <h3>Teams</h3>
        <h5 onClick={() => setSwitchTeamModal(true)}>Switch Team</h5>
      </div>
      <InternalTable />
      <Pagination count={30} />
      {switchTeamModal && (
        <ModalInternalUser onClose={handleSwitchTeamModal}>
          <main id='switch-team-modal'>
            <h5>Switch Users or Accounts between Teams</h5>
            <form id='switch-team-form'>
              <select id='status'>
                <option value='Select Team'>Select Team</option>
                <option value="test manager2's Clients">
                  test manager2's Clients
                </option>
                <option value="test manager's Clients">
                  test manager's Clients
                </option>
              </select>
              <input
                id='enter-email'
                type='email'
                disabled={false}
                placeholder='Enter Email'
              />
              <label>
                <input
                  ref={passkey}
                  type='password'
                  disabled={false}
                  placeholder='Enter Password'
                />
                <p onClick={handleShowPassword}>
                  {showPassword ? 'Hide' : 'Show'}
                </p>
              </label>
              <button>Switch Account</button>
            </form>
          </main>
        </ModalInternalUser>
      )}
    </section>
  );
}
