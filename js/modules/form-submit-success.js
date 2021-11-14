import { onImageEditorClose } from './form-image-upload.js';
import { isEscapeKey } from '../utils/keys-checks.js';
import { toggleWindowBlocker } from '../utils/window-blocker.js';

const successMessageTemplate = document.querySelector('#success').content;

let onMessagePopUpClose = '';

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onMessagePopUpClose();
  }
};

const formSubmitSuccess = () => {
  onImageEditorClose();
  toggleWindowBlocker();
  const element = successMessageTemplate.cloneNode(true);
  document.body.appendChild(element);

  document.addEventListener('keydown', onPopupEscKeydown);

  const successMessageCloseButton = document.querySelector('.success__button');
  successMessageCloseButton.addEventListener('click', onMessagePopUpClose);

  const successMessageBackground = document.querySelector('.success__blocker');
  successMessageBackground.addEventListener('click', onMessagePopUpClose);
};

onMessagePopUpClose = () => {
  toggleWindowBlocker();

  document.removeEventListener('keydown', onPopupEscKeydown);

  const successMessageCloseButton = document.querySelector('.success__button');
  successMessageCloseButton.removeEventListener('click', onMessagePopUpClose);

  const successMessage = document.querySelector('.success');
  successMessage.removeEventListener('click', onMessagePopUpClose);

  successMessage.remove();
};

export { formSubmitSuccess };
