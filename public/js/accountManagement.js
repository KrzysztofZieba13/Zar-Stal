/*eslint-disable */
import axios from 'axios';
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
      if (err.message) showAlert('error', err.message);
      if (err.response.data) showAlert('error', err.response.data.message);

      document.getElementById('current-password').value = '';
      document.getElementById('new-password').value = '';
      document.getElementById('repeat--new-password').value = '';
    }
  });
};

export const forgotPassword = () => {
  const forgotPasswordForm = document.querySelector('.forgot--password-form');
  const email = document.getElementById('email');
  const confirmBtn = document.querySelector('.input--submit-auth');

  forgotPasswordForm.addEventListener('submit', async (e) => {
    try {
      e.preventDefault();
      confirmBtn.value = 'Wysyłanie...';

      const fields = {
        email: email.value,
      };

      const res = await axios({
        method: 'post',
        url: `${window.location.origin}/api/v1/user/forgot-password`,
        data: fields,
      });

      if (!res.data.status) throw new Error('Błąd, spróbuj ponownie');

      email.value = '';
      confirmBtn.value = 'Wyślij';
      showAlert('success', 'Wysłano wiadomość na wskazany adres email');
    } catch (err) {
      if (err.message) showAlert('error', err.message);
      if (err.response.data) showAlert('error', err.response.data.message);
      email.value = '';
      confirmBtn.value = 'Wyślij';
    }
  });
};

export const resetPassword = () => {
  const token = window.location.pathname.split('/').pop();
  console.log(token);

  const resetPasswordForm = new Form(
    `${window.location.origin}/api/v1/user/reset-password/${token}`,
  );

  console.log(`${window.location.origin}/api/v1/user/reset-password/${token}`);

  const confirmBtn = document.querySelector('.input--submit-auth');
  const password = document.getElementById('password');
  const passwordConfirm = document.getElementById('password-confirm');

  resetPasswordForm.form.addEventListener('submit', async (e) => {
    try {
      e.preventDefault();
      confirmBtn.value = 'Wysyłanie...';

      const fields = {
        password: password.value,
        passwordConfirm: passwordConfirm.value,
      };

      resetPasswordForm.sendUpdate(fields);

      password.value = '';
      passwordConfirm.value = '';
      confirmBtn.value = 'Zapisz';
      window.setTimeout(() => {
        location.assign('/admin-zar-stal/edycja/strona-glowna-opis');
      }, 1500);
    } catch (err) {
      if (err.message) showAlert('error', err.message);
      if (err.response.data) showAlert('error', err.response.data.message);

      password.value = '';
      passwordConfirm.value = '';
      confirmBtn.value = 'Zapisz';
    }
  });
};
