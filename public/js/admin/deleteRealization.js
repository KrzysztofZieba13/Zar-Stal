/*eslint-disable */

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
  realizationsToChoose.addEventListener('click', (e) => {
    const deleteRealizationBtn = e.target.closest('.delete--realization-btn');
    if (!deleteRealizationBtn) return;
    overlayDelete.classList.remove('hidden');
    modalDelete.classList.remove('hidden');
  });

  confirmDeleteBtn.addEventListener('click', () => {
    hideModal();
    console.log('USUWANIE ❌');
  });

  discardDeleteBtn.addEventListener('click', () => {
    hideModal();
  });

  overlayDelete.addEventListener('click', () => {
    hideModal();
  });
};
