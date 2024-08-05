/*eslint-disable */
import axios from 'axios';
import Form from '../admin/editForm';
import { showAlert } from '../alert';

export const createRealization = async () => {
  try {
    const createForm = new Form(
      `${window.location.origin}/api/v1/realizations`,
    );
    createForm.form.addEventListener('submit', (e) => {
      e.preventDefault();
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
      form.append('name', document.getElementById('spec-1-name').value);
      form.append('specifications', JSON.stringify(specificationObj));
      Array.from(document.getElementById('images').files).forEach((img) => {
        form.append('images', img);
      });
      form.append(
        'primaryImage',
        document.getElementById('primary-image').files[0],
      );

      createForm.sendCreate(form);
    });
  } catch (err) {
    console.log(err.message);
    showAlert('error', `error!!! ${err.message}`);
  }
};
