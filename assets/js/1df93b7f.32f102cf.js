(self.webpackChunk_parsed_path_docs=self.webpackChunk_parsed_path_docs||[]).push([[237],{4584:function(n,t,r){"use strict";r.r(t),r.d(t,{default:function(){return Y}});var e=r(73182),o=r(2784),i=r(27902);function a(n,t){var r=t.dir||t.root,e=t.base||""+(t.name||"")+(t.ext||"");return r?r===t.root?""+r+e:""+r+n+e:e}var u={win32:function(n){return a("\\",n)},posix:function(n){return a("/",n)}},s=function n(t,r){for(var e=arguments.length,o=new Array(e>2?e-2:0),i=2;i<e;i++)o[i-2]=arguments[i];if(o.length>0)return n(t,r)&&n.apply(void 0,[r].concat(o));if(typeof t!=typeof r)return!1;if(n.str(t)||n.num(t))return t===r;for(var a in t)if(!(a in r))return!1;for(var u in r)if(t[u]!==r[u])return!1;return!0};function c(n){return!n.some((function(n){return!!s.fun(n)||(s.arr(n)?!c(n):void 0)}))}s.arr=Array.isArray,s.fls=function(n){return s.und(n)||s.nul(n)||!1===n||""===n},s.nul=function(n){return null===n},s.und=function(n){return void 0===n},s.num=function(n){return"number"==typeof n},s.str=function(n){return"string"==typeof n},s.fun=function(n){return"function"==typeof n},s.obj=function(n){return"[object Object]"===Object.prototype.toString.call(n)},s.url=function(n){return n instanceof URL},s.set=function(n){return n instanceof Set},s.map=function(n){return n instanceof Map},s.big=function(n){return s.str(n)&&n===n.toUpperCase()},s.len=function(n,t){return(s.arr(t)||s.str(t))&&t.length===n};var p=/\s/g;function l(n,t){if(s.fls(n))return[];if(s.arr(n)){for(var r,e=[],o=0;o<n.length;o++)r=l(n[o],t),e.push.apply(e,Array.prototype.concat(r));return e}return s.fun(n)?t?l(n(t),t):[n]:s.str(n)&&w.has(n)?[n]:n.toString().replace(p,"").split("/")}var f=Math.abs;function d(n){return String.fromCharCode(n+(n>25?39:97))}var h={};function v(n,t){var r=s.str(n)?"pp":escape(n),e=r+"-"+function(n){var t,r="";for(t=f(n);t>52;t=t/52|0)r=d(t%52)+r;return(d(t%52)+r).replace(/(a)(d)/gi,"$1-$2")}(function(n,t){void 0===t&&(t=5381);for(var r=n.length;r;)t=33*t^n.charCodeAt(--r);return t}(r+h[r])>>>0);return h[r]=(h[r]||0)+1,t?t+"-"+e:e}function m(n,t){return void 0===t&&(t=!1),t?"Parsed("+function(n){return s.str(n)&&n||(null==n?void 0:n.displayId)||(null==n?void 0:n.name)||"Pathname"}(n)+")":"parsed."+n}function g(n,t){void 0===n&&(n=[]),void 0===t&&(t=[]);for(var r=[n[0]],e=0,o=t.length;e<o;e+=1)r.push(t[e],n[e+1]);return r}var y=Math.min;function b(n){for(var t,r=arguments.length,e=new Array(r>1?r-1:0),o=1;o<r;o++)e[o-1]=arguments[o];return!s.str(n[0])&&s.str(null==(t=n[0])?void 0:t.parsedId)?n[0].apply(n,e):n}var w=new Map([["https://","https"],["http://","http"],["./","base"],["~/","user"],["/","root"]]);function j(n){s.len(1,n)&&(n=n[0]);for(var t=arguments.length,r=new Array(t>1?t-1:0),e=1;e<t;e++)r[e-1]=arguments[e];return s.url(n)?l(g([],[n.pathname].concat(r))):s.fun(n)?l(g([],[n].concat(r))):s.obj(n)&&n.constructor===Object?l(g([],[Object.keys(n).map((function(t){return t+":"+n[t]+";"})).join()].concat(r))):s.str(n)&&s.len(0,r)?l(n):l(g(n,r))}function A(n,t){for(var r=arguments.length,e=new Array(r>2?r-2:0),o=2;o<r;o++)e[o-2]=arguments[o];var i=function(r){void 0===r&&(r={});for(var o=arguments.length,i=new Array(o>1?o-1:0),a=1;a<o;a++)i[a-1]=arguments[a];return s.obj(r)?n(j.apply(void 0,e),t).apply(void 0,[r].concat(i)):n(j.apply(void 0,e),t,j.apply(void 0,[r].concat(i)))};return i.toString=function(){return i.apply(void 0,arguments)},i.mount=function(){return n(j.apply(void 0,arguments),Object.assign({},t,{mount:j.apply(void 0,e)}))},i.from=function(){return n(j.apply(void 0,arguments),Object.assign({},t,{from:j.apply(void 0,e)}))},i.to=function(){return n(j.apply(void 0,arguments),Object.assign({},t,{to:j.apply(void 0,e)}))},i.withConfig=function(r,o){return void 0===o&&(o={}),A.apply(void 0,[n,Object.assign({},o,t,r)].concat(e))},i.withAttrs=function(r,o){return void 0===o&&(o={}),A.apply(void 0,[n,Object.assign({},o,t,{attrs:Array.prototype.concat(t.attrs,o.attrs,r).filter(Boolean)})].concat(e))},i}var E=r(24943),x=r(21023),S=/;/,I=/^\s*\/\/.*$/gm,P=function(){function n(n,t,r){this.formatPath=u[n],this.parsePath=x.parse,this.joinPath=x[t],this.pathform=r||void 0,this.isStatic=!r||r.isStatic,this.forms=r.forms||new Map([])}var t=n.prototype;return t.hasFormForId=function(n,t){var r;return this.forms.has(n)&&Boolean(null==(r=this.forms.get(n))?void 0:r.has(t))},t.insertForms=function(n,t){var r;this.forms.has(n)?null==(r=this.forms.get(n))||r.add(t):this.forms.set(n,(new Set).add(t))},t.joinForm=function(n){return n?Array.from(n).join("").replace(I,""):""},t.parseForm=function(n){if(!n)return{};var t=(0,E.MY)(n).map((function(n){var t;return(t={})[n.props]=n.children,t}));return Object.assign.apply(Object,[{}].concat(t))},t.generate=function(n,t){var r,e=this;void 0===t&&(t={});var o=this.isStatic,i=this.forms,a=this.joinPath,u=this.joinForm,s=this.parsePath,c=this.parseForm,p=t.pathId,l=n.filter((function(n){if(null==n.match||!n.match(S)||e.hasFormForId(p,n))return!0;e.insertForms(p,n)}));if(o&&0===((null==(r=i.get(p))?void 0:r.size)||0))return a.apply(void 0,l).replace(":/","://");var f=a.apply(void 0,l),d=u(i.get(p)),h=s(f),v=c(d),m=h.dir,g=h.name,y=h.ext;return this.formatPath(Object.assign({dir:m,name:g,ext:y},v)).replace(":/","://")},n}(),O=r(98283),Z=["attrs","mount","from","to","key"],k=function(){function n(n){this.pathname=n||void 0;for(var t=arguments.length,r=new Array(t>1?t-1:0),e=1;e<t;e++)r[e-1]=arguments[e];this.pathSets=r.filter(Boolean),this.isStatic=(s.fls(n)||n.isStatic)&&c(r),this.generate=this.generate.bind(this)}return n.prototype.generate=function(n,t,r){var e,i=r.attrs,a=r.mount,u=r.from,c=r.to,p=r.key,f=void 0===p?"href":p,d=(0,O.Z)(r,Z),h=this.pathname,v=this.isStatic,m=this.pathSets,g=[];null!=i&&i.length&&(n=function(n,t){void 0===t&&(t=[]);var r={};return t.forEach((function(n){for(var t in s.fun(n)&&(n=n(r)),n)r[t]=n[t]})),Object.assign({},r,n)}(n,i)),h&&g.push(h.generate(Object.assign({},n,{as:!1}),t,d)),v?g=g.concat(l(m)):m.forEach((function(t){var r="";t.forEach((function(t){r+=Array.prototype.concat([],l(t,n)).join("")})),g.push(r)})),a&&(g=g.concat(b(a,n,t,d))),(u||c)&&(g=function(n,t){if(void 0===t&&(t=[]),n===t)return[];s.str(t)&&(t=l(t)),s.str(n)&&(n=l(n));for(var r=0,e=y(n.length,t.length);!(e<=r||n[r]!==t[r]);r++);return Array(n.length-r).fill("..").concat(t.slice(r))}(c?b(c,n,t,d):g,u?b(u,n,t,d):g));var w=n.as||r.as,j=t.generate(g,d);return w?(0,o.createElement)(w,Object.assign(((e={})[f]=j,e),n)):j},n}();function C(n,t,r){var e;void 0===r&&(r=[]);var o=n[0],i=r[0],a=!s.str(o)&&s.str(null==o?void 0:o.parsedId),u=!s.str(i)&&s.str(null==i?void 0:i.parsedId),c=!s.str(o)||s.big(o.charAt(0)),p=a&&o.attrs?Array.prototype.concat(o.attrs,t.attrs).filter(Boolean):t.attrs||[],l=t.pathId,f=void 0===l?v(t.displayId,t.parentPathId):l,d=t.parsedId,h=void 0===d?function(n,t,r){return n&&t?escape(n)+"-"+t:t||r}(t.displayId,t.pathId,f):d,g=t.displayId,y=void 0===g?m(o,c):g,b=new k(a&&o.pathname,!a&&n,!u&&r,u&&(null==(e=i.pathname)?void 0:e.pathSets)),w=new P(t.isWin?"win32":"posix",t.pure?"resolve":"join",a&&o.pathform),j=function n(r){void 0===r&&(r={});for(var e=arguments.length,o=new Array(e>1?e-1:0),i=1;i<e;i++)o[i-1]=arguments[i];return s.obj(r)?b.generate(r,w,Object.assign({},t,{pathId:f,attrs:p})):C([n],t,[r].concat(o))};return j.attrs=p,j.config=t,j.pathId=f,j.parsedId=h,j.displayId=y,j.pathname=b,j.pathform=w,j.isStatic=b.isStatic&&s.len(0,p),j.toString=function(){return j()},j.mount=function(){var n;return(n=A(C,t,j)).mount.apply(n,arguments)},j.from=function(){var n;return(n=A(C,t,j)).from.apply(n,arguments)},j.to=function(){var n;return(n=A(C,t,j)).to.apply(n,arguments)},j.withConfig=function(n){return A(C,t,j).withConfig(n)},j.withAttrs=function(n){return A(C,t,j).withAttrs(n)},j}var F=function(){for(var n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];return A.apply(void 0,[C,{isWin:!1}].concat(t))};F.win32=function(){for(var n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];return A.apply(void 0,[C,{isWin:!0}].concat(t))},F.posix=function(){for(var n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];return A.apply(void 0,[C,{isWin:!1}].concat(t))},F.pure=function(){for(var n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];return A.apply(void 0,[C,{isWin:!1,pure:!0}].concat(t))},F.pureWin32=function(){for(var n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];return A.apply(void 0,[C,{isWin:!0,pure:!0}].concat(t))},F.purePosix=function(){for(var n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];return A.apply(void 0,[C,{isWin:!1,pure:!0}].concat(t))},w.forEach((function(n,t){F[n]=F(t)})),"undefined"!=typeof window&&window.location.pathname.split("/").reduce((function(n,t){return F[t||"top"]=F(n+"/"+t),n+"/"+t}));var W,T,B,_,M,z=r(52275),D=r(37614),H=z.ZP.div(W||(W=(0,e.Z)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  color: white;\n  background: linear-gradient(20deg, ",", ",");\n  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.17);\n  box-sizing: border-box;\n  min-height: 100vh;\n  padding-top: 160px;\n  padding-bottom: 160px;\n"])),"rgb(33, 33, 33)","rgb(66, 66, 66)");H.Header=z.ZP.header(T||(T=(0,e.Z)(["\n    padding: 1rem 3rem;\n    border: solid white;\n    flex-direction: column;\n    > p {\n        text-align: left;\n        font-size: 1.5rem;\n    }\n"]))),H.Tagline=z.ZP.h1(B||(B=(0,e.Z)(["\n  font-weight: 600;\n  font-size: 1.3rem;\n"]))),H.SupportingTagline=z.ZP.h2(_||(_=(0,e.Z)(["\n  font-size: 1.1rem;\n  font-weight: 400;\n"]))),H.Title=z.ZP.div(M||(M=(0,e.Z)(["\n  margin: 2rem 0;\n  h1, h2 {\n    margin: 0;\n  }\n"])));var R,U,G=r(54304),$=z.ZP.a(R||(R=(0,e.Z)(["\n  /* This renders the buttons above... Edit me! */\n  display: inline-block;\n  border-radius: 3px;\n  padding: 0.5rem 0;\n  margin: 0.5rem 1rem;\n  width: 11rem;\n  background: transparent;\n  color: white;\n  border: 2px solid white;\n\n  /* The GitHub button is a primary button\n   * edit this to target it specifically! */\n  ","\n"])),(function(n){return n.primary&&(0,z.iv)(U||(U=(0,e.Z)(["\n    background: white;\n    color: black;\n  "])))})),L='\nconst Docs = parsed`docs``get`;\n\nconst Github = parsed.https`github.com`\n\nconst Username = Github`${props => props.username}`\n\nconst Repo = parsed(Username)`parsed-path`\n\nrender(\n  <>\n    <Docs as={Button}>Documentation</Docs>\n    <Repo\n      as={Button}\n      username="tseijp"\n      target="_blank"\n      rel="noopener"\n      primary>\n      Github\n    </Repo>\n  </>\n)\n'.trim();function Y(){var n=(0,D.default)().siteConfig;return o.createElement(i.Z,{title:"Hello from "+n.title,description:"Description will go into a meta tag in <head />"},o.createElement(H,null,o.createElement(H.Header,null,o.createElement("h1",null,"<\ud83d\udc4b>"),o.createElement("p",null,"parsed"),o.createElement("p",null,"path")),o.createElement(G.v,{hero:!0,code:L,noInline:!0,scope:{React:o,parsed:F,Button:$}},o.createElement(H.Title,null,o.createElement(H.Tagline,null),o.createElement(H.SupportingTagline,null,"Use the best bits of ES6 to parse your path without stress \ud83d\udc4b")),o.createElement(G.v.Preview,null),o.createElement(G.v.Container,{style:{maxWidth:"34rem"}},o.createElement(G.v.Editor,{style:{minHeight:"27rem"}}),o.createElement(G.v.Error,null)))))}}}]);