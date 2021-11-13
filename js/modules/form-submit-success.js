import { onImageEditorClose } from './form-image-upload.js';
import { isEscapeKey } from '../utils/keys-checks.js';
import { toggleWindowBlocker } from '../utils/window-blocker.js';

const successMessageTemplate = document.querySelector('#success').content;

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

  const successMessage = document.querySelector('.success');
  successMessage.addEventListener('click', onMessagePopUpClose);
};

function onMessagePopUpClose() {
  toggleWindowBlocker();

  document.removeEventListener('keydown', onPopupEscKeydown);

  const successMessageCloseButton = document.querySelector('.success__button');
  successMessageCloseButton.removeEventListener('click', onMessagePopUpClose);

  const successMessage = document.querySelector('.success');
  successMessage.removeEventListener('click', onMessagePopUpClose);

  successMessage.remove();
}

export { formSubmitSuccess };
