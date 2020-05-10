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
function t(){for(var t=0,r=0,e=arguments.length;r<e;r++)t+=arguments[r].length;var n=Array(t),o=0;for(r=0;r<e;r++)for(var i=arguments[r],s=0,u=i.length;s<u;s++,o++)n[o]=i[s];return n}var r=function(){function r(t){this["::listeners"]={};Object.assign(this,t);return this._observable()}return r.prototype.listen=function(t,r){this["::listeners"][t]=r},r.prototype.dismiss=function(t){delete this["::listeners"][t]},r.prototype.contains=function(t){return this.refs().includes(t)},r.prototype.refs=function(){for(var r=function(e){for(var n=[],o=Object.keys(e),i=o.length,s=0;s<i;s++){var u=o[s];if(!u.startsWith("::")){var f=e[u];if(n.push([u]),"object"==typeof f&&null!==f)for(var l=r(f),a=l.length,h=0;h<a;h++)n.push(t([u],l[h]))}}return n},e=[],n=r(this),o=n.length,i=0;i<o;i++)e.push(n[i].join("."));return e},r.prototype._handler=function(t,r,e){Object.prototype.hasOwnProperty.call(this["::listeners"],t)&&this["::listeners"][t](r,e)},r.prototype._observable=function(){var r=this,e=function(n){return void 0===n&&(n=[]),{get:function(r,o,i){try{if(o.startsWith("::"))throw null;return new Proxy(r[o],e(t(n,[o])))}catch(t){return Reflect.get(r,o,i)}},defineProperty:function(e,o,i){var s=t(n,[o]).join("."),u=i.value,f=e[o];return r._handler.call(r,s,u,f),Reflect.defineProperty(e,o,i)}}};return new Proxy(r,e())},r}();export default r;
