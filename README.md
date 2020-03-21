# `listenable-data`

![develop_test](https://github.com/elementumjs/listenable-data/workflows/develop_test/badge.svg?branch=develop&event=push)

Data object listenable for deep changes.

* [Installtion](#installation)
* [Listen for a change](#listen-for-a-change)

---

## How to use

### Add Github Packages to your registry:

n the same directory as your `package.json` file, create or edit an `.npmrc` file to include the followinf line:

```
    registry=https://npm.pkg.github.com/elementumjs
```

### Installation
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

    // Get all the data attributes references:
    console.log(Data.refs(data)); // ["deep", "deep.counter"]
    // Check if data contains a reference
    console.log(Data.contains(data, 'deep.counter')); // true
    // Change the data
    data.deep.counter++; // 'deep.counter', 1, 0
```

