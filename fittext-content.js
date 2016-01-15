//utils
const css = (theEl, prop) => {
  return window.getComputedStyle ? getComputedStyle(theEl).getPropertyValue(prop) : theEl.currentStyle[prop];
};

const extend = (obj, ext) => {
  for (var key in ext)
    if (ext.hasOwnProperty(key))
      obj[key] = ext[key];
  return obj;
};

    //Fit object
export default class FitText {
  constructor(el, kompressor, options) {
    this.el = el;
    this.kompressor = kompressor;
    this.options = options;
    this.sizes = [];

    if (el.length) {
      for (var i = 0; i < el.length; i++) {
        this.fit(el[i]);
      }
    } else {
      this.fit(el);
    }
    return el;
  }

  settings() {

    let {
      options
    } = this;
    return extend({
      'minFontSize': -1 / 0,
      'maxFontSize': 1 / 0
    }, options);
  }

  makeUniform() {
    const minSize = Math.min(...this.sizes);
    [].slice.call(this.el).forEach(el => {
      el.style.fontSize = minSize + 'px';
    });
    if (this.sizes.length === this.el.length) {
      this.sizes = [];
    }
  }
  dismount() {
    window.removeEventListener(this.listener);
  }
  fit(el) {

    let settings = this.settings();
    let compressor = this.kompressor || 1;

    const resizer = () => {
      let size = Math.max(Math.min(el.clientWidth / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize));
      if (this.el.length) {
        if (this.sizes.length < this.el.length) {
          this.sizes.push(size);
        }
        if (this.sizes.length === this.el.length) this.makeUniform();
      } else {
        el.style.fontSize = size + 'px';
      }
    }

    // Call once to set.
    resizer();

    this.listener = window.addEventListener('resize', resizer);
  }
}