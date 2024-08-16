/*eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const login = () => {
  const loginForm = document.querySelector('.login-form');
  const email = document.getElementById('login');
  const password = document.getElementById('password');

  const clearFields = () => {
    email.value = '';
    password.value = '';
  };

  loginForm.addEventListener('submit', async (e) => {
    try {
      e.preventDefault();

      const authFields = {
        email: email.value,
        password: password.value,
      };

      const res = await axios({
        method: 'post',
        url: `${window.location.origin}/api/v1/user/login`,
        data: authFields,
      });

      if (!res.data.status) throw new Error('Nie udało się zalogować');

      showAlert('success', 'Zalogowano pomyślnie');

      clearFields();

      window.setTimeout(() => {
        location.assign('/admin-zar-stal/edycja/strona-glowna-opis');
      }, 1500);
    } catch (err) {
      if (err.message) showAlert('error', err.message);
      if (err.response.data) showAlert('error', err.response.data.message);
      clearFields();
    }
  });
};
