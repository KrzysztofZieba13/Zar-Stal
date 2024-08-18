/*eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const contactUsHandler = () => {
  const contactForm = document.querySelector('.form-contact');
  const name = document.getElementById('contact-name');
  const email = document.getElementById('contact-email');
  const phone = document.getElementById('contact-phone');
  const message = document.getElementById('contact-message');
  const submitBtn = document.getElementById('contact-submit');
  const fullName = document.getElementById('full-name');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const recaptchaToken = grecaptcha.getResponse();

    if (!recaptchaToken) {
      showAlert('error', 'Wypełnij reCAPTCHA');
      return;
    }

    const formData = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      message: message.value,
      fullName: fullName.value,
      'g-recaptcha-response': recaptchaToken,
    };

    try {
      submitBtn.value = `Wysyłanie...`;

      const res = await axios({
        method: 'post',
        url: `${window.location.origin}/api/v1/mainPage/client-send-email`,
        data: formData,
      });
      console.log(res)

      if (res.data.status === 'success') {
        showAlert('success', 'Wiadomość została wysłana');
      }
      submitBtn.value = 'Wyślij wiadomość';
    } catch (err) {
      showAlert('error', 'Nie udało się wysłać wiadomości!');
    }
  });
};
