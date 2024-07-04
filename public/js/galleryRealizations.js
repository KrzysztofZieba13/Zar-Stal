const closeGallery = document.querySelector('.gallery--btn-close');
const overlay = document.querySelector('.overlay');
const overviewImgs = document.querySelector('.realization--column-right ');
const nextBtn = document.querySelector('.gallery--btn-next');
const prevBtn = document.querySelector('.gallery--btn-prev');
const galleryImgs = document.querySelectorAll('.realization--gallery-img');

const showSlide = (goToSlide, direction) => {
  galleryImgs.forEach((el) => el.classList.remove('gallery-active'));
  if (+goToSlide > galleryImgs.length) {
    console.log('za duzo');
    nextBtn.dataset.goTo = 2;
    prevBtn.dataset.goTo = 0;
    return galleryImgs[0].classList.add('gallery-active');
  }
  if (+goToSlide < 1) {
    console.log('za malo');
    nextBtn.dataset.goTo = galleryImgs.length + 1;
    prevBtn.dataset.goTo = galleryImgs.length - 1;
    return galleryImgs[galleryImgs.length - 1].classList.add('gallery-active');
  }
  galleryImgs[+goToSlide - 1].classList.add('gallery-active');
  if (direction === 'next') {
    nextBtn.dataset.goTo = +nextBtn.dataset.goTo + 1;
    prevBtn.dataset.goTo = +prevBtn.dataset.goTo + 1;
  }
  if (direction === 'prev') {
    nextBtn.dataset.goTo = +nextBtn.dataset.goTo - 1;
    prevBtn.dataset.goTo = +prevBtn.dataset.goTo - 1;
  }
  if (direction === 'selected') {
    nextBtn.dataset.goTo = +goToSlide + 1;
    prevBtn.dataset.goTo = +goToSlide - 1;
  }
};

export const galleryActions = (gallery) => {
  closeGallery.addEventListener('click', () => {
    gallery.classList.add('hidden');
    overlay.classList.add('hidden');
  });

  overlay.addEventListener('click', () => {
    gallery.classList.add('hidden');
    overlay.classList.add('hidden');
  });

  overviewImgs.addEventListener('click', (e) => {
    gallery.classList.remove('hidden');
    overlay.classList.remove('hidden');
    const goTo = e.target.closest('.realization-img').dataset.goTo;
    showSlide(goTo, 'selected');
  });

  nextBtn.addEventListener('click', (e) => {
    let goTo = e.target.closest('.gallery--btn-next').dataset.goTo;
    showSlide(goTo, 'next');
  });

  prevBtn.addEventListener('click', (e) => {
    let goTo = e.target.closest('.gallery--btn-prev').dataset.goTo;
    showSlide(goTo, 'prev');
  });

  // KEYBOARD BUTTONS
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      gallery.classList.add('hidden');
      overlay.classList.add('hidden');
    }
    if (e.key === 'ArrowRight') {
      let goTo = nextBtn.dataset.goTo;
      showSlide(goTo, 'next');
    }
    if (e.key === 'ArrowLeft') {
      let goTo = prevBtn.dataset.goTo;
      showSlide(goTo, 'prev');
    }
  });
};
