"use strict";
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
***************************************************************************** */
function t(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;var n=Array(t),o=0;for(e=0;e<r;e++)for(var i=arguments[e],s=0,u=i.length;s<u;s++,o++)n[o]=i[s];return n}Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(t){this["::listeners"]={};Object.assign(this,t);return this._observable()}return e.prototype.listen=function(t,e){this["::listeners"][t]=e},e.prototype.dismiss=function(t){delete this["::listeners"][t]},e.prototype.contains=function(t){return this.refs().includes(t)},e.prototype.refs=function(){for(var e=function(r){for(var n=[],o=Object.keys(r),i=o.length,s=0;s<i;s++){var u=o[s];if(!u.startsWith("::")){var l=r[u];if(n.push([u]),"object"==typeof l&&null!==l)for(var f=e(l),a=f.length,c=0;c<a;c++)n.push(t([u],f[c]))}}return n},r=[],n=e(this),o=n.length,i=0;i<o;i++)r.push(n[i].join("."));return r},e.prototype._handler=function(t,e,r){Object.prototype.hasOwnProperty.call(this["::listeners"],t)&&this["::listeners"][t](e,r)},e.prototype._observable=function(){var e=this,r=function(n){return void 0===n&&(n=[]),{get:function(e,o,i){try{if(o.startsWith("::"))throw null;return new Proxy(e[o],r(t(n,[o])))}catch(t){return Reflect.get(e,o,i)}},defineProperty:function(r,o,i){var s=t(n,[o]).join("."),u=i.value,l=r[o];return e._handler.call(e,s,u,l),Reflect.defineProperty(r,o,i)}}};return new Proxy(e,r())},e}();exports.default=e;
