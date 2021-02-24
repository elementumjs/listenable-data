<img src="https://raw.githubusercontent.com/elementumjs/listenable-data/master/assets/header.svg"/>

[![production](https://github.com/elementumjs/listenable-data/workflows/production/badge.svg)][1]
[![develop](https://github.com/elementumjs/listenable-data/workflows/develop/badge.svg)][2]
[![package_version](https://img.shields.io/github/package-json/v/elementumjs/listenable-data)][3]
[![reference](https://img.shields.io/badge/docs-REFERENCE-blue)][4]
[![license](https://img.shields.io/github/license/elementumjs/listenable-data)][5]

`@elementumjs/listenable-data` is a data structure to listen for deep changes into objects' attributes.

- [📝 How to use it][6]
  - [Set a single listener][7]
  - [Set a global listener][8]
  - [Other features][9]
- [⚙️ Installation][10]
  - [Import from CDN as ES Module][11]
  - [Or install the package locally][12]
  - [Other import methods][13]

---

<img src="https://raw.githubusercontent.com/elementumjs/template/develop/assets/how-to-use-it.svg"/>

### How to use it

#### Set a single listener

To listen for a single property change follow the following steps:

1. Define initial data object and create the listenable object with it.
2. Register a listener to any property that receives:
    - `value`: Current value of attribute after the change.
    - `last`: Last value of the attribute.
3. Trigger a change.
4. *(optional)* Dismiss the listener to stop listening.

```javascript
    import Data from '@elementumjs/listenable-data';

    // [1] Define initial data object and create the listenable object
    const data = new Data({
        deep: {
            counter: 0
        }
    });

    // [2] Register a listener
    data.listen("deep.counter", (value, last) => console.log(value, last));

    // [3] Trigger a change
    data.deep.counter++; // 1 0

    // [4] Dismiss the listener
    data.dismiss("deep.counter");
```

#### Global listener

Also is possible to listen for any propery change:

1. Define initial data object and create the listenable object with it.
2. Register a listener to any property that receives:
    - `value`: Current value of attribute after the change.
    - `last`: Last value of the attribute.
    - `ref`: The property reference.
3. Trigger a change.
4. *(optional)* Dismiss the global listener to stop listening.

```javascript
    import Data from '@elementumjs/listenable-data';

    // [1] Define initial data object and create the listenable object
    const data = new Data({
        deep: {
            counter: 0
        }
    });

    // [2] Register a listener
    data.listenAll((value, last, ref) => console.log(value, last, ref));

    // [3] Trigger a change
    data.deep.counter++; // 1 0 "deep.counter"

    // [4] Dismiss the listener
    data.dismissAll();
```

#### Other features

##### Check if single property is already defined

```javascript
    // Define initial data object and create the listenable object
    const data = new Data({
        deep: {
            counter: 0
        }
    });

    // Print if source data contains a single reference
    console.log(data.contains("deep.counter")) // true
```

##### Get defined references

```javascript
    // Define initial data object and create the listenable object
    const data = new Data({
        deep: {
            counter: 0
        }
    });

    // Print if source data contains a single reference
    console.log(data.refs()) // ["deep", "deep.counter"]
```

<img src="https://raw.githubusercontent.com/elementumjs/template/develop/assets/installation.svg"/>

### Installation

#### Import from CDN as ES Module

Import from [jsDelivr CDN](https://www.jsdelivr.com/):

```javascript
    import Data from "https://cdn.jsdelivr.net/gh/elementumjs/listenable-data/dist/listenable-data.esm.js";
```

#### Or install the package locally

##### Download the package

Install via `npm`:

```sh
    npm install @elementumjs/listenable-data
```

##### Import as ES Module

[ES Module](http://exploringjs.com/es6/ch_modules.html) builds are intended for use with modern bundlers like [webpack 2](https://webpack.js.org) or [rollup](http://rollupjs.org/). Use it with ES6 JavaScript `import`:
  
```javascript
    import Data from '@elementumjs/listenable-data';
```

#### Other import methods

Checkout other import methods in [`dist/README.md`](https://github.com/elementumjs/listenable-data/blob/master/dist/README.md).

[1]: https://github.com/elementumjs/listenable-data/actions?query=workflow%3Aproduction

[2]: https://github.com/elementumjs/listenable-data/actions?query=workflow%3Adevelop

[3]: https://github.com/elementumjs/listenable-data/packages/

[4]: docs/globals.md

[5]: LICENSE

[6]: #how-to-use-it

[7]: #set-a-single-listener

[8]: #set-a-global-listener

[9]: #other-features

[10]: #installation

[11]: #import-from-cdn-as-es.module

[12]: #or-install-the-package-locally

[13]: #other-import-methods
