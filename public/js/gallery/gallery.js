/*eslint-disable */

export default class Gallery {
  constructor(id) {
    this.container = document.getElementById(id);
    this.gallery = this.container.querySelector('.wide--screen-gallery');
    this.galleryDots = this.container.querySelectorAll('.gallery-dot');
    this.nextButton = this.container.querySelector('.gallery--btn-next');
    this.prevButton = this.container.querySelector('.gallery--btn-prev');
    this.overlay = this.container.querySelector('.overlay');
    this.closeGalleryBtn = this.container.querySelector('.gallery--btn-close');
    this.slideIndex = 0;
    this.slides = this.container.querySelectorAll('.realization--gallery-img');
    this.maxSlide = this.slides.length;

    this.nextButton.addEventListener('click', () => {
      this.nextSlide();
    });

    this.prevButton.addEventListener('click', () => {
      this.prevSlide();
    });

    this.galleryDots.forEach((dot) => {
      dot.addEventListener('click', () => {
        this.slideIndex = +dot.dataset.goTo;
        this._changeSlideAndDot(this.slideIndex);
      });
    });

    this.closeGalleryBtn.addEventListener('click', () =>
      this._closeGalleryHandler(),
    );

    this.overlay.addEventListener('click', () => this._closeGalleryHandler());
  }

  _openGalleryHandler(curSlide = 0) {
    this.slideIndex = curSlide;
    this.gallery.classList.remove('hidden');
    this.overlay.classList.remove('hidden');
    this._changeSlideAndDot(this.slideIndex);
    document.addEventListener('keydown', this._keyDownHandler);
  }

  _closeGalleryHandler() {
    this.gallery.classList.add('hidden');
    this.overlay.classList.add('hidden');
    document.removeEventListener('keydown', this._keyDownHandler);
  }

  nextSlide() {
    if (this.slideIndex === this.maxSlide - 1) this.slideIndex = 0;
    else this.slideIndex++;

    this._changeSlideAndDot(this.slideIndex);
  }

  prevSlide() {
    if (this.slideIndex === 0) this.slideIndex = this.maxSlide - 1;
    else this.slideIndex--;

    this._changeSlideAndDot(this.slideIndex);
  }

  _activateDot(curSlide) {
    this.galleryDots.forEach((dot) => {
      dot.classList.remove('gallery-active');
      if (+dot.dataset.goTo === curSlide) dot.classList.add('gallery-active');
    });
  }

  _goToSlide(curSlide) {
    this.slides.forEach((slide) => {
      slide.classList.remove('gallery-active');
      if (+slide.dataset.realizationImg === curSlide)
        slide.classList.add('gallery-active');
    });
  }

  _changeSlideAndDot(curSlide) {
    this._goToSlide(curSlide);
    this._activateDot(curSlide);
  }

  _keyDownHandler = (e) => {
    if (e.key === 'ArrowRight') {
      this.nextSlide();
    }
    if (e.key === 'ArrowLeft') {
      this.prevSlide();
    }
    if (e.key === 'Escape') {
      this._closeGalleryHandler();
    }
  };
}
