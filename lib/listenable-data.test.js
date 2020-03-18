import Data from "./listenable-data.js";

test('Data.constructor function params types', () => {
    const fn = () => {};

    expect.assertions(4);
    try { new Data(true, fn) } catch (e) { expect(e).toBeInstanceOf(TypeError) }
    try { new Data({}, true) } catch (e) { expect(e).toBeInstanceOf(TypeError) }
    try { new Data(null, fn) } catch (e) { expect(e).toBeInstanceOf(TypeError) }
    try { new Data({}, null) } catch (e) { expect(e).toBeInstanceOf(TypeError) }
});