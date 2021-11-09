import { closeImageEditor } from './form-image-upload.js';
import { isEscapeKey } from '../utils/keys-checks.js';
import { toggleWindowBlocker } from '../utils/window-blocker.js';

const succesMessageTemplete = document.querySelector('#success').content;

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessagePopUp();
  }
};

function formSubmitSuccess() {
  closeImageEditor();
  toggleWindowBlocker();
  const element = succesMessageTemplete.cloneNode(true);
  document.body.appendChild(element);

  document.addEventListener('keydown', onPopupEscKeydown);

  const succesMessageCloseButton = document.querySelector('.success__button');
  succesMessageCloseButton.addEventListener('click', closeMessagePopUp);

  const successMessage = document.querySelector('.success');
  successMessage.addEventListener('click', closeMessagePopUp);
}

function closeMessagePopUp() {
  toggleWindowBlocker();

  document.removeEventListener('keydown', onPopupEscKeydown);

  const succesMessageCloseButton = document.querySelector('.success__button');
  succesMessageCloseButton.removeEventListener('click', closeMessagePopUp);

  const successMessage = document.querySelector('.success');
  successMessage.removeEventListener('click', closeMessagePopUp);

  successMessage.remove();
}

export { formSubmitSuccess, closeMessagePopUp };
