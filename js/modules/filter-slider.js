const imageEditor = document.querySelector('.img-upload__overlay');
const sliderElement = imageEditor.querySelector('.effect-level__slider');
const effectValue = imageEditor.querySelector('.effect-level__value');
const imagePreview = imageEditor.querySelector('.img-upload__preview');
const CHROME_EFFECT = 'effects__preview--chrome';
const SEPIA_EFFECT = 'effects__preview--sepia';
const MARVIN_EFFECT = 'effects__preview--marvin';
const PHOBOS_EFFECT = 'effects__preview--phobos';
const HEAT_EFFECT = 'effects__preview--heat';
const NONE_VALUE = 'none';
const CHROME_VALUE = 'chrome';
const SEPIA_VALUE = 'sepia';
const MARVIN_VALUE = 'marvin';
const PHOBOS_VALUE = 'phobos';
const HEAT_VALUE = 'heat';

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
  element.classList.remove(CHROME_EFFECT, SEPIA_EFFECT, MARVIN_EFFECT, PHOBOS_EFFECT, HEAT_EFFECT);
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

const resetSliderValues = () => {
  hideSlider();
  removeEffectClasses(imagePreview);
  imagePreview.style.removeProperty('filter');
};

const filteringImage = (evt) => {
  switch (evt.target.value) {
    case NONE_VALUE:
      removeEffectClasses(imagePreview);
      imagePreview.style.filter = '';
      hideSlider();
      break;
    case CHROME_VALUE:
      addEffectClass(imagePreview, CHROME_EFFECT);
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
    case SEPIA_VALUE:
      addEffectClass(imagePreview, SEPIA_EFFECT);
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
    case MARVIN_VALUE:
      addEffectClass(imagePreview, MARVIN_EFFECT);
      showSlider();
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
        start: 100,
      });
      onFilterSliderChange('invert', '%');
      break;
    case PHOBOS_VALUE:
      addEffectClass(imagePreview, PHOBOS_EFFECT);
      showSlider();
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
        start: 3,
      });
      onFilterSliderChange('blur', 'px');
      break;
    case HEAT_VALUE:
      addEffectClass(imagePreview, HEAT_EFFECT);
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
};

export { filteringImage, resetSliderValues };
