/*eslint-disable*/

export const initRevalSections = () => {
  const allSections = document.querySelectorAll('.section');

  const revalSection = function (entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    });
  };

  const sectionObserver = new IntersectionObserver(revalSection, {
    root: null,
    threshold: 0.15,
  });

  allSections.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
  });
};

export const initLoadLazyImg = () => {
  const allLazyImgs = document.querySelectorAll('img[data-src]');

  const loadImg = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      // Replace src with data-src
      entry.target.src = entry.target.dataset.src;

      entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
      });

      observer.unobserve(entry.target);
    });
  };

  const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px',
  });

  allLazyImgs.forEach((img) => imgObserver.observe(img));
};
