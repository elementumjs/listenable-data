# `listenable-data`

![master](https://github.com/elementumjs/listenable-data/workflows/master/badge.svg?branch=master&event=push)
![develop](https://github.com/elementumjs/listenable-data/workflows/develop/badge.svg?branch=develop&event=push)
![package_version](https://img.shields.io/github/package-json/v/elementumjs/listenable-data)
![license](https://img.shields.io/github/license/elementumjs/listenable-data)


Data object listenable for deep changes.

- [`listenable-data`](#listenable-data)
    - [Add Github Packages to your registry](#add-github-packages-to-your-registry)
    - [Installation](#installation)
    - [Import](#import)
      - [HTML `<script>` tag](#html-script-tag)
      - [JavaScript `import`](#javascript-import)
      - [Node `require`](#node-require)
    - [Listen for a change](#listen-for-a-change)
      - [Example](#example)
---


### Add Github Packages to your registry

Create or edit the `.npmrc` file in the same directory as your `package.json` and include the following line:

```
    registry=https://npm.pkg.github.com/elementumjs
```

### Installation

Install via `npm`:
```sh
    npm install @elementumjs/listenable-data
```

### Import

#### HTML `<script>` tag

```html
    <script src="/node_modules/elementumjs/listenable-data/dist/listenable-data.umd.js"></script>
```

#### JavaScript `import`
  
```javascript
    import Data from '@elementumjs/listenable-data';
```

#### Node `require`

```javascript
    var Data = require('elementumjs/listenable-data');
```

### Listen for a change
1. Define initial data object.
2. Define change listener that receives three parameters:
    * `ref`: With the reference of attribute changed.
    * `value`: Current value of attribute after the change.
    * `last`: Last value of the attribute.
3. Apply constructor over the defined object and the listener.
4. Trigger a change.

#### Example

```javascript
    // Instance initial data
    let initialData = {
        deep: {
            counter: 0
        }
    });

    // Define listener function
    let changeListener = (ref, value, last) => {
        console.log(ref, value, last);
    }

    // Create data
    let data = new Data(intialData, changeListener); 

    // Get all the data attributes references
    console.log(Data.refs(data)); // ["deep", "deep.counter"]

    // Check if data contains a reference
    console.log(Data.contains(data, 'deep.counter')); // true

    // Change the data
    data.deep.counter++; // 'deep.counter', 1, 0
```

