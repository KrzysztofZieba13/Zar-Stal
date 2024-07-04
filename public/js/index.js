import * as galleryRealizations from './galleryRealizations';

const realizationGalleryBox = document.querySelector('.wide--screen-gallery ');

if (realizationGalleryBox) {
  console.log('galeria wykryta');
  galleryRealizations.galleryActions(realizationGalleryBox);
}
