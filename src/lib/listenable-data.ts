/**
 * String delimiter of single references name of deep objects attributes.
 * @ignore
 */
const REF_DELIMITER: string = ".";

/**
 * Listener function to listen target property changes.
 * @param {*} value Newest value of target property.
 * @param {*} last  Last value of target property.
 * @void
 */
interface Listener {
    (value: any, last: any);
}

/**
 * Data class makes any object properties deeply observable and associates a 
 * listener to execute if the target object changes.
 */
class Data {
    /**
     * ::listeners property stores the registered listeners associated to its
     * properties.
     * @ignore
     */
    private "::listeners": object = {};

    /**
     * Constructor envolves the target object into a {@link Wrap} to allow to
     * listen by property and then make it observable.
     * @param {Object} target - The original object to listen to.
     */
    constructor(target: object) {
        const self = Object.assign(this, target);
        return this._observable() as Data;
    }

    /**
     * listen function registers a change listener function for a data source 
     * property by the provided refenrence.
     * @param {string} ref - The reference to register the listener.
     * @param {Listener} listener - Function to listen a property change
     */
    listen(ref: string, listener: Listener) {
        this["::listeners"][ref] = listener;
    }

    /**
     * dismiss function unregister a listener for a data source property by the 
     * provided reference.
     * @param {string} ref - The reference to unregister the listener.
     */
    dismiss(ref: string) {
        delete this["::listeners"][ref];
    }

    /**
     * Returns if the current data contains the provided reference.
     * @param {string} ref Reference to search for.
     * @returns {boolean} - Returns `true` if the provided data contains the 
     * provided reference.
     */
    public contains(ref: string): boolean {
        return this.refs().includes(ref);
    }

    /**
     * Returns a list of attributes references nested. For example, if the data 
     * target has the following definition `{ attr1: { attr2: false }}`, the 
     * function returns [ "attr1", "attr1.attr2" ]. 
     * @returns {[]string} - List of attributes references.
     */
    public refs(): Array<string> {
        const getAttrs = (obj: object) => {
            const res: Array<Array<string>> = [];

            const keys: Array<string> = Object.keys(obj);
            const { length } = keys;
            for (let i = 0; i < length; i++) {
                const attr: string = keys[i];
                if (attr.startsWith("::")) continue;

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
        const attrs: Array<Array<string>> = getAttrs(this);
        const { length } = attrs;
        for (let i = 0; i < length; i++) result.push(attrs[i].join(REF_DELIMITER));

        return result;
    }

    /**
     * Handler function to listen target properties changes.
     * @param {string} ref - The reference of the changed property.
     * @param {*} value - Newest value of target property.
     * @param {*} last - Last value of target property.
     * @ignore
     */
    private _handler(ref: string, value: any, last: any) {
        if (Object.prototype.hasOwnProperty.call(this["::listeners"], ref)) {
            this["::listeners"][ref](value, last);
        }
    }

    /**
     * Creates a Proxy with a recursive handler that creates more nested Proxy
     * if other deep properties are objects. 
     * @returns {object} Proxy handler.
     * @ignore
     */
    private _observable(): object {
        const self = this
        let handler = (refs: Array<string> = []) => {
            return {
                get(target: object, ref: string, receiver: object) {
                    try {
                        if (ref.startsWith("::")) throw null;
                        return new Proxy(target[ref], handler([...refs, ref]));
                    } catch (err) {
                        return Reflect.get(target, ref, receiver);
                    }
                },
                defineProperty(target: object, ref: string, descriptor: PropertyDescriptor) {
                    const currentRefs: string = [...refs, ref].join(REF_DELIMITER);
                    const currentValue: any = descriptor.value;
                    const lastValue: any = target[ref];
              
                    self._handler.call(self, currentRefs, currentValue, lastValue);
                    return Reflect.defineProperty(target, ref, descriptor);
                  }
            }
        }

        return new Proxy(self, handler());
    }
}

export default Data;