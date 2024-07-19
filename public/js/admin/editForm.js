/*eslint-disable */
import axios from 'axios';
import { showAlert } from '../alert';

export default class EditForm {
  constructor() {
    this.form = document.querySelector('.edit-form');
  }

  async sendUpdate(fields) {
    try {
      const res = await axios({
        method: 'patch',
        url: 'http://127.0.0.1:3000/api/v1/mainPage',
        data: { ...fields },
      });

      if (res.data.status === 'success')
        showAlert('success', 'Opis został zakutalizowany pomyślnie');
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  }
}
