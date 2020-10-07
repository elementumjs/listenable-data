!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Data={})}(this,(function(e){"use strict";
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
    ***************************************************************************** */function t(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var n=Array(e),o=0;for(t=0;t<r;t++)for(var s=arguments[t],i=0,l=s.length;i<l;i++,o++)n[o]=s[i];return n}var r=function(){function e(e){return this["::listeners"]={},Object.assign(this,e),this._observable()}return e.prototype.listen=function(e,t){this["::listeners"][e]=t},e.prototype.listenAll=function(e){this["::listeners"]["*"]=e},e.prototype.dismiss=function(e){if(!Object.prototype.hasOwnProperty.call(this["::listeners"],e))throw new Error("the reference provided has not any listener registered.");delete this["::listeners"][e]},e.prototype.dismissAll=function(){if(!Object.prototype.hasOwnProperty.call(this["::listeners"],"*"))throw new Error("listenable data has not any global listener registered.");delete this["::listeners"]["*"]},e.prototype.contains=function(e){return this.refs().includes(e)},e.prototype.refs=function(){for(var e=function(r){for(var n=[],o=Object.keys(r),s=o.length,i=0;i<s;i++){var l=o[i];if(!l.startsWith("::")){var f=r[l];if(n.push([l]),"object"==typeof f&&null!==f)for(var a=e(f),h=a.length,p=0;p<h;p++)n.push(t([l],a[p]))}}return n},r=[],n=e(this),o=n.length,s=0;s<o;s++)r.push(n[s].join("."));return r},e.prototype._handler=function(e,t,r){Object.prototype.hasOwnProperty.call(this["::listeners"],e)&&(0,this["::listeners"][e])(t,r);Object.prototype.hasOwnProperty.call(this["::listeners"],"*")&&(0,this["::listeners"]["*"])(t,r,e)},e.prototype._observable=function(){var e=this,r=function(n){return void 0===n&&(n=[]),{get:function(e,o,s){try{if(o.startsWith("::"))throw null;return new Proxy(e[o],r(t(n,[o])))}catch(t){return Reflect.get(e,o,s)}},defineProperty:function(r,o,s){var i=t(n,[o]).join("."),l=s.value,f=r[o],a=Reflect.defineProperty(r,o,s);return e._handler.call(e,i,l,f),a}}};return new Proxy(e,r())},e}();e.default=r,Object.defineProperty(e,"__esModule",{value:!0})}));
