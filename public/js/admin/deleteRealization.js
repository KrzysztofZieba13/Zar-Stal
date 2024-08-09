/*eslint-disable */
import axios from 'axios';
import { showAlert } from '../alert';

const realizationsToChoose = document.querySelector('.choose-realizations');
const confirmDeleteBtn = document.querySelector('.sure--confirm-btn');
const discardDeleteBtn = document.querySelector('.sure--discard-btn');
const overlayDelete = document.querySelector('.overlay--delete-realization');
const modalDelete = document.querySelector('.modal--delete-realization ');

const hideModal = () => {
  overlayDelete.classList.add('hidden');
  modalDelete.classList.add('hidden');
};

export const deleteRealization = () => {
  let realizationId = '';
  realizationsToChoose.addEventListener('click', (e) => {
    const deleteRealizationBtn = e.target.closest('.delete--realization-btn');
    if (!deleteRealizationBtn) return;
    realizationId = deleteRealizationBtn.dataset.realizationId;
    console.log(realizationId);
    overlayDelete.classList.remove('hidden');
    modalDelete.classList.remove('hidden');
  });

  confirmDeleteBtn.addEventListener('click', async () => {
    try {
      const res = await axios({
        method: 'delete',
        url: `${window.location.origin}/api/v1/realizations/realization/${realizationId}`,
      });

      showAlert('success', 'Realizacja usunięta');
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
