(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _fittextContent = require('./fittext-content');

var _fittextContent2 = _interopRequireDefault(_fittextContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var headers = document.getElementsByTagName('h1');

var fitElements = new _fittextContent2.default(headers);

/****** Alt Syntax
// If you're not sure whether any elements exist, it's probably safer to instantiate this way:

[].slice.call(headers).forEach( header => {
	new FitText(header);
});

This will avoid errors if the headers variable doesn't contain anything.
*********/

/********* For single-page apps
// The dismount function should be called when the element is removed from the page

fitElements.dismount();

**********/

},{"./fittext-content":2}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//utils
var css = function css(theEl, prop) {
  return window.getComputedStyle ? getComputedStyle(theEl).getPropertyValue(prop) : theEl.currentStyle[prop];
};

var extend = function extend(obj, ext) {
  for (var key in ext) {
    if (ext.hasOwnProperty(key)) obj[key] = ext[key];
  }return obj;
};

//Fit object

var FitText = function () {
  function FitText(el, kompressor, options) {
    _classCallCheck(this, FitText);

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

  _createClass(FitText, [{
    key: 'settings',
    value: function settings() {
      var options = this.options;

      return extend({
        'minFontSize': -1 / 0,
        'maxFontSize': 1 / 0
      }, options);
    }
  }, {
    key: 'makeUniform',
    value: function makeUniform() {
      var _Math;

      var minSize = (_Math = Math).min.apply(_Math, _toConsumableArray(this.sizes));
      [].slice.call(this.el).forEach(function (el) {
        el.style.fontSize = minSize + 'px';
      });
      if (this.sizes.length === this.el.length) {
        this.sizes = [];
      }
    }
  }, {
    key: 'dismount',
    value: function dismount() {
      window.removeEventListener(this.listener);
    }
  }, {
    key: 'fit',
    value: function fit(el) {
      var _this = this;

      var settings = this.settings();
      var compressor = this.kompressor || 1;

      var resizer = function resizer() {
        var size = Math.max(Math.min(el.clientWidth / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize));
        if (_this.el.length) {
          if (_this.sizes.length < _this.el.length) {
            _this.sizes.push(size);
          }
          if (_this.sizes.length === _this.el.length) _this.makeUniform();
        } else {
          el.style.fontSize = size + 'px';
        }
      };

      // Call once to set.
      resizer();

      this.listener = window.addEventListener('resize', resizer);
    }
  }]);

  return FitText;
}();

exports.default = FitText;

},{}]},{},[1]);
