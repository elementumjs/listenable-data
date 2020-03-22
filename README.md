![listenable-data header][0]

# `listenable-data`

[![production](https://github.com/elementumjs/listenable-data/workflows/production/badge.svg)][1]
[![develop](https://github.com/elementumjs/listenable-data/workflows/develop/badge.svg)][2]
[![package_version](https://img.shields.io/github/package-json/v/elementumjs/listenable-data)][3]
[![reference](https://img.shields.io/badge/docs-REFERENCE-blue)][4]
[![license](https://img.shields.io/github/license/elementumjs/listenable-data)][5]


Data structure to listen for deep changes into objects' attributes.

- [`listenable-data`][6]
    - [Add Github Packages to your registry][7]
    - [Installation][8]
    - [Import][9]
      - [HTML `<script>` tag][10]
      - [JavaScript `import`][11]
      - [Node `require`][12]
    - [Listen for a change][13]
      - [Example][14]

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

[0]: assets/header.png

[1]: https://github.com/elementumjs/listenable-data/actions?query=workflow%3Aproduction

[2]: https://github.com/elementumjs/listenable-data/actions?query=workflow%3Adevelop

[3]: https://github.com/elementumjs/listenable-data/packages/

[4]: REFERENCE.md

[5]: LICENSE

[6]: #listenable-data

[7]: #add-github-packages-to-your-registry

[8]: #installation

[9]: #import

[10]:#html-script-tag 

[11]:#javascript-import 

[12]:#node-require 

[13]:#listen-for-a-change 

[14]: #example 