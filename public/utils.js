!function(){"use strict";var a={},b={},c=b.hasOwnProperty,d=function(b,e,f,g){if(b===e)return 0!==b||1/b==1/e;if(null==b||null==e)return b===e;var h=toString.call(b);if(h!=toString.call(e))return!1;switch(h){case"[object String]":return b==String(e);case"[object Number]":return b!=+b?e!=+e:0==b?1/b==1/e:b==+e;case"[object Date]":case"[object Boolean]":return+b==+e;case"[object RegExp]":return b.source==e.source&&b.global==e.global&&b.multiline==e.multiline&&b.ignoreCase==e.ignoreCase}if("object"!=typeof b||"object"!=typeof e)return!1;for(var i=f.length;i--;)if(f[i]==b)return g[i]==e;var j=b.constructor,k=e.constructor;if(j!==k&&!(a.isFunction(j)&&j instanceof j&&a.isFunction(k)&&k instanceof k)&&"constructor"in b&&"constructor"in e)return!1;f.push(b),g.push(e);var l=0,m=!0;if("[object Array]"==h){if(l=b.length,m=l==e.length)for(;l--&&(m=d(b[l],e[l],f,g)););}else{for(var n in b)if(c.call(b,n)&&(l++,!(m=c.call(e,n)&&d(b[n],e[n],f,g))))break;if(m){for(n in e)if(c.call(e,n)&&!l--)break;m=!l}}return f.pop(),g.pop(),m};a.isObject=function(a){return"[object Object]"===Object.prototype.toString.call(a)},a.clone=function(b){if(a.isObject(b)){var c={};for(var d in b)b.hasOwnProperty(d)&&(c[d]=b[d]);return c}throw new TypeError("Arguments to clone function is invalid")},a.isFunction=function(a){return"function"==typeof a},a.isEqual=function(a,b){return d(a,b,[],[])},module.exports=a,window.utilities=a}();