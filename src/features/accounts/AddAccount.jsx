import { AiFillCaretDown } from 'react-icons/ai';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import Spinner from '../../ui/Spinner';
import FilterAccountForm from './FilterAccountForm';
import styled from 'styled-components';
import { HiPencil } from 'react-icons/hi2';

export default function AddAccount() {
  return (
    <div>
      <Modal>
        <Modal.Open opens='account-form'>
          <Button
            style={{
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            Advanced Filter
            <span>
              <AiFillCaretDown />
            </span>
          </Button>
        </Modal.Open>
        <Modal.Window name='account-form'>
          <FilterAccountForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
