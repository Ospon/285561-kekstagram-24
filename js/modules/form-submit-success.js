import { closeImageEditor } from './form-image-upload.js';
import { isEscapeKey } from '../utils/keys-checks.js';
import { toggleWindowBlocker } from '../utils/window-blocker.js';

const successMessageTemplate = document.querySelector('#success').content;

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessagePopUp();
  }
};

function formSubmitSuccess() {
  closeImageEditor();
  toggleWindowBlocker();
  const element = successMessageTemplate.cloneNode(true);
  document.body.appendChild(element);

  document.addEventListener('keydown', onPopupEscKeydown);

  const successMessageCloseButton = document.querySelector('.success__button');
  successMessageCloseButton.addEventListener('click', closeMessagePopUp);

  const successMessage = document.querySelector('.success');
  successMessage.addEventListener('click', closeMessagePopUp);
}

function closeMessagePopUp() {
  toggleWindowBlocker();

  document.removeEventListener('keydown', onPopupEscKeydown);

  const successMessageCloseButton = document.querySelector('.success__button');
  successMessageCloseButton.removeEventListener('click', closeMessagePopUp);

  const successMessage = document.querySelector('.success');
  successMessage.removeEventListener('click', closeMessagePopUp);

  successMessage.remove();
}

export { formSubmitSuccess, closeMessagePopUp };
