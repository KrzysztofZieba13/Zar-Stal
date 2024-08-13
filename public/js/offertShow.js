/*eslint-disable */
export const switchOffertText = () => {
  const offertPanels = document.querySelectorAll('.offert-item');

  offertPanels.forEach((el) => {
    el.addEventListener('mouseover', (e) => {
      const itemTitle = el.querySelector('.offert-title');
      const itemDetail = el.querySelector('.offert-details');

      itemTitle.classList.add('hidden');
      itemDetail.classList.remove('hidden');
    });
    el.addEventListener('mouseout', (e) => {
      const itemTitle = el.querySelector('.offert-title');
      const itemDetail = el.querySelector('.offert-details');

      itemTitle.classList.remove('hidden');
      itemDetail.classList.add('hidden');
    });
  });
};
