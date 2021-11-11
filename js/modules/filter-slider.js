const imageEditor = document.querySelector('.img-upload__overlay');
const sliderElement = imageEditor.querySelector('.effect-level__slider');
const effectValue = imageEditor.querySelector('.effect-level__value');
const imagePreview = imageEditor.querySelector('.img-upload__preview');
const sliderOptions = {
  range: {
    min: 0,
    max: 100,
  },
  start: 50,
  step: 1,
  connect: 'lower',
};

function FilterEffect(className, name, sliderMinRange, sliderMaxRange, sliderStep, sliderStart, styleProperty, stylePropertyValue, isSliderActive) {
  this.className = className;
  this.name = name;
  this.sliderMinRange = sliderMinRange;
  this.sliderMaxRange = sliderMaxRange;
  this.sliderStep = sliderStep;
  this.sliderStart = sliderStart;
  this.styleProperty = styleProperty;
  this.stylePropertyValue = stylePropertyValue;
  this.isSliderActive = isSliderActive;
}

const CHROME_EFFECT = new FilterEffect('effects__preview--chrome', 'chrome', 0, 1, 0.1, 1, 'grayscale', '', true);
const SEPIA_EFFECT =  new FilterEffect('effects__preview--sepia', 'sepia', 0, 1, 0.1, 1, 'sepia', '', true);
const MARVIN_EFFECT = new FilterEffect('effects__preview--marvin', 'marvin', 0, 100, 1, 100, 'invert', '%', true);
const PHOBOS_EFFECT = new FilterEffect('effects__preview--phobos', 'phobos', 0, 3, 0.1, 3, 'blur', 'px', true);
const HEAT_EFFECT = new FilterEffect('effects__preview--heat', 'heat', 1, 3, 0.1, 3, 'brightness', '', true);
const NONE_EFFECT = new FilterEffect('', '', 0, 1, 0.1, 0, '', '', false);

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

const initializeSlider = () => {
  noUiSlider.create(sliderElement, sliderOptions);
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

export { filteringImage, initializeSlider, removeSlider };
