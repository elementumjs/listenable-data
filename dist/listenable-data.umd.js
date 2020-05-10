!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).Data={})}(this,(function(t){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */function e(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;var n=Array(t),o=0;for(e=0;e<r;e++)for(var i=arguments[e],s=0,f=i.length;s<f;s++,o++)n[o]=i[s];return n}var r=function(){function t(t){this["::listeners"]={};Object.assign(this,t);return this._observable()}return t.prototype.listen=function(t,e){this["::listeners"][t]=e},t.prototype.dismiss=function(t){delete this["::listeners"][t]},t.prototype.contains=function(t){return this.refs().includes(t)},t.prototype.refs=function(){for(var t=function(r){for(var n=[],o=Object.keys(r),i=o.length,s=0;s<i;s++){var f=o[s];if(!f.startsWith("::")){var u=r[f];if(n.push([f]),"object"==typeof u&&null!==u)for(var l=t(u),c=l.length,a=0;a<c;a++)n.push(e([f],l[a]))}}return n},r=[],n=t(this),o=n.length,i=0;i<o;i++)r.push(n[i].join("."));return r},t.prototype._handler=function(t,e,r){Object.prototype.hasOwnProperty.call(this["::listeners"],t)&&this["::listeners"][t](e,r)},t.prototype._observable=function(){var t=this,r=function(n){return void 0===n&&(n=[]),{get:function(t,o,i){try{if(o.startsWith("::"))throw null;return new Proxy(t[o],r(e(n,[o])))}catch(e){return Reflect.get(t,o,i)}},defineProperty:function(r,o,i){var s=e(n,[o]).join("."),f=i.value,u=r[o];return t._handler.call(t,s,f,u),Reflect.defineProperty(r,o,i)}}};return new Proxy(t,r())},t}();t.default=r,Object.defineProperty(t,"__esModule",{value:!0})}));
