/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

(function(){
var _1=null;
if((_1||(typeof djConfig!="undefined"&&djConfig.scopeMap))&&(typeof window!="undefined")){
var _2="",_3="",_4="",_5={},_6={};
_1=_1||djConfig.scopeMap;
for(var i=0;i<_1.length;i++){
var _7=_1[i];
_2+="var "+_7[0]+" = {}; "+_7[1]+" = "+_7[0]+";"+_7[1]+"._scopeName = '"+_7[1]+"';";
_3+=(i==0?"":",")+_7[0];
_4+=(i==0?"":",")+_7[1];
_5[_7[0]]=_7[1];
_6[_7[1]]=_7[0];
}
eval(_2+"dojo._scopeArgs = ["+_4+"];");
dojo._scopePrefixArgs=_3;
dojo._scopePrefix="(function("+_3+"){";
dojo._scopeSuffix="})("+_4+")";
dojo._scopeMap=_5;
dojo._scopeMapRev=_6;
}
(function(){
if(typeof this["loadFirebugConsole"]=="function"){
this["loadFirebugConsole"]();
}else{
this.console=this.console||{};
var cn=["assert","count","debug","dir","dirxml","error","group","groupEnd","info","profile","profileEnd","time","timeEnd","trace","warn","log"];
var i=0,tn;
while((tn=cn[i++])){
if(!console[tn]){
(function(){
var _8=tn+"";
console[_8]=("log" in console)?function(){
var a=Array.apply({},arguments);
a.unshift(_8+":");
console["log"](a.join(" "));
}:function(){
};
console[_8]._fake=true;
})();
}
}
}
if(typeof dojo=="undefined"){
dojo={_scopeName:"dojo",_scopePrefix:"",_scopePrefixArgs:"",_scopeSuffix:"",_scopeMap:{},_scopeMapRev:{}};
}
var d=dojo;
if(typeof dijit=="undefined"){
dijit={_scopeName:"dijit"};
}
if(typeof dojox=="undefined"){
dojox={_scopeName:"dojox"};
}
if(!d._scopeArgs){
d._scopeArgs=[dojo,dijit,dojox];
}
d.global=this;
d.config={isDebug:false,debugAtAllCosts:false};
var _9=typeof djConfig!="undefined"?djConfig:typeof dojoConfig!="undefined"?dojoConfig:null;
if(_9){
for(var c in _9){
d.config[c]=_9[c];
}
}
dojo.locale=d.config.locale;
var _a="$Rev: 24595 $".match(/\d+/);
dojo.version={major:1,minor:6,patch:1,flag:"24595",revision:_a?+_a[0]:NaN,toString:function(){
with(d.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
if(typeof OpenAjax!="undefined"){
OpenAjax.hub.registerLibrary(dojo._scopeName,"http://dojotoolkit.org",d.version.toString());
}
var _b,_c,_d={};
for(var i in {toString:1}){
_b=[];
break;
}
dojo._extraNames=_b=_b||["hasOwnProperty","valueOf","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","constructor"];
_c=_b.length;
dojo._mixin=function(_e,_f){
var _10,s,i;
for(_10 in _f){
s=_f[_10];
if(!(_10 in _e)||(_e[_10]!==s&&(!(_10 in _d)||_d[_10]!==s))){
_e[_10]=s;
}
}
if(_c&&_f){
for(i=0;i<_c;++i){
_10=_b[i];
s=_f[_10];
if(!(_10 in _e)||(_e[_10]!==s&&(!(_10 in _d)||_d[_10]!==s))){
_e[_10]=s;
}
}
}
return _e;
};
dojo.mixin=function(obj,_11){
if(!obj){
obj={};
}
for(var i=1,l=arguments.length;i<l;i++){
d._mixin(obj,arguments[i]);
}
return obj;
};
dojo._getProp=function(_12,_13,_14){
var obj=_14||d.global;
for(var i=0,p;obj&&(p=_12[i]);i++){
if(i==0&&d._scopeMap[p]){
p=d._scopeMap[p];
}
obj=(p in obj?obj[p]:(_13?obj[p]={}:undefined));
}
return obj;
};
dojo.setObject=function(_15,_16,_17){
var _18=_15.split("."),p=_18.pop(),obj=d._getProp(_18,true,_17);
return obj&&p?(obj[p]=_16):undefined;
};
dojo.getObject=function(_19,_1a,_1b){
return d._getProp(_19.split("."),_1a,_1b);
};
dojo.exists=function(_1c,obj){
return d.getObject(_1c,false,obj)!==undefined;
};
dojo["eval"]=function(_1d){
return d.global.eval?d.global.eval(_1d):eval(_1d);
};
d.deprecated=d.experimental=function(){
};
})();
(function(){
var d=dojo,_1e;
d.mixin(d,{_loadedModules:{},_inFlightCount:0,_hasResource:{},_modulePrefixes:{dojo:{name:"dojo",value:"."},doh:{name:"doh",value:"../util/doh"},tests:{name:"tests",value:"tests"}},_moduleHasPrefix:function(_1f){
var mp=d._modulePrefixes;
return !!(mp[_1f]&&mp[_1f].value);
},_getModulePrefix:function(_20){
var mp=d._modulePrefixes;
if(d._moduleHasPrefix(_20)){
return mp[_20].value;
}
return _20;
},_loadedUrls:[],_postLoad:false,_loaders:[],_unloaders:[],_loadNotifying:false});
dojo._loadPath=function(_21,_22,cb){
var uri=((_21.charAt(0)=="/"||_21.match(/^\w+:/))?"":d.baseUrl)+_21;
try{
_1e=_22;
return !_22?d._loadUri(uri,cb):d._loadUriAndCheck(uri,_22,cb);
}
catch(e){
console.error(e);
return false;
}
finally{
_1e=null;
}
};
dojo._loadUri=function(uri,cb){
if(d._loadedUrls[uri]){
return true;
}
d._inFlightCount++;
var _23=d._getText(uri,true);
if(_23){
d._loadedUrls[uri]=true;
d._loadedUrls.push(uri);
if(cb){
_23=/^define\(/.test(_23)?_23:"("+_23+")";
}else{
_23=d._scopePrefix+_23+d._scopeSuffix;
}
if(!d.isIE){
_23+="\r\n//@ sourceURL="+uri;
}
try{
var _24=d["eval"](_23);
}
catch(e){
}
if(cb){
cb(_24);
}
}
if(--d._inFlightCount==0&&d._postLoad&&d._loaders.length){
setTimeout(function(){
if(d._inFlightCount==0){
d._callLoaded();
}
},0);
}
return !!_23;
};
dojo._loadUriAndCheck=function(uri,_25,cb){
var ok=false;
try{
ok=d._loadUri(uri,cb);
}
catch(e){
console.error("failed loading "+uri+" with error: "+e);
}
return !!(ok&&d._loadedModules[_25]);
};
dojo.loaded=function(){
d._loadNotifying=true;
d._postLoad=true;
var mll=d._loaders;
d._loaders=[];
for(var x=0;x<mll.length;x++){
try{
mll[x]();
}
catch(e){
console.error(e);
}
}
d._loadNotifying=false;
if(d._postLoad&&d._inFlightCount==0&&mll.length){
d._callLoaded();
}
};
dojo.unloaded=function(){
var mll=d._unloaders;
while(mll.length){
(mll.pop())();
}
};
d._onto=function(arr,obj,fn){
if(!fn){
arr.push(obj);
}else{
if(fn){
var _26=(typeof fn=="string")?obj[fn]:fn;
arr.push(function(){
_26.call(obj);
});
}
}
};
dojo.ready=dojo.addOnLoad=function(obj,_27){
d._onto(d._loaders,obj,_27);
if(d._postLoad&&d._inFlightCount==0&&!d._loadNotifying){
d._callLoaded();
}
};
var dca=d.config.addOnLoad;
if(dca){
d.addOnLoad[(dca instanceof Array?"apply":"call")](d,dca);
}
dojo._modulesLoaded=function(){
if(d._postLoad){
return;
}
if(d._inFlightCount>0){
console.warn("files still in flight!");
return;
}
d._callLoaded();
};
dojo._callLoaded=function(){
if(typeof setTimeout=="object"||(d.config.useXDomain&&d.isOpera)){
setTimeout(d.isAIR?function(){
d.loaded();
}:d._scopeName+".loaded();",0);
}else{
d.loaded();
}
};
dojo._getModuleSymbols=function(_28){
var _29=_28.split(".");
for(var i=_29.length;i>0;i--){
var _2a=_29.slice(0,i).join(".");
if(i==1&&!d._moduleHasPrefix(_2a)){
_29[0]="../"+_29[0];
}else{
var _2b=d._getModulePrefix(_2a);
if(_2b!=_2a){
_29.splice(0,i,_2b);
break;
}
}
}
return _29;
};
dojo._global_omit_module_check=false;
dojo.loadInit=function(_2c){
_2c();
};
dojo._loadModule=dojo.require=function(_2d,_2e){
_2e=d._global_omit_module_check||_2e;
_2d=_2d.replace(/i18n\!/,"");
var _2f=d._loadedModules[_2d];
if(_2f){
return _2f;
}
var _30=d._getModuleSymbols(_2d).join("/")+".js";
var _31=!_2e?_2d:null;
var ok=d._loadPath(_30,_31);
if(!ok&&!_2e){
throw new Error("Could not load '"+_2d+"'; last tried '"+_30+"'");
}
if(!_2e&&!d._isXDomain){
_2f=d._loadedModules[_2d];
if(!_2f){
throw new Error("symbol '"+_2d+"' is not defined after loading '"+_30+"'");
}
}
return _2f;
};
dojo.provide=function(_32){
_32=_32+"";
return (d._loadedModules[_32]=d.getObject(_32,true));
};
dojo.platformRequire=function(_33){
var _34=_33.common||[];
var _35=_34.concat(_33[d._name]||_33["default"]||[]);
for(var x=0;x<_35.length;x++){
var _36=_35[x];
if(_36.constructor==Array){
d._loadModule.apply(d,_36);
}else{
d._loadModule(_36);
}
}
};
dojo.requireIf=function(_37,_38){
if(_37===true){
var _39=[];
for(var i=1;i<arguments.length;i++){
_39.push(arguments[i]);
}
d.require.apply(d,_39);
}
};
dojo.requireAfterIf=d.requireIf;
dojo.registerModulePath=function(_3a,_3b){
d._modulePrefixes[_3a]={name:_3a,value:_3b};
};
dojo.requireLocalization=function(_3c,_3d,_3e,_3f){
d.require("dojo.i18n");
d.i18n._requireLocalization.apply(d.hostenv,arguments);
};
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");
dojo._Url=function(){
var n=null,_40=arguments,uri=[_40[0]];
for(var i=1;i<_40.length;i++){
if(!_40[i]){
continue;
}
var _41=new d._Url(_40[i]+""),_42=new d._Url(uri[0]+"");
if(_41.path==""&&!_41.scheme&&!_41.authority&&!_41.query){
if(_41.fragment!=n){
_42.fragment=_41.fragment;
}
_41=_42;
}else{
if(!_41.scheme){
_41.scheme=_42.scheme;
if(!_41.authority){
_41.authority=_42.authority;
if(_41.path.charAt(0)!="/"){
var _43=_42.path.substring(0,_42.path.lastIndexOf("/")+1)+_41.path;
var _44=_43.split("/");
for(var j=0;j<_44.length;j++){
if(_44[j]=="."){
if(j==_44.length-1){
_44[j]="";
}else{
_44.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&_44[0]=="")&&_44[j]==".."&&_44[j-1]!=".."){
if(j==(_44.length-1)){
_44.splice(j,1);
_44[j-1]="";
}else{
_44.splice(j-1,2);
j-=2;
}
}
}
}
_41.path=_44.join("/");
}
}
}
}
uri=[];
if(_41.scheme){
uri.push(_41.scheme,":");
}
if(_41.authority){
uri.push("//",_41.authority);
}
uri.push(_41.path);
if(_41.query){
uri.push("?",_41.query);
}
if(_41.fragment){
uri.push("#",_41.fragment);
}
}
this.uri=uri.join("");
var r=this.uri.match(ore);
this.scheme=r[2]||(r[1]?"":n);
this.authority=r[4]||(r[3]?"":n);
this.path=r[5];
this.query=r[7]||(r[6]?"":n);
this.fragment=r[9]||(r[8]?"":n);
if(this.authority!=n){
r=this.authority.match(ire);
this.user=r[3]||n;
this.password=r[4]||n;
this.host=r[6]||r[7];
this.port=r[9]||n;
}
};
dojo._Url.prototype.toString=function(){
return this.uri;
};
dojo.moduleUrl=function(_45,url){
var loc=d._getModuleSymbols(_45).join("/");
if(!loc){
return null;
}
if(loc.lastIndexOf("/")!=loc.length-1){
loc+="/";
}
var _46=loc.indexOf(":");
if(loc.charAt(0)!="/"&&(_46==-1||_46>loc.indexOf("/"))){
loc=d.baseUrl+loc;
}
return new d._Url(loc,url);
};
})();
if(typeof window!="undefined"){
dojo.isBrowser=true;
dojo._name="browser";
(function(){
var d=dojo;
if(document&&document.getElementsByTagName){
var _47=document.getElementsByTagName("script");
var _48=/dojo(\.xd)?\.js(\W|$)/i;
for(var i=0;i<_47.length;i++){
var src=_47[i].getAttribute("src");
if(!src){
continue;
}
var m=src.match(_48);
if(m){
if(!d.config.baseUrl){
d.config.baseUrl=src.substring(0,m.index);
}
var cfg=(_47[i].getAttribute("djConfig")||_47[i].getAttribute("data-dojo-config"));
if(cfg){
var _49=eval("({ "+cfg+" })");
for(var x in _49){
dojo.config[x]=_49[x];
}
}
break;
}
}
}
d.baseUrl=d.config.baseUrl;
var n=navigator;
var dua=n.userAgent,dav=n.appVersion,tv=parseFloat(dav);
if(dua.indexOf("Opera")>=0){
d.isOpera=tv;
}
if(dua.indexOf("AdobeAIR")>=0){
d.isAIR=1;
}
d.isKhtml=(dav.indexOf("Konqueror")>=0)?tv:0;
d.isWebKit=parseFloat(dua.split("WebKit/")[1])||undefined;
d.isChrome=parseFloat(dua.split("Chrome/")[1])||undefined;
d.isMac=dav.indexOf("Macintosh")>=0;
var _4a=Math.max(dav.indexOf("WebKit"),dav.indexOf("Safari"),0);
if(_4a&&!dojo.isChrome){
d.isSafari=parseFloat(dav.split("Version/")[1]);
if(!d.isSafari||parseFloat(dav.substr(_4a+7))<=419.3){
d.isSafari=2;
}
}
if(dua.indexOf("Gecko")>=0&&!d.isKhtml&&!d.isWebKit){
d.isMozilla=d.isMoz=tv;
}
if(d.isMoz){
d.isFF=parseFloat(dua.split("Firefox/")[1]||dua.split("Minefield/")[1])||undefined;
}
if(document.all&&!d.isOpera){
d.isIE=parseFloat(dav.split("MSIE ")[1])||undefined;
var _4b=document.documentMode;
if(_4b&&_4b!=5&&Math.floor(d.isIE)!=_4b){
d.isIE=_4b;
}
}
if(dojo.isIE&&window.location.protocol==="file:"){
dojo.config.ieForceActiveXXhr=true;
}
d.isQuirks=document.compatMode=="BackCompat";
d.locale=dojo.config.locale||(d.isIE?n.userLanguage:n.language).toLowerCase();
d._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
d._xhrObj=function(){
var _4c,_4d;
if(!dojo.isIE||!dojo.config.ieForceActiveXXhr){
try{
_4c=new XMLHttpRequest();
}
catch(e){
}
}
if(!_4c){
for(var i=0;i<3;++i){
var _4e=d._XMLHTTP_PROGIDS[i];
try{
_4c=new ActiveXObject(_4e);
}
catch(e){
_4d=e;
}
if(_4c){
d._XMLHTTP_PROGIDS=[_4e];
break;
}
}
}
if(!_4c){
throw new Error("XMLHTTP not available: "+_4d);
}
return _4c;
};
d._isDocumentOk=function(_4f){
var _50=_4f.status||0,lp=location.protocol;
return (_50>=200&&_50<300)||_50==304||_50==1223||(!_50&&(lp=="file:"||lp=="chrome:"||lp=="chrome-extension:"||lp=="app:"));
};
var _51=window.location+"";
var _52=document.getElementsByTagName("base");
var _53=(_52&&_52.length>0);
d._getText=function(uri,_54){
var _55=d._xhrObj();
if(!_53&&dojo._Url){
uri=(new dojo._Url(_51,uri)).toString();
}
if(d.config.cacheBust){
uri+="";
uri+=(uri.indexOf("?")==-1?"?":"&")+String(d.config.cacheBust).replace(/\W+/g,"");
}
_55.open("GET",uri,false);
try{
_55.send(null);
if(!d._isDocumentOk(_55)){
var err=Error("Unable to load "+uri+" status:"+_55.status);
err.status=_55.status;
err.responseText=_55.responseText;
if(_54){
return null;
}
throw err;
}
}
catch(e){
if(_54){
return null;
}
throw e;
}
return _55.responseText;
};
var _56=window;
var _57=function(_58,fp){
var _59=_56.attachEvent||_56.addEventListener;
_58=_56.attachEvent?_58:_58.substring(2);
_59(_58,function(){
fp.apply(_56,arguments);
},false);
};
d._windowUnloaders=[];
d.windowUnloaded=function(){
var mll=d._windowUnloaders;
while(mll.length){
(mll.pop())();
}
d=null;
};
var _5a=0;
d.addOnWindowUnload=function(obj,_5b){
d._onto(d._windowUnloaders,obj,_5b);
if(!_5a){
_5a=1;
_57("onunload",d.windowUnloaded);
}
};
var _5c=0;
d.addOnUnload=function(obj,_5d){
d._onto(d._unloaders,obj,_5d);
if(!_5c){
_5c=1;
_57("onbeforeunload",dojo.unloaded);
}
};
})();
dojo._initFired=false;
dojo._loadInit=function(e){
if(dojo._scrollIntervalId){
clearInterval(dojo._scrollIntervalId);
dojo._scrollIntervalId=0;
}
if(!dojo._initFired){
dojo._initFired=true;
if(!dojo.config.afterOnLoad&&window.detachEvent){
window.detachEvent("onload",dojo._loadInit);
}
if(dojo._inFlightCount==0){
dojo._modulesLoaded();
}
}
};
if(!dojo.config.afterOnLoad){
if(document.addEventListener){
document.addEventListener("DOMContentLoaded",dojo._loadInit,false);
window.addEventListener("load",dojo._loadInit,false);
}else{
if(window.attachEvent){
window.attachEvent("onload",dojo._loadInit);
if(!dojo.config.skipIeDomLoaded&&self===self.top){
dojo._scrollIntervalId=setInterval(function(){
try{
if(document.body){
document.documentElement.doScroll("left");
dojo._loadInit();
}
}
catch(e){
}
},30);
}
}
}
}
if(dojo.isIE){
try{
(function(){
document.namespaces.add("v","urn:schemas-microsoft-com:vml");
var _5e=["*","group","roundrect","oval","shape","rect","imagedata","path","textpath","text"],i=0,l=1,s=document.createStyleSheet();
if(dojo.isIE>=8){
i=1;
l=_5e.length;
}
for(;i<l;++i){
s.addRule("v\\:"+_5e[i],"behavior:url(#default#VML); display:inline-block");
}
})();
}
catch(e){
}
}
}
(function(){
var mp=dojo.config["modulePaths"];
if(mp){
for(var _5f in mp){
dojo.registerModulePath(_5f,mp[_5f]);
}
}
})();
if(dojo.config.isDebug){
dojo.require("dojo._firebug.firebug");
}
if(dojo.config.debugAtAllCosts){
dojo.require("dojo._base._loader.loader_debug");
}
if(!dojo._hasResource["dojo._base.lang"]){
dojo._hasResource["dojo._base.lang"]=true;
dojo.provide("dojo._base.lang");
(function(){
var d=dojo,_60=Object.prototype.toString;
dojo.isString=function(it){
return (typeof it=="string"||it instanceof String);
};
dojo.isArray=function(it){
return it&&(it instanceof Array||typeof it=="array");
};
dojo.isFunction=function(it){
return _60.call(it)==="[object Function]";
};
dojo.isObject=function(it){
return it!==undefined&&(it===null||typeof it=="object"||d.isArray(it)||d.isFunction(it));
};
dojo.isArrayLike=function(it){
return it&&it!==undefined&&!d.isString(it)&&!d.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=="form")&&(d.isArray(it)||isFinite(it.length));
};
dojo.isAlien=function(it){
return it&&!d.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.extend=function(_61,_62){
for(var i=1,l=arguments.length;i<l;i++){
d._mixin(_61.prototype,arguments[i]);
}
return _61;
};
dojo._hitchArgs=function(_63,_64){
var pre=d._toArray(arguments,2);
var _65=d.isString(_64);
return function(){
var _66=d._toArray(arguments);
var f=_65?(_63||d.global)[_64]:_64;
return f&&f.apply(_63||this,pre.concat(_66));
};
};
dojo.hitch=function(_67,_68){
if(arguments.length>2){
return d._hitchArgs.apply(d,arguments);
}
if(!_68){
_68=_67;
_67=null;
}
if(d.isString(_68)){
_67=_67||d.global;
if(!_67[_68]){
throw (["dojo.hitch: scope[\"",_68,"\"] is null (scope=\"",_67,"\")"].join(""));
}
return function(){
return _67[_68].apply(_67,arguments||[]);
};
}
return !_67?_68:function(){
return _68.apply(_67,arguments||[]);
};
};
dojo.delegate=dojo._delegate=(function(){
function TMP(){
};
return function(obj,_69){
TMP.prototype=obj;
var tmp=new TMP();
TMP.prototype=null;
if(_69){
d._mixin(tmp,_69);
}
return tmp;
};
})();
var _6a=function(obj,_6b,_6c){
return (_6c||[]).concat(Array.prototype.slice.call(obj,_6b||0));
};
var _6d=function(obj,_6e,_6f){
var arr=_6f||[];
for(var x=_6e||0;x<obj.length;x++){
arr.push(obj[x]);
}
return arr;
};
dojo._toArray=d.isIE?function(obj){
return ((obj.item)?_6d:_6a).apply(this,arguments);
}:_6a;
dojo.partial=function(_70){
var arr=[null];
return d.hitch.apply(d,arr.concat(d._toArray(arguments)));
};
var _71=d._extraNames,_72=_71.length,_73={};
dojo.clone=function(o){
if(!o||typeof o!="object"||d.isFunction(o)){
return o;
}
if(o.nodeType&&"cloneNode" in o){
return o.cloneNode(true);
}
if(o instanceof Date){
return new Date(o.getTime());
}
if(o instanceof RegExp){
return new RegExp(o);
}
var r,i,l,s,_74;
if(d.isArray(o)){
r=[];
for(i=0,l=o.length;i<l;++i){
if(i in o){
r.push(d.clone(o[i]));
}
}
}else{
r=o.constructor?new o.constructor():{};
}
for(_74 in o){
s=o[_74];
if(!(_74 in r)||(r[_74]!==s&&(!(_74 in _73)||_73[_74]!==s))){
r[_74]=d.clone(s);
}
}
if(_72){
for(i=0;i<_72;++i){
_74=_71[i];
s=o[_74];
if(!(_74 in r)||(r[_74]!==s&&(!(_74 in _73)||_73[_74]!==s))){
r[_74]=s;
}
}
}
return r;
};
dojo.trim=String.prototype.trim?function(str){
return str.trim();
}:function(str){
return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"");
};
var _75=/\{([^\}]+)\}/g;
dojo.replace=function(_76,map,_77){
return _76.replace(_77||_75,d.isFunction(map)?map:function(_78,k){
return d.getObject(k,false,map);
});
};
})();
}
if(!dojo._hasResource["dojo._base.array"]){
dojo._hasResource["dojo._base.array"]=true;
dojo.provide("dojo._base.array");
(function(){
var _79=function(arr,obj,cb){
return [(typeof arr=="string")?arr.split(""):arr,obj||dojo.global,(typeof cb=="string")?new Function("item","index","array",cb):cb];
};
var _7a=function(_7b,arr,_7c,_7d){
var _7e=_79(arr,_7d,_7c);
arr=_7e[0];
for(var i=0,l=arr.length;i<l;++i){
var _7f=!!_7e[2].call(_7e[1],arr[i],i,arr);
if(_7b^_7f){
return _7f;
}
}
return _7b;
};
dojo.mixin(dojo,{indexOf:function(_80,_81,_82,_83){
var _84=1,end=_80.length||0,i=0;
if(_83){
i=end-1;
_84=end=-1;
}
if(_82!=undefined){
i=_82;
}
if((_83&&i>end)||i<end){
for(;i!=end;i+=_84){
if(_80[i]==_81){
return i;
}
}
}
return -1;
},lastIndexOf:function(_85,_86,_87){
return dojo.indexOf(_85,_86,_87,true);
},forEach:function(arr,_88,_89){
if(!arr||!arr.length){
return;
}
var _8a=_79(arr,_89,_88);
arr=_8a[0];
for(var i=0,l=arr.length;i<l;++i){
_8a[2].call(_8a[1],arr[i],i,arr);
}
},every:function(arr,_8b,_8c){
return _7a(true,arr,_8b,_8c);
},some:function(arr,_8d,_8e){
return _7a(false,arr,_8d,_8e);
},map:function(arr,_8f,_90){
var _91=_79(arr,_90,_8f);
arr=_91[0];
var _92=(arguments[3]?(new arguments[3]()):[]);
for(var i=0,l=arr.length;i<l;++i){
_92.push(_91[2].call(_91[1],arr[i],i,arr));
}
return _92;
},filter:function(arr,_93,_94){
var _95=_79(arr,_94,_93);
arr=_95[0];
var _96=[];
for(var i=0,l=arr.length;i<l;++i){
if(_95[2].call(_95[1],arr[i],i,arr)){
_96.push(arr[i]);
}
}
return _96;
}});
})();
}
if(!dojo._hasResource["dojo._base.declare"]){
dojo._hasResource["dojo._base.declare"]=true;
dojo.provide("dojo._base.declare");
(function(){
var d=dojo,mix=d._mixin,op=Object.prototype,_97=op.toString,_98=new Function,_99=0,_9a="constructor";
function err(msg,cls){
throw new Error("declare"+(cls?" "+cls:"")+": "+msg);
};
function _9b(_9c,_9d){
var _9e=[],_9f=[{cls:0,refs:[]}],_a0={},_a1=1,l=_9c.length,i=0,j,lin,_a2,top,_a3,rec,_a4,_a5;
for(;i<l;++i){
_a2=_9c[i];
if(!_a2){
err("mixin #"+i+" is unknown. Did you use dojo.require to pull it in?",_9d);
}else{
if(_97.call(_a2)!="[object Function]"){
err("mixin #"+i+" is not a callable constructor.",_9d);
}
}
lin=_a2._meta?_a2._meta.bases:[_a2];
top=0;
for(j=lin.length-1;j>=0;--j){
_a3=lin[j].prototype;
if(!_a3.hasOwnProperty("declaredClass")){
_a3.declaredClass="uniqName_"+(_99++);
}
_a4=_a3.declaredClass;
if(!_a0.hasOwnProperty(_a4)){
_a0[_a4]={count:0,refs:[],cls:lin[j]};
++_a1;
}
rec=_a0[_a4];
if(top&&top!==rec){
rec.refs.push(top);
++top.count;
}
top=rec;
}
++top.count;
_9f[0].refs.push(top);
}
while(_9f.length){
top=_9f.pop();
_9e.push(top.cls);
--_a1;
while(_a5=top.refs,_a5.length==1){
top=_a5[0];
if(!top||--top.count){
top=0;
break;
}
_9e.push(top.cls);
--_a1;
}
if(top){
for(i=0,l=_a5.length;i<l;++i){
top=_a5[i];
if(!--top.count){
_9f.push(top);
}
}
}
}
if(_a1){
err("can't build consistent linearization",_9d);
}
_a2=_9c[0];
_9e[0]=_a2?_a2._meta&&_a2===_9e[_9e.length-_a2._meta.bases.length]?_a2._meta.bases.length:1:0;
return _9e;
};
function _a6(_a7,a,f){
var _a8,_a9,_aa,_ab,_ac,_ad,_ae,opf,pos,_af=this._inherited=this._inherited||{};
if(typeof _a7=="string"){
_a8=_a7;
_a7=a;
a=f;
}
f=0;
_ab=_a7.callee;
_a8=_a8||_ab.nom;
if(!_a8){
err("can't deduce a name to call inherited()",this.declaredClass);
}
_ac=this.constructor._meta;
_aa=_ac.bases;
pos=_af.p;
if(_a8!=_9a){
if(_af.c!==_ab){
pos=0;
_ad=_aa[0];
_ac=_ad._meta;
if(_ac.hidden[_a8]!==_ab){
_a9=_ac.chains;
if(_a9&&typeof _a9[_a8]=="string"){
err("calling chained method with inherited: "+_a8,this.declaredClass);
}
do{
_ac=_ad._meta;
_ae=_ad.prototype;
if(_ac&&(_ae[_a8]===_ab&&_ae.hasOwnProperty(_a8)||_ac.hidden[_a8]===_ab)){
break;
}
}while(_ad=_aa[++pos]);
pos=_ad?pos:-1;
}
}
_ad=_aa[++pos];
if(_ad){
_ae=_ad.prototype;
if(_ad._meta&&_ae.hasOwnProperty(_a8)){
f=_ae[_a8];
}else{
opf=op[_a8];
do{
_ae=_ad.prototype;
f=_ae[_a8];
if(f&&(_ad._meta?_ae.hasOwnProperty(_a8):f!==opf)){
break;
}
}while(_ad=_aa[++pos]);
}
}
f=_ad&&f||op[_a8];
}else{
if(_af.c!==_ab){
pos=0;
_ac=_aa[0]._meta;
if(_ac&&_ac.ctor!==_ab){
_a9=_ac.chains;
if(!_a9||_a9.constructor!=="manual"){
err("calling chained constructor with inherited",this.declaredClass);
}
while(_ad=_aa[++pos]){
_ac=_ad._meta;
if(_ac&&_ac.ctor===_ab){
break;
}
}
pos=_ad?pos:-1;
}
}
while(_ad=_aa[++pos]){
_ac=_ad._meta;
f=_ac?_ac.ctor:_ad;
if(f){
break;
}
}
f=_ad&&f;
}
_af.c=f;
_af.p=pos;
return f;
};
function _b0(_b1,a,f){
var f=_a6.call(this,_b1,a,f);
if(f){
return a===true?f:f.apply(this,a||_b1);
}
};
function _b2(_b3,_b4){
if(typeof _b3=="string"){
return this.inherited(_b3,_b4,true);
}
return this.inherited(_b3,true);
};
function _b5(cls){
var _b6=this.constructor._meta.bases;
for(var i=0,l=_b6.length;i<l;++i){
if(_b6[i]===cls){
return true;
}
}
return this instanceof cls;
};
function _b7(_b8,_b9){
var _ba,i=0,l=d._extraNames.length;
for(_ba in _b9){
if(_ba!=_9a&&_b9.hasOwnProperty(_ba)){
_b8[_ba]=_b9[_ba];
}
}
for(;i<l;++i){
_ba=d._extraNames[i];
if(_ba!=_9a&&_b9.hasOwnProperty(_ba)){
_b8[_ba]=_b9[_ba];
}
}
};
function _bb(_bc,_bd){
var _be,t,i=0,l=d._extraNames.length;
for(_be in _bd){
t=_bd[_be];
if((t!==op[_be]||!(_be in op))&&_be!=_9a){
if(_97.call(t)=="[object Function]"){
t.nom=_be;
}
_bc[_be]=t;
}
}
for(;i<l;++i){
_be=d._extraNames[i];
t=_bd[_be];
if((t!==op[_be]||!(_be in op))&&_be!=_9a){
if(_97.call(t)=="[object Function]"){
t.nom=_be;
}
_bc[_be]=t;
}
}
return _bc;
};
function _bf(_c0){
_bb(this.prototype,_c0);
return this;
};
function _c1(_c2,_c3){
return function(){
var a=arguments,_c4=a,a0=a[0],f,i,m,l=_c2.length,_c5;
if(!(this instanceof a.callee)){
return _c6(a);
}
if(_c3&&(a0&&a0.preamble||this.preamble)){
_c5=new Array(_c2.length);
_c5[0]=a;
for(i=0;;){
a0=a[0];
if(a0){
f=a0.preamble;
if(f){
a=f.apply(this,a)||a;
}
}
f=_c2[i].prototype;
f=f.hasOwnProperty("preamble")&&f.preamble;
if(f){
a=f.apply(this,a)||a;
}
if(++i==l){
break;
}
_c5[i]=a;
}
}
for(i=l-1;i>=0;--i){
f=_c2[i];
m=f._meta;
f=m?m.ctor:f;
if(f){
f.apply(this,_c5?_c5[i]:a);
}
}
f=this.postscript;
if(f){
f.apply(this,_c4);
}
};
};
function _c7(_c8,_c9){
return function(){
var a=arguments,t=a,a0=a[0],f;
if(!(this instanceof a.callee)){
return _c6(a);
}
if(_c9){
if(a0){
f=a0.preamble;
if(f){
t=f.apply(this,t)||t;
}
}
f=this.preamble;
if(f){
f.apply(this,t);
}
}
if(_c8){
_c8.apply(this,a);
}
f=this.postscript;
if(f){
f.apply(this,a);
}
};
};
function _ca(_cb){
return function(){
var a=arguments,i=0,f,m;
if(!(this instanceof a.callee)){
return _c6(a);
}
for(;f=_cb[i];++i){
m=f._meta;
f=m?m.ctor:f;
if(f){
f.apply(this,a);
break;
}
}
f=this.postscript;
if(f){
f.apply(this,a);
}
};
};
function _cc(_cd,_ce,_cf){
return function(){
var b,m,f,i=0,_d0=1;
if(_cf){
i=_ce.length-1;
_d0=-1;
}
for(;b=_ce[i];i+=_d0){
m=b._meta;
f=(m?m.hidden:b.prototype)[_cd];
if(f){
f.apply(this,arguments);
}
}
};
};
function _d1(_d2){
_98.prototype=_d2.prototype;
var t=new _98;
_98.prototype=null;
return t;
};
function _c6(_d3){
var _d4=_d3.callee,t=_d1(_d4);
_d4.apply(t,_d3);
return t;
};
d.declare=function(_d5,_d6,_d7){
if(typeof _d5!="string"){
_d7=_d6;
_d6=_d5;
_d5="";
}
_d7=_d7||{};
var _d8,i,t,_d9,_da,_db,_dc,_dd=1,_de=_d6;
if(_97.call(_d6)=="[object Array]"){
_db=_9b(_d6,_d5);
t=_db[0];
_dd=_db.length-t;
_d6=_db[_dd];
}else{
_db=[0];
if(_d6){
if(_97.call(_d6)=="[object Function]"){
t=_d6._meta;
_db=_db.concat(t?t.bases:_d6);
}else{
err("base class is not a callable constructor.",_d5);
}
}else{
if(_d6!==null){
err("unknown base class. Did you use dojo.require to pull it in?",_d5);
}
}
}
if(_d6){
for(i=_dd-1;;--i){
_d8=_d1(_d6);
if(!i){
break;
}
t=_db[i];
(t._meta?_b7:mix)(_d8,t.prototype);
_d9=new Function;
_d9.superclass=_d6;
_d9.prototype=_d8;
_d6=_d8.constructor=_d9;
}
}else{
_d8={};
}
_bb(_d8,_d7);
t=_d7.constructor;
if(t!==op.constructor){
t.nom=_9a;
_d8.constructor=t;
}
for(i=_dd-1;i;--i){
t=_db[i]._meta;
if(t&&t.chains){
_dc=mix(_dc||{},t.chains);
}
}
if(_d8["-chains-"]){
_dc=mix(_dc||{},_d8["-chains-"]);
}
t=!_dc||!_dc.hasOwnProperty(_9a);
_db[0]=_d9=(_dc&&_dc.constructor==="manual")?_ca(_db):(_db.length==1?_c7(_d7.constructor,t):_c1(_db,t));
_d9._meta={bases:_db,hidden:_d7,chains:_dc,parents:_de,ctor:_d7.constructor};
_d9.superclass=_d6&&_d6.prototype;
_d9.extend=_bf;
_d9.prototype=_d8;
_d8.constructor=_d9;
_d8.getInherited=_b2;
_d8.inherited=_b0;
_d8.isInstanceOf=_b5;
if(_d5){
_d8.declaredClass=_d5;
d.setObject(_d5,_d9);
}
if(_dc){
for(_da in _dc){
if(_d8[_da]&&typeof _dc[_da]=="string"&&_da!=_9a){
t=_d8[_da]=_cc(_da,_db,_dc[_da]==="after");
t.nom=_da;
}
}
}
return _d9;
};
d.safeMixin=_bb;
})();
}
if(!dojo._hasResource["dojo._base.connect"]){
dojo._hasResource["dojo._base.connect"]=true;
dojo.provide("dojo._base.connect");
dojo._listener={getDispatcher:function(){
return function(){
var ap=Array.prototype,c=arguments.callee,ls=c._listeners,t=c.target,r=t&&t.apply(this,arguments),i,lls=[].concat(ls);
for(i in lls){
if(!(i in ap)){
lls[i].apply(this,arguments);
}
}
return r;
};
},add:function(_df,_e0,_e1){
_df=_df||dojo.global;
var f=_df[_e0];
if(!f||!f._listeners){
var d=dojo._listener.getDispatcher();
d.target=f;
d._listeners=[];
f=_df[_e0]=d;
}
return f._listeners.push(_e1);
},remove:function(_e2,_e3,_e4){
var f=(_e2||dojo.global)[_e3];
if(f&&f._listeners&&_e4--){
delete f._listeners[_e4];
}
}};
dojo.connect=function(obj,_e5,_e6,_e7,_e8){
var a=arguments,_e9=[],i=0;
_e9.push(dojo.isString(a[0])?null:a[i++],a[i++]);
var a1=a[i+1];
_e9.push(dojo.isString(a1)||dojo.isFunction(a1)?a[i++]:null,a[i++]);
for(var l=a.length;i<l;i++){
_e9.push(a[i]);
}
return dojo._connect.apply(this,_e9);
};
dojo._connect=function(obj,_ea,_eb,_ec){
var l=dojo._listener,h=l.add(obj,_ea,dojo.hitch(_eb,_ec));
return [obj,_ea,h,l];
};
dojo.disconnect=function(_ed){
if(_ed&&_ed[0]!==undefined){
dojo._disconnect.apply(this,_ed);
delete _ed[0];
}
};
dojo._disconnect=function(obj,_ee,_ef,_f0){
_f0.remove(obj,_ee,_ef);
};
dojo._topics={};
dojo.subscribe=function(_f1,_f2,_f3){
return [_f1,dojo._listener.add(dojo._topics,_f1,dojo.hitch(_f2,_f3))];
};
dojo.unsubscribe=function(_f4){
if(_f4){
dojo._listener.remove(dojo._topics,_f4[0],_f4[1]);
}
};
dojo.publish=function(_f5,_f6){
var f=dojo._topics[_f5];
if(f){
f.apply(this,_f6||[]);
}
};
dojo.connectPublisher=function(_f7,obj,_f8){
var pf=function(){
dojo.publish(_f7,arguments);
};
return _f8?dojo.connect(obj,_f8,pf):dojo.connect(obj,pf);
};
}
if(!dojo._hasResource["dojo._base.Deferred"]){
dojo._hasResource["dojo._base.Deferred"]=true;
dojo.provide("dojo._base.Deferred");
(function(){
var _f9=function(){
};
var _fa=Object.freeze||function(){
};
dojo.Deferred=function(_fb){
var _fc,_fd,_fe,_ff,_100;
var _101=(this.promise={});
function _102(_103){
if(_fd){
throw new Error("This deferred has already been resolved");
}
_fc=_103;
_fd=true;
_104();
};
function _104(){
var _105;
while(!_105&&_100){
var _106=_100;
_100=_100.next;
if((_105=(_106.progress==_f9))){
_fd=false;
}
var func=(_fe?_106.error:_106.resolved);
if(func){
try{
var _107=func(_fc);
if(_107&&typeof _107.then==="function"){
_107.then(dojo.hitch(_106.deferred,"resolve"),dojo.hitch(_106.deferred,"reject"));
continue;
}
var _108=_105&&_107===undefined;
if(_105&&!_108){
_fe=_107 instanceof Error;
}
_106.deferred[_108&&_fe?"reject":"resolve"](_108?_fc:_107);
}
catch(e){
_106.deferred.reject(e);
}
}else{
if(_fe){
_106.deferred.reject(_fc);
}else{
_106.deferred.resolve(_fc);
}
}
}
};
this.resolve=this.callback=function(_109){
this.fired=0;
this.results=[_109,null];
_102(_109);
};
this.reject=this.errback=function(_10a){
_fe=true;
this.fired=1;
_102(_10a);
this.results=[null,_10a];
if(!_10a||_10a.log!==false){
(dojo.config.deferredOnError||function(x){
console.error(x);
})(_10a);
}
};
this.progress=function(_10b){
var _10c=_100;
while(_10c){
var _10d=_10c.progress;
_10d&&_10d(_10b);
_10c=_10c.next;
}
};
this.addCallbacks=function(_10e,_10f){
this.then(_10e,_10f,_f9);
return this;
};
this.then=_101.then=function(_110,_111,_112){
var _113=_112==_f9?this:new dojo.Deferred(_101.cancel);
var _114={resolved:_110,error:_111,progress:_112,deferred:_113};
if(_100){
_ff=_ff.next=_114;
}else{
_100=_ff=_114;
}
if(_fd){
_104();
}
return _113.promise;
};
var _115=this;
this.cancel=_101.cancel=function(){
if(!_fd){
var _116=_fb&&_fb(_115);
if(!_fd){
if(!(_116 instanceof Error)){
_116=new Error(_116);
}
_116.log=false;
_115.reject(_116);
}
}
};
_fa(_101);
};
dojo.extend(dojo.Deferred,{addCallback:function(_117){
return this.addCallbacks(dojo.hitch.apply(dojo,arguments));
},addErrback:function(_118){
return this.addCallbacks(null,dojo.hitch.apply(dojo,arguments));
},addBoth:function(_119){
var _11a=dojo.hitch.apply(dojo,arguments);
return this.addCallbacks(_11a,_11a);
},fired:-1});
})();
dojo.when=function(_11b,_11c,_11d,_11e){
if(_11b&&typeof _11b.then==="function"){
return _11b.then(_11c,_11d,_11e);
}
return _11c(_11b);
};
}
if(!dojo._hasResource["dojo._base.json"]){
dojo._hasResource["dojo._base.json"]=true;
dojo.provide("dojo._base.json");
dojo.fromJson=function(json){
return eval("("+json+")");
};
dojo._escapeString=function(str){
return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.toJsonIndentStr="\t";
dojo.toJson=function(it,_11f,_120){
if(it===undefined){
return "undefined";
}
var _121=typeof it;
if(_121=="number"||_121=="boolean"){
return it+"";
}
if(it===null){
return "null";
}
if(dojo.isString(it)){
return dojo._escapeString(it);
}
var _122=arguments.callee;
var _123;
_120=_120||"";
var _124=_11f?_120+dojo.toJsonIndentStr:"";
var tf=it.__json__||it.json;
if(dojo.isFunction(tf)){
_123=tf.call(it);
if(it!==_123){
return _122(_123,_11f,_124);
}
}
if(it.nodeType&&it.cloneNode){
throw new Error("Can't serialize DOM nodes");
}
var sep=_11f?" ":"";
var _125=_11f?"\n":"";
if(dojo.isArray(it)){
var res=dojo.map(it,function(obj){
var val=_122(obj,_11f,_124);
if(typeof val!="string"){
val="undefined";
}
return _125+_124+val;
});
return "["+res.join(","+sep)+_125+_120+"]";
}
if(_121=="function"){
return null;
}
var _126=[],key;
for(key in it){
var _127,val;
if(typeof key=="number"){
_127="\""+key+"\"";
}else{
if(typeof key=="string"){
_127=dojo._escapeString(key);
}else{
continue;
}
}
val=_122(it[key],_11f,_124);
if(typeof val!="string"){
continue;
}
_126.push(_125+_124+_127+":"+sep+val);
}
return "{"+_126.join(","+sep)+_125+_120+"}";
};
}
if(!dojo._hasResource["dojo._base.Color"]){
dojo._hasResource["dojo._base.Color"]=true;
dojo.provide("dojo._base.Color");
(function(){
var d=dojo;
dojo.Color=function(_128){
if(_128){
this.setColor(_128);
}
};
dojo.Color.named={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:d.config.transparentColor||[255,255,255]};
dojo.extend(dojo.Color,{r:255,g:255,b:255,a:1,_set:function(r,g,b,a){
var t=this;
t.r=r;
t.g=g;
t.b=b;
t.a=a;
},setColor:function(_129){
if(d.isString(_129)){
d.colorFromString(_129,this);
}else{
if(d.isArray(_129)){
d.colorFromArray(_129,this);
}else{
this._set(_129.r,_129.g,_129.b,_129.a);
if(!(_129 instanceof d.Color)){
this.sanitize();
}
}
}
return this;
},sanitize:function(){
return this;
},toRgb:function(){
var t=this;
return [t.r,t.g,t.b];
},toRgba:function(){
var t=this;
return [t.r,t.g,t.b,t.a];
},toHex:function(){
var arr=d.map(["r","g","b"],function(x){
var s=this[x].toString(16);
return s.length<2?"0"+s:s;
},this);
return "#"+arr.join("");
},toCss:function(_12a){
var t=this,rgb=t.r+", "+t.g+", "+t.b;
return (_12a?"rgba("+rgb+", "+t.a:"rgb("+rgb)+")";
},toString:function(){
return this.toCss(true);
}});
dojo.blendColors=function(_12b,end,_12c,obj){
var t=obj||new d.Color();
d.forEach(["r","g","b","a"],function(x){
t[x]=_12b[x]+(end[x]-_12b[x])*_12c;
if(x!="a"){
t[x]=Math.round(t[x]);
}
});
return t.sanitize();
};
dojo.colorFromRgb=function(_12d,obj){
var m=_12d.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
return m&&dojo.colorFromArray(m[1].split(/\s*,\s*/),obj);
};
dojo.colorFromHex=function(_12e,obj){
var t=obj||new d.Color(),bits=(_12e.length==4)?4:8,mask=(1<<bits)-1;
_12e=Number("0x"+_12e.substr(1));
if(isNaN(_12e)){
return null;
}
d.forEach(["b","g","r"],function(x){
var c=_12e&mask;
_12e>>=bits;
t[x]=bits==4?17*c:c;
});
t.a=1;
return t;
};
dojo.colorFromArray=function(a,obj){
var t=obj||new d.Color();
t._set(Number(a[0]),Number(a[1]),Number(a[2]),Number(a[3]));
if(isNaN(t.a)){
t.a=1;
}
return t.sanitize();
};
dojo.colorFromString=function(str,obj){
var a=d.Color.named[str];
return a&&d.colorFromArray(a,obj)||d.colorFromRgb(str,obj)||d.colorFromHex(str,obj);
};
})();
}
if(!dojo._hasResource["dojo._base.window"]){
dojo._hasResource["dojo._base.window"]=true;
dojo.provide("dojo._base.window");
dojo.doc=window["document"]||null;
dojo.body=function(){
return dojo.doc.body||dojo.doc.getElementsByTagName("body")[0];
};
dojo.setContext=function(_12f,_130){
dojo.global=_12f;
dojo.doc=_130;
};
dojo.withGlobal=function(_131,_132,_133,_134){
var _135=dojo.global;
try{
dojo.global=_131;
return dojo.withDoc.call(null,_131.document,_132,_133,_134);
}
finally{
dojo.global=_135;
}
};
dojo.withDoc=function(_136,_137,_138,_139){
var _13a=dojo.doc,_13b=dojo._bodyLtr,oldQ=dojo.isQuirks;
try{
dojo.doc=_136;
delete dojo._bodyLtr;
dojo.isQuirks=dojo.doc.compatMode=="BackCompat";
if(_138&&typeof _137=="string"){
_137=_138[_137];
}
return _137.apply(_138,_139||[]);
}
finally{
dojo.doc=_13a;
delete dojo._bodyLtr;
if(_13b!==undefined){
dojo._bodyLtr=_13b;
}
dojo.isQuirks=oldQ;
}
};
}
if(!dojo._hasResource["dojo._base.event"]){
dojo._hasResource["dojo._base.event"]=true;
dojo.provide("dojo._base.event");
(function(){
var del=(dojo._event_listener={add:function(node,name,fp){
if(!node){
return;
}
name=del._normalizeEventName(name);
fp=del._fixCallback(name,fp);
if(!dojo.isIE&&(name=="mouseenter"||name=="mouseleave")){
var ofp=fp;
name=(name=="mouseenter")?"mouseover":"mouseout";
fp=function(e){
if(!dojo.isDescendant(e.relatedTarget,node)){
return ofp.call(this,e);
}
};
}
node.addEventListener(name,fp,false);
return fp;
},remove:function(node,_13c,_13d){
if(node){
_13c=del._normalizeEventName(_13c);
if(!dojo.isIE&&(_13c=="mouseenter"||_13c=="mouseleave")){
_13c=(_13c=="mouseenter")?"mouseover":"mouseout";
}
node.removeEventListener(_13c,_13d,false);
}
},_normalizeEventName:function(name){
return name.slice(0,2)=="on"?name.slice(2):name;
},_fixCallback:function(name,fp){
return name!="keypress"?fp:function(e){
return fp.call(this,del._fixEvent(e,this));
};
},_fixEvent:function(evt,_13e){
switch(evt.type){
case "keypress":
del._setKeyChar(evt);
break;
}
return evt;
},_setKeyChar:function(evt){
evt.keyChar=evt.charCode>=32?String.fromCharCode(evt.charCode):"";
evt.charOrCode=evt.keyChar||evt.keyCode;
},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39}});
dojo.fixEvent=function(evt,_13f){
return del._fixEvent(evt,_13f);
};
dojo.stopEvent=function(evt){
evt.preventDefault();
evt.stopPropagation();
};
var _140=dojo._listener;
dojo._connect=function(obj,_141,_142,_143,_144){
var _145=obj&&(obj.nodeType||obj.attachEvent||obj.addEventListener);
var lid=_145?(_144?2:1):0,l=[dojo._listener,del,_140][lid];
var h=l.add(obj,_141,dojo.hitch(_142,_143));
return [obj,_141,h,lid];
};
dojo._disconnect=function(obj,_146,_147,_148){
([dojo._listener,del,_140][_148]).remove(obj,_146,_147);
};
dojo.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,META:dojo.isSafari?91:224,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145,copyKey:dojo.isMac&&!dojo.isAIR?(dojo.isSafari?91:224):17};
var _149=dojo.isMac?"metaKey":"ctrlKey";
dojo.isCopyKey=function(e){
return e[_149];
};
if(dojo.isIE<9||(dojo.isIE&&dojo.isQuirks)){
dojo.mouseButtons={LEFT:1,MIDDLE:4,RIGHT:2,isButton:function(e,_14a){
return e.button&_14a;
},isLeft:function(e){
return e.button&1;
},isMiddle:function(e){
return e.button&4;
},isRight:function(e){
return e.button&2;
}};
}else{
dojo.mouseButtons={LEFT:0,MIDDLE:1,RIGHT:2,isButton:function(e,_14b){
return e.button==_14b;
},isLeft:function(e){
return e.button==0;
},isMiddle:function(e){
return e.button==1;
},isRight:function(e){
return e.button==2;
}};
}
if(dojo.isIE){
var _14c=function(e,code){
try{
return (e.keyCode=code);
}
catch(e){
return 0;
}
};
var iel=dojo._listener;
var _14d=(dojo._ieListenersName="_"+dojo._scopeName+"_listeners");
if(!dojo.config._allow_leaks){
_140=iel=dojo._ie_listener={handlers:[],add:function(_14e,_14f,_150){
_14e=_14e||dojo.global;
var f=_14e[_14f];
if(!f||!f[_14d]){
var d=dojo._getIeDispatcher();
d.target=f&&(ieh.push(f)-1);
d[_14d]=[];
f=_14e[_14f]=d;
}
return f[_14d].push(ieh.push(_150)-1);
},remove:function(_151,_152,_153){
var f=(_151||dojo.global)[_152],l=f&&f[_14d];
if(f&&l&&_153--){
delete ieh[l[_153]];
delete l[_153];
}
}};
var ieh=iel.handlers;
}
dojo.mixin(del,{add:function(node,_154,fp){
if(!node){
return;
}
_154=del._normalizeEventName(_154);
if(_154=="onkeypress"){
var kd=node.onkeydown;
if(!kd||!kd[_14d]||!kd._stealthKeydownHandle){
var h=del.add(node,"onkeydown",del._stealthKeyDown);
kd=node.onkeydown;
kd._stealthKeydownHandle=h;
kd._stealthKeydownRefs=1;
}else{
kd._stealthKeydownRefs++;
}
}
return iel.add(node,_154,del._fixCallback(fp));
},remove:function(node,_155,_156){
_155=del._normalizeEventName(_155);
iel.remove(node,_155,_156);
if(_155=="onkeypress"){
var kd=node.onkeydown;
if(--kd._stealthKeydownRefs<=0){
iel.remove(node,"onkeydown",kd._stealthKeydownHandle);
delete kd._stealthKeydownHandle;
}
}
},_normalizeEventName:function(_157){
return _157.slice(0,2)!="on"?"on"+_157:_157;
},_nop:function(){
},_fixEvent:function(evt,_158){
if(!evt){
var w=_158&&(_158.ownerDocument||_158.document||_158).parentWindow||window;
evt=w.event;
}
if(!evt){
return (evt);
}
evt.target=evt.srcElement;
evt.currentTarget=(_158||evt.srcElement);
evt.layerX=evt.offsetX;
evt.layerY=evt.offsetY;
var se=evt.srcElement,doc=(se&&se.ownerDocument)||document;
var _159=((dojo.isIE<6)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;
var _15a=dojo._getIeDocumentElementOffset();
evt.pageX=evt.clientX+dojo._fixIeBiDiScrollLeft(_159.scrollLeft||0)-_15a.x;
evt.pageY=evt.clientY+(_159.scrollTop||0)-_15a.y;
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
if(dojo.isIE<9||dojo.isQuirks){
evt.stopPropagation=del._stopPropagation;
evt.preventDefault=del._preventDefault;
}
return del._fixKeys(evt);
},_fixKeys:function(evt){
switch(evt.type){
case "keypress":
var c=("charCode" in evt?evt.charCode:evt.keyCode);
if(c==10){
c=0;
evt.keyCode=13;
}else{
if(c==13||c==27){
c=0;
}else{
if(c==3){
c=99;
}
}
}
evt.charCode=c;
del._setKeyChar(evt);
break;
}
return evt;
},_stealthKeyDown:function(evt){
var kp=evt.currentTarget.onkeypress;
if(!kp||!kp[_14d]){
return;
}
var k=evt.keyCode;
var _15b=(k!=13||(dojo.isIE>=9&&!dojo.isQuirks))&&k!=32&&k!=27&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);
if(_15b||evt.ctrlKey){
var c=_15b?0:k;
if(evt.ctrlKey){
if(k==3||k==13){
return;
}else{
if(c>95&&c<106){
c-=48;
}else{
if((!evt.shiftKey)&&(c>=65&&c<=90)){
c+=32;
}else{
c=del._punctMap[c]||c;
}
}
}
}
var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});
kp.call(evt.currentTarget,faux);
if(dojo.isIE<9||(dojo.isIE&&dojo.isQuirks)){
evt.cancelBubble=faux.cancelBubble;
}
evt.returnValue=faux.returnValue;
_14c(evt,faux.keyCode);
}
},_stopPropagation:function(){
this.cancelBubble=true;
},_preventDefault:function(){
this.bubbledKeyCode=this.keyCode;
if(this.ctrlKey){
_14c(this,0);
}
this.returnValue=false;
}});
dojo.stopEvent=(dojo.isIE||dojo.isQuirks)?function(evt){
evt=evt||window.event;
if(dojo.isIE==9&&evt.preventDefault){
evt.preventDefault();
evt.stopPropagation();
}else{
del._stopPropagation.call(evt);
del._preventDefault.call(evt);
}
}:dojo.stopEvent;
}
del._synthesizeEvent=function(evt,_15c){
var faux=dojo.mixin({},evt,_15c);
del._setKeyChar(faux);
faux.preventDefault=function(){
evt.preventDefault();
};
faux.stopPropagation=function(){
evt.stopPropagation();
};
return faux;
};
if(dojo.isOpera){
dojo.mixin(del,{_fixEvent:function(evt,_15d){
switch(evt.type){
case "keypress":
var c=evt.which;
if(c==3){
c=99;
}
c=c<41&&!evt.shiftKey?0:c;
if(evt.ctrlKey&&!evt.shiftKey&&c>=65&&c<=90){
c+=32;
}
return del._synthesizeEvent(evt,{charCode:c});
}
return evt;
}});
}
if(dojo.isWebKit){
del._add=del.add;
del._remove=del.remove;
dojo.mixin(del,{add:function(node,_15e,fp){
if(!node){
return;
}
var _15f=del._add(node,_15e,fp);
if(del._normalizeEventName(_15e)=="keypress"){
_15f._stealthKeyDownHandle=del._add(node,"keydown",function(evt){
var k=evt.keyCode;
var _160=k!=13&&k!=32&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);
if(_160||evt.ctrlKey){
var c=_160?0:k;
if(evt.ctrlKey){
if(k==3||k==13){
return;
}else{
if(c>95&&c<106){
c-=48;
}else{
if(!evt.shiftKey&&c>=65&&c<=90){
c+=32;
}else{
c=del._punctMap[c]||c;
}
}
}
}
var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});
fp.call(evt.currentTarget,faux);
}
});
}
return _15f;
},remove:function(node,_161,_162){
if(node){
if(_162._stealthKeyDownHandle){
del._remove(node,"keydown",_162._stealthKeyDownHandle);
}
del._remove(node,_161,_162);
}
},_fixEvent:function(evt,_163){
switch(evt.type){
case "keypress":
if(evt.faux){
return evt;
}
var c=evt.charCode;
c=c>=32?c:0;
return del._synthesizeEvent(evt,{charCode:c,faux:true});
}
return evt;
}});
}
})();
if(dojo.isIE){
dojo._ieDispatcher=function(args,_164){
var ap=Array.prototype,h=dojo._ie_listener.handlers,c=args.callee,ls=c[dojo._ieListenersName],t=h[c.target];
var r=t&&t.apply(_164,args);
var lls=[].concat(ls);
for(var i in lls){
var f=h[lls[i]];
if(!(i in ap)&&f){
f.apply(_164,args);
}
}
return r;
};
dojo._getIeDispatcher=function(){
return new Function(dojo._scopeName+"._ieDispatcher(arguments, this)");
};
dojo._event_listener._fixCallback=function(fp){
var f=dojo._event_listener._fixEvent;
return function(e){
return fp.call(this,f(e,this));
};
};
}
}
if(!dojo._hasResource["dojo._base.html"]){
dojo._hasResource["dojo._base.html"]=true;
dojo.provide("dojo._base.html");
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
if(dojo.isIE){
dojo.byId=function(id,doc){
if(typeof id!="string"){
return id;
}
var _165=doc||dojo.doc,te=_165.getElementById(id);
if(te&&(te.attributes.id.value==id||te.id==id)){
return te;
}else{
var eles=_165.all[id];
if(!eles||eles.nodeName){
eles=[eles];
}
var i=0;
while((te=eles[i++])){
if((te.attributes&&te.attributes.id&&te.attributes.id.value==id)||te.id==id){
return te;
}
}
}
};
}else{
dojo.byId=function(id,doc){
return ((typeof id=="string")?(doc||dojo.doc).getElementById(id):id)||null;
};
}
(function(){
var d=dojo;
var byId=d.byId;
var _166=null,_167;
d.addOnWindowUnload(function(){
_166=null;
});
dojo._destroyElement=dojo.destroy=function(node){
node=byId(node);
if(!node){
return;
}
try{
var doc=node.ownerDocument;
if(!_166||_167!=doc){
_166=doc.createElement("div");
_167=doc;
}
_166.appendChild(node.parentNode?node.parentNode.removeChild(node):node);
_166.innerHTML="";
}
catch(e){
}
};
dojo.isDescendant=function(node,_168){
try{
node=byId(node);
_168=byId(_168);
while(node){
if(node==_168){
return true;
}
node=node.parentNode;
}
}
catch(e){
}
return false;
};
dojo.setSelectable=function(node,_169){
node=byId(node);
if(d.isMozilla){
node.style.MozUserSelect=_169?"":"none";
}else{
if(d.isKhtml||d.isWebKit){
node.style.KhtmlUserSelect=_169?"auto":"none";
}else{
if(d.isIE){
var v=(node.unselectable=_169?"":"on");
d.query("*",node).forEach("item.unselectable = '"+v+"'");
}
}
}
};
var _16a=function(node,ref){
var _16b=ref.parentNode;
if(_16b){
_16b.insertBefore(node,ref);
}
};
var _16c=function(node,ref){
var _16d=ref.parentNode;
if(_16d){
if(_16d.lastChild==ref){
_16d.appendChild(node);
}else{
_16d.insertBefore(node,ref.nextSibling);
}
}
};
dojo.place=function(node,_16e,_16f){
_16e=byId(_16e);
if(typeof node=="string"){
node=/^\s*</.test(node)?d._toDom(node,_16e.ownerDocument):byId(node);
}
if(typeof _16f=="number"){
var cn=_16e.childNodes;
if(!cn.length||cn.length<=_16f){
_16e.appendChild(node);
}else{
_16a(node,cn[_16f<0?0:_16f]);
}
}else{
switch(_16f){
case "before":
_16a(node,_16e);
break;
case "after":
_16c(node,_16e);
break;
case "replace":
_16e.parentNode.replaceChild(node,_16e);
break;
case "only":
d.empty(_16e);
_16e.appendChild(node);
break;
case "first":
if(_16e.firstChild){
_16a(node,_16e.firstChild);
break;
}
default:
_16e.appendChild(node);
}
}
return node;
};
dojo.boxModel="content-box";
if(d.isIE){
d.boxModel=document.compatMode=="BackCompat"?"border-box":"content-box";
}
var gcs;
if(d.isWebKit){
gcs=function(node){
var s;
if(node.nodeType==1){
var dv=node.ownerDocument.defaultView;
s=dv.getComputedStyle(node,null);
if(!s&&node.style){
node.style.display="";
s=dv.getComputedStyle(node,null);
}
}
return s||{};
};
}else{
if(d.isIE){
gcs=function(node){
return node&&node.nodeType==1?node.currentStyle:{};
};
}else{
gcs=function(node){
return node.nodeType==1?(node.ownerDocument.defaultView.getComputedStyle(node,null)||{}):{};
};
}
}
dojo.getComputedStyle=gcs;
if(!d.isIE){
d._toPixelValue=function(_170,_171){
return parseFloat(_171)||0;
};
}else{
d._toPixelValue=function(_172,_173){
if(!_173){
return 0;
}
if(_173=="medium"){
return 4;
}
if(_173.slice&&_173.slice(-2)=="px"){
return parseFloat(_173);
}
with(_172){
var _174=style.left;
var _175=runtimeStyle.left;
runtimeStyle.left=currentStyle.left;
try{
style.left=_173;
_173=style.pixelLeft;
}
catch(e){
_173=0;
}
style.left=_174;
runtimeStyle.left=_175;
}
return _173;
};
}
var px=d._toPixelValue;
var astr="DXImageTransform.Microsoft.Alpha";
var af=function(n,f){
try{
return n.filters.item(astr);
}
catch(e){
return f?{}:null;
}
};
dojo._getOpacity=d.isIE<9?function(node){
try{
return af(node).Opacity/100;
}
catch(e){
return 1;
}
}:function(node){
return gcs(node).opacity;
};
dojo._setOpacity=d.isIE<9?function(node,_176){
var ov=_176*100,_177=_176==1;
node.style.zoom=_177?"":1;
if(!af(node)){
if(_177){
return _176;
}
node.style.filter+=" progid:"+astr+"(Opacity="+ov+")";
}else{
af(node,1).Opacity=ov;
}
af(node,1).Enabled=!_177;
if(node.nodeName.toLowerCase()=="tr"){
d.query("> td",node).forEach(function(i){
d._setOpacity(i,_176);
});
}
return _176;
}:function(node,_178){
return node.style.opacity=_178;
};
var _179={left:true,top:true};
var _17a=/margin|padding|width|height|max|min|offset/;
var _17b=function(node,type,_17c){
type=type.toLowerCase();
if(d.isIE){
if(_17c=="auto"){
if(type=="height"){
return node.offsetHeight;
}
if(type=="width"){
return node.offsetWidth;
}
}
if(type=="fontweight"){
switch(_17c){
case 700:
return "bold";
case 400:
default:
return "normal";
}
}
}
if(!(type in _179)){
_179[type]=_17a.test(type);
}
return _179[type]?px(node,_17c):_17c;
};
var _17d=d.isIE?"styleFloat":"cssFloat",_17e={"cssFloat":_17d,"styleFloat":_17d,"float":_17d};
dojo.style=function(node,_17f,_180){
var n=byId(node),args=arguments.length,op=(_17f=="opacity");
_17f=_17e[_17f]||_17f;
if(args==3){
return op?d._setOpacity(n,_180):n.style[_17f]=_180;
}
if(args==2&&op){
return d._getOpacity(n);
}
var s=gcs(n);
if(args==2&&typeof _17f!="string"){
for(var x in _17f){
d.style(node,x,_17f[x]);
}
return s;
}
return (args==1)?s:_17b(n,_17f,s[_17f]||n.style[_17f]);
};
dojo._getPadExtents=function(n,_181){
var s=_181||gcs(n),l=px(n,s.paddingLeft),t=px(n,s.paddingTop);
return {l:l,t:t,w:l+px(n,s.paddingRight),h:t+px(n,s.paddingBottom)};
};
dojo._getBorderExtents=function(n,_182){
var ne="none",s=_182||gcs(n),bl=(s.borderLeftStyle!=ne?px(n,s.borderLeftWidth):0),bt=(s.borderTopStyle!=ne?px(n,s.borderTopWidth):0);
return {l:bl,t:bt,w:bl+(s.borderRightStyle!=ne?px(n,s.borderRightWidth):0),h:bt+(s.borderBottomStyle!=ne?px(n,s.borderBottomWidth):0)};
};
dojo._getPadBorderExtents=function(n,_183){
var s=_183||gcs(n),p=d._getPadExtents(n,s),b=d._getBorderExtents(n,s);
return {l:p.l+b.l,t:p.t+b.t,w:p.w+b.w,h:p.h+b.h};
};
dojo._getMarginExtents=function(n,_184){
var s=_184||gcs(n),l=px(n,s.marginLeft),t=px(n,s.marginTop),r=px(n,s.marginRight),b=px(n,s.marginBottom);
if(d.isWebKit&&(s.position!="absolute")){
r=l;
}
return {l:l,t:t,w:l+r,h:t+b};
};
dojo._getMarginBox=function(node,_185){
var s=_185||gcs(node),me=d._getMarginExtents(node,s);
var l=node.offsetLeft-me.l,t=node.offsetTop-me.t,p=node.parentNode;
if(d.isMoz){
var sl=parseFloat(s.left),st=parseFloat(s.top);
if(!isNaN(sl)&&!isNaN(st)){
l=sl,t=st;
}else{
if(p&&p.style){
var pcs=gcs(p);
if(pcs.overflow!="visible"){
var be=d._getBorderExtents(p,pcs);
l+=be.l,t+=be.t;
}
}
}
}else{
if(d.isOpera||(d.isIE>7&&!d.isQuirks)){
if(p){
be=d._getBorderExtents(p);
l-=be.l;
t-=be.t;
}
}
}
return {l:l,t:t,w:node.offsetWidth+me.w,h:node.offsetHeight+me.h};
};
dojo._getMarginSize=function(node,_186){
node=byId(node);
var me=d._getMarginExtents(node,_186||gcs(node));
var size=node.getBoundingClientRect();
return {w:(size.right-size.left)+me.w,h:(size.bottom-size.top)+me.h};
};
dojo._getContentBox=function(node,_187){
var s=_187||gcs(node),pe=d._getPadExtents(node,s),be=d._getBorderExtents(node,s),w=node.clientWidth,h;
if(!w){
w=node.offsetWidth,h=node.offsetHeight;
}else{
h=node.clientHeight,be.w=be.h=0;
}
if(d.isOpera){
pe.l+=be.l;
pe.t+=be.t;
}
return {l:pe.l,t:pe.t,w:w-pe.w-be.w,h:h-pe.h-be.h};
};
dojo._getBorderBox=function(node,_188){
var s=_188||gcs(node),pe=d._getPadExtents(node,s),cb=d._getContentBox(node,s);
return {l:cb.l-pe.l,t:cb.t-pe.t,w:cb.w+pe.w,h:cb.h+pe.h};
};
dojo._setBox=function(node,l,t,w,h,u){
u=u||"px";
var s=node.style;
if(!isNaN(l)){
s.left=l+u;
}
if(!isNaN(t)){
s.top=t+u;
}
if(w>=0){
s.width=w+u;
}
if(h>=0){
s.height=h+u;
}
};
dojo._isButtonTag=function(node){
return node.tagName=="BUTTON"||node.tagName=="INPUT"&&(node.getAttribute("type")||"").toUpperCase()=="BUTTON";
};
dojo._usesBorderBox=function(node){
var n=node.tagName;
return d.boxModel=="border-box"||n=="TABLE"||d._isButtonTag(node);
};
dojo._setContentSize=function(node,_189,_18a,_18b){
if(d._usesBorderBox(node)){
var pb=d._getPadBorderExtents(node,_18b);
if(_189>=0){
_189+=pb.w;
}
if(_18a>=0){
_18a+=pb.h;
}
}
d._setBox(node,NaN,NaN,_189,_18a);
};
dojo._setMarginBox=function(node,_18c,_18d,_18e,_18f,_190){
var s=_190||gcs(node),bb=d._usesBorderBox(node),pb=bb?_191:d._getPadBorderExtents(node,s);
if(d.isWebKit){
if(d._isButtonTag(node)){
var ns=node.style;
if(_18e>=0&&!ns.width){
ns.width="4px";
}
if(_18f>=0&&!ns.height){
ns.height="4px";
}
}
}
var mb=d._getMarginExtents(node,s);
if(_18e>=0){
_18e=Math.max(_18e-pb.w-mb.w,0);
}
if(_18f>=0){
_18f=Math.max(_18f-pb.h-mb.h,0);
}
d._setBox(node,_18c,_18d,_18e,_18f);
};
var _191={l:0,t:0,w:0,h:0};
dojo.marginBox=function(node,box){
var n=byId(node),s=gcs(n),b=box;
return !b?d._getMarginBox(n,s):d._setMarginBox(n,b.l,b.t,b.w,b.h,s);
};
dojo.contentBox=function(node,box){
var n=byId(node),s=gcs(n),b=box;
return !b?d._getContentBox(n,s):d._setContentSize(n,b.w,b.h,s);
};
var _192=function(node,prop){
if(!(node=(node||0).parentNode)){
return 0;
}
var val,_193=0,_194=d.body();
while(node&&node.style){
if(gcs(node).position=="fixed"){
return 0;
}
val=node[prop];
if(val){
_193+=val-0;
if(node==_194){
break;
}
}
node=node.parentNode;
}
return _193;
};
dojo._docScroll=function(){
var n=d.global;
return "pageXOffset" in n?{x:n.pageXOffset,y:n.pageYOffset}:(n=d.isQuirks?d.doc.body:d.doc.documentElement,{x:d._fixIeBiDiScrollLeft(n.scrollLeft||0),y:n.scrollTop||0});
};
dojo._isBodyLtr=function(){
return "_bodyLtr" in d?d._bodyLtr:d._bodyLtr=(d.body().dir||d.doc.documentElement.dir||"ltr").toLowerCase()=="ltr";
};
dojo._getIeDocumentElementOffset=function(){
var de=d.doc.documentElement;
if(d.isIE<8){
var r=de.getBoundingClientRect();
var l=r.left,t=r.top;
if(d.isIE<7){
l+=de.clientLeft;
t+=de.clientTop;
}
return {x:l<0?0:l,y:t<0?0:t};
}else{
return {x:0,y:0};
}
};
dojo._fixIeBiDiScrollLeft=function(_195){
var ie=d.isIE;
if(ie&&!d._isBodyLtr()){
var qk=d.isQuirks,de=qk?d.doc.body:d.doc.documentElement;
if(ie==6&&!qk&&d.global.frameElement&&de.scrollHeight>de.clientHeight){
_195+=de.clientLeft;
}
return (ie<8||qk)?(_195+de.clientWidth-de.scrollWidth):-_195;
}
return _195;
};
dojo._abs=dojo.position=function(node,_196){
node=byId(node);
var db=d.body(),dh=db.parentNode,ret=node.getBoundingClientRect();
ret={x:ret.left,y:ret.top,w:ret.right-ret.left,h:ret.bottom-ret.top};
if(d.isIE){
var _197=d._getIeDocumentElementOffset();
ret.x-=_197.x+(d.isQuirks?db.clientLeft+db.offsetLeft:0);
ret.y-=_197.y+(d.isQuirks?db.clientTop+db.offsetTop:0);
}else{
if(d.isFF==3){
var cs=gcs(dh);
ret.x-=px(dh,cs.marginLeft)+px(dh,cs.borderLeftWidth);
ret.y-=px(dh,cs.marginTop)+px(dh,cs.borderTopWidth);
}
}
if(_196){
var _198=d._docScroll();
ret.x+=_198.x;
ret.y+=_198.y;
}
return ret;
};
dojo.coords=function(node,_199){
var n=byId(node),s=gcs(n),mb=d._getMarginBox(n,s);
var abs=d.position(n,_199);
mb.x=abs.x;
mb.y=abs.y;
return mb;
};
var _19a={"class":"className","for":"htmlFor",tabindex:"tabIndex",readonly:"readOnly",colspan:"colSpan",frameborder:"frameBorder",rowspan:"rowSpan",valuetype:"valueType"},_19b={classname:"class",htmlfor:"for",tabindex:"tabIndex",readonly:"readOnly"},_19c={innerHTML:1,className:1,htmlFor:d.isIE,value:1};
var _19d=function(name){
return _19b[name.toLowerCase()]||name;
};
var _19e=function(node,name){
var attr=node.getAttributeNode&&node.getAttributeNode(name);
return attr&&attr.specified;
};
dojo.hasAttr=function(node,name){
var lc=name.toLowerCase();
return _19c[_19a[lc]||name]||_19e(byId(node),_19b[lc]||name);
};
var _19f={},_1a0=0,_1a1=dojo._scopeName+"attrid",_1a2={col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1};
dojo.attr=function(node,name,_1a3){
node=byId(node);
var args=arguments.length,prop;
if(args==2&&typeof name!="string"){
for(var x in name){
d.attr(node,x,name[x]);
}
return node;
}
var lc=name.toLowerCase(),_1a4=_19a[lc]||name,_1a5=_19c[_1a4],_1a6=_19b[lc]||name;
if(args==3){
do{
if(_1a4=="style"&&typeof _1a3!="string"){
d.style(node,_1a3);
break;
}
if(_1a4=="innerHTML"){
if(d.isIE&&node.tagName.toLowerCase() in _1a2){
d.empty(node);
node.appendChild(d._toDom(_1a3,node.ownerDocument));
}else{
node[_1a4]=_1a3;
}
break;
}
if(d.isFunction(_1a3)){
var _1a7=d.attr(node,_1a1);
if(!_1a7){
_1a7=_1a0++;
d.attr(node,_1a1,_1a7);
}
if(!_19f[_1a7]){
_19f[_1a7]={};
}
var h=_19f[_1a7][_1a4];
if(h){
d.disconnect(h);
}else{
try{
delete node[_1a4];
}
catch(e){
}
}
_19f[_1a7][_1a4]=d.connect(node,_1a4,_1a3);
break;
}
if(_1a5||typeof _1a3=="boolean"){
node[_1a4]=_1a3;
break;
}
node.setAttribute(_1a6,_1a3);
}while(false);
return node;
}
_1a3=node[_1a4];
if(_1a5&&typeof _1a3!="undefined"){
return _1a3;
}
if(_1a4!="href"&&(typeof _1a3=="boolean"||d.isFunction(_1a3))){
return _1a3;
}
return _19e(node,_1a6)?node.getAttribute(_1a6):null;
};
dojo.removeAttr=function(node,name){
byId(node).removeAttribute(_19d(name));
};
dojo.getNodeProp=function(node,name){
node=byId(node);
var lc=name.toLowerCase(),_1a8=_19a[lc]||name;
if((_1a8 in node)&&_1a8!="href"){
return node[_1a8];
}
var _1a9=_19b[lc]||name;
return _19e(node,_1a9)?node.getAttribute(_1a9):null;
};
dojo.create=function(tag,_1aa,_1ab,pos){
var doc=d.doc;
if(_1ab){
_1ab=byId(_1ab);
doc=_1ab.ownerDocument;
}
if(typeof tag=="string"){
tag=doc.createElement(tag);
}
if(_1aa){
d.attr(tag,_1aa);
}
if(_1ab){
d.place(tag,_1ab,pos);
}
return tag;
};
d.empty=d.isIE?function(node){
node=byId(node);
for(var c;c=node.lastChild;){
d.destroy(c);
}
}:function(node){
byId(node).innerHTML="";
};
var _1ac={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},_1ad=/<\s*([\w\:]+)/,_1ae={},_1af=0,_1b0="__"+d._scopeName+"ToDomId";
for(var _1b1 in _1ac){
if(_1ac.hasOwnProperty(_1b1)){
var tw=_1ac[_1b1];
tw.pre=_1b1=="option"?"<select multiple=\"multiple\">":"<"+tw.join("><")+">";
tw.post="</"+tw.reverse().join("></")+">";
}
}
d._toDom=function(frag,doc){
doc=doc||d.doc;
var _1b2=doc[_1b0];
if(!_1b2){
doc[_1b0]=_1b2=++_1af+"";
_1ae[_1b2]=doc.createElement("div");
}
frag+="";
var _1b3=frag.match(_1ad),tag=_1b3?_1b3[1].toLowerCase():"",_1b4=_1ae[_1b2],wrap,i,fc,df;
if(_1b3&&_1ac[tag]){
wrap=_1ac[tag];
_1b4.innerHTML=wrap.pre+frag+wrap.post;
for(i=wrap.length;i;--i){
_1b4=_1b4.firstChild;
}
}else{
_1b4.innerHTML=frag;
}
if(_1b4.childNodes.length==1){
return _1b4.removeChild(_1b4.firstChild);
}
df=doc.createDocumentFragment();
while(fc=_1b4.firstChild){
df.appendChild(fc);
}
return df;
};
var _1b5="className";
dojo.hasClass=function(node,_1b6){
return ((" "+byId(node)[_1b5]+" ").indexOf(" "+_1b6+" ")>=0);
};
var _1b7=/\s+/,a1=[""],_1b8={},_1b9=function(s){
if(typeof s=="string"||s instanceof String){
if(s.indexOf(" ")<0){
a1[0]=s;
return a1;
}else{
return s.split(_1b7);
}
}
return s||"";
};
dojo.addClass=function(node,_1ba){
node=byId(node);
_1ba=_1b9(_1ba);
var cls=node[_1b5],_1bb;
cls=cls?" "+cls+" ":" ";
_1bb=cls.length;
for(var i=0,len=_1ba.length,c;i<len;++i){
c=_1ba[i];
if(c&&cls.indexOf(" "+c+" ")<0){
cls+=c+" ";
}
}
if(_1bb<cls.length){
node[_1b5]=cls.substr(1,cls.length-2);
}
};
dojo.removeClass=function(node,_1bc){
node=byId(node);
var cls;
if(_1bc!==undefined){
_1bc=_1b9(_1bc);
cls=" "+node[_1b5]+" ";
for(var i=0,len=_1bc.length;i<len;++i){
cls=cls.replace(" "+_1bc[i]+" "," ");
}
cls=d.trim(cls);
}else{
cls="";
}
if(node[_1b5]!=cls){
node[_1b5]=cls;
}
};
dojo.replaceClass=function(node,_1bd,_1be){
node=byId(node);
_1b8.className=node.className;
dojo.removeClass(_1b8,_1be);
dojo.addClass(_1b8,_1bd);
if(node.className!==_1b8.className){
node.className=_1b8.className;
}
};
dojo.toggleClass=function(node,_1bf,_1c0){
if(_1c0===undefined){
_1c0=!d.hasClass(node,_1bf);
}
d[_1c0?"addClass":"removeClass"](node,_1bf);
};
})();
}
if(!dojo._hasResource["dojo._base.NodeList"]){
dojo._hasResource["dojo._base.NodeList"]=true;
dojo.provide("dojo._base.NodeList");
(function(){
var d=dojo;
var ap=Array.prototype,aps=ap.slice,apc=ap.concat;
var tnl=function(a,_1c1,_1c2){
if(!a.sort){
a=aps.call(a,0);
}
var ctor=_1c2||this._NodeListCtor||d._NodeListCtor;
a.constructor=ctor;
dojo._mixin(a,ctor.prototype);
a._NodeListCtor=ctor;
return _1c1?a._stash(_1c1):a;
};
var _1c3=function(f,a,o){
a=[0].concat(aps.call(a,0));
o=o||d.global;
return function(node){
a[0]=node;
return f.apply(o,a);
};
};
var _1c4=function(f,o){
return function(){
this.forEach(_1c3(f,arguments,o));
return this;
};
};
var _1c5=function(f,o){
return function(){
return this.map(_1c3(f,arguments,o));
};
};
var _1c6=function(f,o){
return function(){
return this.filter(_1c3(f,arguments,o));
};
};
var _1c7=function(f,g,o){
return function(){
var a=arguments,body=_1c3(f,a,o);
if(g.call(o||d.global,a)){
return this.map(body);
}
this.forEach(body);
return this;
};
};
var _1c8=function(a){
return a.length==1&&(typeof a[0]=="string");
};
var _1c9=function(node){
var p=node.parentNode;
if(p){
p.removeChild(node);
}
};
dojo.NodeList=function(){
return tnl(Array.apply(null,arguments));
};
d._NodeListCtor=d.NodeList;
var nl=d.NodeList,nlp=nl.prototype;
nl._wrap=nlp._wrap=tnl;
nl._adaptAsMap=_1c5;
nl._adaptAsForEach=_1c4;
nl._adaptAsFilter=_1c6;
nl._adaptWithCondition=_1c7;
d.forEach(["slice","splice"],function(name){
var f=ap[name];
nlp[name]=function(){
return this._wrap(f.apply(this,arguments),name=="slice"?this:null);
};
});
d.forEach(["indexOf","lastIndexOf","every","some"],function(name){
var f=d[name];
nlp[name]=function(){
return f.apply(d,[this].concat(aps.call(arguments,0)));
};
});
d.forEach(["attr","style"],function(name){
nlp[name]=_1c7(d[name],_1c8);
});
d.forEach(["connect","addClass","removeClass","replaceClass","toggleClass","empty","removeAttr"],function(name){
nlp[name]=_1c4(d[name]);
});
dojo.extend(dojo.NodeList,{_normalize:function(_1ca,_1cb){
var _1cc=_1ca.parse===true?true:false;
if(typeof _1ca.template=="string"){
var _1cd=_1ca.templateFunc||(dojo.string&&dojo.string.substitute);
_1ca=_1cd?_1cd(_1ca.template,_1ca):_1ca;
}
var type=(typeof _1ca);
if(type=="string"||type=="number"){
_1ca=dojo._toDom(_1ca,(_1cb&&_1cb.ownerDocument));
if(_1ca.nodeType==11){
_1ca=dojo._toArray(_1ca.childNodes);
}else{
_1ca=[_1ca];
}
}else{
if(!dojo.isArrayLike(_1ca)){
_1ca=[_1ca];
}else{
if(!dojo.isArray(_1ca)){
_1ca=dojo._toArray(_1ca);
}
}
}
if(_1cc){
_1ca._runParse=true;
}
return _1ca;
},_cloneNode:function(node){
return node.cloneNode(true);
},_place:function(ary,_1ce,_1cf,_1d0){
if(_1ce.nodeType!=1&&_1cf=="only"){
return;
}
var _1d1=_1ce,_1d2;
var _1d3=ary.length;
for(var i=_1d3-1;i>=0;i--){
var node=(_1d0?this._cloneNode(ary[i]):ary[i]);
if(ary._runParse&&dojo.parser&&dojo.parser.parse){
if(!_1d2){
_1d2=_1d1.ownerDocument.createElement("div");
}
_1d2.appendChild(node);
dojo.parser.parse(_1d2);
node=_1d2.firstChild;
while(_1d2.firstChild){
_1d2.removeChild(_1d2.firstChild);
}
}
if(i==_1d3-1){
dojo.place(node,_1d1,_1cf);
}else{
_1d1.parentNode.insertBefore(node,_1d1);
}
_1d1=node;
}
},_stash:function(_1d4){
this._parent=_1d4;
return this;
},end:function(){
if(this._parent){
return this._parent;
}else{
return new this._NodeListCtor();
}
},concat:function(item){
var t=d.isArray(this)?this:aps.call(this,0),m=d.map(arguments,function(a){
return a&&!d.isArray(a)&&(typeof NodeList!="undefined"&&a.constructor===NodeList||a.constructor===this._NodeListCtor)?aps.call(a,0):a;
});
return this._wrap(apc.apply(t,m),this);
},map:function(func,obj){
return this._wrap(d.map(this,func,obj),this);
},forEach:function(_1d5,_1d6){
d.forEach(this,_1d5,_1d6);
return this;
},coords:_1c5(d.coords),position:_1c5(d.position),place:function(_1d7,_1d8){
var item=d.query(_1d7)[0];
return this.forEach(function(node){
d.place(node,item,_1d8);
});
},orphan:function(_1d9){
return (_1d9?d._filterQueryResult(this,_1d9):this).forEach(_1c9);
},adopt:function(_1da,_1db){
return d.query(_1da).place(this[0],_1db)._stash(this);
},query:function(_1dc){
if(!_1dc){
return this;
}
var ret=this.map(function(node){
return d.query(_1dc,node).filter(function(_1dd){
return _1dd!==undefined;
});
});
return this._wrap(apc.apply([],ret),this);
},filter:function(_1de){
var a=arguments,_1df=this,_1e0=0;
if(typeof _1de=="string"){
_1df=d._filterQueryResult(this,a[0]);
if(a.length==1){
return _1df._stash(this);
}
_1e0=1;
}
return this._wrap(d.filter(_1df,a[_1e0],a[_1e0+1]),this);
},addContent:function(_1e1,_1e2){
_1e1=this._normalize(_1e1,this[0]);
for(var i=0,node;(node=this[i]);i++){
this._place(_1e1,node,_1e2,i>0);
}
return this;
},instantiate:function(_1e3,_1e4){
var c=d.isFunction(_1e3)?_1e3:d.getObject(_1e3);
_1e4=_1e4||{};
return this.forEach(function(node){
new c(_1e4,node);
});
},at:function(){
var t=new this._NodeListCtor();
d.forEach(arguments,function(i){
if(i<0){
i=this.length+i;
}
if(this[i]){
t.push(this[i]);
}
},this);
return t._stash(this);
}});
nl.events=["blur","focus","change","click","error","keydown","keypress","keyup","load","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","submit"];
d.forEach(nl.events,function(evt){
var _1e5="on"+evt;
nlp[_1e5]=function(a,b){
return this.connect(_1e5,a,b);
};
});
})();
}
if(!dojo._hasResource["dojo._base.query"]){
dojo._hasResource["dojo._base.query"]=true;
(function(){
var _1e6=function(d){
var trim=d.trim;
var each=d.forEach;
var qlc=(d._NodeListCtor=d.NodeList);
var _1e7=function(){
return d.doc;
};
var _1e8=((d.isWebKit||d.isMozilla)&&((_1e7().compatMode)=="BackCompat"));
var _1e9=!!_1e7().firstChild["children"]?"children":"childNodes";
var _1ea=">~+";
var _1eb=false;
var _1ec=function(){
return true;
};
var _1ed=function(_1ee){
if(_1ea.indexOf(_1ee.slice(-1))>=0){
_1ee+=" * ";
}else{
_1ee+=" ";
}
var ts=function(s,e){
return trim(_1ee.slice(s,e));
};
var _1ef=[];
var _1f0=-1,_1f1=-1,_1f2=-1,_1f3=-1,_1f4=-1,inId=-1,_1f5=-1,lc="",cc="",_1f6;
var x=0,ql=_1ee.length,_1f7=null,_1f8=null;
var _1f9=function(){
if(_1f5>=0){
var tv=(_1f5==x)?null:ts(_1f5,x);
_1f7[(_1ea.indexOf(tv)<0)?"tag":"oper"]=tv;
_1f5=-1;
}
};
var _1fa=function(){
if(inId>=0){
_1f7.id=ts(inId,x).replace(/\\/g,"");
inId=-1;
}
};
var _1fb=function(){
if(_1f4>=0){
_1f7.classes.push(ts(_1f4+1,x).replace(/\\/g,""));
_1f4=-1;
}
};
var _1fc=function(){
_1fa();
_1f9();
_1fb();
};
var _1fd=function(){
_1fc();
if(_1f3>=0){
_1f7.pseudos.push({name:ts(_1f3+1,x)});
}
_1f7.loops=(_1f7.pseudos.length||_1f7.attrs.length||_1f7.classes.length);
_1f7.oquery=_1f7.query=ts(_1f6,x);
_1f7.otag=_1f7.tag=(_1f7["oper"])?null:(_1f7.tag||"*");
if(_1f7.tag){
_1f7.tag=_1f7.tag.toUpperCase();
}
if(_1ef.length&&(_1ef[_1ef.length-1].oper)){
_1f7.infixOper=_1ef.pop();
_1f7.query=_1f7.infixOper.query+" "+_1f7.query;
}
_1ef.push(_1f7);
_1f7=null;
};
for(;lc=cc,cc=_1ee.charAt(x),x<ql;x++){
if(lc=="\\"){
continue;
}
if(!_1f7){
_1f6=x;
_1f7={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){
return (_1eb)?this.otag:this.tag;
}};
_1f5=x;
}
if(_1f0>=0){
if(cc=="]"){
if(!_1f8.attr){
_1f8.attr=ts(_1f0+1,x);
}else{
_1f8.matchFor=ts((_1f2||_1f0+1),x);
}
var cmf=_1f8.matchFor;
if(cmf){
if((cmf.charAt(0)=="\"")||(cmf.charAt(0)=="'")){
_1f8.matchFor=cmf.slice(1,-1);
}
}
_1f7.attrs.push(_1f8);
_1f8=null;
_1f0=_1f2=-1;
}else{
if(cc=="="){
var _1fe=("|~^$*".indexOf(lc)>=0)?lc:"";
_1f8.type=_1fe+cc;
_1f8.attr=ts(_1f0+1,x-_1fe.length);
_1f2=x+1;
}
}
}else{
if(_1f1>=0){
if(cc==")"){
if(_1f3>=0){
_1f8.value=ts(_1f1+1,x);
}
_1f3=_1f1=-1;
}
}else{
if(cc=="#"){
_1fc();
inId=x+1;
}else{
if(cc=="."){
_1fc();
_1f4=x;
}else{
if(cc==":"){
_1fc();
_1f3=x;
}else{
if(cc=="["){
_1fc();
_1f0=x;
_1f8={};
}else{
if(cc=="("){
if(_1f3>=0){
_1f8={name:ts(_1f3+1,x),value:null};
_1f7.pseudos.push(_1f8);
}
_1f1=x;
}else{
if((cc==" ")&&(lc!=cc)){
_1fd();
}
}
}
}
}
}
}
}
}
return _1ef;
};
var _1ff=function(_200,_201){
if(!_200){
return _201;
}
if(!_201){
return _200;
}
return function(){
return _200.apply(window,arguments)&&_201.apply(window,arguments);
};
};
var _202=function(i,arr){
var r=arr||[];
if(i){
r.push(i);
}
return r;
};
var _203=function(n){
return (1==n.nodeType);
};
var _204="";
var _205=function(elem,attr){
if(!elem){
return _204;
}
if(attr=="class"){
return elem.className||_204;
}
if(attr=="for"){
return elem.htmlFor||_204;
}
if(attr=="style"){
return elem.style.cssText||_204;
}
return (_1eb?elem.getAttribute(attr):elem.getAttribute(attr,2))||_204;
};
var _206={"*=":function(attr,_207){
return function(elem){
return (_205(elem,attr).indexOf(_207)>=0);
};
},"^=":function(attr,_208){
return function(elem){
return (_205(elem,attr).indexOf(_208)==0);
};
},"$=":function(attr,_209){
var tval=" "+_209;
return function(elem){
var ea=" "+_205(elem,attr);
return (ea.lastIndexOf(_209)==(ea.length-_209.length));
};
},"~=":function(attr,_20a){
var tval=" "+_20a+" ";
return function(elem){
var ea=" "+_205(elem,attr)+" ";
return (ea.indexOf(tval)>=0);
};
},"|=":function(attr,_20b){
var _20c=" "+_20b+"-";
return function(elem){
var ea=" "+_205(elem,attr);
return ((ea==_20b)||(ea.indexOf(_20c)==0));
};
},"=":function(attr,_20d){
return function(elem){
return (_205(elem,attr)==_20d);
};
}};
var _20e=(typeof _1e7().firstChild.nextElementSibling=="undefined");
var _20f=!_20e?"nextElementSibling":"nextSibling";
var _210=!_20e?"previousElementSibling":"previousSibling";
var _211=(_20e?_203:_1ec);
var _212=function(node){
while(node=node[_210]){
if(_211(node)){
return false;
}
}
return true;
};
var _213=function(node){
while(node=node[_20f]){
if(_211(node)){
return false;
}
}
return true;
};
var _214=function(node){
var root=node.parentNode;
var i=0,tret=root[_1e9],ci=(node["_i"]||-1),cl=(root["_l"]||-1);
if(!tret){
return -1;
}
var l=tret.length;
if(cl==l&&ci>=0&&cl>=0){
return ci;
}
root["_l"]=l;
ci=-1;
for(var te=root["firstElementChild"]||root["firstChild"];te;te=te[_20f]){
if(_211(te)){
te["_i"]=++i;
if(node===te){
ci=i;
}
}
}
return ci;
};
var _215=function(elem){
return !((_214(elem))%2);
};
var _216=function(elem){
return ((_214(elem))%2);
};
var _217={"checked":function(name,_218){
return function(elem){
return !!("checked" in elem?elem.checked:elem.selected);
};
},"first-child":function(){
return _212;
},"last-child":function(){
return _213;
},"only-child":function(name,_219){
return function(node){
if(!_212(node)){
return false;
}
if(!_213(node)){
return false;
}
return true;
};
},"empty":function(name,_21a){
return function(elem){
var cn=elem.childNodes;
var cnl=elem.childNodes.length;
for(var x=cnl-1;x>=0;x--){
var nt=cn[x].nodeType;
if((nt===1)||(nt==3)){
return false;
}
}
return true;
};
},"contains":function(name,_21b){
var cz=_21b.charAt(0);
if(cz=="\""||cz=="'"){
_21b=_21b.slice(1,-1);
}
return function(elem){
return (elem.innerHTML.indexOf(_21b)>=0);
};
},"not":function(name,_21c){
var p=_1ed(_21c)[0];
var _21d={el:1};
if(p.tag!="*"){
_21d.tag=1;
}
if(!p.classes.length){
_21d.classes=1;
}
var ntf=_21e(p,_21d);
return function(elem){
return (!ntf(elem));
};
},"nth-child":function(name,_21f){
var pi=parseInt;
if(_21f=="odd"){
return _216;
}else{
if(_21f=="even"){
return _215;
}
}
if(_21f.indexOf("n")!=-1){
var _220=_21f.split("n",2);
var pred=_220[0]?((_220[0]=="-")?-1:pi(_220[0])):1;
var idx=_220[1]?pi(_220[1]):0;
var lb=0,ub=-1;
if(pred>0){
if(idx<0){
idx=(idx%pred)&&(pred+(idx%pred));
}else{
if(idx>0){
if(idx>=pred){
lb=idx-idx%pred;
}
idx=idx%pred;
}
}
}else{
if(pred<0){
pred*=-1;
if(idx>0){
ub=idx;
idx=idx%pred;
}
}
}
if(pred>0){
return function(elem){
var i=_214(elem);
return (i>=lb)&&(ub<0||i<=ub)&&((i%pred)==idx);
};
}else{
_21f=idx;
}
}
var _221=pi(_21f);
return function(elem){
return (_214(elem)==_221);
};
}};
var _222=(d.isIE<9||(dojo.isIE&&dojo.isQuirks))?function(cond){
var clc=cond.toLowerCase();
if(clc=="class"){
cond="className";
}
return function(elem){
return (_1eb?elem.getAttribute(cond):elem[cond]||elem[clc]);
};
}:function(cond){
return function(elem){
return (elem&&elem.getAttribute&&elem.hasAttribute(cond));
};
};
var _21e=function(_223,_224){
if(!_223){
return _1ec;
}
_224=_224||{};
var ff=null;
if(!("el" in _224)){
ff=_1ff(ff,_203);
}
if(!("tag" in _224)){
if(_223.tag!="*"){
ff=_1ff(ff,function(elem){
return (elem&&(elem.tagName==_223.getTag()));
});
}
}
if(!("classes" in _224)){
each(_223.classes,function(_225,idx,arr){
var re=new RegExp("(?:^|\\s)"+_225+"(?:\\s|$)");
ff=_1ff(ff,function(elem){
return re.test(elem.className);
});
ff.count=idx;
});
}
if(!("pseudos" in _224)){
each(_223.pseudos,function(_226){
var pn=_226.name;
if(_217[pn]){
ff=_1ff(ff,_217[pn](pn,_226.value));
}
});
}
if(!("attrs" in _224)){
each(_223.attrs,function(attr){
var _227;
var a=attr.attr;
if(attr.type&&_206[attr.type]){
_227=_206[attr.type](a,attr.matchFor);
}else{
if(a.length){
_227=_222(a);
}
}
if(_227){
ff=_1ff(ff,_227);
}
});
}
if(!("id" in _224)){
if(_223.id){
ff=_1ff(ff,function(elem){
return (!!elem&&(elem.id==_223.id));
});
}
}
if(!ff){
if(!("default" in _224)){
ff=_1ec;
}
}
return ff;
};
var _228=function(_229){
return function(node,ret,bag){
while(node=node[_20f]){
if(_20e&&(!_203(node))){
continue;
}
if((!bag||_22a(node,bag))&&_229(node)){
ret.push(node);
}
break;
}
return ret;
};
};
var _22b=function(_22c){
return function(root,ret,bag){
var te=root[_20f];
while(te){
if(_211(te)){
if(bag&&!_22a(te,bag)){
break;
}
if(_22c(te)){
ret.push(te);
}
}
te=te[_20f];
}
return ret;
};
};
var _22d=function(_22e){
_22e=_22e||_1ec;
return function(root,ret,bag){
var te,x=0,tret=root[_1e9];
while(te=tret[x++]){
if(_211(te)&&(!bag||_22a(te,bag))&&(_22e(te,x))){
ret.push(te);
}
}
return ret;
};
};
var _22f=function(node,root){
var pn=node.parentNode;
while(pn){
if(pn==root){
break;
}
pn=pn.parentNode;
}
return !!pn;
};
var _230={};
var _231=function(_232){
var _233=_230[_232.query];
if(_233){
return _233;
}
var io=_232.infixOper;
var oper=(io?io.oper:"");
var _234=_21e(_232,{el:1});
var qt=_232.tag;
var _235=("*"==qt);
var ecs=_1e7()["getElementsByClassName"];
if(!oper){
if(_232.id){
_234=(!_232.loops&&_235)?_1ec:_21e(_232,{el:1,id:1});
_233=function(root,arr){
var te=d.byId(_232.id,(root.ownerDocument||root));
if(!te||!_234(te)){
return;
}
if(9==root.nodeType){
return _202(te,arr);
}else{
if(_22f(te,root)){
return _202(te,arr);
}
}
};
}else{
if(ecs&&/\{\s*\[native code\]\s*\}/.test(String(ecs))&&_232.classes.length&&!_1e8){
_234=_21e(_232,{el:1,classes:1,id:1});
var _236=_232.classes.join(" ");
_233=function(root,arr,bag){
var ret=_202(0,arr),te,x=0;
var tret=root.getElementsByClassName(_236);
while((te=tret[x++])){
if(_234(te,root)&&_22a(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
if(!_235&&!_232.loops){
_233=function(root,arr,bag){
var ret=_202(0,arr),te,x=0;
var tret=root.getElementsByTagName(_232.getTag());
while((te=tret[x++])){
if(_22a(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
_234=_21e(_232,{el:1,tag:1,id:1});
_233=function(root,arr,bag){
var ret=_202(0,arr),te,x=0;
var tret=root.getElementsByTagName(_232.getTag());
while((te=tret[x++])){
if(_234(te,root)&&_22a(te,bag)){
ret.push(te);
}
}
return ret;
};
}
}
}
}else{
var _237={el:1};
if(_235){
_237.tag=1;
}
_234=_21e(_232,_237);
if("+"==oper){
_233=_228(_234);
}else{
if("~"==oper){
_233=_22b(_234);
}else{
if(">"==oper){
_233=_22d(_234);
}
}
}
}
return _230[_232.query]=_233;
};
var _238=function(root,_239){
var _23a=_202(root),qp,x,te,qpl=_239.length,bag,ret;
for(var i=0;i<qpl;i++){
ret=[];
qp=_239[i];
x=_23a.length-1;
if(x>0){
bag={};
ret.nozip=true;
}
var gef=_231(qp);
for(var j=0;(te=_23a[j]);j++){
gef(te,ret,bag);
}
if(!ret.length){
break;
}
_23a=ret;
}
return ret;
};
var _23b={},_23c={};
var _23d=function(_23e){
var _23f=_1ed(trim(_23e));
if(_23f.length==1){
var tef=_231(_23f[0]);
return function(root){
var r=tef(root,new qlc());
if(r){
r.nozip=true;
}
return r;
};
}
return function(root){
return _238(root,_23f);
};
};
var nua=navigator.userAgent;
var wk="WebKit/";
var _240=(d.isWebKit&&(nua.indexOf(wk)>0)&&(parseFloat(nua.split(wk)[1])>528));
var _241=d.isIE?"commentStrip":"nozip";
var qsa="querySelectorAll";
var _242=(!!_1e7()[qsa]&&(!d.isSafari||(d.isSafari>3.1)||_240));
var _243=/n\+\d|([^ ])?([>~+])([^ =])?/g;
var _244=function(_245,pre,ch,post){
return ch?(pre?pre+" ":"")+ch+(post?" "+post:""):_245;
};
var _246=function(_247,_248){
_247=_247.replace(_243,_244);
if(_242){
var _249=_23c[_247];
if(_249&&!_248){
return _249;
}
}
var _24a=_23b[_247];
if(_24a){
return _24a;
}
var qcz=_247.charAt(0);
var _24b=(-1==_247.indexOf(" "));
if((_247.indexOf("#")>=0)&&(_24b)){
_248=true;
}
var _24c=(_242&&(!_248)&&(_1ea.indexOf(qcz)==-1)&&(!d.isIE||(_247.indexOf(":")==-1))&&(!(_1e8&&(_247.indexOf(".")>=0)))&&(_247.indexOf(":contains")==-1)&&(_247.indexOf(":checked")==-1)&&(_247.indexOf("|=")==-1));
if(_24c){
var tq=(_1ea.indexOf(_247.charAt(_247.length-1))>=0)?(_247+" *"):_247;
return _23c[_247]=function(root){
try{
if(!((9==root.nodeType)||_24b)){
}
var r=root[qsa](tq);
r[_241]=true;
return r;
}
catch(e){
return _246(_247,true)(root);
}
};
}else{
var _24d=_247.split(/\s*,\s*/);
return _23b[_247]=((_24d.length<2)?_23d(_247):function(root){
var _24e=0,ret=[],tp;
while((tp=_24d[_24e++])){
ret=ret.concat(_23d(tp)(root));
}
return ret;
});
}
};
var _24f=0;
var _250=d.isIE?function(node){
if(_1eb){
return (node.getAttribute("_uid")||node.setAttribute("_uid",++_24f)||_24f);
}else{
return node.uniqueID;
}
}:function(node){
return (node._uid||(node._uid=++_24f));
};
var _22a=function(node,bag){
if(!bag){
return 1;
}
var id=_250(node);
if(!bag[id]){
return bag[id]=1;
}
return 0;
};
var _251="_zipIdx";
var _252=function(arr){
if(arr&&arr.nozip){
return (qlc._wrap)?qlc._wrap(arr):arr;
}
var ret=new qlc();
if(!arr||!arr.length){
return ret;
}
if(arr[0]){
ret.push(arr[0]);
}
if(arr.length<2){
return ret;
}
_24f++;
if(d.isIE&&_1eb){
var _253=_24f+"";
arr[0].setAttribute(_251,_253);
for(var x=1,te;te=arr[x];x++){
if(arr[x].getAttribute(_251)!=_253){
ret.push(te);
}
te.setAttribute(_251,_253);
}
}else{
if(d.isIE&&arr.commentStrip){
try{
for(var x=1,te;te=arr[x];x++){
if(_203(te)){
ret.push(te);
}
}
}
catch(e){
}
}else{
if(arr[0]){
arr[0][_251]=_24f;
}
for(var x=1,te;te=arr[x];x++){
if(arr[x][_251]!=_24f){
ret.push(te);
}
te[_251]=_24f;
}
}
}
return ret;
};
d.query=function(_254,root){
qlc=d._NodeListCtor;
if(!_254){
return new qlc();
}
if(_254.constructor==qlc){
return _254;
}
if(typeof _254!="string"){
return new qlc(_254);
}
if(typeof root=="string"){
root=d.byId(root);
if(!root){
return new qlc();
}
}
root=root||_1e7();
var od=root.ownerDocument||root.documentElement;
_1eb=(root.contentType&&root.contentType=="application/xml")||(d.isOpera&&(root.doctype||od.toString()=="[object XMLDocument]"))||(!!od)&&(d.isIE?od.xml:(root.xmlVersion||od.xmlVersion));
var r=_246(_254)(root);
if(r&&r.nozip&&!qlc._wrap){
return r;
}
return _252(r);
};
d.query.pseudos=_217;
d._filterQueryResult=function(_255,_256,root){
var _257=new d._NodeListCtor(),_258=_1ed(_256),_259=(_258.length==1&&!/[^\w#\.]/.test(_256))?_21e(_258[0]):function(node){
return dojo.query(_256,root).indexOf(node)!=-1;
};
for(var x=0,te;te=_255[x];x++){
if(_259(te)){
_257.push(te);
}
}
return _257;
};
};
var _25a=function(){
acme={trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
},forEach:function(arr,_25b,_25c){
if(!arr||!arr.length){
return;
}
for(var i=0,l=arr.length;i<l;++i){
_25b.call(_25c||window,arr[i],i,arr);
}
},byId:function(id,doc){
if(typeof id=="string"){
return (doc||document).getElementById(id);
}else{
return id;
}
},doc:document,NodeList:Array};
var n=navigator;
var dua=n.userAgent;
var dav=n.appVersion;
var tv=parseFloat(dav);
acme.isOpera=(dua.indexOf("Opera")>=0)?tv:undefined;
acme.isKhtml=(dav.indexOf("Konqueror")>=0)?tv:undefined;
acme.isWebKit=parseFloat(dua.split("WebKit/")[1])||undefined;
acme.isChrome=parseFloat(dua.split("Chrome/")[1])||undefined;
var _25d=Math.max(dav.indexOf("WebKit"),dav.indexOf("Safari"),0);
if(_25d&&!acme.isChrome){
acme.isSafari=parseFloat(dav.split("Version/")[1]);
if(!acme.isSafari||parseFloat(dav.substr(_25d+7))<=419.3){
acme.isSafari=2;
}
}
if(document.all&&!acme.isOpera){
acme.isIE=parseFloat(dav.split("MSIE ")[1])||undefined;
}
Array._wrap=function(arr){
return arr;
};
return acme;
};
if(this["dojo"]){
dojo.provide("dojo._base.query");
_1e6(this["queryPortability"]||this["acme"]||dojo);
}else{
_1e6(this["queryPortability"]||this["acme"]||_25a());
}
})();
}
if(!dojo._hasResource["dojo._base.xhr"]){
dojo._hasResource["dojo._base.xhr"]=true;
dojo.provide("dojo._base.xhr");
(function(){
var _25e=dojo,cfg=_25e.config;
function _25f(obj,name,_260){
if(_260===null){
return;
}
var val=obj[name];
if(typeof val=="string"){
obj[name]=[val,_260];
}else{
if(_25e.isArray(val)){
val.push(_260);
}else{
obj[name]=_260;
}
}
};
dojo.fieldToObject=function(_261){
var ret=null;
var item=_25e.byId(_261);
if(item){
var _262=item.name;
var type=(item.type||"").toLowerCase();
if(_262&&type&&!item.disabled){
if(type=="radio"||type=="checkbox"){
if(item.checked){
ret=item.value;
}
}else{
if(item.multiple){
ret=[];
_25e.query("option",item).forEach(function(opt){
if(opt.selected){
ret.push(opt.value);
}
});
}else{
ret=item.value;
}
}
}
}
return ret;
};
dojo.formToObject=function(_263){
var ret={};
var _264="file|submit|image|reset|button|";
_25e.forEach(dojo.byId(_263).elements,function(item){
var _265=item.name;
var type=(item.type||"").toLowerCase();
if(_265&&type&&_264.indexOf(type)==-1&&!item.disabled){
_25f(ret,_265,_25e.fieldToObject(item));
if(type=="image"){
ret[_265+".x"]=ret[_265+".y"]=ret[_265].x=ret[_265].y=0;
}
}
});
return ret;
};
dojo.objectToQuery=function(map){
var enc=encodeURIComponent;
var _266=[];
var _267={};
for(var name in map){
var _268=map[name];
if(_268!=_267[name]){
var _269=enc(name)+"=";
if(_25e.isArray(_268)){
for(var i=0;i<_268.length;i++){
_266.push(_269+enc(_268[i]));
}
}else{
_266.push(_269+enc(_268));
}
}
}
return _266.join("&");
};
dojo.formToQuery=function(_26a){
return _25e.objectToQuery(_25e.formToObject(_26a));
};
dojo.formToJson=function(_26b,_26c){
return _25e.toJson(_25e.formToObject(_26b),_26c);
};
dojo.queryToObject=function(str){
var ret={};
var qp=str.split("&");
var dec=decodeURIComponent;
_25e.forEach(qp,function(item){
if(item.length){
var _26d=item.split("=");
var name=dec(_26d.shift());
var val=dec(_26d.join("="));
if(typeof ret[name]=="string"){
ret[name]=[ret[name]];
}
if(_25e.isArray(ret[name])){
ret[name].push(val);
}else{
ret[name]=val;
}
}
});
return ret;
};
dojo._blockAsync=false;
var _26e=_25e._contentHandlers=dojo.contentHandlers={text:function(xhr){
return xhr.responseText;
},json:function(xhr){
return _25e.fromJson(xhr.responseText||null);
},"json-comment-filtered":function(xhr){
if(!dojo.config.useCommentedJson){
console.warn("Consider using the standard mimetype:application/json."+" json-commenting can introduce security issues. To"+" decrease the chances of hijacking, use the standard the 'json' handler and"+" prefix your json with: {}&&\n"+"Use djConfig.useCommentedJson=true to turn off this message.");
}
var _26f=xhr.responseText;
var _270=_26f.indexOf("/*");
var _271=_26f.lastIndexOf("*/");
if(_270==-1||_271==-1){
throw new Error("JSON was not comment filtered");
}
return _25e.fromJson(_26f.substring(_270+2,_271));
},javascript:function(xhr){
return _25e.eval(xhr.responseText);
},xml:function(xhr){
var _272=xhr.responseXML;
if(_25e.isIE&&(!_272||!_272.documentElement)){
var ms=function(n){
return "MSXML"+n+".DOMDocument";
};
var dp=["Microsoft.XMLDOM",ms(6),ms(4),ms(3),ms(2)];
_25e.some(dp,function(p){
try{
var dom=new ActiveXObject(p);
dom.async=false;
dom.loadXML(xhr.responseText);
_272=dom;
}
catch(e){
return false;
}
return true;
});
}
return _272;
},"json-comment-optional":function(xhr){
if(xhr.responseText&&/^[^{\[]*\/\*/.test(xhr.responseText)){
return _26e["json-comment-filtered"](xhr);
}else{
return _26e["json"](xhr);
}
}};
dojo._ioSetArgs=function(args,_273,_274,_275){
var _276={args:args,url:args.url};
var _277=null;
if(args.form){
var form=_25e.byId(args.form);
var _278=form.getAttributeNode("action");
_276.url=_276.url||(_278?_278.value:null);
_277=_25e.formToObject(form);
}
var _279=[{}];
if(_277){
_279.push(_277);
}
if(args.content){
_279.push(args.content);
}
if(args.preventCache){
_279.push({"dojo.preventCache":new Date().valueOf()});
}
_276.query=_25e.objectToQuery(_25e.mixin.apply(null,_279));
_276.handleAs=args.handleAs||"text";
var d=new _25e.Deferred(_273);
d.addCallbacks(_274,function(_27a){
return _275(_27a,d);
});
var ld=args.load;
if(ld&&_25e.isFunction(ld)){
d.addCallback(function(_27b){
return ld.call(args,_27b,_276);
});
}
var err=args.error;
if(err&&_25e.isFunction(err)){
d.addErrback(function(_27c){
return err.call(args,_27c,_276);
});
}
var _27d=args.handle;
if(_27d&&_25e.isFunction(_27d)){
d.addBoth(function(_27e){
return _27d.call(args,_27e,_276);
});
}
if(cfg.ioPublish&&_25e.publish&&_276.args.ioPublish!==false){
d.addCallbacks(function(res){
_25e.publish("/dojo/io/load",[d,res]);
return res;
},function(res){
_25e.publish("/dojo/io/error",[d,res]);
return res;
});
d.addBoth(function(res){
_25e.publish("/dojo/io/done",[d,res]);
return res;
});
}
d.ioArgs=_276;
return d;
};
var _27f=function(dfd){
dfd.canceled=true;
var xhr=dfd.ioArgs.xhr;
var _280=typeof xhr.abort;
if(_280=="function"||_280=="object"||_280=="unknown"){
xhr.abort();
}
var err=dfd.ioArgs.error;
if(!err){
err=new Error("xhr cancelled");
err.dojoType="cancel";
}
return err;
};
var _281=function(dfd){
var ret=_26e[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);
return ret===undefined?null:ret;
};
var _282=function(_283,dfd){
if(!dfd.ioArgs.args.failOk){
console.error(_283);
}
return _283;
};
var _284=null;
var _285=[];
var _286=0;
var _287=function(dfd){
if(_286<=0){
_286=0;
if(cfg.ioPublish&&_25e.publish&&(!dfd||dfd&&dfd.ioArgs.args.ioPublish!==false)){
_25e.publish("/dojo/io/stop");
}
}
};
var _288=function(){
var now=(new Date()).getTime();
if(!_25e._blockAsync){
for(var i=0,tif;i<_285.length&&(tif=_285[i]);i++){
var dfd=tif.dfd;
var func=function(){
if(!dfd||dfd.canceled||!tif.validCheck(dfd)){
_285.splice(i--,1);
_286-=1;
}else{
if(tif.ioCheck(dfd)){
_285.splice(i--,1);
tif.resHandle(dfd);
_286-=1;
}else{
if(dfd.startTime){
if(dfd.startTime+(dfd.ioArgs.args.timeout||0)<now){
_285.splice(i--,1);
var err=new Error("timeout exceeded");
err.dojoType="timeout";
dfd.errback(err);
dfd.cancel();
_286-=1;
}
}
}
}
};
if(dojo.config.debugAtAllCosts){
func.call(this);
}else{
try{
func.call(this);
}
catch(e){
dfd.errback(e);
}
}
}
}
_287(dfd);
if(!_285.length){
clearInterval(_284);
_284=null;
return;
}
};
dojo._ioCancelAll=function(){
try{
_25e.forEach(_285,function(i){
try{
i.dfd.cancel();
}
catch(e){
}
});
}
catch(e){
}
};
if(_25e.isIE){
_25e.addOnWindowUnload(_25e._ioCancelAll);
}
_25e._ioNotifyStart=function(dfd){
if(cfg.ioPublish&&_25e.publish&&dfd.ioArgs.args.ioPublish!==false){
if(!_286){
_25e.publish("/dojo/io/start");
}
_286+=1;
_25e.publish("/dojo/io/send",[dfd]);
}
};
_25e._ioWatch=function(dfd,_289,_28a,_28b){
var args=dfd.ioArgs.args;
if(args.timeout){
dfd.startTime=(new Date()).getTime();
}
_285.push({dfd:dfd,validCheck:_289,ioCheck:_28a,resHandle:_28b});
if(!_284){
_284=setInterval(_288,50);
}
if(args.sync){
_288();
}
};
var _28c="application/x-www-form-urlencoded";
var _28d=function(dfd){
return dfd.ioArgs.xhr.readyState;
};
var _28e=function(dfd){
return 4==dfd.ioArgs.xhr.readyState;
};
var _28f=function(dfd){
var xhr=dfd.ioArgs.xhr;
if(_25e._isDocumentOk(xhr)){
dfd.callback(dfd);
}else{
var err=new Error("Unable to load "+dfd.ioArgs.url+" status:"+xhr.status);
err.status=xhr.status;
err.responseText=xhr.responseText;
dfd.errback(err);
}
};
dojo._ioAddQueryToUrl=function(_290){
if(_290.query.length){
_290.url+=(_290.url.indexOf("?")==-1?"?":"&")+_290.query;
_290.query=null;
}
};
dojo.xhr=function(_291,args,_292){
var dfd=_25e._ioSetArgs(args,_27f,_281,_282);
var _293=dfd.ioArgs;
var xhr=_293.xhr=_25e._xhrObj(_293.args);
if(!xhr){
dfd.cancel();
return dfd;
}
if("postData" in args){
_293.query=args.postData;
}else{
if("putData" in args){
_293.query=args.putData;
}else{
if("rawBody" in args){
_293.query=args.rawBody;
}else{
if((arguments.length>2&&!_292)||"POST|PUT".indexOf(_291.toUpperCase())==-1){
_25e._ioAddQueryToUrl(_293);
}
}
}
}
xhr.open(_291,_293.url,args.sync!==true,args.user||undefined,args.password||undefined);
if(args.headers){
for(var hdr in args.headers){
if(hdr.toLowerCase()==="content-type"&&!args.contentType){
args.contentType=args.headers[hdr];
}else{
if(args.headers[hdr]){
xhr.setRequestHeader(hdr,args.headers[hdr]);
}
}
}
}
xhr.setRequestHeader("Content-Type",args.contentType||_28c);
if(!args.headers||!("X-Requested-With" in args.headers)){
xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
}
_25e._ioNotifyStart(dfd);
if(dojo.config.debugAtAllCosts){
xhr.send(_293.query);
}else{
try{
xhr.send(_293.query);
}
catch(e){
_293.error=e;
dfd.cancel();
}
}
_25e._ioWatch(dfd,_28d,_28e,_28f);
xhr=null;
return dfd;
};
dojo.xhrGet=function(args){
return _25e.xhr("GET",args);
};
dojo.rawXhrPost=dojo.xhrPost=function(args){
return _25e.xhr("POST",args,true);
};
dojo.rawXhrPut=dojo.xhrPut=function(args){
return _25e.xhr("PUT",args,true);
};
dojo.xhrDelete=function(args){
return _25e.xhr("DELETE",args);
};
})();
}
if(!dojo._hasResource["dojo._base.fx"]){
dojo._hasResource["dojo._base.fx"]=true;
dojo.provide("dojo._base.fx");
(function(){
var d=dojo;
var _294=d._mixin;
dojo._Line=function(_295,end){
this.start=_295;
this.end=end;
};
dojo._Line.prototype.getValue=function(n){
return ((this.end-this.start)*n)+this.start;
};
dojo.Animation=function(args){
_294(this,args);
if(d.isArray(this.curve)){
this.curve=new d._Line(this.curve[0],this.curve[1]);
}
};
d._Animation=d.Animation;
d.extend(dojo.Animation,{duration:350,repeat:0,rate:20,_percent:0,_startRepeatCount:0,_getStep:function(){
var _296=this._percent,_297=this.easing;
return _297?_297(_296):_296;
},_fire:function(evt,args){
var a=args||[];
if(this[evt]){
if(d.config.debugAtAllCosts){
this[evt].apply(this,a);
}else{
try{
this[evt].apply(this,a);
}
catch(e){
console.error("exception in animation handler for:",evt);
console.error(e);
}
}
}
return this;
},play:function(_298,_299){
var _29a=this;
if(_29a._delayTimer){
_29a._clearTimer();
}
if(_299){
_29a._stopTimer();
_29a._active=_29a._paused=false;
_29a._percent=0;
}else{
if(_29a._active&&!_29a._paused){
return _29a;
}
}
_29a._fire("beforeBegin",[_29a.node]);
var de=_298||_29a.delay,_29b=dojo.hitch(_29a,"_play",_299);
if(de>0){
_29a._delayTimer=setTimeout(_29b,de);
return _29a;
}
_29b();
return _29a;
},_play:function(_29c){
var _29d=this;
if(_29d._delayTimer){
_29d._clearTimer();
}
_29d._startTime=new Date().valueOf();
if(_29d._paused){
_29d._startTime-=_29d.duration*_29d._percent;
}
_29d._active=true;
_29d._paused=false;
var _29e=_29d.curve.getValue(_29d._getStep());
if(!_29d._percent){
if(!_29d._startRepeatCount){
_29d._startRepeatCount=_29d.repeat;
}
_29d._fire("onBegin",[_29e]);
}
_29d._fire("onPlay",[_29e]);
_29d._cycle();
return _29d;
},pause:function(){
var _29f=this;
if(_29f._delayTimer){
_29f._clearTimer();
}
_29f._stopTimer();
if(!_29f._active){
return _29f;
}
_29f._paused=true;
_29f._fire("onPause",[_29f.curve.getValue(_29f._getStep())]);
return _29f;
},gotoPercent:function(_2a0,_2a1){
var _2a2=this;
_2a2._stopTimer();
_2a2._active=_2a2._paused=true;
_2a2._percent=_2a0;
if(_2a1){
_2a2.play();
}
return _2a2;
},stop:function(_2a3){
var _2a4=this;
if(_2a4._delayTimer){
_2a4._clearTimer();
}
if(!_2a4._timer){
return _2a4;
}
_2a4._stopTimer();
if(_2a3){
_2a4._percent=1;
}
_2a4._fire("onStop",[_2a4.curve.getValue(_2a4._getStep())]);
_2a4._active=_2a4._paused=false;
return _2a4;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}
return "stopped";
},_cycle:function(){
var _2a5=this;
if(_2a5._active){
var curr=new Date().valueOf();
var step=(curr-_2a5._startTime)/(_2a5.duration);
if(step>=1){
step=1;
}
_2a5._percent=step;
if(_2a5.easing){
step=_2a5.easing(step);
}
_2a5._fire("onAnimate",[_2a5.curve.getValue(step)]);
if(_2a5._percent<1){
_2a5._startTimer();
}else{
_2a5._active=false;
if(_2a5.repeat>0){
_2a5.repeat--;
_2a5.play(null,true);
}else{
if(_2a5.repeat==-1){
_2a5.play(null,true);
}else{
if(_2a5._startRepeatCount){
_2a5.repeat=_2a5._startRepeatCount;
_2a5._startRepeatCount=0;
}
}
}
_2a5._percent=0;
_2a5._fire("onEnd",[_2a5.node]);
!_2a5.repeat&&_2a5._stopTimer();
}
}
return _2a5;
},_clearTimer:function(){
clearTimeout(this._delayTimer);
delete this._delayTimer;
}});
var ctr=0,_2a6=null,_2a7={run:function(){
}};
d.extend(d.Animation,{_startTimer:function(){
if(!this._timer){
this._timer=d.connect(_2a7,"run",this,"_cycle");
ctr++;
}
if(!_2a6){
_2a6=setInterval(d.hitch(_2a7,"run"),this.rate);
}
},_stopTimer:function(){
if(this._timer){
d.disconnect(this._timer);
this._timer=null;
ctr--;
}
if(ctr<=0){
clearInterval(_2a6);
_2a6=null;
ctr=0;
}
}});
var _2a8=d.isIE?function(node){
var ns=node.style;
if(!ns.width.length&&d.style(node,"width")=="auto"){
ns.width="auto";
}
}:function(){
};
dojo._fade=function(args){
args.node=d.byId(args.node);
var _2a9=_294({properties:{}},args),_2aa=(_2a9.properties.opacity={});
_2aa.start=!("start" in _2a9)?function(){
return +d.style(_2a9.node,"opacity")||0;
}:_2a9.start;
_2aa.end=_2a9.end;
var anim=d.animateProperty(_2a9);
d.connect(anim,"beforeBegin",d.partial(_2a8,_2a9.node));
return anim;
};
dojo.fadeIn=function(args){
return d._fade(_294({end:1},args));
};
dojo.fadeOut=function(args){
return d._fade(_294({end:0},args));
};
dojo._defaultEasing=function(n){
return 0.5+((Math.sin((n+1.5)*Math.PI))/2);
};
var _2ab=function(_2ac){
this._properties=_2ac;
for(var p in _2ac){
var prop=_2ac[p];
if(prop.start instanceof d.Color){
prop.tempColor=new d.Color();
}
}
};
_2ab.prototype.getValue=function(r){
var ret={};
for(var p in this._properties){
var prop=this._properties[p],_2ad=prop.start;
if(_2ad instanceof d.Color){
ret[p]=d.blendColors(_2ad,prop.end,r,prop.tempColor).toCss();
}else{
if(!d.isArray(_2ad)){
ret[p]=((prop.end-_2ad)*r)+_2ad+(p!="opacity"?prop.units||"px":0);
}
}
}
return ret;
};
dojo.animateProperty=function(args){
var n=args.node=d.byId(args.node);
if(!args.easing){
args.easing=d._defaultEasing;
}
var anim=new d.Animation(args);
d.connect(anim,"beforeBegin",anim,function(){
var pm={};
for(var p in this.properties){
if(p=="width"||p=="height"){
this.node.display="block";
}
var prop=this.properties[p];
if(d.isFunction(prop)){
prop=prop(n);
}
prop=pm[p]=_294({},(d.isObject(prop)?prop:{end:prop}));
if(d.isFunction(prop.start)){
prop.start=prop.start(n);
}
if(d.isFunction(prop.end)){
prop.end=prop.end(n);
}
var _2ae=(p.toLowerCase().indexOf("color")>=0);
function _2af(node,p){
var v={height:node.offsetHeight,width:node.offsetWidth}[p];
if(v!==undefined){
return v;
}
v=d.style(node,p);
return (p=="opacity")?+v:(_2ae?v:parseFloat(v));
};
if(!("end" in prop)){
prop.end=_2af(n,p);
}else{
if(!("start" in prop)){
prop.start=_2af(n,p);
}
}
if(_2ae){
prop.start=new d.Color(prop.start);
prop.end=new d.Color(prop.end);
}else{
prop.start=(p=="opacity")?+prop.start:parseFloat(prop.start);
}
}
this.curve=new _2ab(pm);
});
d.connect(anim,"onAnimate",d.hitch(d,"style",anim.node));
return anim;
};
dojo.anim=function(node,_2b0,_2b1,_2b2,_2b3,_2b4){
return d.animateProperty({node:node,duration:_2b1||d.Animation.prototype.duration,properties:_2b0,easing:_2b2,onEnd:_2b3}).play(_2b4||0);
};
})();
}
if(!dojo._hasResource["dojo._base.browser"]){
dojo._hasResource["dojo._base.browser"]=true;
dojo.provide("dojo._base.browser");
dojo.forEach(dojo.config.require,function(i){
dojo["require"](i);
});
}
if(!dojo._hasResource["dojo._base"]){
dojo._hasResource["dojo._base"]=true;
dojo.provide("dojo._base");
}
if(!dojo._hasResource["dijit._base.manager"]){
dojo._hasResource["dijit._base.manager"]=true;
dojo.provide("dijit._base.manager");
dojo.declare("dijit.WidgetSet",null,{constructor:function(){
this._hash={};
this.length=0;
},add:function(_2b5){
if(this._hash[_2b5.id]){
throw new Error("Tried to register widget with id=="+_2b5.id+" but that id is already registered");
}
this._hash[_2b5.id]=_2b5;
this.length++;
},remove:function(id){
if(this._hash[id]){
delete this._hash[id];
this.length--;
}
},forEach:function(func,_2b6){
_2b6=_2b6||dojo.global;
var i=0,id;
for(id in this._hash){
func.call(_2b6,this._hash[id],i++,this._hash);
}
return this;
},filter:function(_2b7,_2b8){
_2b8=_2b8||dojo.global;
var res=new dijit.WidgetSet(),i=0,id;
for(id in this._hash){
var w=this._hash[id];
if(_2b7.call(_2b8,w,i++,this._hash)){
res.add(w);
}
}
return res;
},byId:function(id){
return this._hash[id];
},byClass:function(cls){
var res=new dijit.WidgetSet(),id,_2b9;
for(id in this._hash){
_2b9=this._hash[id];
if(_2b9.declaredClass==cls){
res.add(_2b9);
}
}
return res;
},toArray:function(){
var ar=[];
for(var id in this._hash){
ar.push(this._hash[id]);
}
return ar;
},map:function(func,_2ba){
return dojo.map(this.toArray(),func,_2ba);
},every:function(func,_2bb){
_2bb=_2bb||dojo.global;
var x=0,i;
for(i in this._hash){
if(!func.call(_2bb,this._hash[i],x++,this._hash)){
return false;
}
}
return true;
},some:function(func,_2bc){
_2bc=_2bc||dojo.global;
var x=0,i;
for(i in this._hash){
if(func.call(_2bc,this._hash[i],x++,this._hash)){
return true;
}
}
return false;
}});
(function(){
dijit.registry=new dijit.WidgetSet();
var hash=dijit.registry._hash,attr=dojo.attr,_2bd=dojo.hasAttr,_2be=dojo.style;
dijit.byId=function(id){
return typeof id=="string"?hash[id]:id;
};
var _2bf={};
dijit.getUniqueId=function(_2c0){
var id;
do{
id=_2c0+"_"+(_2c0 in _2bf?++_2bf[_2c0]:_2bf[_2c0]=0);
}while(hash[id]);
return dijit._scopeName=="dijit"?id:dijit._scopeName+"_"+id;
};
dijit.findWidgets=function(root){
var _2c1=[];
function _2c2(root){
if(!root){
return _2c1;
}
for(var node=root.firstChild;node;node=node.nextSibling){
if(node.nodeType==1){
var _2c3=node.getAttribute("widgetId");
if(_2c3){
var _2c4=hash[_2c3];
if(_2c4){
_2c1.push(_2c4);
}
}else{
_2c2(node);
}
}
}
};
_2c2(root);
return _2c1;
};
dijit._destroyAll=function(){
dijit._curFocus=null;
dijit._prevFocus=null;
dijit._activeStack=[];
dojo.forEach(dijit.findWidgets(dojo.body()),function(_2c5){
if(!_2c5._destroyed){
if(_2c5.destroyRecursive){
_2c5.destroyRecursive();
}else{
if(_2c5.destroy){
_2c5.destroy();
}
}
}
});
};
if(dojo.isIE){
dojo.addOnWindowUnload(function(){
dijit._destroyAll();
});
}
dijit.byNode=function(node){
return hash[node.getAttribute("widgetId")];
};
dijit.getEnclosingWidget=function(node){
while(node){
var id=node.getAttribute&&node.getAttribute("widgetId");
if(id){
return hash[id];
}
node=node.parentNode;
}
return null;
};
var _2c6=(dijit._isElementShown=function(elem){
var s=_2be(elem);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(attr(elem,"type")!="hidden");
});
dijit.hasDefaultTabStop=function(elem){
switch(elem.nodeName.toLowerCase()){
case "a":
return _2bd(elem,"href");
case "area":
case "button":
case "input":
case "object":
case "select":
case "textarea":
return true;
case "iframe":
var body;
try{
var _2c7=elem.contentDocument;
if("designMode" in _2c7&&_2c7.designMode=="on"){
return true;
}
body=_2c7.body;
}
catch(e1){
try{
body=elem.contentWindow.document.body;
}
catch(e2){
return false;
}
}
return body.contentEditable=="true"||(body.firstChild&&body.firstChild.contentEditable=="true");
default:
return elem.contentEditable=="true";
}
};
var _2c8=(dijit.isTabNavigable=function(elem){
if(attr(elem,"disabled")){
return false;
}else{
if(_2bd(elem,"tabIndex")){
return attr(elem,"tabIndex")>=0;
}else{
return dijit.hasDefaultTabStop(elem);
}
}
});
dijit._getTabNavigable=function(root){
var _2c9,last,_2ca,_2cb,_2cc,_2cd,_2ce={};
function _2cf(node){
return node&&node.tagName.toLowerCase()=="input"&&node.type&&node.type.toLowerCase()=="radio"&&node.name&&node.name.toLowerCase();
};
var _2d0=function(_2d1){
dojo.query("> *",_2d1).forEach(function(_2d2){
if((dojo.isIE&&_2d2.scopeName!=="HTML")||!_2c6(_2d2)){
return;
}
if(_2c8(_2d2)){
var _2d3=attr(_2d2,"tabIndex");
if(!_2bd(_2d2,"tabIndex")||_2d3==0){
if(!_2c9){
_2c9=_2d2;
}
last=_2d2;
}else{
if(_2d3>0){
if(!_2ca||_2d3<_2cb){
_2cb=_2d3;
_2ca=_2d2;
}
if(!_2cc||_2d3>=_2cd){
_2cd=_2d3;
_2cc=_2d2;
}
}
}
var rn=_2cf(_2d2);
if(dojo.attr(_2d2,"checked")&&rn){
_2ce[rn]=_2d2;
}
}
if(_2d2.nodeName.toUpperCase()!="SELECT"){
_2d0(_2d2);
}
});
};
if(_2c6(root)){
_2d0(root);
}
function rs(node){
return _2ce[_2cf(node)]||node;
};
return {first:rs(_2c9),last:rs(last),lowest:rs(_2ca),highest:rs(_2cc)};
};
dijit.getFirstInTabbingOrder=function(root){
var _2d4=dijit._getTabNavigable(dojo.byId(root));
return _2d4.lowest?_2d4.lowest:_2d4.first;
};
dijit.getLastInTabbingOrder=function(root){
var _2d5=dijit._getTabNavigable(dojo.byId(root));
return _2d5.last?_2d5.last:_2d5.highest;
};
dijit.defaultDuration=dojo.config["defaultDuration"]||200;
})();
}
if(!dojo._hasResource["dojo.Stateful"]){
dojo._hasResource["dojo.Stateful"]=true;
dojo.provide("dojo.Stateful");
dojo.declare("dojo.Stateful",null,{postscript:function(_2d6){
if(_2d6){
dojo.mixin(this,_2d6);
}
},get:function(name){
return this[name];
},set:function(name,_2d7){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _2d8=this[name];
this[name]=_2d7;
if(this._watchCallbacks){
this._watchCallbacks(name,_2d8,_2d7);
}
return this;
},watch:function(name,_2d9){
var _2da=this._watchCallbacks;
if(!_2da){
var self=this;
_2da=this._watchCallbacks=function(name,_2db,_2dc,_2dd){
var _2de=function(_2df){
if(_2df){
_2df=_2df.slice();
for(var i=0,l=_2df.length;i<l;i++){
try{
_2df[i].call(self,name,_2db,_2dc);
}
catch(e){
console.error(e);
}
}
}
};
_2de(_2da["_"+name]);
if(!_2dd){
_2de(_2da["*"]);
}
};
}
if(!_2d9&&typeof name==="function"){
_2d9=name;
name="*";
}else{
name="_"+name;
}
var _2e0=_2da[name];
if(typeof _2e0!=="object"){
_2e0=_2da[name]=[];
}
_2e0.push(_2d9);
return {unwatch:function(){
_2e0.splice(dojo.indexOf(_2e0,_2d9),1);
}};
}});
}
if(!dojo._hasResource["dijit._WidgetBase"]){
dojo._hasResource["dijit._WidgetBase"]=true;
dojo.provide("dijit._WidgetBase");
(function(){
dojo.declare("dijit._WidgetBase",dojo.Stateful,{id:"",lang:"",dir:"","class":"",style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},_blankGif:(dojo.config.blankGif||dojo.moduleUrl("dojo","resources/blank.gif")).toString(),postscript:function(_2e1,_2e2){
this.create(_2e1,_2e2);
},create:function(_2e3,_2e4){
this.srcNodeRef=dojo.byId(_2e4);
this._connects=[];
this._subscribes=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_2e3){
this.params=_2e3;
dojo._mixin(this,_2e3);
}
this.postMixInProperties();
if(!this.id){
this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
dijit.registry.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _2e5=this.srcNodeRef;
if(_2e5&&_2e5.parentNode&&this.domNode!==_2e5){
_2e5.parentNode.replaceChild(this.domNode,_2e5);
}
}
if(this.domNode){
this.domNode.setAttribute("widgetId",this.id);
}
this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){
delete this.srcNodeRef;
}
this._created=true;
},_applyAttributes:function(){
var _2e6=function(attr,_2e7){
if((_2e7.params&&attr in _2e7.params)||_2e7[attr]){
_2e7.set(attr,_2e7[attr]);
}
};
for(var attr in this.attributeMap){
_2e6(attr,this);
}
dojo.forEach(this._getSetterAttributes(),function(a){
if(!(a in this.attributeMap)){
_2e6(a,this);
}
},this);
},_getSetterAttributes:function(){
var ctor=this.constructor;
if(!ctor._setterAttrs){
var r=(ctor._setterAttrs=[]),_2e8,_2e9=ctor.prototype;
for(var _2ea in _2e9){
if(dojo.isFunction(_2e9[_2ea])&&(_2e8=_2ea.match(/^_set([a-zA-Z]*)Attr$/))&&_2e8[1]){
r.push(_2e8[1].charAt(0).toLowerCase()+_2e8[1].substr(1));
}
}
}
return ctor._setterAttrs;
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||dojo.create("div");
}
if(this.baseClass){
var _2eb=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_2eb=_2eb.concat(dojo.map(_2eb,function(name){
return name+"Rtl";
}));
}
dojo.addClass(this.domNode,_2eb);
}
},postCreate:function(){
},startup:function(){
this._started=true;
},destroyRecursive:function(_2ec){
this._beingDestroyed=true;
this.destroyDescendants(_2ec);
this.destroy(_2ec);
},destroy:function(_2ed){
this._beingDestroyed=true;
this.uninitialize();
var d=dojo,dfe=d.forEach,dun=d.unsubscribe;
dfe(this._connects,function(_2ee){
dfe(_2ee,d.disconnect);
});
dfe(this._subscribes,function(_2ef){
dun(_2ef);
});
dfe(this._supportingWidgets||[],function(w){
if(w.destroyRecursive){
w.destroyRecursive();
}else{
if(w.destroy){
w.destroy();
}
}
});
this.destroyRendering(_2ed);
dijit.registry.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_2f0){
if(this.bgIframe){
this.bgIframe.destroy(_2f0);
delete this.bgIframe;
}
if(this.domNode){
if(_2f0){
dojo.removeAttr(this.domNode,"widgetId");
}else{
dojo.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_2f0){
dojo.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_2f1){
dojo.forEach(this.getChildren(),function(_2f2){
if(_2f2.destroyRecursive){
_2f2.destroyRecursive(_2f1);
}
});
},uninitialize:function(){
return false;
},_setClassAttr:function(_2f3){
var _2f4=this[this.attributeMap["class"]||"domNode"];
dojo.replaceClass(_2f4,_2f3,this["class"]);
this._set("class",_2f3);
},_setStyleAttr:function(_2f5){
var _2f6=this[this.attributeMap.style||"domNode"];
if(dojo.isObject(_2f5)){
dojo.style(_2f6,_2f5);
}else{
if(_2f6.style.cssText){
_2f6.style.cssText+="; "+_2f5;
}else{
_2f6.style.cssText=_2f5;
}
}
this._set("style",_2f5);
},_attrToDom:function(attr,_2f7){
var _2f8=this.attributeMap[attr];
dojo.forEach(dojo.isArray(_2f8)?_2f8:[_2f8],function(_2f9){
var _2fa=this[_2f9.node||_2f9||"domNode"];
var type=_2f9.type||"attribute";
switch(type){
case "attribute":
if(dojo.isFunction(_2f7)){
_2f7=dojo.hitch(this,_2f7);
}
var _2fb=_2f9.attribute?_2f9.attribute:(/^on[A-Z][a-zA-Z]*$/.test(attr)?attr.toLowerCase():attr);
dojo.attr(_2fa,_2fb,_2f7);
break;
case "innerText":
_2fa.innerHTML="";
_2fa.appendChild(dojo.doc.createTextNode(_2f7));
break;
case "innerHTML":
_2fa.innerHTML=_2f7;
break;
case "class":
dojo.replaceClass(_2fa,_2f7,this[attr]);
break;
}
},this);
},get:function(name){
var _2fc=this._getAttrNames(name);
return this[_2fc.g]?this[_2fc.g]():this[name];
},set:function(name,_2fd){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _2fe=this._getAttrNames(name);
if(this[_2fe.s]){
var _2ff=this[_2fe.s].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(name in this.attributeMap){
this._attrToDom(name,_2fd);
}
this._set(name,_2fd);
}
return _2ff||this;
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.charAt(0).toUpperCase()+name.substr(1);
return (apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr"});
},_set:function(name,_300){
var _301=this[name];
this[name]=_300;
if(this._watchCallbacks&&this._created&&_300!==_301){
this._watchCallbacks(name,_301,_300);
}
},toString:function(){
return "[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]";
},getDescendants:function(){
return this.containerNode?dojo.query("[widgetId]",this.containerNode).map(dijit.byNode):[];
},getChildren:function(){
return this.containerNode?dijit.findWidgets(this.containerNode):[];
},connect:function(obj,_302,_303){
var _304=[dojo._connect(obj,_302,this,_303)];
this._connects.push(_304);
return _304;
},disconnect:function(_305){
for(var i=0;i<this._connects.length;i++){
if(this._connects[i]==_305){
dojo.forEach(_305,dojo.disconnect);
this._connects.splice(i,1);
return;
}
}
},subscribe:function(_306,_307){
var _308=dojo.subscribe(_306,this,_307);
this._subscribes.push(_308);
return _308;
},unsubscribe:function(_309){
for(var i=0;i<this._subscribes.length;i++){
if(this._subscribes[i]==_309){
dojo.unsubscribe(_309);
this._subscribes.splice(i,1);
return;
}
}
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):dojo._isBodyLtr();
},placeAt:function(_30a,_30b){
if(_30a.declaredClass&&_30a.addChild){
_30a.addChild(this,_30b);
}else{
dojo.place(this.domNode,_30a,_30b);
}
return this;
}});
})();
}
if(!dojo._hasResource["dojo.i18n"]){
dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.getObject("i18n",true,dojo);
dojo.i18n.getLocalization=dojo.i18n.getLocalization||function(_30c,_30d,_30e){
_30e=dojo.i18n.normalizeLocale(_30e);
var _30f=_30e.split("-");
var _310=[_30c,"nls",_30d].join(".");
var _311=dojo._loadedModules[_310];
if(_311){
var _312;
for(var i=_30f.length;i>0;i--){
var loc=_30f.slice(0,i).join("_");
if(_311[loc]){
_312=_311[loc];
break;
}
}
if(!_312){
_312=_311.ROOT;
}
if(_312){
var _313=function(){
};
_313.prototype=_312;
return new _313();
}
}
};
dojo.i18n.normalizeLocale=function(_314){
var _315=_314?_314.toLowerCase():dojo.locale;
if(_315=="root"){
_315="ROOT";
}
return _315;
};
dojo.i18n._requireLocalization=function(_316,_317,_318,_319){
var _31a=dojo.i18n.normalizeLocale(_318);
var _31b=[_316,"nls",_317].join(".");
var _31c="";
if(_319){
var _31d=_319.split(",");
for(var i=0;i<_31d.length;i++){
if(_31a["indexOf"](_31d[i])==0){
if(_31d[i].length>_31c.length){
_31c=_31d[i];
}
}
}
if(!_31c){
_31c="ROOT";
}
}
var _31e=_319?_31c:_31a;
var _31f=dojo._loadedModules[_31b];
var _320=null;
if(_31f){
if(dojo.config.localizationComplete&&_31f._built){
return;
}
var _321=_31e.replace(/-/g,"_");
var _322=_31b+"."+_321;
_320=dojo._loadedModules[_322];
}
if(!_320){
_31f=dojo["provide"](_31b);
var syms=dojo._getModuleSymbols(_316);
var _323=syms.concat("nls").join("/");
var _324;
dojo.i18n._searchLocalePath(_31e,_319,function(loc){
var _325=loc.replace(/-/g,"_");
var _326=_31b+"."+_325;
var _327=false;
if(!dojo._loadedModules[_326]){
dojo["provide"](_326);
var _328=[_323];
if(loc!="ROOT"){
_328.push(loc);
}
_328.push(_317);
var _329=_328.join("/")+".js";
_327=dojo._loadPath(_329,null,function(hash){
hash=hash.root||hash;
var _32a=function(){
};
_32a.prototype=_324;
_31f[_325]=new _32a();
for(var j in hash){
_31f[_325][j]=hash[j];
}
});
}else{
_327=true;
}
if(_327&&_31f[_325]){
_324=_31f[_325];
}else{
_31f[_325]=_324;
}
if(_319){
return true;
}
});
}
if(_319&&_31a!=_31c){
_31f[_31a.replace(/-/g,"_")]=_31f[_31c.replace(/-/g,"_")];
}
};
(function(){
var _32b=dojo.config.extraLocale;
if(_32b){
if(!_32b instanceof Array){
_32b=[_32b];
}
var req=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(m,b,_32c,_32d){
req(m,b,_32c,_32d);
if(_32c){
return;
}
for(var i=0;i<_32b.length;i++){
req(m,b,_32b[i],_32d);
}
};
}
})();
dojo.i18n._searchLocalePath=function(_32e,down,_32f){
_32e=dojo.i18n.normalizeLocale(_32e);
var _330=_32e.split("-");
var _331=[];
for(var i=_330.length;i>0;i--){
_331.push(_330.slice(0,i).join("-"));
}
_331.push(false);
if(down){
_331.reverse();
}
for(var j=_331.length-1;j>=0;j--){
var loc=_331[j]||"ROOT";
var stop=_32f(loc);
if(stop){
break;
}
}
};
dojo.i18n._preloadLocalizations=function(_332,_333){
function _334(_335){
_335=dojo.i18n.normalizeLocale(_335);
dojo.i18n._searchLocalePath(_335,true,function(loc){
for(var i=0;i<_333.length;i++){
if(_333[i]==loc){
dojo["require"](_332+"_"+loc);
return true;
}
}
return false;
});
};
_334();
var _336=dojo.config.extraLocale||[];
for(var i=0;i<_336.length;i++){
_334(_336[i]);
}
};
}
if(!dojo._hasResource["dojo.rpc.RpcService"]){
dojo._hasResource["dojo.rpc.RpcService"]=true;
dojo.provide("dojo.rpc.RpcService");
dojo.declare("dojo.rpc.RpcService",null,{constructor:function(args){
if(args){
if((dojo.isString(args))||(args instanceof dojo._Url)){
if(args instanceof dojo._Url){
var url=args+"";
}else{
url=args;
}
var def=dojo.xhrGet({url:url,handleAs:"json-comment-optional",sync:true});
def.addCallback(this,"processSmd");
def.addErrback(function(){
throw new Error("Unable to load SMD from "+args);
});
}else{
if(args.smdStr){
this.processSmd(dojo.eval("("+args.smdStr+")"));
}else{
if(args.serviceUrl){
this.serviceUrl=args.serviceUrl;
}
this.timeout=args.timeout||3000;
if("strictArgChecks" in args){
this.strictArgChecks=args.strictArgChecks;
}
this.processSmd(args);
}
}
}
},strictArgChecks:true,serviceUrl:"",parseResults:function(obj){
return obj;
},errorCallback:function(_337){
return function(data){
_337.errback(data.message);
};
},resultCallback:function(_338){
var tf=dojo.hitch(this,function(obj){
if(obj.error!=null){
var err;
if(typeof obj.error=="object"){
err=new Error(obj.error.message);
err.code=obj.error.code;
err.error=obj.error.error;
}else{
err=new Error(obj.error);
}
err.id=obj.id;
err.errorObject=obj;
_338.errback(err);
}else{
_338.callback(this.parseResults(obj));
}
});
return tf;
},generateMethod:function(_339,_33a,url){
return dojo.hitch(this,function(){
var _33b=new dojo.Deferred();
if((this.strictArgChecks)&&(_33a!=null)&&(arguments.length!=_33a.length)){
throw new Error("Invalid number of parameters for remote method.");
}else{
this.bind(_339,dojo._toArray(arguments),_33b,url);
}
return _33b;
});
},processSmd:function(_33c){
if(_33c.methods){
dojo.forEach(_33c.methods,function(m){
if(m&&m.name){
this[m.name]=this.generateMethod(m.name,m.parameters,m.url||m.serviceUrl||m.serviceURL);
if(!dojo.isFunction(this[m.name])){
throw new Error("RpcService: Failed to create"+m.name+"()");
}
}
},this);
}
this.serviceUrl=_33c.serviceUrl||_33c.serviceURL;
this.required=_33c.required;
this.smd=_33c;
}});
}
if(!dojo._hasResource["dojo.rpc.JsonService"]){
dojo._hasResource["dojo.rpc.JsonService"]=true;
dojo.provide("dojo.rpc.JsonService");
dojo.declare("dojo.rpc.JsonService",dojo.rpc.RpcService,{bustCache:false,contentType:"application/json-rpc",lastSubmissionId:0,callRemote:function(_33d,_33e){
var _33f=new dojo.Deferred();
this.bind(_33d,_33e,_33f);
return _33f;
},bind:function(_340,_341,_342,url){
var def=dojo.rawXhrPost({url:url||this.serviceUrl,postData:this.createRequest(_340,_341),contentType:this.contentType,timeout:this.timeout,handleAs:"json-comment-optional"});
def.addCallbacks(this.resultCallback(_342),this.errorCallback(_342));
},createRequest:function(_343,_344){
var req={"params":_344,"method":_343,"id":++this.lastSubmissionId};
var data=dojo.toJson(req);
return data;
},parseResults:function(obj){
if(dojo.isObject(obj)){
if("result" in obj){
return obj.result;
}
if("Result" in obj){
return obj.Result;
}
if("ResultSet" in obj){
return obj.ResultSet;
}
}
return obj;
}});
}
if(!dojo._hasResource["dojo.regexp"]){
dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.getObject("regexp",true,dojo);
dojo.regexp.escapeString=function(str,_345){
return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_345&&_345.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
dojo.regexp.buildGroupRE=function(arr,re,_346){
if(!(arr instanceof Array)){
return re(arr);
}
var b=[];
for(var i=0;i<arr.length;i++){
b.push(re(arr[i]));
}
return dojo.regexp.group(b.join("|"),_346);
};
dojo.regexp.group=function(_347,_348){
return "("+(_348?"?:":"")+_347+")";
};
}
if(!dojo._hasResource["dojo.cookie"]){
dojo._hasResource["dojo.cookie"]=true;
dojo.provide("dojo.cookie");
dojo.cookie=function(name,_349,_34a){
var c=document.cookie;
if(arguments.length==1){
var _34b=c.match(new RegExp("(?:^|; )"+dojo.regexp.escapeString(name)+"=([^;]*)"));
return _34b?decodeURIComponent(_34b[1]):undefined;
}else{
_34a=_34a||{};
var exp=_34a.expires;
if(typeof exp=="number"){
var d=new Date();
d.setTime(d.getTime()+exp*24*60*60*1000);
exp=_34a.expires=d;
}
if(exp&&exp.toUTCString){
_34a.expires=exp.toUTCString();
}
_349=encodeURIComponent(_349);
var _34c=name+"="+_349,_34d;
for(_34d in _34a){
_34c+="; "+_34d;
var _34e=_34a[_34d];
if(_34e!==true){
_34c+="="+_34e;
}
}
document.cookie=_34c;
}
};
dojo.cookie.isSupported=function(){
if(!("cookieEnabled" in navigator)){
this("__djCookieTest__","CookiesAllowed");
navigator.cookieEnabled=this("__djCookieTest__")=="CookiesAllowed";
if(navigator.cookieEnabled){
this("__djCookieTest__","",{expires:-1});
}
}
return navigator.cookieEnabled;
};
}
if(dojo.isBrowser&&(document.readyState==="complete"||dojo.config.afterOnLoad)){
window.setTimeout(dojo._loadInit,100);
}
})();
