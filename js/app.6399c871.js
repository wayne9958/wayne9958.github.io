(function(){"use strict";var e={381:function(e,t,n){var r=n(751),o=n(641);const a={class:"router-container"};function u(e,t){const n=(0,o.g2)("router-link"),r=(0,o.g2)("router-view");return(0,o.uX)(),(0,o.CE)("div",a,[(0,o.Lk)("nav",null,[(0,o.bF)(n,{to:"/"},{default:(0,o.k6)((()=>[(0,o.eW)("Home")])),_:1}),(0,o.eW)(" | "),(0,o.bF)(n,{to:"/about"},{default:(0,o.k6)((()=>[(0,o.eW)("About me")])),_:1}),(0,o.eW)(" | "),(0,o.bF)(n,{to:"/DemoOne"},{default:(0,o.k6)((()=>[(0,o.eW)("Vue專案")])),_:1})]),(0,o.bF)(r)])}var i=n(262);const c={},f=(0,i.A)(c,[["render",u]]);var l=f,s=n(220);function d(e,t,n,r,a,u){const i=(0,o.g2)("Profile");return(0,o.uX)(),(0,o.Wv)(i)}const p={class:"prof"},v=(0,o.Fv)('<h1 data-v-ab358ee8>Welcome</h1><li data-v-ab358ee8><a href="https://github.com/wayne9958" target="_blank" rel="noopener" data-v-ab358ee8>MY GITHUB</a></li><p data-v-ab358ee8><span class="white-text" data-v-ab358ee8>請點擊下方查看我過去的作品影片。</span></p><h3 class="white-text" data-v-ab358ee8>Here is my Demo videos.</h3><ul data-v-ab358ee8><li data-v-ab358ee8><a href="https://www.youtube.com/watch?v=LmL0-cEdIak" target="_blank" rel="noopener" data-v-ab358ee8>畢業專題TROBOT</a></li><br data-v-ab358ee8><li data-v-ab358ee8><a href="https://www.youtube.com/watch?v=zjyt4eXeNjQ" target="_blank" rel="noopener" data-v-ab358ee8>與實體機器人連線應用</a></li><br data-v-ab358ee8></ul>',5),b=[v];function h(e,t,n,r,a,u){return(0,o.uX)(),(0,o.CE)("div",p,b)}var m={name:"PROF",props:{msg:String}};const g=(0,i.A)(m,[["render",h],["__scopeId","data-v-ab358ee8"]]);var y=g,O=(0,o.pM)({name:"HomeView",components:{Profile:y}});const w=(0,i.A)(O,[["render",d]]);var k=w;const A=[{path:"/",name:"home",component:k},{path:"/about",name:"about",component:()=>n.e(99).then(n.bind(n,99))},{path:"/DemoOne",name:"DemoOne",component:()=>n.e(567).then(n.bind(n,486))}],j=(0,s.aE)({history:(0,s.Bt)(),routes:A});var T=j,_=(n(524),n(102)),E=(0,_.$N)();async function C(){const e=await n.e(53).then(n.t.bind(n,371,23));e.load({google:{families:["Roboto:100,300,400,500,700,900&display=swap"]}})}var P=n(278),N=(0,P.y$)({state(){return{Apple:0,Orange:0,AppleTotal:0,OrangeTotal:0}},getters:{},mutations:{ApplePlus(e){e.Apple++,e.AppleTotal+=25},AppleMinus(e){e.Apple--,e.AppleTotal-=25},OrangePlus(e){e.Orange++,e.OrangeTotal+=30},OrangeMinus(e){e.Orange--,e.OrangeTotal-=30},Clear(e){e.Orange=0,e.Apple=0,e.AppleTotal=0,e.OrangeTotal=0}},actions:{},modules:{}});C(),(0,r.Ef)(l).use(N).use(N).use(T).use(E).mount("#app")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(t,r,o,a){if(!r){var u=1/0;for(l=0;l<e.length;l++){r=e[l][0],o=e[l][1],a=e[l][2];for(var i=!0,c=0;c<r.length;c++)(!1&a||u>=a)&&Object.keys(n.O).every((function(e){return n.O[e](r[c])}))?r.splice(c--,1):(i=!1,a<u&&(u=a));if(i){e.splice(l--,1);var f=o();void 0!==f&&(t=f)}}return t}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[r,o,a]}}(),function(){var e,t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};n.t=function(r,o){if(1&o&&(r=this(r)),8&o)return r;if("object"===typeof r&&r){if(4&o&&r.__esModule)return r;if(16&o&&"function"===typeof r.then)return r}var a=Object.create(null);n.r(a);var u={};e=e||[null,t({}),t([]),t(t)];for(var i=2&o&&r;"object"==typeof i&&!~e.indexOf(i);i=t(i))Object.getOwnPropertyNames(i).forEach((function(e){u[e]=function(){return r[e]}}));return u["default"]=function(){return r},n.d(a,u),a}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+(53===e?"webfontloader":e)+"."+{53:"21fef3bf",99:"781182bd",567:"c6abff48"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{99:"af2c58ab",567:"760c33b4"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="v:";n.l=function(r,o,a,u){if(e[r])e[r].push(o);else{var i,c;if(void 0!==a)for(var f=document.getElementsByTagName("script"),l=0;l<f.length;l++){var s=f[l];if(s.getAttribute("src")==r||s.getAttribute("data-webpack")==t+a){i=s;break}}i||(c=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,n.nc&&i.setAttribute("nonce",n.nc),i.setAttribute("data-webpack",t+a),i.src=r),e[r]=[o];var d=function(t,n){i.onerror=i.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=d.bind(null,i.onerror),i.onload=d.bind(null,i.onload),c&&document.head.appendChild(i)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p=""}(),function(){if("undefined"!==typeof document){var e=function(e,t,r,o,a){var u=document.createElement("link");u.rel="stylesheet",u.type="text/css",n.nc&&(u.nonce=n.nc);var i=function(n){if(u.onerror=u.onload=null,"load"===n.type)o();else{var r=n&&n.type,i=n&&n.target&&n.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+": "+i+")");c.name="ChunkLoadError",c.code="CSS_CHUNK_LOAD_FAILED",c.type=r,c.request=i,u.parentNode&&u.parentNode.removeChild(u),a(c)}};return u.onerror=u.onload=i,u.href=t,r?r.parentNode.insertBefore(u,r.nextSibling):document.head.appendChild(u),u},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],a=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(a===e||a===t))return o}var u=document.getElementsByTagName("style");for(r=0;r<u.length;r++){o=u[r],a=o.getAttribute("data-href");if(a===e||a===t)return o}},r=function(r){return new Promise((function(o,a){var u=n.miniCssF(r),i=n.p+u;if(t(u,i))return o();e(r,i,null,o,a)}))},o={524:0};n.f.miniCss=function(e,t){var n={99:1,567:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=r(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}}(),function(){var e={524:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var a=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=a);var u=n.p+n.u(t),i=new Error,c=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var a=r&&("load"===r.type?"missing":r.type),u=r&&r.target&&r.target.src;i.message="Loading chunk "+t+" failed.\n("+a+": "+u+")",i.name="ChunkLoadError",i.type=a,i.request=u,o[1](i)}};n.l(u,c,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,a,u=r[0],i=r[1],c=r[2],f=0;if(u.some((function(t){return 0!==e[t]}))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(c)var l=c(n)}for(t&&t(r);f<u.length;f++)a=u[f],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(l)},r=self["webpackChunkv"]=self["webpackChunkv"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[504],(function(){return n(381)}));r=n.O(r)})();
//# sourceMappingURL=app.6399c871.js.map