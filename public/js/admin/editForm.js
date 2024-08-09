/*eslint-disable */
import axios from 'axios';
import { showAlert } from '../alert';

export default class EditForm {
  constructor(url, formId) {
    this.form =
      document.getElementById(formId) || document.querySelector('.form');
    this.url = url;
  }

  async sendUpdate(inputs) {
    try {
      const res = await axios({
        method: 'patch',
        url: this.url,
        data: inputs,
      });

      if (res.data.status === 'success')
        showAlert('success', 'Aktualizacja przebiegła pomyślnie');
      setTimeout(function () {
        location.reload();
      }, 5000);
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  }

  async sendCreate(inputs) {
    try {
      const res = await axios({
        method: 'post',
        url: this.url,
        data: inputs,
      });

      if (res.data.status === 'success')
        showAlert('success', 'Utworzono pomyślnie');
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  }
}
