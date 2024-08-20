/*eslint-disable */
import Form from '../admin/editForm';
import { showAlert } from '../alert';

export const editContact = () => {
  const EditContactForm = new Form(
    `${window.location.origin}/api/v1/contacts`,
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
    `${window.location.origin}/api/v1/mainPage`,
    'form--id-edit-openhours',
  );
  EditOpenHoursForm.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const openhourWeek = document.getElementById('openhour-1').value;
    const closehourWeek = document.getElementById('closehour-1').value;
    const openhourSat = document.getElementById('openhour-2').value;
    const closehourSat = document.getElementById('closehour-2').value;
    const saturdayClosed = document.getElementById('saturday-isclosed');

    const fields = {};
    const openhours = {
      ['openhourId-1']: '66b220ea071c24c77932dfa1',
      ['openhourId-2']: '66b220ea071c24c77932dfa2',
    };

    if (openhourWeek) fields['open-1'] = openhourWeek;
    if (closehourWeek) fields['close-1'] = closehourWeek;
    if (openhourSat) fields['open-2'] = openhourSat;
    if (closehourSat) fields['close-2'] = closehourSat;
    if (saturdayClosed) fields.saturdayClosed = saturdayClosed.checked;
    fields.openhours = openhours;
    EditOpenHoursForm.sendUpdate(fields);

    document.getElementById('openhour-1').value = '';
    document.getElementById('closehour-1').value = '';
    document.getElementById('openhour-2').value = '';
    document.getElementById('closehour-2').value = '';
    document.getElementById('saturday-isclosed').checked = false;
  });
};
