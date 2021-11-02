import { closeImageEditor } from './form-image-upload.js';
import { isEscapeKey } from '../utils/keys-checks.js';
import { toggleWindowBlocker } from '../utils/window-blocker.js';

const errorMessageTemplete = document.querySelector('#error').content;

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessagePopUp();
  }
};

function formSubmitError() {
  closeImageEditor();
  toggleWindowBlocker();
  const element = errorMessageTemplete.cloneNode(true);
  document.body.appendChild(element);

  document.addEventListener('keydown', onPopupEscKeydown);

  const errorMessageCloseButton = document.querySelector('.error__button');
  errorMessageCloseButton.addEventListener('click', closeMessagePopUp);

  const errorMessage = document.querySelector('.error');
  errorMessage.addEventListener('click', closeMessagePopUp);
}

function closeMessagePopUp() {
  toggleWindowBlocker();

  const errorMessageCloseButton = document.querySelector('.error__button');
  errorMessageCloseButton.removeEventListener('click', closeMessagePopUp);

  const errorMessage = document.querySelector('.error');
  errorMessage.removeEventListener('click', closeMessagePopUp);

  errorMessage.remove();
}


export { formSubmitError, closeMessagePopUp };
