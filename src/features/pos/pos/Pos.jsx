import PosTable from './PosTable';
import Row from '../../../ui/Row';
import AddPos from './AddPos';

function Pos() {
  return (
    <>
      <AddPos />
      <PosTable />
    </>
  );
}

export default Pos;

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
