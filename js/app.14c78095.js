(function(){"use strict";var e={89:function(e,t,n){var r=n(751),o=n(641);const u={class:"router-container"};function a(e,t){const n=(0,o.g2)("router-link"),r=(0,o.g2)("router-view");return(0,o.uX)(),(0,o.CE)("div",u,[(0,o.Lk)("nav",null,[(0,o.bF)(n,{to:"/"},{default:(0,o.k6)((()=>[(0,o.eW)("Home")])),_:1}),(0,o.eW)(" | "),(0,o.bF)(n,{to:"/about"},{default:(0,o.k6)((()=>[(0,o.eW)("About me")])),_:1}),(0,o.eW)(" | "),(0,o.bF)(n,{to:"/DemoOne"},{default:(0,o.k6)((()=>[(0,o.eW)("Vue專案")])),_:1})]),(0,o.bF)(r)])}var i=n(262);const c={},f=(0,i.A)(c,[["render",a]]);var l=f,s=n(220);function p(e,t,n,r,u,a){const i=(0,o.g2)("Profile");return(0,o.uX)(),(0,o.Wv)(i)}const d=e=>((0,o.Qi)("data-v-79afece3"),e=e(),(0,o.jt)(),e),v={class:"prof"},m=d((()=>(0,o.Lk)("h1",null,"Welcome",-1))),h=d((()=>(0,o.Lk)("p",null,[(0,o.Lk)("span",{class:"white-text"},"請點擊下方查看我過去的作品影片。")],-1))),b=d((()=>(0,o.Lk)("h3",{class:"white-text"},"Here is my Demo videos.",-1))),g=d((()=>(0,o.Lk)("ul",null,[(0,o.Lk)("li",null,[(0,o.Lk)("a",{href:"https://www.youtube.com/watch?v=LmL0-cEdIak",target:"_blank",rel:"noopener"},"畢業專題TROBOT")]),(0,o.Lk)("br"),(0,o.Lk)("li",null,[(0,o.Lk)("a",{href:"https://www.youtube.com/watch?v=zjyt4eXeNjQ",target:"_blank",rel:"noopener"},"與實體機器人連線應用")]),(0,o.Lk)("br")],-1))),y=[m,h,b,g];function O(e,t,n,r,u,a){return(0,o.uX)(),(0,o.CE)("div",v,y)}var k={name:"PROF",props:{msg:String}};const w=(0,i.A)(k,[["render",O],["__scopeId","data-v-79afece3"]]);var A=w,j=(0,o.pM)({name:"HomeView",components:{Profile:A}});const L=(0,i.A)(j,[["render",p]]);var T=L;const E=[{path:"/",name:"home",component:T},{path:"/about",name:"about",component:()=>n.e(99).then(n.bind(n,99))},{path:"/DemoOne",name:"DemoOne",component:()=>n.e(567).then(n.bind(n,486))}],_=(0,s.aE)({history:(0,s.Bt)(),routes:E});var C=_,P=(n(524),n(102)),N=(0,P.$N)();async function S(){const e=await n.e(53).then(n.t.bind(n,371,23));e.load({google:{families:["Roboto:100,300,400,500,700,900&display=swap"]}})}var x=n(278),F=(0,x.y$)({state(){return{Apple:0,Orange:0,AppleTotal:0,OrangeTotal:0}},getters:{},mutations:{ApplePlus(e){e.Apple++,e.AppleTotal+=25},AppleMinus(e){e.Apple--,e.AppleTotal-=25},OrangePlus(e){e.Orange++,e.OrangeTotal+=30},OrangeMinus(e){e.Orange--,e.OrangeTotal-=30},Clear(e){e.Orange=0,e.Apple=0,e.AppleTotal=0,e.OrangeTotal=0}},actions:{},modules:{}});S(),(0,r.Ef)(l).use(F).use(F).use(C).use(N).mount("#app")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var u=t[r]={exports:{}};return e[r](u,u.exports,n),u.exports}n.m=e,function(){var e=[];n.O=function(t,r,o,u){if(!r){var a=1/0;for(l=0;l<e.length;l++){r=e[l][0],o=e[l][1],u=e[l][2];for(var i=!0,c=0;c<r.length;c++)(!1&u||a>=u)&&Object.keys(n.O).every((function(e){return n.O[e](r[c])}))?r.splice(c--,1):(i=!1,u<a&&(a=u));if(i){e.splice(l--,1);var f=o();void 0!==f&&(t=f)}}return t}u=u||0;for(var l=e.length;l>0&&e[l-1][2]>u;l--)e[l]=e[l-1];e[l]=[r,o,u]}}(),function(){var e,t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};n.t=function(r,o){if(1&o&&(r=this(r)),8&o)return r;if("object"===typeof r&&r){if(4&o&&r.__esModule)return r;if(16&o&&"function"===typeof r.then)return r}var u=Object.create(null);n.r(u);var a={};e=e||[null,t({}),t([]),t(t)];for(var i=2&o&&r;"object"==typeof i&&!~e.indexOf(i);i=t(i))Object.getOwnPropertyNames(i).forEach((function(e){a[e]=function(){return r[e]}}));return a["default"]=function(){return r},n.d(u,a),u}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+(53===e?"webfontloader":e)+"."+{53:"21fef3bf",99:"7686f4f8",567:"b43fd6e9"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{99:"af2c58ab",567:"760c33b4"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="v:";n.l=function(r,o,u,a){if(e[r])e[r].push(o);else{var i,c;if(void 0!==u)for(var f=document.getElementsByTagName("script"),l=0;l<f.length;l++){var s=f[l];if(s.getAttribute("src")==r||s.getAttribute("data-webpack")==t+u){i=s;break}}i||(c=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,n.nc&&i.setAttribute("nonce",n.nc),i.setAttribute("data-webpack",t+u),i.src=r),e[r]=[o];var p=function(t,n){i.onerror=i.onload=null,clearTimeout(d);var o=e[r];if(delete e[r],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((function(e){return e(n)})),t)return t(n)},d=setTimeout(p.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=p.bind(null,i.onerror),i.onload=p.bind(null,i.onload),c&&document.head.appendChild(i)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p=""}(),function(){if("undefined"!==typeof document){var e=function(e,t,r,o,u){var a=document.createElement("link");a.rel="stylesheet",a.type="text/css",n.nc&&(a.nonce=n.nc);var i=function(n){if(a.onerror=a.onload=null,"load"===n.type)o();else{var r=n&&n.type,i=n&&n.target&&n.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+": "+i+")");c.name="ChunkLoadError",c.code="CSS_CHUNK_LOAD_FAILED",c.type=r,c.request=i,a.parentNode&&a.parentNode.removeChild(a),u(c)}};return a.onerror=a.onload=i,a.href=t,r?r.parentNode.insertBefore(a,r.nextSibling):document.head.appendChild(a),a},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],u=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(u===e||u===t))return o}var a=document.getElementsByTagName("style");for(r=0;r<a.length;r++){o=a[r],u=o.getAttribute("data-href");if(u===e||u===t)return o}},r=function(r){return new Promise((function(o,u){var a=n.miniCssF(r),i=n.p+a;if(t(a,i))return o();e(r,i,null,o,u)}))},o={524:0};n.f.miniCss=function(e,t){var n={99:1,567:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=r(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}}(),function(){var e={524:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var u=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=u);var a=n.p+n.u(t),i=new Error,c=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var u=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;i.message="Loading chunk "+t+" failed.\n("+u+": "+a+")",i.name="ChunkLoadError",i.type=u,i.request=a,o[1](i)}};n.l(a,c,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,u,a=r[0],i=r[1],c=r[2],f=0;if(a.some((function(t){return 0!==e[t]}))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(c)var l=c(n)}for(t&&t(r);f<a.length;f++)u=a[f],n.o(e,u)&&e[u]&&e[u][0](),e[u]=0;return n.O(l)},r=self["webpackChunkv"]=self["webpackChunkv"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[504],(function(){return n(89)}));r=n.O(r)})();
//# sourceMappingURL=app.14c78095.js.map