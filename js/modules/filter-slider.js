const sliderOptions = {
  range: {
    min: 0,
    max: 100,
  },
  start: 50,
  step: 1,
  connect: 'lower',
};
const effects = {
  CHROME: new FilterEffect('effects__preview--chrome', 'chrome', 0, 1, 0.1, 1, 'grayscale', ''),
  SEPIA: new FilterEffect('effects__preview--sepia', 'sepia', 0, 1, 0.1, 1, 'sepia', ''),
  MARVIN: new FilterEffect('effects__preview--marvin', 'marvin', 0, 100, 1, 100, 'invert', '%'),
  PHOBOS: new FilterEffect('effects__preview--phobos', 'phobos', 0, 3, 0.1, 3, 'blur', 'px'),
  HEAT: new FilterEffect('effects__preview--heat', 'heat', 1, 3, 0.1, 3, 'brightness', ''),
  NONE: new FilterEffect('', 'none', 0, 1, 0.1, 0, '', ''),
};

const imageEditor = document.querySelector('.img-upload__overlay');
const sliderElement = imageEditor.querySelector('.effect-level__slider');
const sliderBackground = imageEditor.querySelector('.img-upload__effect-level');
const effectValue = imageEditor.querySelector('.effect-level__value');
const imagePreview = imageEditor.querySelector('.img-upload__preview');

function FilterEffect(className, name, sliderMinRange, sliderMaxRange, sliderStep, sliderStart, styleProperty, stylePropertyValue) {
  this.className = className;
  this.name = name;
  this.sliderMinRange = sliderMinRange;
  this.sliderMaxRange = sliderMaxRange;
  this.sliderStep = sliderStep;
  this.sliderStart = sliderStart;
  this.styleProperty = styleProperty;
  this.stylePropertyValue = stylePropertyValue;
}

const removeEffectClasses = (element) => {
  element.classList.remove(effects.CHROME.className, effects.SEPIA.className, effects.MARVIN.className, effects.PHOBOS.className, effects.HEAT.className);
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
  sliderBackground.classList.remove('hidden');
};

const hideSlider = () => {
  sliderElement.classList.add('hidden');
  sliderBackground.classList.add('hidden');
};

const resetSliderValues = () => {
  hideSlider();
  removeEffectClasses(imagePreview);
  imagePreview.style.filter = null;
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

const getKeyByValue = (object, value) => Object.keys(object).find((key) => Object.keys(object[key]).some((key2) => object[key][key2] === value));

const onImageFilterChange = (evt) => {
  if (evt.target.value === effects.NONE.name) {
    resetSliderValues();
  } else {
    showSlider();
    addEffectClass(imagePreview, `effects__preview--${evt.target.value}`);
    const effectKey = getKeyByValue(effects, `effects__preview--${evt.target.value}`);
    const effect = effects[`${effectKey}`];
    updateSliderOptions(effect.sliderMinRange, effect.sliderMaxRange, effect.sliderStep, effect.sliderStart);
    onFilterSliderChange(effect.styleProperty, effect.stylePropertyValue);
  }
};

export { onImageFilterChange, initializeSlider, removeSlider };
