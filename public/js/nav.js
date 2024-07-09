/*eslint-disable */
const openNavBtn = document.querySelector('.open-nav');
const closeNavBtn = document.querySelector('.close-nav');
const navContainer = document.querySelector('.nav-container');
const navMenu = document.querySelector('.nav-menu');
const navBar = document.querySelector('.nav-container');
const navBtns = document.querySelectorAll('.nav-btn');

const toggleNavBarVisibility = () => {
  console.log('xo');
  navBar.classList.toggle('nav-open');
  openNavBtn.classList.toggle('hidden');
  closeNavBtn.classList.toggle('hidden');
};

openNavBtn.addEventListener('click', () => toggleNavBarVisibility());

closeNavBtn.addEventListener('click', () => toggleNavBarVisibility());

navBtns.forEach((button) => {
  button.addEventListener('click', () => {
    navBar.classList.remove('nav-open');
    openNavBtn.classList.remove('hidden');
    closeNavBtn.classList.add('hidden');
  });
});

// STICKY NAV
export const initIntersectionApi = function () {
  const intersectionHeader = document.querySelector('.intersection-header');
  const intersectionHeaderHeight = intersectionHeader.getBoundingClientRect();
  const goUpBtn = document.querySelector('.global--goup-btn');

  const stickyNav = function (entries) {
    const [entry] = [...entries];

    if (!entry.isIntersecting) {
      navContainer.classList.add('sticky');
      goUpBtn.classList.remove('hidden');
    } else {
      navContainer.classList.remove('sticky');
      goUpBtn.classList.add('hidden');
    }
  };

  const mainPageObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-150px`,
  });

  mainPageObserver.observe(intersectionHeader);
};
