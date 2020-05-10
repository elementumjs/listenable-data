<img src="https://raw.githubusercontent.com/elementumjs/listenable-data/master/assets/header.png"/>

[![production](https://github.com/elementumjs/listenable-data/workflows/production/badge.svg)][1]
[![develop](https://github.com/elementumjs/listenable-data/workflows/develop/badge.svg)][2]
[![package_version](https://img.shields.io/github/package-json/v/elementumjs/listenable-data)][3]
[![reference](https://img.shields.io/badge/docs-REFERENCE-blue)][4]
[![license](https://img.shields.io/github/license/elementumjs/listenable-data)][5]

`@elementumjs/listenable-data` is a data structure to listen for deep changes into objects' attributes.

- [📝 How to use it][6]
- [⚙️ Installation][7]
  - [Import from CDN as ES Module][8]
  - [Or install the package locally][9]
  - [Other import methods][10]

---

<img src="https://raw.githubusercontent.com/elementumjs/template/develop/assets/how-to-use-it.svg"/>

### How to use it

1. Define initial data object.
2. Create the listenable object with your initial data as seed.
3. Register a listener to any property that receives:
    - `value`: Current value of attribute after the change.
    - `last`: Last value of the attribute.
4. Trigger a change.

```javascript
    import Data from '@elementumjs/listenable-data';

    // [1] Define initial data object
    const initialData = {
        deep: {
            counter: 0
        }
    }

    // [2] Create the listenable object
    const data = new Data(initialData);
    console.log(data.refs()); // ["deep", "deep.counter"]

    // [3] Register a listener
    console.log(data.contains("deep.counter")); // true
    data.listen("deep.counter", (value, last) => {
        console.log(value, last);
    });

    // [4] Trigger a change
    data.deep.counter++; // 1 0
```

<img src="https://raw.githubusercontent.com/elementumjs/template/develop/assets/installation.svg"/>

### Installation

#### Import from CDN as ES Module

Import from [jsDelivr CDN](https://www.jsdelivr.com/):

```javascript
    import Data from "https://cdn.jsdelivr.net/gh/elementumjs/listenable-data/dist/listenable-data.esm.js";
```

#### Or install the package locally

##### Add Github Packages to your registry

Create or edit the `.npmrc` file in the same directory as your `package.json` and include the following line:

```
    registry=https://npm.pkg.github.com/elementumjs
```

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

[7]: #installation

[8]: #import-from-cdn-as-es.module

[9]: #or-install-the-package-locally

[10]: #other-import-methods
