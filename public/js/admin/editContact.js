/*eslint-disable */
import Form from '../admin/editForm';
import { showAlert } from '../alert';

export const editContact = () => {
  const EditContactForm = new Form(
    'http://127.0.0.1:3000/api/v1/contacts',
    'form--edit-contact',
  );
  EditContactForm.form.addEventListener('submit', (e) => {
    try {
      e.preventDefault();
      const ownerNumber = document.getElementById('owner-number').value;
      const productionNumber =
        document.getElementById('production-number').value;
      const secretariatNumber =
        document.getElementById('secretariat-number').value;
      const emailContact = document.getElementById('email-contact').value;

      const fields = {};

      if (ownerNumber) fields.ownerNumber = ownerNumber;
      if (productionNumber) fields.productionNumber = productionNumber;
      if (secretariatNumber) fields.secretariatNumber = secretariatNumber;
      if (emailContact) fields.email = emailContact;
      if (Object.keys(fields).length === 0)
        throw new Error('Uzupełnij przynajmniej jedno pole');

      EditContactForm.sendUpdate(fields);
      document.getElementById('owner-number').value = '';
      document.getElementById('production-number').value = '';
      document.getElementById('secretariat-number').value = '';
      document.getElementById('email-contact').value = '';
    } catch (err) {
      showAlert('error', err.message);
    }
  });
};

export const editOpenHours = () => {
  const EditOpenHoursForm = new Form(
    'http://127.0.0.1:3000/api/v1/mainPage',
    'form--id-edit-openhours',
  );
  EditOpenHoursForm.form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
};
