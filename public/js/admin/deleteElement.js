/*eslint-disable */
import axios from 'axios';
import { showAlert } from '../alert';

const elementsToChoose = document.querySelector('.choose-elements');
const confirmDeleteBtn = document.querySelector('.sure--confirm-btn');
const discardDeleteBtn = document.querySelector('.sure--discard-btn');
const overlayDelete = document.querySelector('.overlay--delete-element');
const modalDelete = document.querySelector('.modal--delete-element ');

const hideModal = () => {
  overlayDelete.classList.add('hidden');
  modalDelete.classList.add('hidden');
};

export const deleteElement = () => {
  let elementID = '';
  elementsToChoose.addEventListener('click', (e) => {
    const deleteElementBtn = e.target.closest('.delete--element-btn');
    if (!deleteElementBtn) return;
    elementID = deleteElementBtn.dataset.elementId;
    overlayDelete.classList.remove('hidden');
    modalDelete.classList.remove('hidden');
  });

  confirmDeleteBtn.addEventListener('click', async () => {
    try {
      const res = await axios({
        method: 'delete',
        url: `${window.location.origin}/api/v1/elements/element/${elementID}`,
      });
      showAlert('success', 'Element usunięty');
      hideModal();
      setTimeout(function () {
        location.reload();
      }, 2000);
    } catch (err) {
      showAlert('error', err.message);
    }
  });

  discardDeleteBtn.addEventListener('click', () => {
    hideModal();
  });

  overlayDelete.addEventListener('click', () => {
    hideModal();
  });
};
