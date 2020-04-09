function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

/**
 * String delimiter of single references name of deep objects' attributes.
 * @ignore
 */
var REF_DELIMITER = '.';
/**
 * Data class makes any object properties deeply observable and associates a 
 * listener to execute if the target object changes.
 * @example
 * // Instance initial data
 * let initialData = {
 *   deep: {
 *     counter: 0
 *   }
 * });
 * 
 * // Define listener function
 * let changeListener = (ref, value, last) => {
 *     console.log(ref, value, last);
 * }
 * 
 * // Create data
 * let data = new Data(intialData, changeListener); 
 * 
 * // Get all the data attributes references
 * console.log(Data.refs(data)); // ["deep", "deep.counter"]
 *
 * // Check if data contains a reference
 * console.log(Data.contains(data, 'deep.counter')); // true
 *
 * // Change the data
 * data.deep.counter++; // 'deep.counter', 1, 0
 */

var Data = /*#__PURE__*/function () {
  /**
   * Creates a observable object based on the target object provided. If any
   * object property changes, the listener provided will be executed.
   * @param {Object} target - The original object to listen to.
   * @param {DataListener} listener - listener function to call when target data changes.
   */
  function Data(target, listener) {
    _classCallCheck(this, Data);

    if (_typeof(target) !== "object") {
      throw new TypeError("Cannot create Data with a non-object as target", "listenable-data.js");
    } else if (typeof listener !== "function") {
      throw new TypeError("Cannot create Data with a non-function as handler", "listenable-data.js");
    }

    return Data._observable(target, listener);
  }
  /**
   * Returns a list of attributes references nested. For example, if the data target
   * has the following definition `{ attr1: { attr2: false }}`, the function returns 
   * [ "attr1", "attr1.attr2" ]. 
   * @static
   * @param {Data} target Target {@link Data} instance to retrive its attributes references.
   * @returns {[]string} - List of attributes references.
   */


  _createClass(Data, null, [{
    key: "refs",
    value: function refs(target) {
      var getAttrs = function getAttrs(obj) {
        var res = [];
        Object.keys(obj).forEach(function (attr) {
          res.push([attr]);

          if (_typeof(obj[attr]) === 'object' && obj[attr] !== null) {
            getAttrs(obj[attr]).forEach(function (attrs) {
              res.push([attr].concat(_toConsumableArray(attrs)));
            });
          }
        });
        return res;
      };

      return getAttrs(target).map(function (ref) {
        return ref.join(REF_DELIMITER);
      });
    }
    /**
     * Returns if the provided data contains the provided reference as a parameter.
     * @static
     * @param {Data} source Class instance to check if it contains the reference.
     * @param {string} ref Reference to search for.
     * @returns {boolean} - Returns `true` if the provided data contains the provided reference.
     */

  }, {
    key: "contains",
    value: function contains(target, ref) {
      return this.refs(target).includes(ref);
    }
    /**
     * Creates a Proxy with a recursive handler that creates more nested Proxy
     * if deep object properties are objects. 
     * @static
     * @param {Object} source - The original object to listen to.
     * @param {DataListener} listener - listener function to call when target data changes.
     * @returns {Proxy} Proxy handler.
     * @ignore
     */

  }, {
    key: "_observable",
    value: function _observable(source, listener) {
      var self = this;

      var handler = function handler() {
        var refs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        return {
          get: function get(target, ref, receiver) {
            try {
              return new Proxy(target[ref], handler([].concat(_toConsumableArray(refs), [ref])));
            } catch (err) {
              return Reflect.get(target, ref, receiver);
            }
          },
          defineProperty: function defineProperty(target, ref, descriptor) {
            var currentRefs = [].concat(_toConsumableArray(refs), [ref]).join(REF_DELIMITER);
            var currentValue = descriptor.value;
            var lastValue = target[ref];
            listener.call(self, currentRefs, currentValue, lastValue);
            return Reflect.defineProperty(target, ref, descriptor);
          }
        };
      };

      return new Proxy(source, handler());
    }
  }]);

  return Data;
}();

export default Data;
