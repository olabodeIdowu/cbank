import Modal from '../../ui/Modal';
import SpinnerMini from '../../ui/SpinnerMini';

export default function DeleteAccountForm({ onCloseModal }) {
  return (
    <Modal onClose={onCloseModal}>
      <main id='pos--modal'>
        <div className='modal-nav'>
          <button
            onClick={() => onCloseModal()}
            className='cancel-modal'
            type='reset'
          >
            cancel
          </button>

          <h5 className=''>Edit Account</h5>
        </div>

        <main>
          <form id='form'>
            <main id='input-form'>
              <main id='input-form'>
                <h6 className='input-form--header'>Daily Transfer Limit</h6>
                <input
                  type='text'
                  // name='daily_transfer_limit'
                  // value={Number(accountForm.daily_transfer_limit)}
                  // onChange={handleAccountChange}
                  // disabled={isEditingAccount}
                />
              </main>

              <figure id='inputForm-checkbox'>
                <input
                  type='checkbox'
                  // name='interest_status'
                  // checked={accountForm.interest_status}
                  // disabled={isEditingAccount}
                  // onChange={handleAccountChange}
                />
                <h6 className='input-form--header'>Interest Status</h6>
              </figure>
            </main>
            <button>
              {/* {isDeletingAccount ? <SpinnerMini /> : 'Edit Account'} */}
              Edit
            </button>
          </form>
        </main>
      </main>
    </Modal>
  );
}
