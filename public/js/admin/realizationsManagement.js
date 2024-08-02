/*eslint-disable */
import Form from '../admin/editForm';
import { showAlert } from '../alert';

export const createRealization = async () => {
  try {
    const createForm = new Form(
      `${window.location.origin}/api/v1/realizations`,
    );
    createForm.form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log(window.location.origin);
    });
  } catch (err) {
    showAlert('error', err.message);
  }
};
