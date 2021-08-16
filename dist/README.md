## Build Files

| | UMD | CommonJS | ES Module |
|---:|:---:|:---:|:---:|
| **File** | listenable-data.umd.js | listenable-data.cjs.js | listenable-data.esm.js |

### Terms and import

#### UMD

[UMD](https://github.com/umdjs/umd) builds can be used directly in the browser via a `<script>` tag. The default file from jsDelivr CDN at [https://www.jsdelivr.com/gh/elementumjs/listenable-data](https://cdn.jsdelivr.net/gh/elementumjs/listenable-data/dist/listenable-data.umd.js) is the UMD build (`listenable-data.umd.js`).

* **index.html**

```html
    <script src="index.js"></script>
```

* **index.js**

```javascript
    // ...

    const data = new Data(source);
```

#### CommonJS

[CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) builds are intended for use with older bundlers like [browserify](http://browserify.org/) or [webpack 1](https://webpack.github.io). The default file for these bundlers (`pkg.main`) is the CommonJS build (`listenable-data.cjs.js`).

* **index.html**

```html
    <script src="index.js"></script>
```

* **index.js**

```javascript
    const Data = require("elementum/listenable-data");

    // ...

    const data = new Data(source);
```

#### ES Module

[ES Module](http://exploringjs.com/es6/ch_modules.html) builds are intended for use with modern bundlers like [webpack 2](https://webpack.js.org) or [rollup](http://rollupjs.org/). The default file for these bundlers (`pkg.module`) is the ES Module build (`listenable-data.esm.js`).

* **index.html**

```html
    <script src="index.js" type="module"></script>
```

* **index.js**

```javascript
    import Data from "@elementumjs/listenable-data";

    // ...

    const data = new Data(source);
```

### Download locally

Install via `npm`:

```sh
    npm install @elementumjs/listenable-data
```