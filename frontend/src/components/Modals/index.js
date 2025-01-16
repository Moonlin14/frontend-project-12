import AddModal from './AddModal.jsx';
import DeleteModal from './DeleteModal.jsx';
import RenameModal from './RenameModal.jsx';

const modals = {
  adding: AddModal,
  removing: DeleteModal,
  renaming: RenameModal,
};

const getModal = (modalName) => modals[modalName];

export default getModal;
