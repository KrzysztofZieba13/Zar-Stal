/*eslint-disable */
import Form from '../admin/editForm';
import { showAlert } from '../alert';

export const init = async () => {
  const EditForm = new Form('http://127.0.0.1:3000/api/v1/mainPage');
  EditForm.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = {};
    fields.pageDescription = document.getElementById('description').value;
    EditForm.sendUpdate(fields);
    document.getElementById('description').value = '';
  });
};

export const chooseMainRealizations = async () => {
  try {
    const ChooseRealizationsForm = new Form(
      'http://127.0.0.1:3000/api/v1/mainPage',
    );

    ChooseRealizationsForm.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = {};
      fields.mainRealizations = [
        ...document.querySelectorAll('input[name="realizations"]:checked'),
      ].map((el) => el.value);
      if (fields.mainRealizations.length !== 2)
        showAlert('error', 'Wybierz dwie główne realizacje');
      ChooseRealizationsForm.sendUpdate(fields);
    });
  } catch (err) {
    console.log(err);
  }
};
