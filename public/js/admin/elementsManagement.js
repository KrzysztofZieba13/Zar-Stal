/*eslint-disable */
import axios from 'axios';
import Form from '../admin/editForm';
import { showAlert } from '../alert';

export const createElement = () => {
  const formCreateElement = new Form(
    `${window.location.origin}/api/v1/elements`,
  );
  formCreateElement.form.addEventListener('submit', async (e) => {
    try {
      e.preventDefault();
      const submitBtn = document.querySelector('.submit-btn');
      const form = new FormData();

      form.append('category', document.getElementById('category').value);
      form.append('title', document.getElementById('title').value);
      Array.from(document.getElementById('images').files).forEach((img) =>
        form.append('images', img),
      );

      submitBtn.value = 'Tworzę...';
      await formCreateElement.sendCreate(form);

      document.getElementById('category').value = '';
      document.getElementById('title').value = '';
      document.getElementById('images').value = '';
      submitBtn.value = 'Utwórz element';
    } catch (err) {
      showAlert('error', err.message);
    }
  });
};

export const updateElement = () => {
  const elementsToChoose = document.querySelector('.choose-elements');
  const elementImagesContainer = document.querySelector(
    '.choose--images-delete',
  );
  let thImagesToDelete = new Set();
  let wideImagesToDelete = new Set();

  elementsToChoose.addEventListener('click', async (e) => {
    const element = e.target.closest('.choose--realization-edit');
    if (!element) return;
    const elementID = element.dataset.elementId;
    thImagesToDelete.clear();
    wideImagesToDelete.clear();

    elementImagesContainer.innerHTML = '';

    const formUpdateElement = new Form(
      `${window.location.origin}/api/v1/elements/element/${elementID}`,
    );

    const response = await axios(
      `${window.location.origin}/api/v1/elements/element/${elementID}?fields=images,imagesThumbnails`,
    );
    const imagesArray = response.data.data.imagesThumbnails;
    const images = [...response.data.data.images];
    imagesArray.forEach((image, i) => {
      elementImagesContainer.insertAdjacentHTML(
        'beforeend',
        `
        <div class="img-box" data-img-link='${image}' data-img-wide-link='${images[i]}'>
          <img src="/img/realization/steel-elements/${image}"  alt="realizacja do wybrania">
          <i class="ph ph-trash trash--on-image"></i>
        </div>
        `,
      );
    });

    formUpdateElement.form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = document.querySelector('.submit-btn');
      const form = new FormData();
      form.append('category', document.getElementById('category').value);
      form.append('title', document.getElementById('title').value);
      Array.from(document.getElementById('images').files).forEach((img) =>
        form.append('images', img),
      );
      Array.from(thImagesToDelete).forEach((thImg) =>
        form.append('imagesThumbnailsRemove', thImg),
      );
      Array.from(wideImagesToDelete).forEach((img) =>
        form.append('imagesRemove', img),
      );

      submitBtn.value = 'Aktualizuję...';
      await formUpdateElement.sendUpdate(form);

      document.getElementById('category').value = '';
      document.getElementById('title').value = '';
      document.getElementById('images').value = '';
      submitBtn.value = 'Aktualizuj element';
    });
  });

  elementImagesContainer.addEventListener('click', (e) => {
    //TODO: THE SAME FUNCTION IS IN 'realizationsManagement.js' REFACTORE
    const imgBox = e.target.closest('.img-box');
    if (
      imgBox.querySelector('.trash--on-image').classList.contains('visible')
    ) {
      thImagesToDelete.add(imgBox.dataset.imgLink);
      wideImagesToDelete.add(imgBox.dataset.imgWideLink);
    } else {
      thImagesToDelete.delete(imgBox.dataset.imgLink);
      wideImagesToDelete.delete(imgBox.dataset.imgWideLink);
    }
  });
};
