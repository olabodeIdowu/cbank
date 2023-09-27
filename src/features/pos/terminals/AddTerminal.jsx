import Button from '../../../ui/Button';
import CreateTerminalForm from './CreateTerminalForm';
import Modal from '../../../ui/Modal';
import { useSelectProperty } from './useSelectProperty';
import Spinner from '../../../ui/Spinner';
import { useTerminal } from './useTerminal';

export default function AddTerminal() {
  const { isLoading, property } = useSelectProperty();

  if (isLoading) return <Spinner />;
  return (
    <div>
      <Modal>
        <Modal.Open opens='terminal-form'>
          <Button style={{ marginBottom: '2rem' }}>Add new Terminal</Button>
        </Modal.Open>
        <Modal.Window name='terminal-form'>
          <CreateTerminalForm property={property} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }
