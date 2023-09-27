import Button from '../../../ui/Button';
import CreatePosTypeForm from './CreatePosTypeForm';
import Modal from '../../../ui/Modal';
import { useSelectProvider } from './useSelectProvider';
import Spinner from '../../../ui/Spinner';

export default function AddPosType() {
  const { isLoading, providers } = useSelectProvider();
  if (isLoading) return <Spinner />;
  return (
    <div>
      <Modal>
        <Modal.Open opens='postype-form'>
          <Button style={{ marginBottom: '2rem' }}>Add new pos type</Button>
        </Modal.Open>
        <Modal.Window name='postype-form'>
          <CreatePosTypeForm providers={providers} />
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
