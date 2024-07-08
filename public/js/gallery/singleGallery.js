import Gallery from './gallery';

export default class SingleGallery extends Gallery {
  constructor(id) {
    super(id);
    this.slideIndex = 0;
    this.openGalleryByImgs =
      this.container.querySelectorAll('.realization-img');

    this.openGalleryByImgs.forEach((img) => {
      img.addEventListener('click', (e) => {
        this.slideIndex = +img.dataset.goTo;
        this._openGalleryHandler(this.slideIndex);
      });
    });
  }
}
