/*eslint-disable */
const nav = document.querySelector('.edit-nav');
const navLinks = document.querySelectorAll('.option-link');

export const init = () => {
  document.addEventListener('DOMContentLoaded', () => {
    navLinks.forEach((link) => {
      link.classList.remove('option-active');
      if (link.href.endsWith(location.pathname))
        link.classList.add('option-active');
    });
  });

  nav.addEventListener('click', (e) => {
    const panel = e.target.closest('.edit--nav-panel-header');
    if (!panel) return;
    panel.nextElementSibling.classList.toggle('hidden');
    const icons = panel.querySelectorAll('.edit--nav-icon');
    icons.forEach((el) => el.classList.toggle('hidden'));
  });
};
