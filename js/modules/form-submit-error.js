import { onImageEditorClose } from './form-image-upload.js';
import { isEscapeKey } from '../utils/keys-checks.js';
import { toggleWindowBlocker } from '../utils/window-blocker.js';

const errorMessageTemplate = document.querySelector('#error').content;

let onMessagePopUpClose = '';

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onMessagePopUpClose();
  }
};

const formSubmitError = () => {
  onImageEditorClose();
  toggleWindowBlocker();
  const element = errorMessageTemplate.cloneNode(true);
  document.body.appendChild(element);

  document.addEventListener('keydown', onPopupEscKeydown);

  const errorMessageCloseButton = document.querySelector('.error__button');
  errorMessageCloseButton.addEventListener('click', onMessagePopUpClose);

  const errorMessageBackground = document.querySelector('.error__blocker');
  errorMessageBackground.addEventListener('click', onMessagePopUpClose);
};

onMessagePopUpClose = () => {
  toggleWindowBlocker();

  document.removeEventListener('keydown', onPopupEscKeydown);

  const errorMessageCloseButton = document.querySelector('.error__button');
  errorMessageCloseButton.removeEventListener('click', onMessagePopUpClose);

  const errorMessage = document.querySelector('.error');
  errorMessage.removeEventListener('click', onMessagePopUpClose);

  errorMessage.remove();
};


export { formSubmitError };
