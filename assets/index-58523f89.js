var m=(e,n,t)=>new Promise((s,o)=>{var r=a=>{try{d(t.next(a))}catch(l){o(l)}},i=a=>{try{d(t.throw(a))}catch(l){o(l)}},d=a=>a.done?s(a.value):Promise.resolve(a.value).then(r,i);d((t=t.apply(e,n)).next())});import{_ as g}from"./_plugin-vue_export-helper-c27b6911.js";import{o as y,c as w,r as v,d as C,a as b,b as L,n as M}from"./runtime-core.esm-bundler-370feeb5.js";import{c as E}from"./runtime-dom.esm-bundler-ba6d4d41.js";import{T as j,d as B,g as p,s as u,P as c,m as _,a as S,w as k,u as A,b as h,c as P,e as O,r as G}from"./user-929b2785.js";import{u as f}from"./usePermission-4e083f48.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();if(typeof window!="undefined"){let e=function(){var n=document.body,t=document.getElementById("__svg__icons__dom__");t||(t=document.createElementNS("http://www.w3.org/2000/svg","svg"),t.style.position="absolute",t.style.width="0",t.style.height="0",t.id="__svg__icons__dom__",t.setAttribute("xmlns","http://www.w3.org/2000/svg"),t.setAttribute("xmlns:link","http://www.w3.org/1999/xlink")),t.innerHTML='<symbol viewBox="0 0 1024 1024"  id="icon-arrow-down"><path fill="currentColor" d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z" /></symbol><symbol viewBox="0 0 1024 1024"  id="icon-arrow-left"><path fill="currentColor" d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z" /></symbol><symbol viewBox="0 0 1024 1024"  id="icon-arrow-right"><path fill="currentColor" d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z" /></symbol><symbol viewBox="0 0 1024 1024"  id="icon-arrow-up"><path fill="currentColor" d="m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z" /></symbol>',n.insertBefore(t,n.lastChild)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}const N={};function R(e,n){const t=v("RouterView");return y(),w(t)}const T=g(N,[["render",R]]);function $(e){e?document.documentElement.classList.add("gray-mode"):document.documentElement.classList.remove("gray-mode")}function x(e){e?document.documentElement.classList.add("weak-mode"):document.documentElement.classList.remove("weak-mode")}function I(e){document.documentElement.classList.remove(...Object.values(j)),document.documentElement.classList.add(e)}const z=B({id:"app",state:()=>({projectConfig:p(c)}),getters:{getProjectConfig(){return this.projectConfig||p(c)}},actions:{setGrayMode(e){this.projectConfig.grayMode=e,$(e),u(c,this.projectConfig)},setWeakMode(e){this.projectConfig.weakMode=e,x(e),u(c,this.projectConfig)},setThemeMode(e){this.projectConfig.themeMode=e,I(e),u(c,this.projectConfig)},setProjectConfig(e){this.projectConfig=_(this.projectConfig||{},e),u(c,this.projectConfig)}}});function D(e){const n=z(),t=p(c),s=_(S,t||{});n.setProjectConfig(s),n.setGrayMode(s.grayMode),n.setWeakMode(s.weakMode),n.setThemeMode(s.themeMode)}const W=C({name:"VaButton",props:{type:{type:String,default:"default"}}});function q(e,n,t,s,o,r){return y(),b("div",{class:M(["button",e.$props.type])},[L(e.$slots,"default")],2)}const V=g(W,[["render",q]]),F=k(V);function K(e){e.use(F)}function U(e){e.directive("role",{mounted(n,t){var o;const{hasRole:s}=f();t.value&&(s(t.value)||(o=n.parentNode)==null||o.removeChild(n))}})}function H(e){e.directive("permission",{mounted(n,t){var o;const{hasPermission:s}=f();t.value&&(s(t.value)||(o=n.parentNode)==null||o.removeChild(n))}})}function J(e){U(e),H(e)}function Y(e){const n=A(),{hasRole:t}=f();e.beforeEach((s,o,r)=>m(this,null,function*(){if(s.meta.ignoreAuth){r();return}if(!n.getToken){r({path:h.BASE_LOGIN,replace:!0,query:{redirect:s.path}});return}if(!t(s.meta.roles)){const i=window.confirm("无权限访问，切换账号?");r(i?{path:h.BASE_LOGIN,replace:!0,query:{redirect:o.path}}:{path:o.path,replace:!0})}r()}))}function Q(e){Y(e)}function X(){return m(this,null,function*(){const e=E(T);P(e),D(),K(e),J(e),O(e),Q(G),e.mount("#app")})}X();
