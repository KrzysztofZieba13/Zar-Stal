/*eslint-disable */
import Form from '../admin/editForm';

export const init = async () => {
  const EditForm = new Form();
  EditForm.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = {};
    fields.pageDescription = document.getElementById('description').value;
    EditForm.sendUpdate(fields);
    document.getElementById('description').value = '';
  });
};
