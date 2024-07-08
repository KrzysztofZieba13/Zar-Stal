import Gallery from './gallery';

export default class ImageGallery extends Gallery {
  constructor(id) {
    super(id);
    this.openGalleryBtn = this.container.querySelector(
      '.element-see-photos-btn'
    );
    this.openGalleryByImg = this.container.querySelector(
      '.realization--cart-element__img'
    );

    this.openGalleryByImg.addEventListener('click', () =>
      this._openGalleryHandler()
    );

    this.openGalleryBtn.addEventListener('click', () =>
      this._openGalleryHandler()
    );
  }
}
