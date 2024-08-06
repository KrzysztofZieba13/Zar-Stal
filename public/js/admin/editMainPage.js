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

export const chooseMainRealizations = () => {
  const ChooseRealizationsForm = new Form(
    'http://127.0.0.1:3000/api/v1/mainPage',
  );
  const numOfChoosenRealizations = document.querySelector(
    '.number--choosen-realizations',
  );

  let selectedRealizations = 0;

  document.querySelectorAll('input[name="realizations"]').forEach((el) => {
    el.addEventListener('change', () => {
      if (!el.checked) selectedRealizations--;
      if (el.checked && selectedRealizations !== 2) selectedRealizations++;
      else el.checked = false;
      numOfChoosenRealizations.textContent = `Wybrane realizacje ${selectedRealizations}/2`;
    });
  });

  ChooseRealizationsForm.form.addEventListener('submit', async (e) => {
    try {
      e.preventDefault();
      const fields = {};
      const checkedInputs = document.querySelectorAll(
        'input[name="realizations"]:checked',
      );
      fields.mainRealizations = [...checkedInputs].map((el) => el.value);
      if (fields.mainRealizations.length !== 2)
        throw new Error('Wybierz dwie główne realizacje');
      ChooseRealizationsForm.sendUpdate(fields);
      [...checkedInputs].forEach((el) => (el.checked = false));
      selectedRealizations = 0;
      numOfChoosenRealizations.textContent = `Wybrane realizacje ${selectedRealizations}/2`;
    } catch (err) {
      showAlert('error', err.message);
    }
  });
};

export const editOffert = () => {
  const EditOffertForm = new Form('http://127.0.0.1:3000/api/v1/mainPage');
  let currentOffertIndex;
  const currentOffert = document.querySelector('.current--edit-offert');

  const offertItems = [...document.querySelectorAll('.offert-item')];
  offertItems.forEach((el) => {
    el.addEventListener('click', () => {
      currentOffertIndex = +el.id.split('-')[1];
      offertItems.forEach((el) => el.classList.remove('offert--item-edit'));
      el.classList.add('offert--item-edit');
      currentOffert.textContent = `Nowa treść oferty: ${el.textContent.trim()}`;
    });
  });

  EditOffertForm.form.addEventListener('submit', (e) => {
    try {
      e.preventDefault();
      if (!currentOffertIndex)
        throw new Error('Wybierz ofertę do aktualizacji!');
      const field = {};
      field[`offert.${currentOffertIndex}`] =
        document.getElementById('offert-value').value;

      console.log(field);
      ChooseRealizationsForm.sendUpdate(field);
      document.getElementById('offert-value').value = '';
    } catch (err) {
      showAlert('error', err.message);
    }
  });
};
