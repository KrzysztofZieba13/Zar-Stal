/*eslint-disable */
import axios from 'axios';

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

      console.log(res);
    } catch (err) {
      console.log(err.response.data.message);
    }
  }
}
