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
function t(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;var n=Array(t),s=0;for(e=0;e<r;e++)for(var o=arguments[e],i=0,l=o.length;i<l;i++,s++)n[s]=o[i];return n}Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(t){return this["::listeners"]={},Object.assign(this,t),this._observable()}return e.prototype.listen=function(t,e){this["::listeners"][t]=e},e.prototype.listenAll=function(t){this["::listeners"]["*"]=t},e.prototype.dismiss=function(t){if(!Object.prototype.hasOwnProperty.call(this["::listeners"],t))throw new Error("the reference provided has not any listener registered.");delete this["::listeners"][t]},e.prototype.dismissAll=function(){if(!Object.prototype.hasOwnProperty.call(this["::listeners"],"*"))throw new Error("listenable data has not any global listener registered.");delete this["::listeners"]["*"]},e.prototype.contains=function(t){return this.refs().includes(t)},e.prototype.refs=function(){for(var e=function(r){for(var n=[],s=Object.keys(r),o=s.length,i=0;i<o;i++){var l=s[i];if(!l.startsWith("::")){var a=r[l];if(n.push([l]),"object"==typeof a&&null!==a)for(var h=e(a),p=h.length,u=0;u<p;u++)n.push(t([l],h[u]))}}return n},r=[],n=e(this),s=n.length,o=0;o<s;o++)r.push(n[o].join("."));return r},e.prototype._handler=function(t,e,r){Object.prototype.hasOwnProperty.call(this["::listeners"],t)&&(0,this["::listeners"][t])(e,r);Object.prototype.hasOwnProperty.call(this["::listeners"],"*")&&(0,this["::listeners"]["*"])(e,r,t)},e.prototype._observable=function(){var e=this,r=function(n){return void 0===n&&(n=[]),{get:function(e,s,o){try{if(s.startsWith("::"))throw null;return new Proxy(e[s],r(t(n,[s])))}catch(t){return Reflect.get(e,s,o)}},defineProperty:function(r,s,o){var i=t(n,[s]).join("."),l=o.value,a=r[s],h=Reflect.defineProperty(r,s,o);return e._handler.call(e,i,l,a),h}}};return new Proxy(e,r())},e}();exports.default=e;
