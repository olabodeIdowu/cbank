import Button from '../../../ui/Button';
import CreateInternalUserForm from './CreateInternalUserForm';
import Modal from '../../../ui/Modal';

function CreateInternalUser() {
  return (
    <div>
      <Modal>
        <Modal.Open opens='internalUser-form'>
          <Button>Create Internal Users</Button>
        </Modal.Open>
        <Modal.Window name='internalUser-form'>
          <CreateInternalUserForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default CreateInternalUser;

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
