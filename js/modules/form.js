import { isEscapeKey } from '../utils/keys-checks.js';
import { toggleWindowBlocker } from '../utils/window-blocker.js';
import { scaleBiggerButton, scaleSmallerButton, increaseImageScale, decreaseImageScale, setDefaultImageScale } from './image-scaler.js';
import { filteringImage, resetSliderValues } from './filter-slider.js';

const GENERAL_HASHTAGS_REQUIREMENTS = 'Правила ввода хештега нарушены:\n- хэш-тег начинается с символа # (решётка);\n- строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;\n- хеш-тег не может состоять только из одной решётки;\n- максимальная длина одного хэш-тега 20 символов, включая решётку;\n- хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;\n- хэш-теги разделяются пробелами; \n- один и тот же хэш-тег не может быть использован дважды;';
const DUPLICATED_HASHTAG_MESSAGE = 'Один и тот же хэш-тег не может быть использован дважды';
const MAX_HASHTAGS_ALLOWED = 5;
const MAX_HASHTAGS_ALLOWED_MESSAGE = `Максимум доступно только ${MAX_HASHTAGS_ALLOWED} хештегов`;
const MAX_IMAGE_DESCRIPTION_LENGTH = 140;
const MAX_IMAGE_DESCRIPTION_LENGTH_MESSAGE = `Длина комментария не может составлять больше ${MAX_IMAGE_DESCRIPTION_LENGTH} символов`;
const regHashtagExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const uploadImageButton = document.querySelector('#upload-file');
const imageEditor = document.querySelector('.img-upload__overlay');
const closeButton = imageEditor.querySelector('.img-upload__cancel');
const hashtagInput = imageEditor.querySelector('.text__hashtags');
const imageDescriptionInput = imageEditor.querySelector('.text__description');
const effectsContainer = imageEditor.querySelector('.effects__list');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageEditor();
  }
};

const stopEscKeydownPropogation = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const isValidHashtag = (element) => regHashtagExp.test(element);

const hasDuplicatedItem = (array) => array.map((item) => item.toLowerCase()).some((item, index) => array.indexOf(item) < index);

const getHashtagValidityMessage= (element, array) => {
  if (!isValidHashtag(element)) {
    return GENERAL_HASHTAGS_REQUIREMENTS;
  }  if (hasDuplicatedItem(array)) {
    return DUPLICATED_HASHTAG_MESSAGE;
  } if (array.length > MAX_HASHTAGS_ALLOWED) {
    return MAX_HASHTAGS_ALLOWED_MESSAGE;
  }
  return '';
};

const hashtagsInputValidate = () => {
  const hashtagsArray = hashtagInput.value.split(' ');

  hashtagsArray.forEach((element) => {
    hashtagInput.setCustomValidity(getHashtagValidityMessage(element, hashtagsArray));
    hashtagInput.reportValidity();
  });
};

const imageDescriptionInputValidate = () => {
  if (imageDescriptionInput.value.length > MAX_IMAGE_DESCRIPTION_LENGTH) {
    imageDescriptionInput.setCustomValidity(MAX_IMAGE_DESCRIPTION_LENGTH_MESSAGE);
  } else {
    imageDescriptionInput.setCustomValidity('');
  }
  imageDescriptionInput.reportValidity();
};

function openImageEditor() {
  imageEditor.classList.remove('hidden');
  toggleWindowBlocker();

  document.addEventListener('keydown', onPopupEscKeydown);
  hashtagInput.addEventListener('keydown', stopEscKeydownPropogation);
  hashtagInput.addEventListener('input', hashtagsInputValidate);
  imageDescriptionInput.addEventListener('input', imageDescriptionInputValidate);
  imageDescriptionInput.addEventListener('keydown', stopEscKeydownPropogation);
  closeButton.addEventListener('click', closeImageEditor);
  setDefaultImageScale();
  scaleBiggerButton.addEventListener('click', increaseImageScale);
  scaleSmallerButton.addEventListener('click', decreaseImageScale);
  uploadImageButton.removeEventListener('change', openImageEditor);
  resetSliderValues();
  effectsContainer.addEventListener('change', filteringImage);
}

function closeImageEditor() {
  imageEditor.classList.add('hidden');
  toggleWindowBlocker();
  uploadImageButton.value = '';
  hashtagInput.value = '';
  imageDescriptionInput.value = '';

  uploadImageButton.addEventListener('change', openImageEditor);

  document.removeEventListener('keydown', onPopupEscKeydown);
  hashtagInput.removeEventListener('keydown', stopEscKeydownPropogation);
  hashtagInput.removeEventListener('input', hashtagsInputValidate);
  imageDescriptionInput.removeEventListener('input', imageDescriptionInputValidate);
  imageDescriptionInput.removeEventListener('keydown', stopEscKeydownPropogation);
  closeButton.removeEventListener('click', closeImageEditor);
  scaleBiggerButton.removeEventListener('click', increaseImageScale);
  scaleSmallerButton.removeEventListener('click', decreaseImageScale);
  effectsContainer.removeEventListener('change', filteringImage);
}

uploadImageButton.addEventListener('change', () => openImageEditor());


/* const sliderElement = imageEditor.querySelector('.effect-level__slider');
const effectValue = imageEditor.querySelector('.effect-level__value');
const effectsContainer = imageEditor.querySelector('.effects__list');
const imagePreview = imageEditor.querySelector('.img-upload__preview');
const chromeEffect = 'effects__preview--chrome';
const sepiaEffect = 'effects__preview--sepia';
const marvinEffect = 'effects__preview--marvin';
const phobosEffect = 'effects__preview--phobos';
const heatEffect = 'effects__preview--heat';

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 50,
  step: 1,
  connect: 'lower',
});


const removeEffectClasses = (element) => {
  element.classList.remove(chromeEffect, sepiaEffect, marvinEffect, phobosEffect, heatEffect);
};

const addEffectClass = (element, className) => {
  removeEffectClasses(element);
  element.classList.add(className);
};

const onFilterSliderChange = (filterName, type) => {
  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    effectValue.value = unencoded[handle];
    imagePreview.style.filter = `${filterName}(${effectValue.value}${type})`;
  });
};

const showSlider = () => {
  sliderElement.classList.remove('hidden');
};

const hideSlider = () => {
  sliderElement.classList.add('hidden');
};
hideSlider();

effectsContainer.addEventListener('change', (evt) => {
  switch (evt.target.id) {
    case 'effect-none':
      removeEffectClasses(imagePreview);
      imagePreview.style.filter = '';
      hideSlider();
      break;
    case 'effect-chrome':
      addEffectClass(imagePreview, chromeEffect);
      showSlider();
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 1,
      });
      onFilterSliderChange('grayscale', '');
      break;
    case 'effect-sepia':
      addEffectClass(imagePreview, sepiaEffect);
      showSlider();
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 1,
      });
      onFilterSliderChange('sepia', '');
      break;
    case 'effect-marvin':
      addEffectClass(imagePreview, marvinEffect);
      showSlider();
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
        start: 100,
      });
      onFilterSliderChange('invert','%');
      break;
    case 'effect-phobos':
      addEffectClass(imagePreview, phobosEffect);
      showSlider();
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
        start: 3,
      });
      onFilterSliderChange('blur','px');
      break;
    case 'effect-heat':
      addEffectClass(imagePreview, heatEffect);
      showSlider();
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1,
        start: 3,
      });
      onFilterSliderChange('brightness', '');
      break;
  }
}); */
