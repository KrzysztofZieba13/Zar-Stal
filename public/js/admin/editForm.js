/*eslint-disable */
import axios from 'axios';
import { showAlert } from '../alert';

export default class EditForm {
  constructor(url) {
    this.form = document.querySelector('.form');
    this.url = url;
  }

  async sendUpdate(fields) {
    try {
      const res = await axios({
        method: 'patch',
        url: this.url,
        data: { ...fields },
      });

      if (res.data.status === 'success')
        showAlert('success', 'Aktualizacja przebiegła pomyślnie');
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  }

  async sendCreate(fields) {
    try {
      const res = await axios({
        method: 'post',
        url: this.url,
        data: { ...fields },
      });

      if (res.data.status === 'success')
        showAlert('success', 'Utworzono pomyślnie');
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  }
}
