import { isEscapeKey } from '../utils/keys-checks.js';
import { toggleWindowBlocker } from '../utils/window-blocker.js';
import { scaleBiggerButton, scaleSmallerButton, onImageScaleIncrease, onImageScaleDecrease, setDefaultImageScale } from './image-scaler.js';
import { onImageFilterChange, initializeSlider, removeSlider } from './filter-slider.js';
import { sendData } from './api.js';
import { formSubmitError } from './form-submit-error.js';
import { formSubmitSuccess } from './form-submit-success.js';

const GENERAL_HASHTAGS_REQUIREMENTS = 'Правила ввода хештега нарушены:\n- хэш-тег начинается с символа # (решётка);\n- строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;\n- хеш-тег не может состоять только из одной решётки;\n- максимальная длина одного хэш-тега 20 символов, включая решётку;\n- хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;\n- хэш-теги разделяются пробелами; \n- один и тот же хэш-тег не может быть использован дважды;';
const DUPLICATED_HASHTAG_MESSAGE = 'Один и тот же хэш-тег не может быть использован дважды';
const MAX_HASHTAGS_ALLOWED = 5;
const MAX_HASHTAGS_ALLOWED_MESSAGE = `Максимум доступно только ${MAX_HASHTAGS_ALLOWED} хештегов`;
const MAX_IMAGE_DESCRIPTION_LENGTH = 140;
const MAX_IMAGE_DESCRIPTION_LENGTH_MESSAGE = `Длина комментария не может составлять больше ${MAX_IMAGE_DESCRIPTION_LENGTH} символов`;
const DEFAULT_BORDER_STYLE = '1px solid rgb(118, 118, 118)';
const WARNING_BORDER_STYLE = '2px solid red';

const regHashtagExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const uploadImageButton = document.querySelector('#upload-file');
const imageEditor = document.querySelector('.img-upload__overlay');
const imageUploadForm = document.querySelector('.img-upload__form');
const closeButton = imageEditor.querySelector('.img-upload__cancel');
const hashtagInput = imageEditor.querySelector('.text__hashtags');
const imageDescriptionInput = imageEditor.querySelector('.text__description');
const effectsContainer = imageEditor.querySelector('.effects__list');
const noneEffect = imageEditor.querySelector('[value=none]');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onImageEditorClose();
  }
};

const onEscKeydownStopPropagation = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const isValidHashtag = (element) => regHashtagExp.test(element);

const hasDuplicatedItem = (array) => {
  const lowerCasedArray = array.map((item) => item.toLowerCase());
  return new Set(lowerCasedArray).size !== lowerCasedArray.length;
};

const getHashtagValidityMessage = (element, array) => {
  if (array[0] === '' && array.length === 1) {
    return '';
  }
  if (!isValidHashtag(element)) {
    return GENERAL_HASHTAGS_REQUIREMENTS;
  }
  if (hasDuplicatedItem(array)) {
    return DUPLICATED_HASHTAG_MESSAGE;
  }
  if (array.length > MAX_HASHTAGS_ALLOWED) {
    return MAX_HASHTAGS_ALLOWED_MESSAGE;
  }
  return '';
};

const onHashtagsInput = () => {
  const hashtags = hashtagInput.value.split(' ');

  hashtags.forEach((element) => {
    hashtagInput.setCustomValidity(getHashtagValidityMessage(element, hashtags));
    hashtagInput.reportValidity();
    const validityState = hashtagInput.checkValidity();
    hashtagInput.style.border = validityState ?  hashtagInput.style.border = DEFAULT_BORDER_STYLE : hashtagInput.style.border = WARNING_BORDER_STYLE;
  });
};

const onImageDescriptionInput = () => {
  if (imageDescriptionInput.value.length > MAX_IMAGE_DESCRIPTION_LENGTH) {
    imageDescriptionInput.setCustomValidity(MAX_IMAGE_DESCRIPTION_LENGTH_MESSAGE);
    imageDescriptionInput.style.border = WARNING_BORDER_STYLE;
  } else {
    imageDescriptionInput.setCustomValidity('');
  }
  imageDescriptionInput.reportValidity();
};

function onImageEditorOpen() {
  imageEditor.classList.remove('hidden');
  toggleWindowBlocker();

  document.addEventListener('keydown', onPopupEscKeydown);
  hashtagInput.addEventListener('keydown', onEscKeydownStopPropagation);
  hashtagInput.addEventListener('input', onHashtagsInput);
  imageDescriptionInput.addEventListener('input', onImageDescriptionInput);
  imageDescriptionInput.addEventListener('keydown', onEscKeydownStopPropagation);
  closeButton.addEventListener('click', onImageEditorClose);
  setDefaultImageScale();
  scaleBiggerButton.addEventListener('click', onImageScaleIncrease);
  scaleSmallerButton.addEventListener('click', onImageScaleDecrease);
  uploadImageButton.removeEventListener('change', onImageEditorOpen);
  initializeSlider();
  effectsContainer.addEventListener('change', onImageFilterChange);
}

const setDefaultFormState = () => {
  uploadImageButton.value = '';
  hashtagInput.value = '';
  imageDescriptionInput.value = '';
  noneEffect.checked;
  hashtagInput.style.border = DEFAULT_BORDER_STYLE;
  imageDescriptionInput.style.border = DEFAULT_BORDER_STYLE;
};

function onImageEditorClose() {
  imageEditor.classList.add('hidden');
  toggleWindowBlocker();
  setDefaultFormState();
  removeSlider();

  uploadImageButton.addEventListener('change', onImageEditorOpen);

  document.removeEventListener('keydown', onPopupEscKeydown);
  hashtagInput.removeEventListener('keydown', onEscKeydownStopPropagation);
  hashtagInput.removeEventListener('input', onHashtagsInput);
  imageDescriptionInput.removeEventListener('input', onImageDescriptionInput);
  imageDescriptionInput.removeEventListener('keydown', onEscKeydownStopPropagation);
  closeButton.removeEventListener('click', onImageEditorClose);
  scaleBiggerButton.removeEventListener('click', onImageScaleIncrease);
  scaleSmallerButton.removeEventListener('click', onImageScaleDecrease);
  effectsContainer.removeEventListener('change', onImageFilterChange);
}

uploadImageButton.addEventListener('change', () => onImageEditorOpen());

const setUserFormSubmit = (onSucces, onFail) => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSucces(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};

setUserFormSubmit(formSubmitSuccess, formSubmitError);

export { onImageEditorOpen, onImageEditorClose };
