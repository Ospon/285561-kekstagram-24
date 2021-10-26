const imageEditor = document.querySelector('.img-upload__overlay');
const sliderElement = imageEditor.querySelector('.effect-level__slider');
const effectValue = imageEditor.querySelector('.effect-level__value');
const imagePreview = imageEditor.querySelector('.img-upload__preview');
const CHROME_EFFECT = {
  className: 'effects__preview--chrome',
  value: 'chrome',
  sliderMinRange: 0,
  sliderMaxRange: 1,
  sliderStep: 0.1,
  sliderStart: 1,
  styleProperty: 'grayscale',
  stylePropertyValue: '',
};
const SEPIA_EFFECT = {
  className: 'effects__preview--sepia',
  value: 'sepia',
  sliderMinRange: 0,
  sliderMaxRange: 1,
  sliderStep: 0.1,
  sliderStart: 1,
  styleProperty: 'sepia',
  stylePropertyValue: '',
};
const MARVIN_EFFECT = {
  className: 'effects__preview--marvin',
  value: 'marvin',
  sliderMinRange: 0,
  sliderMaxRange: 100,
  sliderStep: 1,
  sliderStart: 100,
  styleProperty: 'invert',
  stylePropertyValue: '%',
};
const PHOBOS_EFFECT = {
  className: 'effects__preview--phobos',
  value: 'phobos',
  sliderMinRange: 0,
  sliderMaxRange: 3,
  sliderStep: 0.1,
  sliderStart: 3,
  styleProperty: 'blur',
  stylePropertyValue: 'px',
};
const HEAT_EFFECT = {
  className: 'effects__preview--heat',
  value: 'heat',
  sliderMinRange: 1,
  sliderMaxRange: 3,
  sliderStep: 0.1,
  sliderStart: 3,
  styleProperty: 'brightness',
  stylePropertyValue: '',
};
const NONE_EFFECT = 'none';

const removeEffectClasses = (element) => {
  element.classList.remove(CHROME_EFFECT.className, SEPIA_EFFECT.className, MARVIN_EFFECT.className, PHOBOS_EFFECT.className, HEAT_EFFECT.className);
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

const inicializeSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 50,
    step: 1,
    connect: 'lower',
  });
  resetSliderValues();
};

const removeSlider = () => {
  sliderElement.noUiSlider.destroy();
};

const updateSliderOptions = (rangeMin, rangeMax, sliderStep, startValue) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: rangeMin,
      max: rangeMax,
    },
    step: sliderStep,
    start: startValue,
  });
};

const applyImageFilter = (image, filterObject) => {
  addEffectClass(image, filterObject.className);
  showSlider();
  updateSliderOptions(filterObject.sliderMinRange, filterObject.sliderMaxRange, filterObject.sliderStep, filterObject.sliderStart);
  onFilterSliderChange(filterObject.styleProperty, filterObject.stylePropertyValue);
};

const filteringImage = (evt) => {
  switch (evt.target.value) {
    case NONE_EFFECT:
      removeEffectClasses(imagePreview);
      imagePreview.style.filter = '';
      hideSlider();
      break;
    case CHROME_EFFECT.value:
      applyImageFilter(imagePreview, CHROME_EFFECT);
      break;
    case SEPIA_EFFECT.value:
      applyImageFilter(imagePreview, SEPIA_EFFECT);
      break;
    case MARVIN_EFFECT.value:
      applyImageFilter(imagePreview, MARVIN_EFFECT);
      break;
    case PHOBOS_EFFECT.value:
      applyImageFilter(imagePreview, PHOBOS_EFFECT);
      break;
    case HEAT_EFFECT.value:
      applyImageFilter(imagePreview, HEAT_EFFECT);
      break;
  }
};

export { filteringImage, inicializeSlider, removeSlider };
