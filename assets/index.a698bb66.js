var p=(d,n,s)=>new Promise((t,u)=>{var a=e=>{try{r(s.next(e))}catch(c){u(c)}},o=e=>{try{r(s.throw(e))}catch(c){u(c)}},r=e=>e.done?t(e.value):Promise.resolve(e.value).then(a,o);r((s=s.apply(d,n)).next())});import{f as v,C as w,D as y,r as x,o as i,g as B,x as m,F as f,y as l,A as _,c as g,z as C,G as F,B as h}from"./vendor.e517fc6f.js";import{u as k}from"./index.5dcae548.js";const V={class:"login"},D=h("\u767B\u5F55"),A=v({setup(d){const n=w(!1),s=k(),t=y({account:"admin",password:"123456"}),u=()=>p(this,null,function*(){if(!t.account||!t.password)return!1;try{n.value=!0;const a=yield s.login({password:t.password,username:t.account});a&&alert(`\u767B\u5F55\u6210\u529F\uFF1A${a.username}`)}catch(a){alert(a.message)}finally{n.value=!1}});return(a,o)=>{const r=x("va-button");return i(),B("div",V,[m(_("input",{"onUpdate:modelValue":o[0]||(o[0]=e=>l(t).account=e),type:"text",placeholder:"\u8D26\u53F7"},null,512),[[f,l(t).account]]),m(_("input",{"onUpdate:modelValue":o[1]||(o[1]=e=>l(t).password=e),type:"password",placeholder:"\u5BC6\u7801"},null,512),[[f,l(t).password]]),n.value?F("",!0):(i(),g(r,{key:0,type:"success",onClick:u},{default:C(()=>[D]),_:1}))])}}});export{A as default};
