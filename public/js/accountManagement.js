/*eslint-disable */
import Form from './admin/editForm';
import { showAlert } from './alert';

export const changePassword = () => {
  const changePasswordForm = new Form(
    `${window.location.origin}/api/v1/user/change-password`,
  );

  changePasswordForm.form.addEventListener('submit', async (e) => {
    try {
      e.preventDefault();
      const currentPassword = document.getElementById('current-password').value;
      const newPassword = document.getElementById('new-password').value;
      const repeatNewPassword = document.getElementById(
        'repeat--new-password',
      ).value;

      const fields = {
        passwordCurrent: currentPassword,
        password: newPassword,
        passwordConfirm: repeatNewPassword,
      };

      changePasswordForm.sendUpdate(fields);

      document.getElementById('current-password').value = '';
      document.getElementById('new-password').value = '';
      document.getElementById('repeat--new-password').value = '';
    } catch (err) {
      showAlert('error', err.message);
    }
  });
};
