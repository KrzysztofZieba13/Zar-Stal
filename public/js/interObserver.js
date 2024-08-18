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

export const initSmoothScrolling = () => {
  console.log('smooth scroll')
  const mainPage = document.querySelector('.overview-header');
  const goToMainPage = document.querySelector('.mainPage--nav-btn');
  const company = document.getElementById('firma');
  const goToCompany = document.querySelector('.company--nav-btn');
  const offert = document.getElementById('oferta');
  const goToOffert = document.querySelector('.offert--nav-btn');
  const contact = document.getElementById('kontakt');
  const goToContact = document.querySelector('.contact--nav-btn');

  const goToOffertFooter = document.querySelectorAll('.footer--offera-btns');
  const goToCompanyFooter = document.querySelector('.footer--firma-btn');

  const goToContactFooter = document.querySelector('.footer--kontakt-btn');

  const smoothScroll = (element, elementTarget) => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      elementTarget.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const scrolls = () => {
    smoothScroll(goToMainPage, mainPage);
    smoothScroll(goToCompany, company);
    smoothScroll(goToOffert, offert);
    smoothScroll(goToContact, contact);
    smoothScroll(goToCompanyFooter, company);
    smoothScroll(goToContactFooter, contact);
    goToOffertFooter.forEach((el) => {
      smoothScroll(el, offert);
    });
  };
  scrolls();
};
