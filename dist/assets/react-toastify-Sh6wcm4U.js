import{r as b,R as y}from"./react-Be8E2Nbg.js";import{c as F}from"./clsx-B-dksMZM.js";const J=t=>typeof t=="number"&&!isNaN(t),q=t=>typeof t=="string",k=t=>typeof t=="function",nt=t=>q(t)||k(t)?t:null,it=t=>b.isValidElement(t)||q(t)||k(t)||J(t);function yt(t,e,o){o===void 0&&(o=300);const{scrollHeight:r,style:a}=t;requestAnimationFrame(()=>{a.minHeight="initial",a.height=r+"px",a.transition=`all ${o}ms`,requestAnimationFrame(()=>{a.height="0",a.padding="0",a.margin="0",setTimeout(e,o)})})}function st(t){let{enter:e,exit:o,appendPosition:r=!1,collapse:a=!0,collapseDuration:d=300}=t;return function(n){let{children:E,position:f,preventExitTransition:_,done:u,nodeRef:C,isIn:I,playToast:N}=n;const m=r?`${e}--${f}`:e,c=r?`${o}--${f}`:o,T=b.useRef(0);return b.useLayoutEffect(()=>{const p=C.current,l=m.split(" "),s=g=>{g.target===C.current&&(N(),p.removeEventListener("animationend",s),p.removeEventListener("animationcancel",s),T.current===0&&g.type!=="animationcancel"&&p.classList.remove(...l))};p.classList.add(...l),p.addEventListener("animationend",s),p.addEventListener("animationcancel",s)},[]),b.useEffect(()=>{const p=C.current,l=()=>{p.removeEventListener("animationend",l),a?yt(p,u,d):u()};I||(_?l():(T.current=1,p.className+=` ${c}`,p.addEventListener("animationend",l)))},[I]),y.createElement(y.Fragment,null,E)}}function ct(t,e){return t!=null?{content:t.content,containerId:t.props.containerId,id:t.props.toastId,theme:t.props.theme,type:t.props.type,data:t.props.data||{},isLoading:t.props.isLoading,icon:t.props.icon,status:e}:{}}const $=new Map;let K=[];const lt=new Set,vt=t=>lt.forEach(e=>e(t)),ut=()=>$.size>0;function pt(t,e){var o;if(e)return!((o=$.get(e))==null||!o.isToastActive(t));let r=!1;return $.forEach(a=>{a.isToastActive(t)&&(r=!0)}),r}function ft(t,e){it(t)&&(ut()||K.push({content:t,options:e}),$.forEach(o=>{o.buildToast(t,e)}))}function dt(t,e){$.forEach(o=>{e!=null&&e!=null&&e.containerId?(e==null?void 0:e.containerId)===o.id&&o.toggle(t,e==null?void 0:e.id):o.toggle(t,e==null?void 0:e.id)})}function ht(t){const{subscribe:e,getSnapshot:o,setProps:r}=b.useRef(function(d){const n=d.containerId||1;return{subscribe(E){const f=function(u,C,I){let N=1,m=0,c=[],T=[],p=[],l=C;const s=new Map,g=new Set,M=()=>{p=Array.from(s.values()),g.forEach(i=>i())},B=i=>{T=i==null?[]:T.filter(v=>v!==i),M()},L=i=>{const{toastId:v,onOpen:w,updateId:O,children:S}=i.props,Y=O==null;i.staleId&&s.delete(i.staleId),s.set(v,i),T=[...T,i.props.toastId].filter(z=>z!==i.staleId),M(),I(ct(i,Y?"added":"updated")),Y&&k(w)&&w(b.isValidElement(S)&&S.props)};return{id:u,props:l,observe:i=>(g.add(i),()=>g.delete(i)),toggle:(i,v)=>{s.forEach(w=>{v!=null&&v!==w.props.toastId||k(w.toggle)&&w.toggle(i)})},removeToast:B,toasts:s,clearQueue:()=>{m-=c.length,c=[]},buildToast:(i,v)=>{if((A=>{let{containerId:P,toastId:x,updateId:R}=A;const V=P?P!==u:u!==1,U=s.has(x)&&R==null;return V||U})(v))return;const{toastId:w,updateId:O,data:S,staleId:Y,delay:z}=v,Q=()=>{B(w)},Z=O==null;Z&&m++;const D={...l,style:l.toastStyle,key:N++,...Object.fromEntries(Object.entries(v).filter(A=>{let[P,x]=A;return x!=null})),toastId:w,updateId:O,data:S,closeToast:Q,isIn:!1,className:nt(v.className||l.toastClassName),bodyClassName:nt(v.bodyClassName||l.bodyClassName),progressClassName:nt(v.progressClassName||l.progressClassName),autoClose:!v.isLoading&&(H=v.autoClose,j=l.autoClose,H===!1||J(H)&&H>0?H:j),deleteToast(){const A=s.get(w),{onClose:P,children:x}=A.props;k(P)&&P(b.isValidElement(x)&&x.props),I(ct(A,"removed")),s.delete(w),m--,m<0&&(m=0),c.length>0?L(c.shift()):M()}};var H,j;D.closeButton=l.closeButton,v.closeButton===!1||it(v.closeButton)?D.closeButton=v.closeButton:v.closeButton===!0&&(D.closeButton=!it(l.closeButton)||l.closeButton);let W=i;b.isValidElement(i)&&!q(i.type)?W=b.cloneElement(i,{closeToast:Q,toastProps:D,data:S}):k(i)&&(W=i({closeToast:Q,toastProps:D,data:S}));const X={content:W,props:D,staleId:Y};l.limit&&l.limit>0&&m>l.limit&&Z?c.push(X):J(z)?setTimeout(()=>{L(X)},z):L(X)},setProps(i){l=i},setToggle:(i,v)=>{s.get(i).toggle=v},isToastActive:i=>T.some(v=>v===i),getSnapshot:()=>l.newestOnTop?p.reverse():p}}(n,d,vt);$.set(n,f);const _=f.observe(E);return K.forEach(u=>ft(u.content,u.options)),K=[],()=>{_(),$.delete(n)}},setProps(E){var f;(f=$.get(n))==null||f.setProps(E)},getSnapshot(){var E;return(E=$.get(n))==null?void 0:E.getSnapshot()}}}(t)).current;r(t);const a=b.useSyncExternalStore(e,o,o);return{getToastToRender:function(d){if(!a)return[];const n=new Map;return a.forEach(E=>{const{position:f}=E.props;n.has(f)||n.set(f,[]),n.get(f).push(E)}),Array.from(n,E=>d(E[0],E[1]))},isToastActive:pt,count:a==null?void 0:a.length}}function Et(t){const[e,o]=b.useState(!1),[r,a]=b.useState(!1),d=b.useRef(null),n=b.useRef({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:E,pauseOnHover:f,closeToast:_,onClick:u,closeOnClick:C}=t;var I,N;function m(){o(!0)}function c(){o(!1)}function T(s){const g=d.current;n.canDrag&&g&&(n.didMove=!0,e&&c(),n.delta=t.draggableDirection==="x"?s.clientX-n.start:s.clientY-n.start,n.start!==s.clientX&&(n.canCloseOnClick=!1),g.style.transform=`translate3d(${t.draggableDirection==="x"?`${n.delta}px, var(--y)`:`0, calc(${n.delta}px + var(--y))`},0)`,g.style.opacity=""+(1-Math.abs(n.delta/n.removalDistance)))}function p(){document.removeEventListener("pointermove",T),document.removeEventListener("pointerup",p);const s=d.current;if(n.canDrag&&n.didMove&&s){if(n.canDrag=!1,Math.abs(n.delta)>n.removalDistance)return a(!0),t.closeToast(),void t.collapseAll();s.style.transition="transform 0.2s, opacity 0.2s",s.style.removeProperty("transform"),s.style.removeProperty("opacity")}}(N=$.get((I={id:t.toastId,containerId:t.containerId,fn:o}).containerId||1))==null||N.setToggle(I.id,I.fn),b.useEffect(()=>{if(t.pauseOnFocusLoss)return document.hasFocus()||c(),window.addEventListener("focus",m),window.addEventListener("blur",c),()=>{window.removeEventListener("focus",m),window.removeEventListener("blur",c)}},[t.pauseOnFocusLoss]);const l={onPointerDown:function(s){if(t.draggable===!0||t.draggable===s.pointerType){n.didMove=!1,document.addEventListener("pointermove",T),document.addEventListener("pointerup",p);const g=d.current;n.canCloseOnClick=!0,n.canDrag=!0,g.style.transition="none",t.draggableDirection==="x"?(n.start=s.clientX,n.removalDistance=g.offsetWidth*(t.draggablePercent/100)):(n.start=s.clientY,n.removalDistance=g.offsetHeight*(t.draggablePercent===80?1.5*t.draggablePercent:t.draggablePercent)/100)}},onPointerUp:function(s){const{top:g,bottom:M,left:B,right:L}=d.current.getBoundingClientRect();s.nativeEvent.type!=="touchend"&&t.pauseOnHover&&s.clientX>=B&&s.clientX<=L&&s.clientY>=g&&s.clientY<=M?c():m()}};return E&&f&&(l.onMouseEnter=c,t.stacked||(l.onMouseLeave=m)),C&&(l.onClick=s=>{u&&u(s),n.canCloseOnClick&&_()}),{playToast:m,pauseToast:c,isRunning:e,preventExitTransition:r,toastRef:d,eventHandlers:l}}function Tt(t){let{delay:e,isRunning:o,closeToast:r,type:a="default",hide:d,className:n,style:E,controlledProgress:f,progress:_,rtl:u,isIn:C,theme:I}=t;const N=d||f&&_===0,m={...E,animationDuration:`${e}ms`,animationPlayState:o?"running":"paused"};f&&(m.transform=`scaleX(${_})`);const c=F("Toastify__progress-bar",f?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${I}`,`Toastify__progress-bar--${a}`,{"Toastify__progress-bar--rtl":u}),T=k(n)?n({rtl:u,type:a,defaultClassName:c}):F(c,n),p={[f&&_>=1?"onTransitionEnd":"onAnimationEnd"]:f&&_<1?null:()=>{C&&r()}};return y.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":N},y.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${I} Toastify__progress-bar--${a}`}),y.createElement("div",{role:"progressbar","aria-hidden":N?"true":"false","aria-label":"notification timer",className:T,style:m,...p}))}let bt=1;const mt=()=>""+bt++;function It(t){return t&&(q(t.toastId)||J(t.toastId))?t.toastId:mt()}function G(t,e){return ft(t,e),e.toastId}function ot(t,e){return{...e,type:e&&e.type||t,toastId:It(e)}}function tt(t){return(e,o)=>G(e,ot(t,o))}function h(t,e){return G(t,ot("default",e))}h.loading=(t,e)=>G(t,ot("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...e})),h.promise=function(t,e,o){let r,{pending:a,error:d,success:n}=e;a&&(r=q(a)?h.loading(a,o):h.loading(a.render,{...o,...a}));const E={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},f=(u,C,I)=>{if(C==null)return void h.dismiss(r);const N={type:u,...E,...o,data:I},m=q(C)?{render:C}:C;return r?h.update(r,{...N,...m}):h(m.render,{...N,...m}),I},_=k(t)?t():t;return _.then(u=>f("success",n,u)).catch(u=>f("error",d,u)),_},h.success=tt("success"),h.info=tt("info"),h.error=tt("error"),h.warning=tt("warning"),h.warn=h.warning,h.dark=(t,e)=>G(t,ot("default",{theme:"dark",...e})),h.dismiss=function(t){(function(e){var o;if(ut()){if(e==null||q(o=e)||J(o))$.forEach(r=>{r.removeToast(e)});else if(e&&("containerId"in e||"id"in e)){const r=$.get(e.containerId);r?r.removeToast(e.id):$.forEach(a=>{a.removeToast(e.id)})}}else K=K.filter(r=>e!=null&&r.options.toastId!==e)})(t)},h.clearWaitingQueue=function(t){t===void 0&&(t={}),$.forEach(e=>{!e.props.limit||t.containerId&&e.id!==t.containerId||e.clearQueue()})},h.isActive=pt,h.update=function(t,e){e===void 0&&(e={});const o=((r,a)=>{var d;let{containerId:n}=a;return(d=$.get(n||1))==null?void 0:d.toasts.get(r)})(t,e);if(o){const{props:r,content:a}=o,d={delay:100,...r,...e,toastId:e.toastId||t,updateId:mt()};d.toastId!==t&&(d.staleId=t);const n=d.render||a;delete d.render,G(n,d)}},h.done=t=>{h.update(t,{progress:1})},h.onChange=function(t){return lt.add(t),()=>{lt.delete(t)}},h.play=t=>dt(!0,t),h.pause=t=>dt(!1,t);const _t=typeof window<"u"?b.useLayoutEffect:b.useEffect,et=t=>{let{theme:e,type:o,isLoading:r,...a}=t;return y.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:e==="colored"?"currentColor":`var(--toastify-icon-color-${o})`,...a})},rt={info:function(t){return y.createElement(et,{...t},y.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(t){return y.createElement(et,{...t},y.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(t){return y.createElement(et,{...t},y.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(t){return y.createElement(et,{...t},y.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return y.createElement("div",{className:"Toastify__spinner"})}},Ct=t=>{const{isRunning:e,preventExitTransition:o,toastRef:r,eventHandlers:a,playToast:d}=Et(t),{closeButton:n,children:E,autoClose:f,onClick:_,type:u,hideProgressBar:C,closeToast:I,transition:N,position:m,className:c,style:T,bodyClassName:p,bodyStyle:l,progressClassName:s,progressStyle:g,updateId:M,role:B,progress:L,rtl:i,toastId:v,deleteToast:w,isIn:O,isLoading:S,closeOnClick:Y,theme:z}=t,Q=F("Toastify__toast",`Toastify__toast-theme--${z}`,`Toastify__toast--${u}`,{"Toastify__toast--rtl":i},{"Toastify__toast--close-on-click":Y}),Z=k(c)?c({rtl:i,position:m,type:u,defaultClassName:Q}):F(Q,c),D=function(X){let{theme:A,type:P,isLoading:x,icon:R}=X,V=null;const U={theme:A,type:P};return R===!1||(k(R)?V=R({...U,isLoading:x}):b.isValidElement(R)?V=b.cloneElement(R,U):x?V=rt.spinner():(gt=>gt in rt)(P)&&(V=rt[P](U))),V}(t),H=!!L||!f,j={closeToast:I,type:u,theme:z};let W=null;return n===!1||(W=k(n)?n(j):b.isValidElement(n)?b.cloneElement(n,j):function(X){let{closeToast:A,theme:P,ariaLabel:x="close"}=X;return y.createElement("button",{className:`Toastify__close-button Toastify__close-button--${P}`,type:"button",onClick:R=>{R.stopPropagation(),A(R)},"aria-label":x},y.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},y.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}(j)),y.createElement(N,{isIn:O,done:w,position:m,preventExitTransition:o,nodeRef:r,playToast:d},y.createElement("div",{id:v,onClick:_,"data-in":O,className:Z,...a,style:T,ref:r},y.createElement("div",{...O&&{role:B},className:k(p)?p({type:u}):F("Toastify__toast-body",p),style:l},D!=null&&y.createElement("div",{className:F("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!S})},D),y.createElement("div",null,E)),W,y.createElement(Tt,{...M&&!H?{key:`pb-${M}`}:{},rtl:i,theme:z,delay:f,isRunning:e,isIn:O,closeToast:I,hide:C,type:u,style:g,className:s,controlledProgress:H,progress:L||0})))},at=function(t,e){return e===void 0&&(e=!1),{enter:`Toastify--animate Toastify__${t}-enter`,exit:`Toastify--animate Toastify__${t}-exit`,appendPosition:e}},Lt=st(at("bounce",!0));st(at("slide",!0));st(at("zoom"));st(at("flip"));const Nt={position:"top-right",transition:Lt,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};function kt(t){let e={...Nt,...t};const o=t.stacked,[r,a]=b.useState(!0),d=b.useRef(null),{getToastToRender:n,isToastActive:E,count:f}=ht(e),{className:_,style:u,rtl:C,containerId:I}=e;function N(c){const T=F("Toastify__toast-container",`Toastify__toast-container--${c}`,{"Toastify__toast-container--rtl":C});return k(_)?_({position:c,rtl:C,defaultClassName:T}):F(T,nt(_))}function m(){o&&(a(!0),h.play())}return _t(()=>{if(o){var c;const T=d.current.querySelectorAll('[data-in="true"]'),p=12,l=(c=e.position)==null?void 0:c.includes("top");let s=0,g=0;Array.from(T).reverse().forEach((M,B)=>{const L=M;L.classList.add("Toastify__toast--stacked"),B>0&&(L.dataset.collapsed=`${r}`),L.dataset.pos||(L.dataset.pos=l?"top":"bot");const i=s*(r?.2:1)+(r?0:p*B);L.style.setProperty("--y",`${l?i:-1*i}px`),L.style.setProperty("--g",`${p}`),L.style.setProperty("--s",""+(1-(r?g:0))),s+=L.offsetHeight,g+=.025})}},[r,f,o]),y.createElement("div",{ref:d,className:"Toastify",id:I,onMouseEnter:()=>{o&&(a(!1),h.pause())},onMouseLeave:m},n((c,T)=>{const p=T.length?{...u}:{...u,pointerEvents:"none"};return y.createElement("div",{className:N(c),style:p,key:`container-${c}`},T.map(l=>{let{content:s,props:g}=l;return y.createElement(Ct,{...g,stacked:o,collapseAll:m,isIn:E(g.toastId,g.containerId),style:g.style,key:`toast-${g.key}`},s)}))}))}export{h as B,kt as Q};
