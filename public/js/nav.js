const openNavBtn = document.querySelector('.open-nav');
const closeNavBtn = document.querySelector('.close-nav');
const navMenu = document.querySelector('.nav-menu');
const navBar = document.querySelector('.nav-container');
const navBtns = document.querySelectorAll('.nav-btn');

const toggleNavBarVisibility = () => {
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
