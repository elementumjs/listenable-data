
const REF_DELIMITER = '.';

/**
 * Data class makes any object properties deeply observable and associates a 
 * listener to execute if the target object changes.
 * @ignore
 * @example
 * let initialData = {
 *   deep: {
 *     counter: 0
 *   }
 * });
 * 
 * let data = new Data(intialData, ({ref, value, last}) => {
 *   console.log(ref, value, last);
 * }
 * 
 * data.deep.counter++; // 'deep.counter', 1, 0
 */
class Data {
    /**
     * Creates a observable object based on the target object provided. If any
     * object property changes, the listener provided will be executed.
     * @param {Object} target - The original object to listen to.
     * @param {dataListener} listener - listener function to call when target data changes.
     */
    constructor(target, handler) {
        return Data._observable(target, handler);
    }

    static refs(target) {
        let getProps = (obj) => {
            let res = [];
            Object.keys(obj).forEach(attr => {
                res.push([attr]);

                if (typeof obj[attr] === 'object' && obj[attr] !== null) {
                    getProps(obj[attr]).forEach(props => {
                        res.push([attr, ...props]);
                    });
                }
            });

            return res;
        }

        return getProps(target).map(ref => ref.join(REF_DELIMITER));
    }

    static contains(self, ref) {
        return this.refs(self).includes(ref);
    }

    /**
     * Creates a Proxy with a recursive handler that creates more nested Proxy
     * if deep object properties are objects. 
     * @param {Object} target - The original object to listen to.
     * @param {dataListener} listener - listener function to call when target data changes.
     * @returns {Proxy} Proxy handler.
     * @ignore
     */
    static _observable(target, listener) {
        let self = this;
        let handler = (parents = []) => {
            return {
                get(target, current) {
                    let temp = target[current];
                    if (typeof temp === 'object' && temp !== null) {
                        return new Proxy(target[current], handler([...parents, current]))
                    }
    
                    return target[current];
                },
                set(target, current, value) {
                    let ref = [...parents, current];
                    let last = target[current];

                    let res = Reflect.set(target, current, value);
                    listener.call(self, {ref: ref.join(REF_DELIMITER), value, last});
                    return res;
                }
            }
        }

        return new Proxy(target, handler())        
    }
}

export default Data;