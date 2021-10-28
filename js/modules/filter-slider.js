const imageEditor = document.querySelector('.img-upload__overlay');
const sliderElement = imageEditor.querySelector('.effect-level__slider');
const effectValue = imageEditor.querySelector('.effect-level__value');
const imagePreview = imageEditor.querySelector('.img-upload__preview');
const CHROME_EFFECT = {
  className: 'effects__preview--chrome',
  name: 'chrome',
  sliderMinRange: 0,
  sliderMaxRange: 1,
  sliderStep: 0.1,
  sliderStart: 1,
  styleProperty: 'grayscale',
  stylePropertyValue: '',
};
const SEPIA_EFFECT = {
  className: 'effects__preview--sepia',
  name: 'sepia',
  sliderMinRange: 0,
  sliderMaxRange: 1,
  sliderStep: 0.1,
  sliderStart: 1,
  styleProperty: 'sepia',
  stylePropertyValue: '',
};
const MARVIN_EFFECT = {
  className: 'effects__preview--marvin',
  name: 'marvin',
  sliderMinRange: 0,
  sliderMaxRange: 100,
  sliderStep: 1,
  sliderStart: 100,
  styleProperty: 'invert',
  stylePropertyValue: '%',
};
const PHOBOS_EFFECT = {
  className: 'effects__preview--phobos',
  name: 'phobos',
  sliderMinRange: 0,
  sliderMaxRange: 3,
  sliderStep: 0.1,
  sliderStart: 3,
  styleProperty: 'blur',
  stylePropertyValue: 'px',
};
const HEAT_EFFECT = {
  className: 'effects__preview--heat',
  name: 'heat',
  sliderMinRange: 1,
  sliderMaxRange: 3,
  sliderStep: 0.1,
  sliderStart: 3,
  styleProperty: 'brightness',
  stylePropertyValue: '',
};
const NONE_EFFECT = {
  className: '',
  name: 'none',
  sliderMinRange: 0,
  sliderMaxRange: 1,
  sliderStep: 0.1,
  sliderStart: 0,
  styleProperty: '',
  stylePropertyValue: '',
};

const removeEffectClasses = (element) => {
  element.classList.remove(CHROME_EFFECT.className, SEPIA_EFFECT.className, MARVIN_EFFECT.className, PHOBOS_EFFECT.className, HEAT_EFFECT.className);
};

const addEffectClass = (element, effectName) => {
  removeEffectClasses(element);
  element.classList.add(effectName);
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
  if (filterObject === NONE_EFFECT) {
    removeEffectClasses(image);
    image.style.filter = filterObject.styleProperty;
    hideSlider();
  } else {
    showSlider();
    addEffectClass(image, `effects__preview--${filterObject.name}`);
    updateSliderOptions(filterObject.sliderMinRange, filterObject.sliderMaxRange, filterObject.sliderStep, filterObject.sliderStart);
    onFilterSliderChange(filterObject.styleProperty, filterObject.stylePropertyValue);
  }
};

const filteringImage = (evt) => {
  switch (evt.target.value) {
    case NONE_EFFECT.name:
      applyImageFilter(imagePreview, NONE_EFFECT);
      break;
    case CHROME_EFFECT.name:
      applyImageFilter(imagePreview, CHROME_EFFECT);
      break;
    case SEPIA_EFFECT.name:
      applyImageFilter(imagePreview, SEPIA_EFFECT);
      break;
    case MARVIN_EFFECT.name:
      applyImageFilter(imagePreview, MARVIN_EFFECT);
      break;
    case PHOBOS_EFFECT.name:
      applyImageFilter(imagePreview, PHOBOS_EFFECT);
      break;
    case HEAT_EFFECT.name:
      applyImageFilter(imagePreview, HEAT_EFFECT);
      break;
  }
};

export { filteringImage, inicializeSlider, removeSlider };
