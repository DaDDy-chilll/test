import{t as L,c as F,r as B,F as Y}from"./immer-BNrqi0cU.js";import{c as H,a as J,b as K,d as D}from"./redux-BiaCB-69.js";function X(r){var t=function(n){var o=n.dispatch,i=n.getState;return function(v){return function(d){return typeof d=="function"?d(o,i,r):v(d)}}};return t}var k=X();k.withExtraArgument=X;var U=function(){var r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,o){n.__proto__=o}||function(n,o){for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(n[i]=o[i])},r(t,e)};return function(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");r(t,e);function n(){this.constructor=t}t.prototype=e===null?Object.create(e):(n.prototype=e.prototype,new n)}}(),Q=function(r,t){var e={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},n,o,i,v;return v={next:d(0),throw:d(1),return:d(2)},typeof Symbol=="function"&&(v[Symbol.iterator]=function(){return this}),v;function d(a){return function(c){return h([a,c])}}function h(a){if(n)throw new TypeError("Generator is already executing.");for(;e;)try{if(n=1,o&&(i=a[0]&2?o.return:a[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,a[1])).done)return i;switch(o=0,i&&(a=[a[0]&2,i.value]),a[0]){case 0:case 1:i=a;break;case 4:return e.label++,{value:a[1],done:!1};case 5:e.label++,o=a[1],a=[0];continue;case 7:a=e.ops.pop(),e.trys.pop();continue;default:if(i=e.trys,!(i=i.length>0&&i[i.length-1])&&(a[0]===6||a[0]===2)){e=0;continue}if(a[0]===3&&(!i||a[1]>i[0]&&a[1]<i[3])){e.label=a[1];break}if(a[0]===6&&e.label<i[1]){e.label=i[1],i=a;break}if(i&&e.label<i[2]){e.label=i[2],e.ops.push(a);break}i[2]&&e.ops.pop(),e.trys.pop();continue}a=t.call(r,e)}catch(c){a=[6,c],o=0}finally{n=i=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}},A=function(r,t){for(var e=0,n=t.length,o=r.length;e<n;e++,o++)r[o]=t[e];return r},Z=Object.defineProperty,$=Object.defineProperties,ee=Object.getOwnPropertyDescriptors,V=Object.getOwnPropertySymbols,re=Object.prototype.hasOwnProperty,te=Object.prototype.propertyIsEnumerable,q=function(r,t,e){return t in r?Z(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e},E=function(r,t){for(var e in t||(t={}))re.call(t,e)&&q(r,e,t[e]);if(V)for(var n=0,o=V(t);n<o.length;n++){var e=o[n];te.call(t,e)&&q(r,e,t[e])}return r},M=function(r,t){return $(r,ee(t))},ne=function(r,t,e){return new Promise(function(n,o){var i=function(h){try{d(e.next(h))}catch(a){o(a)}},v=function(h){try{d(e.throw(h))}catch(a){o(a)}},d=function(h){return h.done?n(h.value):Promise.resolve(h.value).then(i,v)};d((e=e.apply(r,t)).next())})},ae=typeof window<"u"&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]=="object"?D:D.apply(null,arguments)};function oe(r){if(typeof r!="object"||r===null)return!1;var t=Object.getPrototypeOf(r);if(t===null)return!0;for(var e=t;Object.getPrototypeOf(e)!==null;)e=Object.getPrototypeOf(e);return t===e}function j(r,t){function e(){for(var n=[],o=0;o<arguments.length;o++)n[o]=arguments[o];if(t){var i=t.apply(void 0,n);if(!i)throw new Error("prepareAction did not return an object");return E(E({type:r,payload:i.payload},"meta"in i&&{meta:i.meta}),"error"in i&&{error:i.error})}return{type:r,payload:n[0]}}return e.toString=function(){return""+r},e.type=r,e.match=function(n){return n.type===r},e}var ie=function(r){U(t,r);function t(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var o=r.apply(this,e)||this;return Object.setPrototypeOf(o,t.prototype),o}return Object.defineProperty(t,Symbol.species,{get:function(){return t},enumerable:!1,configurable:!0}),t.prototype.concat=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return r.prototype.concat.apply(this,e)},t.prototype.prepend=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return e.length===1&&Array.isArray(e[0])?new(t.bind.apply(t,A([void 0],e[0].concat(this)))):new(t.bind.apply(t,A([void 0],e.concat(this))))},t}(Array),ue=function(r){U(t,r);function t(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var o=r.apply(this,e)||this;return Object.setPrototypeOf(o,t.prototype),o}return Object.defineProperty(t,Symbol.species,{get:function(){return t},enumerable:!1,configurable:!0}),t.prototype.concat=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return r.prototype.concat.apply(this,e)},t.prototype.prepend=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return e.length===1&&Array.isArray(e[0])?new(t.bind.apply(t,A([void 0],e[0].concat(this)))):new(t.bind.apply(t,A([void 0],e.concat(this))))},t}(Array);function I(r){return L(r)?F(r,function(){}):r}function ce(r){return typeof r=="boolean"}function fe(){return function(t){return le(t)}}function le(r){r===void 0&&(r={});var t=r.thunk,e=t===void 0?!0:t;r.immutableCheck,r.serializableCheck,r.actionCreatorCheck;var n=new ie;return e&&(ce(e)?n.push(k):n.push(k.withExtraArgument(e.extraArgument))),n}var de=!0;function je(r){var t=fe(),e=r||{},n=e.reducer,o=n===void 0?void 0:n,i=e.middleware,v=i===void 0?t():i,d=e.devTools,h=d===void 0?!0:d,a=e.preloadedState,c=a===void 0?void 0:a,f=e.enhancers,s=f===void 0?void 0:f,l;if(typeof o=="function")l=o;else if(oe(o))l=H(o);else throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');var u=v;typeof u=="function"&&(u=u(t));var y=J.apply(void 0,u),b=D;h&&(b=ae(E({trace:!de},typeof h=="object"&&h)));var p=new ue(y),m=p;Array.isArray(s)?m=A([y],s):typeof s=="function"&&(m=s(p));var P=b.apply(void 0,m);return K(l,c,P)}function z(r){var t={},e=[],n,o={addCase:function(i,v){var d=typeof i=="string"?i:i.type;if(!d)throw new Error("`builder.addCase` cannot be called with an empty action type");if(d in t)throw new Error("`builder.addCase` cannot be called with two reducers for the same action type");return t[d]=v,o},addMatcher:function(i,v){return e.push({matcher:i,reducer:v}),o},addDefaultCase:function(i){return n=i,o}};return r(o),[t,e,n]}function se(r){return typeof r=="function"}function ve(r,t,e,n){e===void 0&&(e=[]);var o=typeof t=="function"?z(t):[t,e,n],i=o[0],v=o[1],d=o[2],h;if(se(r))h=function(){return I(r())};else{var a=I(r);h=function(){return a}}function c(f,s){f===void 0&&(f=h());var l=A([i[s.type]],v.filter(function(u){var y=u.matcher;return y(s)}).map(function(u){var y=u.reducer;return y}));return l.filter(function(u){return!!u}).length===0&&(l=[d]),l.reduce(function(u,y){if(y)if(B(u)){var b=u,p=y(b,s);return p===void 0?u:p}else{if(L(u))return F(u,function(m){return y(m,s)});var p=y(u,s);if(p===void 0){if(u===null)return u;throw Error("A case reducer on a non-draftable value must not return undefined")}return p}return u},f)}return c.getInitialState=h,c}function he(r,t){return r+"/"+t}function Pe(r){var t=r.name;if(!t)throw new Error("`name` is a required option for createSlice");typeof process<"u";var e=typeof r.initialState=="function"?r.initialState:I(r.initialState),n=r.reducers||{},o=Object.keys(n),i={},v={},d={};o.forEach(function(c){var f=n[c],s=he(t,c),l,u;"reducer"in f?(l=f.reducer,u=f.prepare):l=f,i[c]=l,v[s]=l,d[c]=u?j(s,u):j(s)});function h(){var c=typeof r.extraReducers=="function"?z(r.extraReducers):[r.extraReducers],f=c[0],s=f===void 0?{}:f,l=c[1],u=l===void 0?[]:l,y=c[2],b=y===void 0?void 0:y,p=E(E({},s),v);return ve(e,function(m){for(var P in p)m.addCase(P,p[P]);for(var g=0,O=u;g<O.length;g++){var S=O[g];m.addMatcher(S.matcher,S.reducer)}b&&m.addDefaultCase(b)})}var a;return{name:t,reducer:function(c,f){return a||(a=h()),a(c,f)},actions:d,caseReducers:i,getInitialState:function(){return a||(a=h()),a.getInitialState()}}}var ye="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",pe=function(r){r===void 0&&(r=21);for(var t="",e=r;e--;)t+=ye[Math.random()*64|0];return t},me=["name","message","stack","code"],T=function(){function r(t,e){this.payload=t,this.meta=e}return r}(),G=function(){function r(t,e){this.payload=t,this.meta=e}return r}(),we=function(r){if(typeof r=="object"&&r!==null){for(var t={},e=0,n=me;e<n.length;e++){var o=n[e];typeof r[o]=="string"&&(t[o]=r[o])}return t}return{message:String(r)}};(function(){function r(t,e,n){var o=j(t+"/fulfilled",function(a,c,f,s){return{payload:a,meta:M(E({},s||{}),{arg:f,requestId:c,requestStatus:"fulfilled"})}}),i=j(t+"/pending",function(a,c,f){return{payload:void 0,meta:M(E({},f||{}),{arg:c,requestId:a,requestStatus:"pending"})}}),v=j(t+"/rejected",function(a,c,f,s,l){return{payload:s,error:(n&&n.serializeError||we)(a||"Rejected"),meta:M(E({},l||{}),{arg:f,requestId:c,rejectedWithValue:!!s,requestStatus:"rejected",aborted:(a==null?void 0:a.name)==="AbortError",condition:(a==null?void 0:a.name)==="ConditionError"})}}),d=typeof AbortController<"u"?AbortController:function(){function a(){this.signal={aborted:!1,addEventListener:function(){},dispatchEvent:function(){return!1},onabort:function(){},removeEventListener:function(){},reason:void 0,throwIfAborted:function(){}}}return a.prototype.abort=function(){},a}();function h(a){return function(c,f,s){var l=n!=null&&n.idGenerator?n.idGenerator(a):pe(),u=new d,y;function b(m){y=m,u.abort()}var p=function(){return ne(this,null,function(){var m,P,g,O,S,C,W;return Q(this,function(_){switch(_.label){case 0:return _.trys.push([0,4,,5]),O=(m=n==null?void 0:n.condition)==null?void 0:m.call(n,a,{getState:f,extra:s}),ge(O)?[4,O]:[3,2];case 1:O=_.sent(),_.label=2;case 2:if(O===!1||u.signal.aborted)throw{name:"ConditionError",message:"Aborted due to condition callback returning false."};return S=new Promise(function(w,R){return u.signal.addEventListener("abort",function(){return R({name:"AbortError",message:y||"Aborted"})})}),c(i(l,a,(P=n==null?void 0:n.getPendingMeta)==null?void 0:P.call(n,{requestId:l,arg:a},{getState:f,extra:s}))),[4,Promise.race([S,Promise.resolve(e(a,{dispatch:c,getState:f,extra:s,requestId:l,signal:u.signal,abort:b,rejectWithValue:function(w,R){return new T(w,R)},fulfillWithValue:function(w,R){return new G(w,R)}})).then(function(w){if(w instanceof T)throw w;return w instanceof G?o(w.payload,l,a,w.meta):o(w,l,a)})])];case 3:return g=_.sent(),[3,5];case 4:return C=_.sent(),g=C instanceof T?v(null,l,a,C.payload,C.meta):v(C,l,a),[3,5];case 5:return W=n&&!n.dispatchConditionRejection&&v.match(g)&&g.meta.condition,W||c(g),[2,g]}})})}();return Object.assign(p,{abort:b,requestId:l,arg:a,unwrap:function(){return p.then(be)}})}}return Object.assign(h,{pending:i,rejected:v,fulfilled:o,typePrefix:t})}return r.withTypes=function(){return r},r})();function be(r){if(r.meta&&r.meta.rejectedWithValue)throw r.payload;if(r.error)throw r.error;return r.payload}function ge(r){return r!==null&&typeof r=="object"&&typeof r.then=="function"}var x="listenerMiddleware";j(x+"/add");j(x+"/removeAll");j(x+"/remove");var N;typeof queueMicrotask=="function"&&queueMicrotask.bind(typeof window<"u"||typeof window<"u"?window:globalThis);Y();export{je as a,Pe as c};
