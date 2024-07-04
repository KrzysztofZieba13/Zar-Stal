const closeGallery = document.querySelector('.gallery--btn-close');
const overlay = document.querySelector('.overlay');
const overviewImgs = document.querySelector('.realization--column-right ');
const nextBtn = document.querySelector('.gallery--btn-next');
const prevBtn = document.querySelector('.gallery--btn-prev');
const galleryImages = document.querySelectorAll('.realization--gallery-img');

const closeGalleryHandler = (gallery) => {
  gallery.classList.add('hidden');
  overlay.classList.add('hidden');
};

const updateNavButtonsHandler = (nextValue, prevValue) => {
  nextBtn.dataset.goTo = nextValue;
  prevBtn.dataset.goTo = prevValue;
};

export const showSlide = (goToSlide, direction, galleryImgs) => {
  galleryImgs.forEach((el) => el.classList.remove('gallery-active'));

  if (+goToSlide > galleryImgs.length) {
    console.log('jest wiekszy');
    updateNavButtonsHandler(2, 0);
    return galleryImgs[0].classList.add('gallery-active');
  }
  if (+goToSlide < 1) {
    console.log('jest mniejszy');
    updateNavButtonsHandler(galleryImgs.length + 1, galleryImgs.length - 1);
    return galleryImgs[galleryImgs.length - 1].classList.add('gallery-active');
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
};

export const galleryActions = (gallery) => {
  closeGallery.addEventListener('click', () => closeGalleryHandler(gallery));
  overlay.addEventListener('click', () => closeGalleryHandler(gallery));

  // only for single realization
  if (overviewImgs)
    overviewImgs.addEventListener('click', (e) => {
      gallery.classList.remove('hidden');
      overlay.classList.remove('hidden');
      const goTo = e.target.closest('.realization-img').dataset.goTo;
      showSlide(goTo, 'selected', galleryImages);
    });

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
};
