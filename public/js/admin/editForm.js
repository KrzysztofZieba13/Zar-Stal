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
    console.log('update');
    try {
      const res = await axios({
        method: 'patch',
        url: this.url,
        data: inputs,
      });

      if (res.data.status === 'success')
        showAlert('success', 'Aktualizacja przebiegła pomyślnie');
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
      console.log(err.response.data.message);
      showAlert('error', err.response.data.message);
    }
  }
}
