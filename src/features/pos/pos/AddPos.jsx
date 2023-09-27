import Button from '../../../ui/Button';
import CreatePosForm from './MerchantForm';
import Modal from '../../../ui/Modal';
import { useSelectPos } from './useSelectPos';
// import { usePosAvailbleTerminals } from './usePosAvailableTerminals';
import Spinner from '../../../ui/Spinner';
import { useEffect, useState } from 'react';
import { axiosPrivate } from '../../../services/axios';
import { useTerminal } from '../terminals/useTerminal';
import styled from 'styled-components';
import InstallmentForm from './InstallmentForm';
import OneOffForm from './OneOffForm';
import CcautionForm from './CcautionForm';
import MerchantForm from './MerchantForm';

const AgentButton = styled.button`
  background: none;
  border: none;
  margin-right: 2rem;
  padding: 0.2rem 1.2rem;
  cursor: pointer;
  border: 1px solid gray;
  border-radius: 6px;
  background: #ddd;
  margin-block: 1.4rem 2rem;
`;

export default function AddPos() {
  const { isLoading, terminal } = useTerminal();

  const { isSelecting, pos_pos } = useSelectPos();
  console.log(pos_pos);

  const isWorking = isLoading || isSelecting;

  if (isWorking) return <Spinner />;
  // if (isSelecting) return <Spinner />;

  return (
    <section>
      <div>
        <h4>Agent Pos Rgistration</h4>
        <Modal>
          <Modal.Open opens='installment-form'>
            <AgentButton>installment</AgentButton>
          </Modal.Open>
          <Modal.Window name='installment-form'>
            <InstallmentForm
              // isAvailable={isAvailable}
              terminal={terminal}
              isSelecting={isSelecting}
              pos_pos={pos_pos}
            />
          </Modal.Window>
          <Modal.Open opens='one-off-form'>
            <AgentButton>One-Off</AgentButton>
          </Modal.Open>
          <Modal.Window name='one-off-form'>
            <OneOffForm
              // isAvailable={isAvailable}
              terminal={terminal}
              isSelecting={isSelecting}
              pos_pos={pos_pos}
            />
          </Modal.Window>
          <Modal.Open opens='c-caution-form'>
            <AgentButton>C-Caution</AgentButton>
          </Modal.Open>
          <Modal.Window name='c-caution-form'>
            <CcautionForm
              // isAvailable={isAvailable}
              terminal={terminal}
              isSelecting={isSelecting}
              pos_pos={pos_pos}
            />
          </Modal.Window>
        </Modal>
      </div>

      <h4>Merchant Pos Rgistration</h4>
      <Modal>
        <Modal.Open opens='merchant-form'>
          <AgentButton>merchant</AgentButton>
        </Modal.Open>
        <Modal.Window name='merchant-form'>
          <MerchantForm
            // isAvailable={isAvailable}
            terminal={terminal}
            isSelecting={isSelecting}
            pos_pos={pos_pos}
          />
        </Modal.Window>
      </Modal>
    </section>
  );
}
