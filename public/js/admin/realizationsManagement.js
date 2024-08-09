/*eslint-disable */
import axios from 'axios';
import Form from '../admin/editForm';
import { showAlert } from '../alert';
import * as formAccordionEdit from './accordionFormEdit';

const getBasicInputs = () => {
  const form = new FormData();
  const specificationObj = Array.from(
    document.querySelectorAll('.specification'),
  ).map((spec) => {
    const nameElement = spec.querySelector('.spec-name');
    const valueElement = spec.querySelector('.spec-value');
    const unitElement = spec.querySelector('.spec-unit');

    const specObj = {
      name: nameElement ? nameElement.value : null,
      value: valueElement ? valueElement.value : null,
      unit: unitElement ? unitElement.value : 'b/d',
    };
    return specObj;
  });

  form.append('location', document.getElementById('location').value);
  form.append('title', document.getElementById('title').value);
  form.append('description', document.getElementById('description').value);
  form.append('specifications', JSON.stringify(specificationObj));
  Array.from(document.getElementById('images').files).forEach((img) => {
    form.append('images', img);
  });
  if (document.getElementById('primary-image').files[0])
    form.append(
      'primaryImage',
      document.getElementById('primary-image').files[0],
    );

  return form;
};

export const updateRealization = async () => {
  const realizationsContainer = document.querySelector('.choose-realizations');
  let updateForm = '';
  const imagesToDeleteContainer = document.querySelector(
    '.choose--images-delete',
  );
  const specsToDelete = document.querySelector('.accordion--delete-spec');

  let thImagesToDelete = new Set();
  let wideImagesToDelete = new Set();
  let specsIdToDelete = new Set();

  realizationsContainer.addEventListener('click', async (e) => {
    thImagesToDelete.clear();
    wideImagesToDelete.clear();

    const realizationID = e.target.closest('.choose--realization-edit').dataset
      .realizationId;

    imagesToDeleteContainer.innerHTML = '';
    specsToDelete.innerHTML = '';

    const request = await axios(
      `${window.location.origin}/api/v1/realizations/realization/${realizationID}?fields=images,imagesThumbnails,specifications`,
    );
    const imagesArray = request.data.data.imagesThumbnails;
    const images = [...request.data.data.images];
    const specificationsArray = request.data.data.specifications;

    imagesArray.forEach((image, i) => {
      imagesToDeleteContainer.insertAdjacentHTML(
        'beforeend',
        `
        <div class='img-box' data-img-link="${image}" data-img-wide-link="${images[i]}">
          <img src="/img/realization/${image}" alt="realizacja do wybrania" />
          <i class='ph ph-trash trash--on-image'></i>
        </div>
        `,
      );
    });

    specificationsArray.forEach((spec) => {
      specsToDelete.insertAdjacentHTML(
        'beforeend',
        `
        <div class="specification--delete-row">
          <p class="delete--spec-title">${spec.name}</p>
          <p class="delete--spec-value">${spec.value} 
          ${spec.unit === 'meter' ? 'm' : ''}
          ${spec.unit === 'meter-2' ? 'm<sup>2</sup>' : ''}
          ${spec.unit === 'meter-3' ? 'm<sup>3</sup>' : ''}</p>
          <label for="delete--spec__checkbox-${spec._id}" data-spec-id=${spec._id} class="custom--checkbox-delete-spec">
              <i class="ph ph-trash"></i>
          </label>
          <input type="checkbox" id="delete--spec__checkbox-${spec._id}" class="delete--specification__checkbox">
        </div>
        `,
      );
    });

    const specsToDeleteInputs = document.querySelectorAll(
      '.custom--checkbox-delete-spec',
    );
    formAccordionEdit.selectSpecsToDeleteHandler(specsToDeleteInputs);

    updateForm = new Form(
      `${window.location.origin}/api/v1/realizations/realization/${realizationID}`,
      'edit--realization-form',
    );

    updateForm.form.addEventListener('submit', (e) => {
      try {
        e.preventDefault();
        const form = getBasicInputs();
        updateForm.sendUpdate(form);
      } catch (err) {
        showAlert('error', err.message);
      }
    });

    deleteForm = new Form(
      `${window.location.origin}/api/v1/realizations/realization/${realizationID}/delete-images`,
      'form--delete-images',
    );

    deleteForm.form.addEventListener('submit', (e) => {
      try {
        e.preventDefault();
        console.log('usuwanie');
        const thToRemoveArray = Array.from(thImagesToDelete);
        const wideToRemoveArray = Array.from(wideImagesToDelete);
        const fields = {
          thToRemove: thToRemoveArray,
          wideToRemove: wideToRemoveArray,
        };
        deleteForm.sendUpdate(fields);
      } catch (err) {
        showAlert('error', err.message);
      }
    });
  });

  imagesToDeleteContainer.addEventListener('click', (e) => {
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
    console.log(imgBox);
  });
};

export const createRealization = async () => {
  try {
    const createForm = new Form(
      `${window.location.origin}/api/v1/realizations`,
    );
    createForm.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const form = getBasicInputs();

      createForm.sendCreate(form);
      document.getElementById('location').value = '';
      document.getElementById('title').value = '';
      document.getElementById('description').value = '';
      Array.from(document.querySelectorAll('.specification')).forEach(
        (spec) => {
          spec.querySelector('.spec-name').value = '';
          spec.querySelector('.spec-value').value = '';
          spec.querySelector('.spec-unit').value = '';
        },
      );
      document.getElementById('primary-image').value = '';
      document.getElementById('images').value = '';
    });
  } catch (err) {
    console.log(err.message);
    showAlert('error', `error!!! ${err.message}`);
  }
};
