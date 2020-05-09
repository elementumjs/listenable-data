/**
 * String delimiter of single references name of deep objects attributes.
 * @ignore
 */
const REF_DELIMITER: string = ".";

/**
 * Listener function to call when target data changes.
 * @name DataListener
 * @function
 * @param {String} ref Rerence path of changed object attribute.
 * @param {*} value Newest value of object attribute.
 * @param {*} last  Last value of object attribute.
 */
interface DataListener {
    (ref: string, value: any, last: any);
}

/**
 * Data class makes any object properties deeply observable and associates a 
 * listener to execute if the target object changes.
 */
class Data {
    /**
     * Creates a observable object based on the target object provided. If any
     * object property changes, the listener provided will be executed.
     * @param {Object} target - The original object to listen to.
     * @param {DataListener} listener - listener function to call when target 
     * data changes.
     */
    static create(target: object, listener: DataListener): object {
        return Data._observable(target, listener);
    }

    /**
     * Returns a list of attributes references nested. For example, if the data 
     * target has the following definition `{ attr1: { attr2: false }}`, the 
     * function returns [ "attr1", "attr1.attr2" ]. 
     * @static
     * @param {Data} target Target {@link Data} instance to retrive its 
     * attributes references.
     * @returns {[]string} - List of attributes references.
     */
    static refs(target: Data): Array<string> {
        const getAttrs = (obj: object) => {
            const res: Array<Array<string>> = [];

            const keys: Array<string> = Object.keys(obj);
            const { length } = keys;
            for (let i = 0; i < length; i++) {
                const attr: string = keys[i];
                const value: any = obj[attr];
                res.push([ attr ]);

                if (typeof value === "object" && value !== null) {
                    const attrs: Array<Array<string>> = getAttrs(value);
                    const attrsLength: number = attrs.length;

                    for (let n = 0; n < attrsLength; n++) res.push([attr, ...attrs[n]]);
                }
            }
            
            return res;
        }

        const result: Array<string> = [];
        const attrs: Array<Array<string>> = getAttrs(target);
        const { length } = attrs;
        for (let i = 0; i < length; i++) result.push(attrs[i].join(REF_DELIMITER));

        return result;
    }

    /**
     * Returns if the provided data contains the provided reference as a 
     * parameter.
     * @static
     * @param {Data} source Class instance to check if it contains the 
     * reference.
     * @param {string} ref Reference to search for.
     * @returns {boolean} - Returns `true` if the provided data contains the 
     * provided reference.
     */
    static contains(source: Data, ref: string): boolean {
        return this.refs(source).includes(ref);
    }

    /**
     * Creates a Proxy with a recursive handler that creates more nested Proxy
     * if deep object properties are objects. 
     * @static
     * @param {Object} source - The original object to listen to.
     * @param {DataListener} listener - listener function to call when target 
     * data changes.
     * @returns {Proxy} Proxy handler.
     * @ignore
     */
    static _observable(source: object, listener: DataListener): object {
        let self = this;
        let handler = (refs: Array<string> = []) => {
            return {
                get(target: object, ref: string, receiver: object) {
                    try {
                        return new Proxy(target[ref], handler([...refs, ref]));
                    } catch (err) {
                        return Reflect.get(target, ref, receiver);
                    }
                },
                defineProperty(target: object, ref: string, descriptor: PropertyDescriptor) {
                    const currentRefs: string = [...refs, ref].join(REF_DELIMITER);
                    const currentValue: any = descriptor.value;
                    const lastValue: any = target[ref];
              
                    listener.call(self, currentRefs, currentValue, lastValue);
                    return Reflect.defineProperty(target, ref, descriptor);
                  }
            }
        }

        return new Proxy(source, handler());
    }
}

export default Data;