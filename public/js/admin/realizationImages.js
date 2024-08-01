/*eslint-disable */
const currentImages = document.querySelector('.choose--images-delete');

const deleteImagesSet = new Set();

export const init = () => {
  currentImages.addEventListener('click', (e) => {
    const imageSelected = e.target.closest('.img-box');
    imageSelected.querySelector('.trash--on-image').classList.toggle('visible');
  });
};
