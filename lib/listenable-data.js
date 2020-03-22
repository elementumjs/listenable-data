/**
 * String delimiter of single references name of deep objects' attributes.
 * @ignore
 */
const REF_DELIMITER = '.';

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
class Data {
    /**
     * Creates a observable object based on the target object provided. If any
     * object property changes, the listener provided will be executed.
     * @param {Object} target - The original object to listen to.
     * @param {DataListener} listener - listener function to call when target data changes.
     */
    constructor(target, listener) {
        if (typeof target !== "object") {
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
    static refs(target) {
        let getAttrs = (obj) => {
            let res = [];
            Object.keys(obj).forEach(attr => {
                res.push([attr]);

                if (typeof obj[attr] === 'object' && obj[attr] !== null) {
                    getAttrs(obj[attr]).forEach(attrs => {
                        res.push([attr, ...attrs]);
                    });
                }
            });
            return res;
        }
        return getAttrs(target).map(ref => ref.join(REF_DELIMITER));
    }

    /**
     * Returns if the provided data contains the provided reference as a parameter.
     * @static
     * @param {Data} source Class instance to check if it contains the reference.
     * @param {string} ref Reference to search for.
     * @returns {boolean} - Returns `true` if the provided data contains the provided reference.
     */
    static contains(target, ref) {
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
    static _observable(source, listener) {
        let self = this;
        let handler = (refs = []) => {
            return {
                get(target, ref, receiver) {
                    try {
                        return new Proxy(target[ref], handler([...refs, ref]));
                    } catch (err) {
                        return Reflect.get(target, ref, receiver);
                    }
                },
                defineProperty(target, ref, descriptor) {
                    let currentRefs = [...refs, ref].join(REF_DELIMITER);
                    let currentValue = descriptor.value;
                    let lastValue = target[ref];
              
                    listener.call(self, currentRefs, currentValue, lastValue);
                    return Reflect.defineProperty(target, ref, descriptor);
                  }
            }
        }
        return new Proxy(source, handler());
    }
}

/**
 * Listener function to call when target data changes.
 * @name DataListener
 * @function
 * @param {String} ref Rerence path of changed object attribute.
 * @param {*} value Newest value of object attribute.
 * @param {*} last  Last value of object attribute.
 */

export default Data;