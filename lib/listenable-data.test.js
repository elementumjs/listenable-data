import Data from "./listenable-data.js";

test('Data.constructor types', () => {
    const fn = () => {};

    // Type tests for raise an error with wrong `target` param
    try { new Data(0, fn) } catch (e) { expect(e).toBeInstanceOf(TypeError) }
    try { new Data("", fn) } catch (e) { expect(e).toBeInstanceOf(TypeError) }
    try { new Data(true, fn) } catch (e) { expect(e).toBeInstanceOf(TypeError) }
    try { new Data(fn, fn) } catch (e) { expect(e).toBeInstanceOf(TypeError) }

    // Type tests for raise an error with wrong `handler` param
    try { new Data({}, 0) } catch (e) { expect(e).toBeInstanceOf(TypeError) }
    try { new Data({}, "") } catch (e) { expect(e).toBeInstanceOf(TypeError) }
    try { new Data({}, true) } catch (e) { expect(e).toBeInstanceOf(TypeError) }
    try { new Data({}, []) } catch (e) { expect(e).toBeInstanceOf(TypeError) }
    try { new Data({}, {}) } catch (e) { expect(e).toBeInstanceOf(TypeError) }

    // Type tests for check if result object has the same keys/indexes and 
    // values that the target one. 
    expect(
        new Data({ attr: true }, fn).attr
    ).toBe(true);

    expect(
        new Data([ true ], fn)[0]
    ).toBe(true);
});