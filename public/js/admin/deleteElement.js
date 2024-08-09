/*eslint-disable */

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
  elementsToChoose.addEventListener('click', (e) => {
    const deleteElementBtn = e.target.closest('.delete--element-btn');
    if (!deleteElementBtn) return;
    overlayDelete.classList.remove('hidden');
    modalDelete.classList.remove('hidden');
  });

  confirmDeleteBtn.addEventListener('click', () => {
    hideModal();
  });

  discardDeleteBtn.addEventListener('click', () => {
    hideModal();
  });

  overlayDelete.addEventListener('click', () => {
    hideModal();
  });
};
