//TODO: REFACTORE THIS AND FROM 'galleryRealizations.js'!!!!!!
export const galleryElementsActions = (gallery) => {
  const nextBtn = gallery.querySelector('.gallery--btn-next');
  const prevBtn = gallery.querySelector('.gallery--btn-prev');
  const galleryImages = gallery.querySelectorAll('.realization--gallery-img');
  const closeBtn = gallery.querySelector('.gallery--btn-close ');
  const overlay = gallery.querySelector('.overlay');
  const dotsButtons = gallery.querySelector('.gallery-counter');

  const closeGalleryHandler = (gallery) => {
    gallery.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  const updateNavButtonsHandler = (nextValue, prevValue) => {
    nextBtn.dataset.goTo = nextValue;
    prevBtn.dataset.goTo = prevValue;
  };

  const showSlide = (goToSlide, direction, galleryImgs) => {
    galleryImgs.forEach((el) => el.classList.remove('gallery-active'));

    if (+goToSlide > galleryImgs.length) {
      console.log('jest wiekszy');
      updateNavButtonsHandler(2, 0);
      dotsButtons.querySelectorAll('.gallery-dot').forEach((el) => {
        el.classList.remove('gallery-active');
        if (+el.dataset.goTo === 1) el.classList.add('gallery-active');
      });
      return galleryImgs[0].classList.add('gallery-active');
    }
    if (+goToSlide < 1) {
      console.log('jest mniejszy');
      updateNavButtonsHandler(galleryImgs.length + 1, galleryImgs.length - 1);
      dotsButtons.querySelectorAll('.gallery-dot').forEach((el) => {
        el.classList.remove('gallery-active');
        if (+el.dataset.goTo === galleryImages.length)
          el.classList.add('gallery-active');
      });
      return galleryImgs[galleryImgs.length - 1].classList.add(
        'gallery-active'
      );
    }

    console.log('aktualny slide ' + goToSlide);
    galleryImgs[+goToSlide - 1].classList.add('gallery-active');

    if (direction === 'next')
      updateNavButtonsHandler(
        +nextBtn.dataset.goTo + 1,
        +prevBtn.dataset.goTo + 1
      );
    if (direction === 'prev')
      updateNavButtonsHandler(
        +nextBtn.dataset.goTo - 1,
        +prevBtn.dataset.goTo - 1
      );
    if (direction === 'selected')
      updateNavButtonsHandler(+goToSlide + 1, +goToSlide - 1);

    dotsButtons.querySelectorAll('.gallery-dot').forEach((el) => {
      el.classList.remove('gallery-active');
      if (+goToSlide === +el.dataset.goTo) el.classList.add('gallery-active');
    });
  };

  nextBtn.addEventListener('click', (e) => {
    const goTo = e.target.closest('.gallery--btn-next').dataset.goTo;
    showSlide(goTo, 'next', galleryImages);
  });

  prevBtn.addEventListener('click', (e) => {
    const goTo = e.target.closest('.gallery--btn-prev').dataset.goTo;
    showSlide(goTo, 'prev', galleryImages);
  });

  // KEYBOARD BUTTONS
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeGalleryHandler(gallery);
    if (e.key === 'ArrowRight') {
      let goTo = nextBtn.dataset.goTo;
      showSlide(goTo, 'next', galleryImages);
    }
    if (e.key === 'ArrowLeft') {
      let goTo = prevBtn.dataset.goTo;
      showSlide(goTo, 'prev', galleryImages);
    }
  });

  dotsButtons.addEventListener('click', (e) => {
    const button = e.target.closest('.gallery-dot');
    if (!button) return;
    showSlide(button.dataset.goTo, 'selected', galleryImages);
  });

  closeBtn.addEventListener('click', () => closeGalleryHandler(gallery));
  overlay.addEventListener('click', () => closeGalleryHandler(gallery));
};
