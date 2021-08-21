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
function e(e,t,r){if(r||2===arguments.length)for(var s,i=0,n=t.length;i<n;i++)!s&&i in t||(s||(s=Array.prototype.slice.call(t,0,i)),s[i]=t[i]);return e.concat(s||Array.prototype.slice.call(t))}Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(e){return this["::listeners"]={},Object.assign(this,e),this._observable()}return t.prototype.isRegistered=function(e){return Object.prototype.hasOwnProperty.call(this["::listeners"],e)&&Array.isArray(this["::listeners"][e])},t.prototype.hasListener=function(e,t){return this.isRegistered(e)&&this["::listeners"][e].includes(t)},t.prototype.listen=function(e,t){this.isRegistered(e)?this["::listeners"][e].push(t):this["::listeners"][e]=[t]},t.prototype.listenAll=function(e){this.listen("*",e)},t.prototype.dismiss=function(e,t){if(void 0===t&&(t=null),!this.isRegistered(e))throw new Error("the reference provided has not any listener registered.");if(null===t)this["::listeners"][e]=[];else{if(!this.hasListener(e,t))throw new Error("the listener provided is not registered for this reference.");var r=this["::listeners"][e].indexOf(t);this["::listeners"][e].splice(r,1)}},t.prototype.dismissAll=function(e){void 0===e&&(e=null);try{this.dismiss("*",e)}catch(e){throw new Error("listenable data has not any global listener registered.")}},t.prototype.contains=function(e){return this.refs().includes(e)},t.prototype.refs=function(){for(var t=function(r){for(var s=[],i=Object.keys(r),n=i.length,o=0;o<n;o++){var l=i[o];if(!l.startsWith("::")){var h=r[l];if(s.push([l]),"object"==typeof h&&null!==h)for(var u=t(h),a=u.length,p=0;p<a;p++)s.push(e([l],u[p]))}}return s},r=[],s=t(this),i=s.length,n=0;n<i;n++)r.push(s[n].join("."));return r},t.prototype._handler=function(e,t,r){var s=[];this.isRegistered(e)&&s.push.apply(s,this["::listeners"][e]),this.isRegistered("*")&&s.push.apply(s,this["::listeners"]["*"]);for(var i=s.length,n=0;n<i;n++){(0,s[n])(t,r,e)}},t.prototype._observable=function(){var t=this,r=function(s){return void 0===s&&(s=[]),{get:function(t,i,n){try{if(i.startsWith("::"))throw null;return new Proxy(t[i],r(e(e([],s),[i])))}catch(e){return Reflect.get(t,i,n)}},defineProperty:function(r,i,n){var o=e(e([],s),[i]).join("."),l=n.value,h=r[i],u=Reflect.defineProperty(r,i,n);return t._handler.call(t,o,l,h),u}}};return new Proxy(t,r())},t}();exports.default=t;
