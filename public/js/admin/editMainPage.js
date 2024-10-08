/*eslint-disable */
import Form from '../admin/editForm';
import { showAlert } from '../alert';

export const init = async () => {
  const EditForm = new Form(`${window.location.origin}/api/v1/mainPage`);
  const submitBtn = document.querySelector('.submit-btn')
  EditForm.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = {};
    fields.pageDescription = document.getElementById('description').value;
    submitBtn.value = 'Aktualizuję...'
    EditForm.sendUpdate(fields);
    document.getElementById('description').value = '';
    submitBtn.value = 'Aktualizuj pole'
  });
};

export const chooseMainRealizations = () => {
  const ChooseRealizationsForm = new Form(
    `${window.location.origin}/api/v1/mainPage`,
  );
  const numOfChoosenRealizations = document.querySelector(
    '.number--choosen-realizations',
  );
  const updateBtn = document.querySelector('.submit-btn');

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
      updateBtn.value = 'Aktualizuję...';
      ChooseRealizationsForm.sendUpdate(fields);
      [...checkedInputs].forEach((el) => (el.checked = false));
      selectedRealizations = 0;
      updateBtn.value = 'Aktualizuj';
      numOfChoosenRealizations.textContent = `Wybrane realizacje ${selectedRealizations}/2`;
    } catch (err) {
      showAlert('error', err.message);
    }
  });
};

export const editOffert = () => {
  const EditOffertForm = new Form(`${window.location.origin}/api/v1/mainPage`);
  let currentOffertIndex;
  const currentOffert = document.querySelector('.current--edit-offert');
  const submitBtn = document.querySelector('.submit-btn')

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
      if (!currentOffertIndex && currentOffertIndex !== 0)
        throw new Error('Wybierz ofertę do aktualizacji!');
      const field = {};
      field[`offert.${currentOffertIndex}`] =
        document.getElementById('offert-value').value;

      submitBtn.value = 'Aktualizuję...';
      EditOffertForm.sendUpdate(field);
      document.getElementById('offert-value').value = '';
      submitBtn.value = 'Aktualizuj ofertę';
    } catch (err) {
      showAlert('error', err.message);
    }
  });
};
