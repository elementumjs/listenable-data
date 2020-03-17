# `listenable-data`

Data object listenable for deep changes.

* [Installtion](#installation)
* [Listen for a change](#listen-for-a-change)

---

## How to use

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
    import Data from 'elementumjs/listenable-data';
```

#### Node `require`

```javascript
    var Data = require('elementumjs/listenable-data');
```

### Listen for a change
```javascript
    let initialData = {
        deep: {
            counter: 0
        }
    });

    let data = new Data(intialData, ({ref, value, last}) => {
        console.log(ref, value, last);
    }

    data.deep.counter++; // 'deep.counter', 1, 0
```

