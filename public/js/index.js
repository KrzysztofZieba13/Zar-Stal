import * as galleryRealizations from './galleryRealizations';
import * as galleryElements from './galleryElements';
import * as nav from './nav';

const realizationGalleryBox = document.querySelector('.wide--screen-gallery ');
const sectionSteelElements = document.querySelector(
  '.section--realizations-elements'
);
const navBar = document.querySelector('.nav-container');

// GALLERY FOR ONE REALIZATION
if (realizationGalleryBox) {
  galleryRealizations.galleryActions(realizationGalleryBox);
}

// GALLERY FOR MANY REALIZATIONS
document.addEventListener('DOMContentLoaded', () => {
  const openGalleryByImage = document.querySelectorAll(
    '.realization--cart-element__img'
  );

  const seePhotosButtons = document.querySelectorAll('.element-see-photos-btn');

  openGalleryByImage.forEach((imageAsBtn) => {
    imageAsBtn.addEventListener('click', (e) => {
      const gallery = e.target
        .closest('.realization-cart')
        .querySelector('.wide--screen-galleryElements');
      gallery.classList.remove('hidden');
      gallery.querySelector('.overlay').classList.remove('hidden');
      galleryElements.galleryElementsActions(gallery);
    });
  });

  seePhotosButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const gallery = e.target
        .closest('.realization-cart')
        .querySelector('.wide--screen-galleryElements');
      gallery.classList.remove('hidden');
      gallery.querySelector('.overlay').classList.remove('hidden');
      galleryElements.galleryElementsActions(gallery);
    });
  });
});

if (navBar) {
}
