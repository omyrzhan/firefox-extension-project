!function(e,t){"use strict";"undefined"!=typeof window&&"function"==typeof define&&define.amd?define(t):"undefined"!=typeof module&&module.exports?module.exports=t():e.exports?e.exports=t():e.Fingerprint2=t()}(this,function(){"use strict";function d(e,t){e=[e[0]>>>16,65535&e[0],e[1]>>>16,65535&e[1]],t=[t[0]>>>16,65535&t[0],t[1]>>>16,65535&t[1]];var i=[0,0,0,0];return i[3]+=e[3]+t[3],i[2]+=i[3]>>>16,i[3]&=65535,i[2]+=e[2]+t[2],i[1]+=i[2]>>>16,i[2]&=65535,i[1]+=e[1]+t[1],i[0]+=i[1]>>>16,i[1]&=65535,i[0]+=e[0]+t[0],i[0]&=65535,[i[0]<<16|i[1],i[2]<<16|i[3]]}function h(e,t){e=[e[0]>>>16,65535&e[0],e[1]>>>16,65535&e[1]],t=[t[0]>>>16,65535&t[0],t[1]>>>16,65535&t[1]];var i=[0,0,0,0];return i[3]+=e[3]*t[3],i[2]+=i[3]>>>16,i[3]&=65535,i[2]+=e[2]*t[3],i[1]+=i[2]>>>16,i[2]&=65535,i[2]+=e[3]*t[2],i[1]+=i[2]>>>16,i[2]&=65535,i[1]+=e[1]*t[3],i[0]+=i[1]>>>16,i[1]&=65535,i[1]+=e[2]*t[2],i[0]+=i[1]>>>16,i[1]&=65535,i[1]+=e[3]*t[1],i[0]+=i[1]>>>16,i[1]&=65535,i[0]+=e[0]*t[3]+e[1]*t[2]+e[2]*t[1]+e[3]*t[0],i[0]&=65535,[i[0]<<16|i[1],i[2]<<16|i[3]]}function g(e,t){return 32==(t%=64)?[e[1],e[0]]:t<32?[e[0]<<t|e[1]>>>32-t,e[1]<<t|e[0]>>>32-t]:[e[1]<<(t-=32)|e[0]>>>32-t,e[0]<<t|e[1]>>>32-t]}function f(e,t){return 0==(t%=64)?e:t<32?[e[0]<<t|e[1]>>>32-t,e[1]<<t]:[e[1]<<t-32,0]}function p(e,t){return[e[0]^t[0],e[1]^t[1]]}function m(e){return e=p(e,[0,e[0]>>>1]),e=p(e=h(e,[4283543511,3981806797]),[0,e[0]>>>1]),p(e=h(e,[3301882366,444984403]),[0,e[0]>>>1])}function s(e,t){for(var i=(e=e||"").length%16,n=e.length-i,r=[0,t=t||0],a=[0,t],o=[0,0],s=[0,0],c=[2277735313,289559509],u=[1291169091,658871167],l=0;l<n;l+=16)o=[255&e.charCodeAt(l+4)|(255&e.charCodeAt(l+5))<<8|(255&e.charCodeAt(l+6))<<16|(255&e.charCodeAt(l+7))<<24,255&e.charCodeAt(l)|(255&e.charCodeAt(l+1))<<8|(255&e.charCodeAt(l+2))<<16|(255&e.charCodeAt(l+3))<<24],s=[255&e.charCodeAt(l+12)|(255&e.charCodeAt(l+13))<<8|(255&e.charCodeAt(l+14))<<16|(255&e.charCodeAt(l+15))<<24,255&e.charCodeAt(l+8)|(255&e.charCodeAt(l+9))<<8|(255&e.charCodeAt(l+10))<<16|(255&e.charCodeAt(l+11))<<24],o=g(o=h(o,c),31),r=d(r=g(r=p(r,o=h(o,u)),27),a),r=d(h(r,[0,5]),[0,1390208809]),s=g(s=h(s,u),33),a=d(a=g(a=p(a,s=h(s,c)),31),r),a=d(h(a,[0,5]),[0,944331445]);switch(o=[0,0],s=[0,0],i){case 15:s=p(s,f([0,e.charCodeAt(l+14)],48));case 14:s=p(s,f([0,e.charCodeAt(l+13)],40));case 13:s=p(s,f([0,e.charCodeAt(l+12)],32));case 12:s=p(s,f([0,e.charCodeAt(l+11)],24));case 11:s=p(s,f([0,e.charCodeAt(l+10)],16));case 10:s=p(s,f([0,e.charCodeAt(l+9)],8));case 9:s=h(s=p(s,[0,e.charCodeAt(l+8)]),u),a=p(a,s=h(s=g(s,33),c));case 8:o=p(o,f([0,e.charCodeAt(l+7)],56));case 7:o=p(o,f([0,e.charCodeAt(l+6)],48));case 6:o=p(o,f([0,e.charCodeAt(l+5)],40));case 5:o=p(o,f([0,e.charCodeAt(l+4)],32));case 4:o=p(o,f([0,e.charCodeAt(l+3)],24));case 3:o=p(o,f([0,e.charCodeAt(l+2)],16));case 2:o=p(o,f([0,e.charCodeAt(l+1)],8));case 1:o=h(o=p(o,[0,e.charCodeAt(l)]),c),r=p(r,o=h(o=g(o,31),u))}return r=d(r=p(r,[0,e.length]),a=p(a,[0,e.length])),a=d(a,r),r=d(r=m(r),a=m(a)),a=d(a,r),("00000000"+(r[0]>>>0).toString(16)).slice(-8)+("00000000"+(r[1]>>>0).toString(16)).slice(-8)+("00000000"+(a[0]>>>0).toString(16)).slice(-8)+("00000000"+(a[1]>>>0).toString(16)).slice(-8)}function A(e,t){if(Array.prototype.forEach&&e.forEach===Array.prototype.forEach)e.forEach(t);else if(e.length===+e.length)for(var i=0,n=e.length;i<n;i++)t(e[i],i,e);else for(var r in e)e.hasOwnProperty(r)&&t(e[r],r,e)}function c(e,n){var r=[];return null==e?r:Array.prototype.map&&e.map===Array.prototype.map?e.map(n):(A(e,function(e,t,i){r.push(n(e,t,i))}),r)}function n(e){throw new Error("'new Fingerprint()' is deprecated, see https://github.com/fingerprintjs/fingerprintjs#upgrade-guide-from-182-to-200")}void 0===Array.isArray&&(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)});function r(e){if(null==navigator.plugins)return e.NOT_AVAILABLE;for(var t=[],i=0,n=navigator.plugins.length;i<n;i++)navigator.plugins[i]&&t.push(navigator.plugins[i]);return c(t=l(e)?t.sort(function(e,t){return e.name>t.name?1:e.name<t.name?-1:0}):t,function(e){var t=c(e,function(e){return[e.type,e.suffixes]});return[e.name,e.description,t]})}function i(t){if(2<=("msWriteProfilerMark"in window)+("msLaunchUri"in navigator)+("msSaveBlob"in navigator))return t.EXCLUDED;try{return!!window.indexedDB}catch(e){return t.ERROR}}function o(){var e=document.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))}function a(){if(o()&&window.WebGLRenderingContext){var e=w();if(e){try{S(e)}catch(e){}return 1}}}function w(){var e=document.createElement("canvas"),t=null;try{t=e.getContext("webgl")||e.getContext("experimental-webgl")}catch(e){}return t||null}function S(e){null!=(e=e.getExtension("WEBGL_lose_context"))&&e.loseContext()}var u={preprocessor:null,audio:{timeout:1e3,excludeIOS11:!0},fonts:{swfContainerId:"fingerprintjs2",swfPath:"flash/compiled/FontList.swf",userDefinedFonts:[],extendedJsFonts:!1},screen:{detectScreenOrientation:!0},plugins:{sortPluginsFor:[/palemoon/i],excludeIE:!1},extraComponents:[],excludes:{enumerateDevices:!0,pixelRatio:!0,doNotTrack:!0,fontsFlash:!0,adBlock:!0},NOT_AVAILABLE:"not available",ERROR:"error",EXCLUDED:"excluded"},l=function(e){for(var t=!1,i=0,n=e.plugins.sortPluginsFor.length;i<n;i++){var r=e.plugins.sortPluginsFor[i];if(navigator.userAgent.match(r)){t=!0;break}}return t},T=[{key:"userAgent",getData:function(e){e(navigator.userAgent)}},{key:"webdriver",getData:function(e,t){e(null==navigator.webdriver?t.NOT_AVAILABLE:navigator.webdriver)}},{key:"language",getData:function(e,t){e(navigator.language||navigator.userLanguage||navigator.browserLanguage||navigator.systemLanguage||t.NOT_AVAILABLE)}},{key:"colorDepth",getData:function(e,t){e(window.screen.colorDepth||t.NOT_AVAILABLE)}},{key:"deviceMemory",getData:function(e,t){e(navigator.deviceMemory||t.NOT_AVAILABLE)}},{key:"pixelRatio",getData:function(e,t){e(window.devicePixelRatio||t.NOT_AVAILABLE)}},{key:"hardwareConcurrency",getData:function(e,t){e((e=t,navigator.hardwareConcurrency||e.NOT_AVAILABLE))}},{key:"screenResolution",getData:function(e,t){e((e=[window.screen.width,window.screen.height],t.screen.detectScreenOrientation&&e.sort().reverse(),e))}},{key:"availableScreenResolution",getData:function(e,t){e((e=t,window.screen.availWidth&&window.screen.availHeight?(t=[window.screen.availHeight,window.screen.availWidth],e.screen.detectScreenOrientation&&t.sort().reverse(),t):e.NOT_AVAILABLE))}},{key:"timezoneOffset",getData:function(e){e((new Date).getTimezoneOffset())}},{key:"timezone",getData:function(e,t){window.Intl&&window.Intl.DateTimeFormat?e((new window.Intl.DateTimeFormat).resolvedOptions().timeZone||t.NOT_AVAILABLE):e(t.NOT_AVAILABLE)}},{key:"sessionStorage",getData:function(e,t){e(function(t){try{return!!window.sessionStorage}catch(e){return t.ERROR}}(t))}},{key:"localStorage",getData:function(e,t){e(function(t){try{return!!window.localStorage}catch(e){return t.ERROR}}(t))}},{key:"indexedDb",getData:function(e,t){e(i(t))}},{key:"addBehavior",getData:function(e){e(!!window.HTMLElement.prototype.addBehavior)}},{key:"openDatabase",getData:function(e){e(!!window.openDatabase)}},{key:"cpuClass",getData:function(e,t){e((e=t,navigator.cpuClass||e.NOT_AVAILABLE))}},{key:"platform",getData:function(e,t){e((e=t,navigator.platform||e.NOT_AVAILABLE))}},{key:"doNotTrack",getData:function(e,t){e((e=t,navigator.doNotTrack||navigator.msDoNotTrack||window.doNotTrack||e.NOT_AVAILABLE))}},{key:"plugins",getData:function(e,t){var i,n;"Microsoft Internet Explorer"===navigator.appName||"Netscape"===navigator.appName&&/Trident/.test(navigator.userAgent)?t.plugins.excludeIE?e(t.EXCLUDED):e((i=t,n=[],Object.getOwnPropertyDescriptor&&Object.getOwnPropertyDescriptor(window,"ActiveXObject")||"ActiveXObject"in window?n=c(["AcroPDF.PDF","Adodb.Stream","AgControl.AgControl","DevalVRXCtrl.DevalVRXCtrl.1","MacromediaFlashPaper.MacromediaFlashPaper","Msxml2.DOMDocument","Msxml2.XMLHTTP","PDF.PdfCtrl","QuickTime.QuickTime","QuickTimeCheckObject.QuickTimeCheck.1","RealPlayer","RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)","RealVideo.RealVideo(tm) ActiveX Control (32-bit)","Scripting.Dictionary","SWCtl.SWCtl","Shell.UIHelper","ShockwaveFlash.ShockwaveFlash","Skype.Detection","TDCCtl.TDCCtl","WMPlayer.OCX","rmocx.RealPlayer G2 Control","rmocx.RealPlayer G2 Control.1"],function(e){try{return new window.ActiveXObject(e),e}catch(e){return i.ERROR}}):n.push(i.NOT_AVAILABLE),n=navigator.plugins?n.concat(r(i)):n)):e(r(t))}},{key:"canvas",getData:function(e,t){var i,n,r,a;o()?e((i=t,n=[],(r=document.createElement("canvas")).width=2e3,r.height=200,r.style.display="inline",(a=r.getContext("2d")).rect(0,0,10,10),a.rect(2,2,6,6),n.push("canvas winding:"+(!1===a.isPointInPath(5,5,"evenodd")?"yes":"no")),a.textBaseline="alphabetic",a.fillStyle="#f60",a.fillRect(125,1,62,20),a.fillStyle="#069",i.dontUseFakeFontInCanvas?a.font="11pt Arial":a.font="11pt no-real-font-123",a.fillText("Cwm fjordbank glyphs vext quiz, 😃",2,15),a.fillStyle="rgba(102, 204, 0, 0.2)",a.font="18pt Arial",a.fillText("Cwm fjordbank glyphs vext quiz, 😃",4,45),a.globalCompositeOperation="multiply",a.fillStyle="rgb(255,0,255)",a.beginPath(),a.arc(50,50,50,0,2*Math.PI,!0),a.closePath(),a.fill(),a.fillStyle="rgb(0,255,255)",a.beginPath(),a.arc(100,50,50,0,2*Math.PI,!0),a.closePath(),a.fill(),a.fillStyle="rgb(255,255,0)",a.beginPath(),a.arc(75,100,50,0,2*Math.PI,!0),a.closePath(),a.fill(),a.fillStyle="rgb(255,0,255)",a.arc(75,75,75,0,2*Math.PI,!0),a.arc(75,75,25,0,2*Math.PI,!0),a.fill("evenodd"),r.toDataURL&&n.push("canvas fp:"+r.toDataURL()),n)):e(t.NOT_AVAILABLE)}},{key:"webgl",getData:function(e,t){a()?e(function(){function e(e){return a.clearColor(0,0,0,1),a.enable(a.DEPTH_TEST),a.depthFunc(a.LEQUAL),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),"["+e[0]+", "+e[1]+"]"}var a,t,i;if(!(a=w()))return null;try{var o=[],n=a.createBuffer(),r=(a.bindBuffer(a.ARRAY_BUFFER,n),new Float32Array([-.2,-.9,0,.4,-.26,0,0,.732134444,0])),s=(a.bufferData(a.ARRAY_BUFFER,r,a.STATIC_DRAW),n.itemSize=3,n.numItems=3,a.createProgram()),c=a.createShader(a.VERTEX_SHADER),u=(a.shaderSource(c,"attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"),a.compileShader(c),a.createShader(a.FRAGMENT_SHADER));a.shaderSource(u,"precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"),a.compileShader(u),a.attachShader(s,c),a.attachShader(s,u),a.linkProgram(s),a.useProgram(s),s.vertexPosAttrib=a.getAttribLocation(s,"attrVertex"),s.offsetUniform=a.getUniformLocation(s,"uniformOffset"),a.enableVertexAttribArray(s.vertexPosArray),a.vertexAttribPointer(s.vertexPosAttrib,n.itemSize,a.FLOAT,!1,0,0),a.uniform2f(s.offsetUniform,1,1),a.drawArrays(a.TRIANGLE_STRIP,0,n.numItems);try{o.push(a.canvas.toDataURL())}catch(e){}o.push("extensions:"+(a.getSupportedExtensions()||[]).join(";")),o.push("webgl aliased line width range:"+e(a.getParameter(a.ALIASED_LINE_WIDTH_RANGE))),o.push("webgl aliased point size range:"+e(a.getParameter(a.ALIASED_POINT_SIZE_RANGE))),o.push("webgl alpha bits:"+a.getParameter(a.ALPHA_BITS)),o.push("webgl antialiasing:"+(a.getContextAttributes().antialias?"yes":"no")),o.push("webgl blue bits:"+a.getParameter(a.BLUE_BITS)),o.push("webgl depth bits:"+a.getParameter(a.DEPTH_BITS)),o.push("webgl green bits:"+a.getParameter(a.GREEN_BITS)),o.push("webgl max anisotropy:"+((i=(t=a).getExtension("EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic"))?0===(t=t.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT))?2:t:null)),o.push("webgl max combined texture image units:"+a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS)),o.push("webgl max cube map texture size:"+a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE)),o.push("webgl max fragment uniform vectors:"+a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS)),o.push("webgl max render buffer size:"+a.getParameter(a.MAX_RENDERBUFFER_SIZE)),o.push("webgl max texture image units:"+a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS)),o.push("webgl max texture size:"+a.getParameter(a.MAX_TEXTURE_SIZE)),o.push("webgl max varying vectors:"+a.getParameter(a.MAX_VARYING_VECTORS)),o.push("webgl max vertex attribs:"+a.getParameter(a.MAX_VERTEX_ATTRIBS)),o.push("webgl max vertex texture image units:"+a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS)),o.push("webgl max vertex uniform vectors:"+a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS)),o.push("webgl max viewport dims:"+e(a.getParameter(a.MAX_VIEWPORT_DIMS))),o.push("webgl red bits:"+a.getParameter(a.RED_BITS)),o.push("webgl renderer:"+a.getParameter(a.RENDERER)),o.push("webgl shading language version:"+a.getParameter(a.SHADING_LANGUAGE_VERSION)),o.push("webgl stencil bits:"+a.getParameter(a.STENCIL_BITS)),o.push("webgl vendor:"+a.getParameter(a.VENDOR)),o.push("webgl version:"+a.getParameter(a.VERSION));try{var l=a.getExtension("WEBGL_debug_renderer_info");l&&(o.push("webgl unmasked vendor:"+a.getParameter(l.UNMASKED_VENDOR_WEBGL)),o.push("webgl unmasked renderer:"+a.getParameter(l.UNMASKED_RENDERER_WEBGL)))}catch(e){}return a.getShaderPrecisionFormat&&A(["FLOAT","INT"],function(r){A(["VERTEX","FRAGMENT"],function(n){A(["HIGH","MEDIUM","LOW"],function(i){A(["precision","rangeMin","rangeMax"],function(e){var t=a.getShaderPrecisionFormat(a[n+"_SHADER"],a[i+"_"+r])[e],e=("precision"!==e&&(e="precision "+e),["webgl ",n.toLowerCase()," shader ",i.toLowerCase()," ",r.toLowerCase()," ",e,":",t].join(""));o.push(e)})})})}),o}finally{try{S(a)}catch(e){}}}()):e(t.NOT_AVAILABLE)}},{key:"webglVendorAndRenderer",getData:function(e){a()?e(function(){try{var e=w(),t=e.getExtension("WEBGL_debug_renderer_info");return e.getParameter(t.UNMASKED_VENDOR_WEBGL)+"~"+e.getParameter(t.UNMASKED_RENDERER_WEBGL)}catch(e){return null}finally{try{S(e)}catch(e){}}}()):e()}},{key:"adBlock",getData:function(e){e(function(){var e=document.createElement("div"),t=(e.innerHTML="&nbsp;",!(e.className="adsbox"));try{document.body.appendChild(e),t=0===document.getElementsByClassName("adsbox")[0].offsetHeight,document.body.removeChild(e)}catch(e){t=!1}return t}())}},{key:"hasLiedLanguages",getData:function(e){e(function(){if(void 0!==navigator.languages)try{if(navigator.languages[0].substr(0,2)!==navigator.language.substr(0,2))return!0}catch(e){return!0}return!1}())}},{key:"hasLiedResolution",getData:function(e){e(window.screen.width<window.screen.availWidth||window.screen.height<window.screen.availHeight)}},{key:"hasLiedOs",getData:function(e){e(function(){var e=navigator.userAgent.toLowerCase(),t=navigator.oscpu,i=navigator.platform.toLowerCase(),n=0<=e.indexOf("windows phone")?"Windows Phone":0<=e.indexOf("windows")||0<=e.indexOf("win16")||0<=e.indexOf("win32")||0<=e.indexOf("win64")||0<=e.indexOf("win95")||0<=e.indexOf("win98")||0<=e.indexOf("winnt")||0<=e.indexOf("wow64")?"Windows":0<=e.indexOf("android")?"Android":0<=e.indexOf("linux")||0<=e.indexOf("cros")||0<=e.indexOf("x11")?"Linux":0<=e.indexOf("iphone")||0<=e.indexOf("ipad")||0<=e.indexOf("ipod")||0<=e.indexOf("crios")||0<=e.indexOf("fxios")?"iOS":0<=e.indexOf("macintosh")||0<=e.indexOf("mac_powerpc)")?"Mac":"Other";if(("ontouchstart"in window||0<navigator.maxTouchPoints||0<navigator.msMaxTouchPoints)&&"Windows"!=n&&"Windows Phone"!=n&&"Android"!=n&&"iOS"!=n&&"Other"!=n&&-1===e.indexOf("cros"))return!0;if(void 0!==t){if(0<=(t=t.toLowerCase()).indexOf("win")&&"Windows"!=n&&"Windows Phone"!=n)return!0;if(0<=t.indexOf("linux")&&"Linux"!=n&&"Android"!=n)return!0;if(0<=t.indexOf("mac")&&"Mac"!=n&&"iOS"!=n)return!0;if((-1===t.indexOf("win")&&-1===t.indexOf("linux")&&-1===t.indexOf("mac"))!=("Other"==n))return!0}return 0<=i.indexOf("win")&&"Windows"!=n&&"Windows Phone"!=n||(0<=i.indexOf("linux")||0<=i.indexOf("android")||0<=i.indexOf("pike"))&&"Linux"!=n&&"Android"!=n||(0<=i.indexOf("mac")||0<=i.indexOf("ipad")||0<=i.indexOf("ipod")||0<=i.indexOf("iphone"))&&"Mac"!=n&&"iOS"!=n||!(0<=i.indexOf("arm")&&"Windows Phone"==n)&&!(0<=i.indexOf("pike")&&0<=e.indexOf("opera mini"))&&((i.indexOf("win")<0&&i.indexOf("linux")<0&&i.indexOf("mac")<0&&i.indexOf("iphone")<0&&i.indexOf("ipad")<0&&i.indexOf("ipod")<0)!=("Other"==n)||void 0===navigator.plugins&&"Windows"!=n&&"Windows Phone"!=n)}())}},{key:"hasLiedBrowser",getData:function(e){e(function(){var e,t=navigator.userAgent.toLowerCase(),i=navigator.productSub;if(0<=t.indexOf("edge/")||0<=t.indexOf("iemobile/"))return!1;if(0<=t.indexOf("opera mini"))return!1;if(("Chrome"==(e=0<=t.indexOf("firefox/")?"Firefox":0<=t.indexOf("opera/")||0<=t.indexOf(" opr/")?"Opera":0<=t.indexOf("chrome/")?"Chrome":0<=t.indexOf("safari/")?0<=t.indexOf("android 1.")||0<=t.indexOf("android 2.")||0<=t.indexOf("android 3.")||0<=t.indexOf("android 4.")?"AOSP":"Safari":0<=t.indexOf("trident/")?"Internet Explorer":"Other")||"Safari"==e||"Opera"==e)&&"20030107"!==i)return!0;var n,t=eval.toString().length;if(37===t&&"Safari"!=e&&"Firefox"!=e&&"Other"!=e)return!0;if(39===t&&"Internet Explorer"!=e&&"Other"!=e)return!0;if(33===t&&"Chrome"!=e&&"AOSP"!=e&&"Opera"!=e&&"Other"!=e)return!0;try{throw"a"}catch(e){try{e.toSource(),n=!0}catch(e){n=!1}}return n&&"Firefox"!=e&&"Other"!=e}())}},{key:"touchSupport",getData:function(e){e(function(){var e,t=0;void 0!==navigator.maxTouchPoints?t=navigator.maxTouchPoints:void 0!==navigator.msMaxTouchPoints&&(t=navigator.msMaxTouchPoints);try{document.createEvent("TouchEvent"),e=!0}catch(t){e=!1}return[t,e,"ontouchstart"in window]}())}},{key:"fonts",getData:function(e,t){var u=["monospace","sans-serif","serif"],l=["Andale Mono","Arial","Arial Black","Arial Hebrew","Arial MT","Arial Narrow","Arial Rounded MT Bold","Arial Unicode MS","Bitstream Vera Sans Mono","Book Antiqua","Bookman Old Style","Calibri","Cambria","Cambria Math","Century","Century Gothic","Century Schoolbook","Comic Sans","Comic Sans MS","Consolas","Courier","Courier New","Geneva","Georgia","Helvetica","Helvetica Neue","Impact","Lucida Bright","Lucida Calligraphy","Lucida Console","Lucida Fax","LUCIDA GRANDE","Lucida Handwriting","Lucida Sans","Lucida Sans Typewriter","Lucida Sans Unicode","Microsoft Sans Serif","Monaco","Monotype Corsiva","MS Gothic","MS Outlook","MS PGothic","MS Reference Sans Serif","MS Sans Serif","MS Serif","MYRIAD","MYRIAD PRO","Palatino","Palatino Linotype","Segoe Print","Segoe Script","Segoe UI","Segoe UI Light","Segoe UI Semibold","Segoe UI Symbol","Tahoma","Times","Times New Roman","Times New Roman PS","Trebuchet MS","Verdana","Wingdings","Wingdings 2","Wingdings 3"];function d(){var e=document.createElement("span");return e.style.position="absolute",e.style.left="-9999px",e.style.fontSize="72px",e.style.fontStyle="normal",e.style.fontWeight="normal",e.style.letterSpacing="normal",e.style.lineBreak="auto",e.style.lineHeight="normal",e.style.textTransform="none",e.style.textAlign="left",e.style.textDecoration="none",e.style.textShadow="none",e.style.whiteSpace="normal",e.style.wordBreak="normal",e.style.wordSpacing="normal",e.innerHTML="mmmmmmmmmmlli",e}var l=(l=(l=t.fonts.extendedJsFonts?l.concat(["Abadi MT Condensed Light","Academy Engraved LET","ADOBE CASLON PRO","Adobe Garamond","ADOBE GARAMOND PRO","Agency FB","Aharoni","Albertus Extra Bold","Albertus Medium","Algerian","Amazone BT","American Typewriter","American Typewriter Condensed","AmerType Md BT","Andalus","Angsana New","AngsanaUPC","Antique Olive","Aparajita","Apple Chancery","Apple Color Emoji","Apple SD Gothic Neo","Arabic Typesetting","ARCHER","ARNO PRO","Arrus BT","Aurora Cn BT","AvantGarde Bk BT","AvantGarde Md BT","AVENIR","Ayuthaya","Bandy","Bangla Sangam MN","Bank Gothic","BankGothic Md BT","Baskerville","Baskerville Old Face","Batang","BatangChe","Bauer Bodoni","Bauhaus 93","Bazooka","Bell MT","Bembo","Benguiat Bk BT","Berlin Sans FB","Berlin Sans FB Demi","Bernard MT Condensed","BernhardFashion BT","BernhardMod BT","Big Caslon","BinnerD","Blackadder ITC","BlairMdITC TT","Bodoni 72","Bodoni 72 Oldstyle","Bodoni 72 Smallcaps","Bodoni MT","Bodoni MT Black","Bodoni MT Condensed","Bodoni MT Poster Compressed","Bookshelf Symbol 7","Boulder","Bradley Hand","Bradley Hand ITC","Bremen Bd BT","Britannic Bold","Broadway","Browallia New","BrowalliaUPC","Brush Script MT","Californian FB","Calisto MT","Calligrapher","Candara","CaslonOpnface BT","Castellar","Centaur","Cezanne","CG Omega","CG Times","Chalkboard","Chalkboard SE","Chalkduster","Charlesworth","Charter Bd BT","Charter BT","Chaucer","ChelthmITC Bk BT","Chiller","Clarendon","Clarendon Condensed","CloisterBlack BT","Cochin","Colonna MT","Constantia","Cooper Black","Copperplate","Copperplate Gothic","Copperplate Gothic Bold","Copperplate Gothic Light","CopperplGoth Bd BT","Corbel","Cordia New","CordiaUPC","Cornerstone","Coronet","Cuckoo","Curlz MT","DaunPenh","Dauphin","David","DB LCD Temp","DELICIOUS","Denmark","DFKai-SB","Didot","DilleniaUPC","DIN","DokChampa","Dotum","DotumChe","Ebrima","Edwardian Script ITC","Elephant","English 111 Vivace BT","Engravers MT","EngraversGothic BT","Eras Bold ITC","Eras Demi ITC","Eras Light ITC","Eras Medium ITC","EucrosiaUPC","Euphemia","Euphemia UCAS","EUROSTILE","Exotc350 Bd BT","FangSong","Felix Titling","Fixedsys","FONTIN","Footlight MT Light","Forte","FrankRuehl","Fransiscan","Freefrm721 Blk BT","FreesiaUPC","Freestyle Script","French Script MT","FrnkGothITC Bk BT","Fruitger","FRUTIGER","Futura","Futura Bk BT","Futura Lt BT","Futura Md BT","Futura ZBlk BT","FuturaBlack BT","Gabriola","Galliard BT","Gautami","Geeza Pro","Geometr231 BT","Geometr231 Hv BT","Geometr231 Lt BT","GeoSlab 703 Lt BT","GeoSlab 703 XBd BT","Gigi","Gill Sans","Gill Sans MT","Gill Sans MT Condensed","Gill Sans MT Ext Condensed Bold","Gill Sans Ultra Bold","Gill Sans Ultra Bold Condensed","Gisha","Gloucester MT Extra Condensed","GOTHAM","GOTHAM BOLD","Goudy Old Style","Goudy Stout","GoudyHandtooled BT","GoudyOLSt BT","Gujarati Sangam MN","Gulim","GulimChe","Gungsuh","GungsuhChe","Gurmukhi MN","Haettenschweiler","Harlow Solid Italic","Harrington","Heather","Heiti SC","Heiti TC","HELV","Herald","High Tower Text","Hiragino Kaku Gothic ProN","Hiragino Mincho ProN","Hoefler Text","Humanst 521 Cn BT","Humanst521 BT","Humanst521 Lt BT","Imprint MT Shadow","Incised901 Bd BT","Incised901 BT","Incised901 Lt BT","INCONSOLATA","Informal Roman","Informal011 BT","INTERSTATE","IrisUPC","Iskoola Pota","JasmineUPC","Jazz LET","Jenson","Jester","Jokerman","Juice ITC","Kabel Bk BT","Kabel Ult BT","Kailasa","KaiTi","Kalinga","Kannada Sangam MN","Kartika","Kaufmann Bd BT","Kaufmann BT","Khmer UI","KodchiangUPC","Kokila","Korinna BT","Kristen ITC","Krungthep","Kunstler Script","Lao UI","Latha","Leelawadee","Letter Gothic","Levenim MT","LilyUPC","Lithograph","Lithograph Light","Long Island","Lydian BT","Magneto","Maiandra GD","Malayalam Sangam MN","Malgun Gothic","Mangal","Marigold","Marion","Marker Felt","Market","Marlett","Matisse ITC","Matura MT Script Capitals","Meiryo","Meiryo UI","Microsoft Himalaya","Microsoft JhengHei","Microsoft New Tai Lue","Microsoft PhagsPa","Microsoft Tai Le","Microsoft Uighur","Microsoft YaHei","Microsoft Yi Baiti","MingLiU","MingLiU_HKSCS","MingLiU_HKSCS-ExtB","MingLiU-ExtB","Minion","Minion Pro","Miriam","Miriam Fixed","Mistral","Modern","Modern No. 20","Mona Lisa Solid ITC TT","Mongolian Baiti","MONO","MoolBoran","Mrs Eaves","MS LineDraw","MS Mincho","MS PMincho","MS Reference Specialty","MS UI Gothic","MT Extra","MUSEO","MV Boli","Nadeem","Narkisim","NEVIS","News Gothic","News GothicMT","NewsGoth BT","Niagara Engraved","Niagara Solid","Noteworthy","NSimSun","Nyala","OCR A Extended","Old Century","Old English Text MT","Onyx","Onyx BT","OPTIMA","Oriya Sangam MN","OSAKA","OzHandicraft BT","Palace Script MT","Papyrus","Parchment","Party LET","Pegasus","Perpetua","Perpetua Titling MT","PetitaBold","Pickwick","Plantagenet Cherokee","Playbill","PMingLiU","PMingLiU-ExtB","Poor Richard","Poster","PosterBodoni BT","PRINCETOWN LET","Pristina","PTBarnum BT","Pythagoras","Raavi","Rage Italic","Ravie","Ribbon131 Bd BT","Rockwell","Rockwell Condensed","Rockwell Extra Bold","Rod","Roman","Sakkal Majalla","Santa Fe LET","Savoye LET","Sceptre","Script","Script MT Bold","SCRIPTINA","Serifa","Serifa BT","Serifa Th BT","ShelleyVolante BT","Sherwood","Shonar Bangla","Showcard Gothic","Shruti","Signboard","SILKSCREEN","SimHei","Simplified Arabic","Simplified Arabic Fixed","SimSun","SimSun-ExtB","Sinhala Sangam MN","Sketch Rockwell","Skia","Small Fonts","Snap ITC","Snell Roundhand","Socket","Souvenir Lt BT","Staccato222 BT","Steamer","Stencil","Storybook","Styllo","Subway","Swis721 BlkEx BT","Swiss911 XCm BT","Sylfaen","Synchro LET","System","Tamil Sangam MN","Technical","Teletype","Telugu Sangam MN","Tempus Sans ITC","Terminal","Thonburi","Traditional Arabic","Trajan","TRAJAN PRO","Tristan","Tubular","Tunga","Tw Cen MT","Tw Cen MT Condensed","Tw Cen MT Condensed Extra Bold","TypoUpright BT","Unicorn","Univers","Univers CE 55 Medium","Univers Condensed","Utsaah","Vagabond","Vani","Vijaya","Viner Hand ITC","VisualUI","Vivaldi","Vladimir Script","Vrinda","Westminster","WHITNEY","Wide Latin","ZapfEllipt BT","ZapfHumnst BT","ZapfHumnst Dm BT","Zapfino","Zurich BlkEx BT","Zurich Ex BT","ZWAdobeF"]):l).concat(t.fonts.userDefinedFonts)).filter(function(e,t){return l.indexOf(e)===t}),t=document.getElementsByTagName("body")[0],r=document.createElement("div"),h=document.createElement("div"),n={},a={},i=function(){for(var e=[],t=0,i=u.length;t<i;t++){var n=d();n.style.fontFamily=u[t],r.appendChild(n),e.push(n)}return e}();t.appendChild(r);for(var o=0,s=u.length;o<s;o++)n[u[o]]=i[o].offsetWidth,a[u[o]]=i[o].offsetHeight;var c=function(){for(var e,t,i={},n=0,r=l.length;n<r;n++){for(var a=[],o=0,s=u.length;o<s;o++){c=l[n],e=u[o],t=void 0,(t=d()).style.fontFamily="'"+c+"',"+e;var c=t;h.appendChild(c),a.push(c)}i[l[n]]=a}return i}();t.appendChild(h);for(var g=[],f=0,p=l.length;f<p;f++)!function(e){for(var t=!1,i=0;i<u.length;i++)if(t=e[i].offsetWidth!==n[u[i]]||e[i].offsetHeight!==a[u[i]])return t;return t}(c[l[f]])||g.push(l[f]);t.removeChild(h),t.removeChild(r),e(g)},pauseBefore:!0},{key:"fontsFlash",getData:function(t,e){return void 0!==window.swfobject?window.swfobject.hasFlashPlayerVersion("9.0.0")?e.fonts.swfPath?(i=function(e){t(e)},e=e,n="___fp_swf_loaded",window[n]=function(e){i(e)},r=e.fonts.swfContainerId,(a=document.createElement("div")).setAttribute("id",(void 0).fonts.swfContainerId),document.body.appendChild(a),a={onReady:n},void window.swfobject.embedSWF(e.fonts.swfPath,r,"1","1","9.0.0",!1,a,{allowScriptAccess:"always",menu:"false"},{})):t("missing options.fonts.swfPath"):t("flash not installed"):t("swf object not loaded");var i,n,r,a},pauseBefore:!0},{key:"audio",getData:function(i,e){var t,n,r,a,o,s=e.audio;return s.excludeIOS11&&navigator.userAgent.match(/OS 11.+Version\/11.+Safari/)?i(e.EXCLUDED):null==(t=window.OfflineAudioContext||window.webkitOfflineAudioContext)?i(e.NOT_AVAILABLE):(n=new t(1,44100,44100),(r=n.createOscillator()).type="triangle",r.frequency.setValueAtTime(1e4,n.currentTime),a=n.createDynamicsCompressor(),A([["threshold",-50],["knee",40],["ratio",12],["reduction",-20],["attack",0],["release",.25]],function(e){void 0!==a[e[0]]&&"function"==typeof a[e[0]].setValueAtTime&&a[e[0]].setValueAtTime(e[1],n.currentTime)}),r.connect(a),a.connect(n.destination),r.start(0),n.startRendering(),o=setTimeout(function(){return console.warn('Audio fingerprint timed out. Please report bug at https://github.com/fingerprintjs/fingerprintjs with your user agent: "'+navigator.userAgent+'".'),n.oncomplete=function(){},n=null,i("audioTimeout")},s.timeout),void(n.oncomplete=function(e){var t;try{clearTimeout(o),t=e.renderedBuffer.getChannelData(0).slice(4500,5e3).reduce(function(e,t){return e+Math.abs(t)},0).toString(),r.disconnect(),a.disconnect()}catch(e){return void i(e)}i(t)}))}},{key:"enumerateDevices",getData:function(t,e){if(!navigator.mediaDevices||!navigator.mediaDevices.enumerateDevices)return t(e.NOT_AVAILABLE);navigator.mediaDevices.enumerateDevices().then(function(e){t(e.map(function(e){return"id="+e.deviceId+";gid="+e.groupId+";"+e.kind+";"+e.label}))}).catch(function(e){t(e)})}}];return n.get=function(i,n){var e,t,r=i=n?i||{}:(n=i,{}),a=u;if(null!=a)for(t in a)null==(e=a[t])||Object.prototype.hasOwnProperty.call(r,t)||(r[t]=e);i.components=i.extraComponents.concat(T);function o(e){if((c+=1)>=i.components.length)n(s.data);else{var t=i.components[c];if(i.excludes[t.key])o(!1);else if(!e&&t.pauseBefore)--c,setTimeout(function(){o(!0)},1);else try{t.getData(function(e){s.addPreprocessedComponent(t.key,e),o(!1)},i)}catch(e){s.addPreprocessedComponent(t.key,String(e)),o(!1)}}}var s={data:[],addPreprocessedComponent:function(e,t){"function"==typeof i.preprocessor&&(t=i.preprocessor(e,t)),s.data.push({key:e,value:t})}},c=-1;o(!1)},n.getPromise=function(i){return new Promise(function(e,t){n.get(i,e)})},n.getV18=function(a,o){return null==o&&(o=a,a={}),n.get(a,function(e){for(var t=[],i=0;i<e.length;i++){var n=e[i];n.value===(a.NOT_AVAILABLE||"not available")?t.push({key:n.key,value:"unknown"}):"plugins"===n.key?t.push({key:"plugins",value:c(n.value,function(e){var t=c(e[2],function(e){return e.join?e.join("~"):e}).join(",");return[e[0],e[1],t].join("::")})}):-1!==["canvas","webgl"].indexOf(n.key)&&Array.isArray(n.value)?t.push({key:n.key,value:n.value.join("~")}):-1!==["sessionStorage","localStorage","indexedDb","addBehavior","openDatabase"].indexOf(n.key)?n.value&&t.push({key:n.key,value:1}):n.value?t.push(n.value.join?{key:n.key,value:n.value.join(";")}:n):t.push({key:n.key,value:n.value})}var r=s(c(t,function(e){return e.value}).join("~~~"),31);o(r,t)})},n.x64hash128=s,n.VERSION="2.1.5",n}),!function(e){"use strict";function n(e){var t,i={version:!1,language:!1,platform:!0,os:!0,pixelDepth:!0,colorDepth:!0,resolution:!1,isAuthoritative:!0,silkAccelerated:!0,isKindleFire:!0,isDesktop:!0,isMobile:!0,isTablet:!0,isWindows:!0,isLinux:!0,isLinux64:!0,isChromeOS:!0,isMac:!0,isiPad:!0,isiPhone:!0,isiPod:!0,isAndroid:!0,isSamsung:!0,isSmartTV:!0,isRaspberry:!0,isBlackberry:!0,isTouchScreen:!0,isOpera:!1,isIE:!1,isEdge:!1,isIECompatibilityMode:!1,isSafari:!1,isFirefox:!1,isWebkit:!1,isChrome:!1,isKonqueror:!1,isOmniWeb:!1,isSeaMonkey:!1,isFlock:!1,isAmaya:!1,isPhantomJS:!1,isEpiphany:!1,source:!1,cpuCores:!1};for(t in e=e||{})e.hasOwnProperty(t)&&void 0!==i[t]&&(i[t]=e[t]);return this.options=i,this.version="1.0.0",this._Versions={Edge:/Edge\/([\d\w\.\-]+)/i,Firefox:/firefox\/([\d\w\.\-]+)/i,IE:/msie\s([\d\.]+[\d])|trident\/\d+\.\d+;.*[rv:]+(\d+\.\d)/i,Chrome:/chrome\/([\d\w\.\-]+)/i,Chromium:/(?:chromium|crios)\/([\d\w\.\-]+)/i,Safari:/version\/([\d\w\.\-]+)/i,Opera:/version\/([\d\w\.\-]+)|OPR\/([\d\w\.\-]+)/i,Ps3:/([\d\w\.\-]+)\)\s*$/i,Psp:/([\d\w\.\-]+)\)?\s*$/i,Amaya:/amaya\/([\d\w\.\-]+)/i,SeaMonkey:/seamonkey\/([\d\w\.\-]+)/i,OmniWeb:/omniweb\/v([\d\w\.\-]+)/i,Flock:/flock\/([\d\w\.\-]+)/i,Epiphany:/epiphany\/([\d\w\.\-]+)/i,WinJs:/msapphost\/([\d\w\.\-]+)/i,PhantomJS:/phantomjs\/([\d\w\.\-]+)/i,UC:/UCBrowser\/([\d\w\.]+)/i},this._Browsers={Edge:/edge/i,Amaya:/amaya/i,Konqueror:/konqueror/i,Epiphany:/epiphany/i,SeaMonkey:/seamonkey/i,Flock:/flock/i,OmniWeb:/omniweb/i,Chromium:/chromium|crios/i,Chrome:/chrome/i,Safari:/safari/i,IE:/msie|trident/i,Opera:/opera|OPR/i,PS3:/playstation 3/i,PSP:/playstation portable/i,Firefox:/firefox/i,WinJs:/msapphost/i,PhantomJS:/phantomjs/i,UC:/UCBrowser/i},this._OS={Windows10:/windows nt 10\.0/i,Windows81:/windows nt 6\.3/i,Windows8:/windows nt 6\.2/i,Windows7:/windows nt 6\.1/i,UnknownWindows:/windows nt 6\.\d+/i,WindowsVista:/windows nt 6\.0/i,Windows2003:/windows nt 5\.2/i,WindowsXP:/windows nt 5\.1/i,Windows2000:/windows nt 5\.0/i,WindowsPhone8:/windows phone 8\./,OSXCheetah:/os x 10[._]0/i,OSXPuma:/os x 10[._]1(\D|$)/i,OSXJaguar:/os x 10[._]2/i,OSXPanther:/os x 10[._]3/i,OSXTiger:/os x 10[._]4/i,OSXLeopard:/os x 10[._]5/i,OSXSnowLeopard:/os x 10[._]6/i,OSXLion:/os x 10[._]7/i,OSXMountainLion:/os x 10[._]8/i,OSXMavericks:/os x 10[._]9/i,OSXYosemite:/os x 10[._]10/i,OSXElCapitan:/os x 10[._]11/i,OSXSierra:/os x 10[._]12/i,Mac:/os x/i,Linux:/linux/i,Linux64:/linux x86_64/i,ChromeOS:/cros/i,Wii:/wii/i,PS3:/playstation 3/i,PSP:/playstation portable/i,iPad:/\(iPad.*os (\d+)[._](\d+)/i,iPhone:/\(iPhone.*os (\d+)[._](\d+)/i,Bada:/Bada\/(\d+)\.(\d+)/i,Curl:/curl\/(\d+)\.(\d+)\.(\d+)/i},this._Platform={Windows:/windows nt/i,WindowsPhone:/windows phone/i,Mac:/macintosh/i,Linux:/linux/i,Wii:/wii/i,Playstation:/playstation/i,iPad:/ipad/i,iPod:/ipod/i,iPhone:/iphone/i,Android:/android/i,Blackberry:/blackberry/i,Samsung:/samsung/i,Curl:/curl/i},this.DefaultAgent={isAuthoritative:!0,isMobile:!1,isTablet:!1,isiPad:!1,isiPod:!1,isiPhone:!1,isAndroid:!1,isBlackberry:!1,isOpera:!1,isIE:!1,isEdge:!1,isIECompatibilityMode:!1,isSafari:!1,isFirefox:!1,isWebkit:!1,isChrome:!1,isKonqueror:!1,isOmniWeb:!1,isSeaMonkey:!1,isFlock:!1,isAmaya:!1,isPhantomJS:!1,isEpiphany:!1,isDesktop:!1,isWindows:!1,isLinux:!1,isLinux64:!1,isMac:!1,isChromeOS:!1,isBada:!1,isSamsung:!1,isRaspberry:!1,isBot:!1,isCurl:!1,isAndroidTablet:!1,isWinJs:!1,isKindleFire:!1,isSilk:!1,isCaptive:!1,isSmartTV:!1,isUC:!1,isTouchScreen:!1,silkAccelerated:!1,colorDepth:-1,pixelDepth:-1,resolution:[],cpuCores:-1,language:"unknown",browser:"unknown",version:"unknown",os:"unknown",platform:"unknown",geoIp:{},source:"",hashInt:function(e){var t,i,n=0;if(0!==e.length)for(t=0,i=e.length;t<i;t++)n=(n<<5)-n+e.charCodeAt(t),n|=0;return n},hashMD5:function(e){function s(e,t){return e<<t|e>>>32-t}function c(e,t){var i=2147483648&e,n=2147483648&t,r=1073741824&e,a=1073741824&t,e=(1073741823&e)+(1073741823&t);return r&a?2147483648^e^i^n:r|a?1073741824&e?3221225472^e^i^n:1073741824^e^i^n:e^i^n}function t(e,t,i,n,r,a,o){return e=c(e,c(c(t&i|~t&n,r),o)),c(s(e,a),t)}function i(e,t,i,n,r,a,o){return e=c(e,c(c(t&n|i&~n,r),o)),c(s(e,a),t)}function n(e,t,i,n,r,a,o){return e=c(e,c(c(t^i^n,r),o)),c(s(e,a),t)}function r(e,t,i,n,r,a,o){return e=c(e,c(c(i^(t|~n),r),o)),c(s(e,a),t)}function a(e){for(var t="",i="",n=0;n<=3;n++)t+=(i="0"+(e>>>8*n&255).toString(16)).substr(i.length-2,2);return t}for(var o,u,l,d,h=function(e){for(var t,i=e.length,n=16*(1+((n=i+8)-n%64)/64),r=new Array(n-1),a=0,o=0;o<i;)a=o%4*8,r[t=(o-o%4)/4]=r[t]|e.charCodeAt(o)<<a,o++;return r[t=(o-o%4)/4]=r[t]|128<<(a=o%4*8),r[n-2]=i<<3,r[n-1]=i>>>29,r}(e=function(e){e=e.replace(/\r\n/g,"\n");for(var t="",i=0;i<e.length;i++){var n=e.charCodeAt(i);n<128?t+=String.fromCharCode(n):(127<n&&n<2048?t+=String.fromCharCode(n>>6|192):t=(t+=String.fromCharCode(n>>12|224))+String.fromCharCode(n>>6&63|128),t+=String.fromCharCode(63&n|128))}return t}(e)),g=1732584193,f=4023233417,p=2562383102,m=271733878,A=0;A<h.length;A+=16)g=t(o=g,u=f,l=p,d=m,h[A+0],7,3614090360),m=t(m,g,f,p,h[A+1],12,3905402710),p=t(p,m,g,f,h[A+2],17,606105819),f=t(f,p,m,g,h[A+3],22,3250441966),g=t(g,f,p,m,h[A+4],7,4118548399),m=t(m,g,f,p,h[A+5],12,1200080426),p=t(p,m,g,f,h[A+6],17,2821735955),f=t(f,p,m,g,h[A+7],22,4249261313),g=t(g,f,p,m,h[A+8],7,1770035416),m=t(m,g,f,p,h[A+9],12,2336552879),p=t(p,m,g,f,h[A+10],17,4294925233),f=t(f,p,m,g,h[A+11],22,2304563134),g=t(g,f,p,m,h[A+12],7,1804603682),m=t(m,g,f,p,h[A+13],12,4254626195),p=t(p,m,g,f,h[A+14],17,2792965006),g=i(g,f=t(f,p,m,g,h[A+15],22,1236535329),p,m,h[A+1],5,4129170786),m=i(m,g,f,p,h[A+6],9,3225465664),p=i(p,m,g,f,h[A+11],14,643717713),f=i(f,p,m,g,h[A+0],20,3921069994),g=i(g,f,p,m,h[A+5],5,3593408605),m=i(m,g,f,p,h[A+10],9,38016083),p=i(p,m,g,f,h[A+15],14,3634488961),f=i(f,p,m,g,h[A+4],20,3889429448),g=i(g,f,p,m,h[A+9],5,568446438),m=i(m,g,f,p,h[A+14],9,3275163606),p=i(p,m,g,f,h[A+3],14,4107603335),f=i(f,p,m,g,h[A+8],20,1163531501),g=i(g,f,p,m,h[A+13],5,2850285829),m=i(m,g,f,p,h[A+2],9,4243563512),p=i(p,m,g,f,h[A+7],14,1735328473),g=n(g,f=i(f,p,m,g,h[A+12],20,2368359562),p,m,h[A+5],4,4294588738),m=n(m,g,f,p,h[A+8],11,2272392833),p=n(p,m,g,f,h[A+11],16,1839030562),f=n(f,p,m,g,h[A+14],23,4259657740),g=n(g,f,p,m,h[A+1],4,2763975236),m=n(m,g,f,p,h[A+4],11,1272893353),p=n(p,m,g,f,h[A+7],16,4139469664),f=n(f,p,m,g,h[A+10],23,3200236656),g=n(g,f,p,m,h[A+13],4,681279174),m=n(m,g,f,p,h[A+0],11,3936430074),p=n(p,m,g,f,h[A+3],16,3572445317),f=n(f,p,m,g,h[A+6],23,76029189),g=n(g,f,p,m,h[A+9],4,3654602809),m=n(m,g,f,p,h[A+12],11,3873151461),p=n(p,m,g,f,h[A+15],16,530742520),g=r(g,f=n(f,p,m,g,h[A+2],23,3299628645),p,m,h[A+0],6,4096336452),m=r(m,g,f,p,h[A+7],10,1126891415),p=r(p,m,g,f,h[A+14],15,2878612391),f=r(f,p,m,g,h[A+5],21,4237533241),g=r(g,f,p,m,h[A+12],6,1700485571),m=r(m,g,f,p,h[A+3],10,2399980690),p=r(p,m,g,f,h[A+10],15,4293915773),f=r(f,p,m,g,h[A+1],21,2240044497),g=r(g,f,p,m,h[A+8],6,1873313359),m=r(m,g,f,p,h[A+15],10,4264355552),p=r(p,m,g,f,h[A+6],15,2734768916),f=r(f,p,m,g,h[A+13],21,1309151649),g=r(g,f,p,m,h[A+4],6,4149444226),m=r(m,g,f,p,h[A+11],10,3174756917),p=r(p,m,g,f,h[A+2],15,718787259),f=r(f,p,m,g,h[A+9],21,3951481745),g=c(g,o),f=c(f,u),p=c(p,l),m=c(m,d);return(a(g)+a(f)+a(p)+a(m)).toLowerCase()}},this.Agent={},this.getBrowser=function(e){switch(!0){case this._Browsers.Edge.test(e):return this.Agent.isEdge=!0,"Edge";case this._Browsers.PhantomJS.test(e):return this.Agent.isPhantomJS=!0,"PhantomJS";case this._Browsers.Konqueror.test(e):return this.Agent.isKonqueror=!0,"Konqueror";case this._Browsers.Amaya.test(e):return this.Agent.isAmaya=!0,"Amaya";case this._Browsers.Epiphany.test(e):return this.Agent.isEpiphany=!0,"Epiphany";case this._Browsers.SeaMonkey.test(e):return this.Agent.isSeaMonkey=!0,"SeaMonkey";case this._Browsers.Flock.test(e):return this.Agent.isFlock=!0,"Flock";case this._Browsers.OmniWeb.test(e):return this.Agent.isOmniWeb=!0,"OmniWeb";case this._Browsers.Opera.test(e):return this.Agent.isOpera=!0,"Opera";case this._Browsers.Chromium.test(e):return this.Agent.isChrome=!0,"Chromium";case this._Browsers.Chrome.test(e):return this.Agent.isChrome=!0,"Chrome";case this._Browsers.Safari.test(e):return this.Agent.isSafari=!0,"Safari";case this._Browsers.WinJs.test(e):return this.Agent.isWinJs=!0,"WinJs";case this._Browsers.IE.test(e):return this.Agent.isIE=!0,"IE";case this._Browsers.PS3.test(e):return"ps3";case this._Browsers.PSP.test(e):return"psp";case this._Browsers.Firefox.test(e):return this.Agent.isFirefox=!0,"Firefox";case this._Browsers.UC.test(e):return this.Agent.isUC=!0,"UCBrowser";default:return 0!==e.indexOf("Mozilla")&&/^([\d\w\-\.]+)\/[\d\w\.\-]+/i.test(e)?(this.Agent.isAuthoritative=!1,RegExp.$1):"unknown"}},this.getBrowserVersion=function(e){switch(this.Agent.browser){case"Edge":if(this._Versions.Edge.test(e))return RegExp.$1;break;case"PhantomJS":if(this._Versions.PhantomJS.test(e))return RegExp.$1;break;case"Chrome":if(this._Versions.Chrome.test(e))return RegExp.$1;break;case"Chromium":if(this._Versions.Chromium.test(e))return RegExp.$1;break;case"Safari":if(this._Versions.Safari.test(e))return RegExp.$1;break;case"Opera":if(this._Versions.Opera.test(e))return RegExp.$1||RegExp.$2;break;case"Firefox":if(this._Versions.Firefox.test(e))return RegExp.$1;break;case"WinJs":if(this._Versions.WinJs.test(e))return RegExp.$1;break;case"IE":if(this._Versions.IE.test(e))return RegExp.$2||RegExp.$1;break;case"ps3":if(this._Versions.Ps3.test(e))return RegExp.$1;break;case"psp":if(this._Versions.Psp.test(e))return RegExp.$1;break;case"Amaya":if(this._Versions.Amaya.test(e))return RegExp.$1;break;case"Epiphany":if(this._Versions.Epiphany.test(e))return RegExp.$1;break;case"SeaMonkey":if(this._Versions.SeaMonkey.test(e))return RegExp.$1;break;case"Flock":if(this._Versions.Flock.test(e))return RegExp.$1;break;case"OmniWeb":if(this._Versions.OmniWeb.test(e))return RegExp.$1;break;case"UCBrowser":if(this._Versions.UC.test(e))return RegExp.$1;break;default:if("unknown"!==this.Agent.browser&&new RegExp(this.Agent.browser+"[\\/ ]([\\d\\w\\.\\-]+)","i").test(e))return RegExp.$1}},this.getOS=function(e){switch(!0){case this._OS.WindowsVista.test(e):return this.Agent.isWindows=!0,"Windows Vista";case this._OS.Windows7.test(e):return this.Agent.isWindows=!0,"Windows 7";case this._OS.Windows8.test(e):return this.Agent.isWindows=!0,"Windows 8";case this._OS.Windows81.test(e):return this.Agent.isWindows=!0,"Windows 8.1";case this._OS.Windows10.test(e):return this.Agent.isWindows=!0,"Windows 10.0";case this._OS.Windows2003.test(e):return this.Agent.isWindows=!0,"Windows 2003";case this._OS.WindowsXP.test(e):return this.Agent.isWindows=!0,"Windows XP";case this._OS.Windows2000.test(e):return this.Agent.isWindows=!0,"Windows 2000";case this._OS.WindowsPhone8.test(e):return"Windows Phone 8";case this._OS.Linux64.test(e):return this.Agent.isLinux=!0,this.Agent.isLinux64=!0,"Linux 64";case this._OS.Linux.test(e):return this.Agent.isLinux=!0,"Linux";case this._OS.ChromeOS.test(e):return this.Agent.isChromeOS=!0,"Chrome OS";case this._OS.Wii.test(e):return"Wii";case this._OS.PS3.test(e):case this._OS.PSP.test(e):return"Playstation";case this._OS.OSXCheetah.test(e):return this.Agent.isMac=!0,"OS X Cheetah";case this._OS.OSXPuma.test(e):return this.Agent.isMac=!0,"OS X Puma";case this._OS.OSXJaguar.test(e):return this.Agent.isMac=!0,"OS X Jaguar";case this._OS.OSXPanther.test(e):return this.Agent.isMac=!0,"OS X Panther";case this._OS.OSXTiger.test(e):return this.Agent.isMac=!0,"OS X Tiger";case this._OS.OSXLeopard.test(e):return this.Agent.isMac=!0,"OS X Leopard";case this._OS.OSXSnowLeopard.test(e):return this.Agent.isMac=!0,"OS X Snow Leopard";case this._OS.OSXLion.test(e):return this.Agent.isMac=!0,"OS X Lion";case this._OS.OSXMountainLion.test(e):return this.Agent.isMac=!0,"OS X Mountain Lion";case this._OS.OSXMavericks.test(e):return this.Agent.isMac=!0,"OS X Mavericks";case this._OS.OSXYosemite.test(e):return this.Agent.isMac=!0,"OS X Yosemite";case this._OS.OSXElCapitan.test(e):return this.Agent.isMac=!0,"OS X El Capitan";case this._OS.OSXSierra.test(e):return this.Agent.isMac=!0,"macOS Sierra";case this._OS.Mac.test(e):return this.Agent.isMac=!0,"OS X";case this._OS.iPad.test(e):return this.Agent.isiPad=!0,e.match(this._OS.iPad)[0].replace("_",".");case this._OS.iPhone.test(e):return this.Agent.isiPhone=!0,e.match(this._OS.iPhone)[0].replace("_",".");case this._OS.Bada.test(e):return this.Agent.isBada=!0,"Bada";case this._OS.Curl.test(e):return this.Agent.isCurl=!0,"Curl";default:return"unknown"}},this.getPlatform=function(e){switch(!0){case this._Platform.Windows.test(e):return"Microsoft Windows";case this._Platform.WindowsPhone.test(e):return this.Agent.isWindowsPhone=!0,"Microsoft Windows Phone";case this._Platform.Mac.test(e):return"Apple Mac";case this._Platform.Curl.test(e):return"Curl";case this._Platform.Android.test(e):return this.Agent.isAndroid=!0,"Android";case this._Platform.Blackberry.test(e):return this.Agent.isBlackberry=!0,"Blackberry";case this._Platform.Linux.test(e):return"Linux";case this._Platform.Wii.test(e):return"Wii";case this._Platform.Playstation.test(e):return"Playstation";case this._Platform.iPad.test(e):return this.Agent.isiPad=!0,"iPad";case this._Platform.iPod.test(e):return this.Agent.isiPod=!0,"iPod";case this._Platform.iPhone.test(e):return this.Agent.isiPhone=!0,"iPhone";case this._Platform.Samsung.test(e):return this.Agent.isiSamsung=!0,"Samsung";default:return"unknown"}},this.testCompatibilityMode=function(){var e,t,i=this;this.Agent.isIE&&/Trident\/(\d)\.0/i.test(i.Agent.source)&&(e=parseInt(RegExp.$1,10),7===(t=parseInt(i.Agent.version,10))&&7===e&&(i.Agent.isIECompatibilityMode=!0,i.Agent.version=11),7===t&&6===e&&(i.Agent.isIECompatibilityMode=!0,i.Agent.version=10),7===t&&5===e&&(i.Agent.isIECompatibilityMode=!0,i.Agent.version=9),7===t)&&4===e&&(i.Agent.isIECompatibilityMode=!0,i.Agent.version=8)},this.testSilk=function(){return!0===new RegExp("silk","gi").test(this.Agent.source)&&(this.Agent.isSilk=!0),/Silk-Accelerated=true/gi.test(this.Agent.source)&&(this.Agent.SilkAccelerated=!0),!!this.Agent.isSilk&&"Silk"},this.testKindleFire=function(){var e=this;switch(!0){case/KFOT/gi.test(e.Agent.source):return this.Agent.isKindleFire=!0,"Kindle Fire";case/KFTT/gi.test(e.Agent.source):return this.Agent.isKindleFire=!0,"Kindle Fire HD";case/KFJWI/gi.test(e.Agent.source):return this.Agent.isKindleFire=!0,"Kindle Fire HD 8.9";case/KFJWA/gi.test(e.Agent.source):return this.Agent.isKindleFire=!0,"Kindle Fire HD 8.9 4G";case/KFSOWI/gi.test(e.Agent.source):return this.Agent.isKindleFire=!0,"Kindle Fire HD 7";case/KFTHWI/gi.test(e.Agent.source):return this.Agent.isKindleFire=!0,"Kindle Fire HDX 7";case/KFTHWA/gi.test(e.Agent.source):return this.Agent.isKindleFire=!0,"Kindle Fire HDX 7 4G";case/KFAPWI/gi.test(e.Agent.source):return this.Agent.isKindleFire=!0,"Kindle Fire HDX 8.9";case/KFAPWA/gi.test(e.Agent.source):return this.Agent.isKindleFire=!0,"Kindle Fire HDX 8.9 4G";default:return!1}},this.testCaptiveNetwork=function(){return!0===/CaptiveNetwork/gi.test(this.Agent.source)&&(this.Agent.isCaptive=!0,this.Agent.isMac=!0,this.Agent.platform="Apple Mac","CaptiveNetwork")},this.testMobile=function(){var e=this;switch(!0){case e.Agent.isWindows:case e.Agent.isLinux:case e.Agent.isMac:case e.Agent.isChromeOS:e.Agent.isDesktop=!0;break;case e.Agent.isAndroid:case e.Agent.isSamsung:e.Agent.isMobile=!0,e.Agent.isDesktop=!1}switch(!0){case e.Agent.isiPad:case e.Agent.isiPod:case e.Agent.isiPhone:case e.Agent.isBada:case e.Agent.isBlackberry:case e.Agent.isAndroid:case e.Agent.isWindowsPhone:e.Agent.isMobile=!0,e.Agent.isDesktop=!1}/mobile/i.test(e.Agent.source)&&(e.Agent.isMobile=!0,e.Agent.isDesktop=!1)},this.testTablet=function(){var e=this;switch(!0){case e.Agent.isiPad:case e.Agent.isAndroidTablet:case e.Agent.isKindleFire:e.Agent.isTablet=!0}/tablet/i.test(e.Agent.source)&&(e.Agent.isTablet=!0)},this.testNginxGeoIP=function(t){var i=this;Object.keys(t).forEach(function(e){/^GEOIP/i.test(e)&&(i.Agent.geoIp[e]=t[e])})},this.testBot=function(){var e=this,t=r.exec(e.Agent.source.toLowerCase());t?e.Agent.isBot=t[1]:e.Agent.isAuthoritative||(e.Agent.isBot=/bot/i.test(e.Agent.source))},this.testSmartTV=function(){var e=new RegExp("smart-tv|smarttv|googletv|appletv|hbbtv|pov_tv|netcast.tv","gi").exec(this.Agent.source.toLowerCase());e&&(this.Agent.isSmartTV=e[1])},this.testAndroidTablet=function(){this.Agent.isAndroid&&!/mobile/i.test(this.Agent.source)&&(this.Agent.isAndroidTablet=!0)},this.testTouchSupport=function(){this.Agent.isTouchScreen="ontouchstart"in window||0<navigator.maxTouchPoints||0<navigator.msMaxTouchPoints},this.getLaguage=function(){this.Agent.language=(navigator.language||navigator.userLanguage||navigator.browserLanguage||navigator.systemLanguage||"").toLowerCase()},this.getColorDepth=function(){this.Agent.colorDepth=screen.colorDepth||-1},this.getScreenResolution=function(){this.Agent.resolution=[screen.availWidth,screen.availHeight]},this.getPixelDepth=function(){this.Agent.pixelDepth=screen.pixelDepth||-1},this.getCPU=function(){this.Agent.cpuCores=navigator.hardwareConcurrency||-1},this.reset=function(){var e,t=this;for(e in t.DefaultAgent)t.DefaultAgent.hasOwnProperty(e)&&(t.Agent[e]=t.DefaultAgent[e]);return t},this.parse=function(e){e=e||navigator.userAgent;var t=new n;return t.Agent.source=e.replace(/^\s*/,"").replace(/\s*$/,""),t.Agent.os=t.getOS(t.Agent.source),t.Agent.platform=t.getPlatform(t.Agent.source),t.Agent.browser=t.getBrowser(t.Agent.source),t.Agent.version=t.getBrowserVersion(t.Agent.source),t.testBot(),t.testSmartTV(),t.testMobile(),t.testAndroidTablet(),t.testTablet(),t.testCompatibilityMode(),t.testSilk(),t.testKindleFire(),t.testCaptiveNetwork(),t.testTouchSupport(),t.getLaguage(),t.getColorDepth(),t.getPixelDepth(),t.getScreenResolution(),t.getCPU(),t.Agent},this.get=function(e){var t,i=this.parse(),n=[];for(t in this.options)this.options.hasOwnProperty(t)&&!0===this.options[t]&&n.push(i[t]);e&&n.push(e),!this.options.resolution&&i.isMobile&&n.push(i.resolution);e=i.hashMD5(n.join(":"));return[e.slice(0,8),e.slice(8,12),"4"+e.slice(12,15),"b"+e.slice(15,18),e.slice(20)].join("-")},this.Agent=this.DefaultAgent,this}var r=new RegExp("^.*("+["\\+https:\\/\\/developers.google.com\\/\\+\\/web\\/snippet\\/","googlebot","baiduspider","gurujibot","yandexbot","slurp","msnbot","bingbot","facebookexternalhit","linkedinbot","twitterbot","slackbot","telegrambot","applebot","pingdom","tumblr ","Embedly","spbot"].join("|")+").*$");new(e.DeviceUUID=n)(navigator.userAgent)}(this);

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	let results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// DWH ver.1
function initDWH_ver1() {
	let DEVICE_ID 	= "";
	let OS_VERSION 	= "";
	let PLATFORM  	= "WEB";
	let DATA 		= {};
	const URL       = "/analytics/v1/provider1";
	const ORIGIN    = "KZ";
	const GEO       = "UNKNOWN";
	const PARAMS_ARR = [
		{ in_name: "click_id", out_name: "clickId" },
		{ in_name: "pid", out_name: "partnerId" },
		{ in_name: "partner", out_name: "partnerName" },
		{ in_name: "sub_id", out_name: "subId" },
		{ in_name: "source", out_name: "partnerSource" },
		{ in_name: "modal", out_name: "modal" },
		{ in_name: "utm_source", out_name: "utmSource" },
		{ in_name: "utm_medium", out_name: "utmMedium" },
		{ in_name: "utm_campaign", out_name: "utmCampaign" },
		{ in_name: "utm_content", out_name: "utmContent" },
		{ in_name: "utm_term", out_name: "utmTerm" }
	];
	const IS_IDENTIFIED 	= typeof ident_level!="undefined" && ident_level=="FULL";
	const AFFILIATE_DATA 	= {};
	PARAMS_ARR.forEach(param => {
		let value = getParameterByName(param.in_name);
		if (value) AFFILIATE_DATA[param.out_name] = value;
	});
	const sendEvent = (type, status, obj) => {
		const TIMESTAMP = new Date().getTime();
		let   USER_ID   = "";
		if (typeof obj!="undefined" && obj.uid) USER_ID = obj.uid;
		if (typeof user_login!="undefined" && user_login) USER_ID = user_login;
		switch (type) {
			case "pageVisit"://на какой странице
				DATA.pageVisitMessages = [{
					"userId": USER_ID,
					"deviceId": DEVICE_ID,
					"timestamp": TIMESTAMP,
					"geo": GEO,
					"pageType": obj.pageType,
					"affiliateData": AFFILIATE_DATA
				}];
				break;
			case "registration"://регистрация
				DATA.userMessages = [{
					"userId": USER_ID,
					"deviceId": DEVICE_ID,
					"timestamp": TIMESTAMP,
					"geo": GEO,
					"actionType": "REGISTRATION",
					"affiliateData": AFFILIATE_DATA,
					"deviceAdditionalProps": {
						"osVersion": OS_VERSION,
						"deviceModel": ""
					}
				}];
				break;
			case "betting"://успешная ставка
				DATA.betMessages = [obj];
				break;
			case "withdraw"://вывод средств
				DATA.withdrawMessages = [{
					"userId": USER_ID,
					"withdrawId": obj.id,
					"withdrawAmount": obj.amount,
					"timestamp": TIMESTAMP,
					"currency": obj.currency,
					"geo": GEO,
					"withdrawType": obj.type,
					"withdrawStatus": status,
					"deviceAdditionalProps": {
						"osVersion": OS_VERSION,
						"deviceModel": ""
					}
				}];
				break;
			case "deposit"://пополнение
				DATA.depositMessages = [{
					"userId": USER_ID,
					"depositId": obj.id,
					"depositAmount": obj.amount,
					"timestamp": TIMESTAMP,
					"currency": obj.currency,
					"geo": GEO,
					"depositType": obj.type,
					"depositStatus": status,
					"deviceAdditionalProps": {
						"osVersion": OS_VERSION,
						"deviceModel": ""
					}
				}];
				break;
			case "clickToPaymentPage"://пополнение
				DATA.clickMessages = [{
					"userId": USER_ID,
					"deviceId": DEVICE_ID,
					"timestamp": TIMESTAMP,
					"geo": GEO,
					"clickType": "DEPOSIT_PAGE"
				}];
				break;
			case "clickPaymentMethod"://выбор платёжного методв
				DATA.clickMessages = [{
					"userId": USER_ID,
					"deviceId": DEVICE_ID,
					"timestamp": TIMESTAMP,
					"geo": GEO,
					"clickType": "PAYMENT_METHOD",
					"clickData": {
						"paymentMethod": obj.paymentMethod
					}
				}];
				break;
			case "startIdentification"://начало заполнения формы идентификации
				DATA.pageVisitMessages = [{
					"userId": USER_ID,
					"deviceId": DEVICE_ID,
					"timestamp": TIMESTAMP,
					"geo": GEO,
					"pageType": "IDENTIFICATION",
					"affiliateData": AFFILIATE_DATA
				}];
				break;
			case "startRegistration"://начало заполнения формы регистрации
				DATA.pageVisitMessages = [{
					"userId": USER_ID,
					"deviceId": DEVICE_ID,
					"timestamp": TIMESTAMP,
					"geo": GEO,
					"pageType": "REGISTRATION",
					"affiliateData": AFFILIATE_DATA
				}];
				break;
			case "pageViewingLiveList"://пользователь смотрит лайв-список 5 минут
				DATA.viewingMessages = [{
					"userId": USER_ID,
					"isIdentified": IS_IDENTIFIED,
					"timestamp": TIMESTAMP,
					"geo": GEO,
					"pageType": "LIVE",
					"conditionType": "VIEWING_MINUTES_5",
				}];
				break;
			case "pageViewingLineList"://пользователь смотрит список линии 5 минут
				DATA.viewingMessages = [{
					"userId": USER_ID,
					"isIdentified": IS_IDENTIFIED,
					"timestamp": TIMESTAMP,
					"geo": GEO,
					"pageType": "LINE",
					"conditionType": "VIEWING_MINUTES_5",
				}];
				break;
		}
		$.ajax({
			headers: { 
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			async: true,
			type: "POST",
			url: URL,
			data: JSON.stringify(DATA),
			dataType: "json",
			complete: (() => {})
		});
	}
	const init = () => {
		DATA.datasource = {
			origin: ORIGIN,
			platform: PLATFORM
		};
		let obj = {};
		//попытка вывода
		$("#out_submit").on("click", () => {
			obj.amount   = $("#out_sum").val();
			obj.currency = $('[name="shName"]').val();
			obj.id       = "N/A";
			obj.type     = "MANUAL";
			sendEvent("withdraw", "INIT", obj);
		});
		//пополнение click
		$("a.pmItem, a[role='menuitem'], a.balance-link").filter('[href*="page=account&action=in"]').each(function() {
			$(this).on("click", () => {
				sendEvent("clickToPaymentPage", "", {});
			});
		});
		//попытка пополнения
		$(".in_form").find(".red_button.has_onclick").on("click", () => {
			obj.amount   = $("#amount").val() || 0;
			obj.currency = $('[name="shName"]').val();
			obj.id       = "N/A";
			obj.type     = "MANUAL";
			sendEvent("deposit", "INIT", obj);
		});
		//пополнение/снятие выбор платёжного метода
		$(".refillMoney, .payment-list").find("td a").on("click", function() {
			const name = $(this).closest("tr").find(".payNameText, .pay-name").text();
			obj.paymentMethod = name;
			sendEvent("clickPaymentMethod", "", obj);
		});
		//на какой странице находится
		const PAGE_TYPE = getParameterByName("page");
		let PAGE_VISIT = false;
		switch (PAGE_TYPE) {
			case "livelist":
			case "livematch":
				obj.pageType = "LIVE";
				PAGE_VISIT = true;
				break;
			case "bets":
			case "line":
				obj.pageType = "LINE";
				PAGE_VISIT = true;
				break;
			case "bonus":
				obj.pageType = "PROMO";
				PAGE_VISIT = true;
				break;
			case "ident": //начало заполнения/изменения формы идентификации
				let startedChangeIdentInputs;
				$(".idt-form").find("input, select").on("change input", () => {
					if (!startedChangeIdentInputs) {
						startedChangeIdentInputs = true;
						sendEvent("startIdentification", "", {});
					}
				});
				break;
			default:
				if (typeof user_login=="undefined" || user_login=="") {
					PAGE_VISIT = true;
					obj.pageType = "ELSE";
				}
		}
		if ($('[data-id="shlinelive"]').parent().hasClass("active")) {
			PAGE_VISIT = true;
			obj.pageType = "LIVE";
		}
		if (PAGE_VISIT) sendEvent("pageVisit", "", obj);
		//пользователь смотрит лайв/линию список 5 минут
		if (($(".live_main_table").length && $("#parse_type").length) || PAGE_TYPE=="livelist") {
			setTimeout(() => {
				sendEvent("pageViewingLiveList", "", {});
			}, 300000);
		}
		if (($(".live_main_table").length && !$("#parse_type").length) || PAGE_TYPE=="bets") {
			setTimeout(() => {
				sendEvent("pageViewingLineList", "", {});
			}, 300000);
		}
		//начало заполнения формы регистрации
		let startedChangeRegInputs;
		$("body").delegate("#fast_form_registration, .registration-form, .js-form-registration", "input", () => {
			if (!startedChangeRegInputs) {
				startedChangeRegInputs = true;
				sendEvent("startRegistration", "", {});
			}
		});
		//успешная ставка
		if (typeof betMessages!="undefined") sendEvent("betting", "SUCCESS", betMessages.betMessages);
		//успешная регистрация
		$(document).bind("onSuccessRegistration", (e, obj) => {
			sendEvent("registration", "SUCCESS", {
				"uid": obj.login
			});
		});
	}
	const generateDeviceId = () => {
		Fingerprint2.get((components) => {
			const du 	= new DeviceUUID().parse();
			const array = components.map(item => {
				return JSON.stringify(item);
			});
			if (typeof IS_APP!="undefined" && IS_APP) {
				if (du.platform=="iPad" || du.platform=="iPhone") PLATFORM = "IOS";
				if (du.platform=="Android") PLATFORM = "ANDROID";
			}
			OS_VERSION 	= du.os;
			DEVICE_ID 	= du.hashMD5(array.join(":"));
			init();
		});
	}
	if (typeof Fingerprint2!="undefined" && window.requestIdleCallback) {
		requestIdleCallback(() => {
			generateDeviceId();
		});
	} else {
		setTimeout(() => {
			generateDeviceId();
		}, 500);
	}
}

// Weborama
function initWeborama() {
	const SITE_ID = 9465;
	const pages_ids = [
		{
			host: "wcm.weborama-tech.ru",
			registration: 9,
			authorization: 10,
			betting: 12,
			betting_special: 12,
			betting_success_247: 14,
			betting_success_cyber: 13
		}
	];
	const sendEvent = (type, obj) => {
		let UID = "";
		if (typeof user_identificator !== "undefined" && user_identificator != 0) {
			UID = user_identificator;
		}
		if (typeof obj !== "undefined" && obj.uid) {
			UID = obj.uid;
		}
		pages_ids.forEach(item => {
			let track_obj = {
				client: "",
				amount: "0.0",
				invoice_id: "",
				quantity: 0,
				is_client: 0,
				optional_parameters: {
					"UID": UID
				},
				fullhost: item.host,
				site: SITE_ID,
				conversion_page: item[type]
			};
			// Если тип события - ставки, добавляем дополнительные параметры
			if (type === "betting") {
				let summType = "";
				if (obj.betAmount <= 2999) {
					summType = "Bet-3";
				} else if (obj.betAmount <= 9999) {
					summType = "Bet-1";
				} else {
					summType = "Bet-2";
				}
				track_obj.optional_parameters.Bet = "Success";
				track_obj.optional_parameters.BetSumm = summType;
				track_obj.optional_parameters.Odds = obj.odd;
				track_obj.optional_parameters.BetType = obj.betType;
			}
			if (type === "betting_special") {
				// специальная ставка
				track_obj.optional_parameters.Bet = "Success";
				track_obj.optional_parameters.BetType = "Multiple";
			}
			try {
				adperfTracker.track(track_obj);
			} catch (err) {
				console.error("Tracking error:", err);
			}
		});
	};
	// Только что авторизовался
	if (typeof getCookie === "function" && typeof setCookieD === "function") {
		const justAuthorizes = getCookie("justAuthorizes");
		if (typeof user_login !== "undefined" && user_login) {
			if (justAuthorizes != 1) {
				setCookieD("justAuthorizes", 1, {domain: ".olimpbet.kz", path: "/"});
				sendEvent("authorization");
			}
		} else {
			setCookieD("justAuthorizes", 0, {domain: ".olimpbet.kz", path: "/"});
		}
	}
	// Успешная ставка
	if (typeof betMessages !== "undefined") {
		sendEvent("betting", betMessages.betMessages);
	}

	if (typeof betSpecMessages !== "undefined" && typeof betMessages === "undefined") {
		sendEvent("betting_special");
	}

	$(document).bind("betSuccessEvent", (e, obj) => {
		sendEvent("betting", obj);
	});
	$(document).bind("betFastSuccessEvent", (e, obj) => {
		sendEvent("betting", obj);
	});

	// Успешная регистрация
	$(document).bind("onSuccessRegistration", (e, obj) => {
		sendEvent("registration", {
			"uid": obj.uid
		});
	});
	// обработка событий iframe игры 24/7
	window.addEventListener("message", (event) => {
		if (event.origin === "https://newsportgamestv.olimpbet.kz" || event.origin === "https://bifrost.oddin.gg") {
			let data = event.data;
			if (typeof data !== "object") {
				data = JSON.parse(data);
			}
			if (data.action === "user.bet.placed") {
				sendEvent("betting_success_247");
			}
			if (data.action === "bet-accepted") {
				sendEvent("betting_success_cyber");
			}
		}
	});

}

// Yandex
var anlt_events_binded;
function initYandex(event_type, custom_event) {
	const yandex_id = 57178543;
	const events_arr = {
		"registration": "Registration",
		"registration_salembonus": "registration_salembonus",
		"slider": "SliderClick",
		"cyberboom": "cyberboom",
		"special-offers": "specialistoffer",
		"sportgamestv": "bet247",
		"live_calendar": "schedulelive",
		"livebroadcasts": "livebroadcasts",
		"betlive": "betlive",
		"live": "live",
		"bonus": "BonusClick",
		"betting_fast_success": "Bet_compled",
		"betting_success": "Bet_compled",
		"betting_success_247": "Bet_compled_247",
		"betting_success_cyber": "Bet_compled_cyber",
		"16675": "statbasketballNBA",
		"46705": "statUFC",
		"13754": "statfootballAPL",
		"15636": "stathockeyNHL",
		"1": "Football",
		"2": "Hokey",
		"3": "Tennis",
		"5": "BasketBall",
		"10": "volleyball",
		"12": "boxing",
		"40": "tabletennis",
		"96": "MMA",
		"112": "cybersport",
		"142": "struggle",
		"143": "fistfight",
	};
	const sendEvent = (id, banner_id) => {
		let event;
		if (event_type === "custom") {
			event = custom_event;
		} else {
			event = events_arr[id];
		}
		if (typeof ym === "function" && typeof event != "undefined") {
			if (typeof banner_id != "undefined") {
				ym(yandex_id, "reachGoal", event, {
					banner_id: banner_id
				});
			} else {
				//console.log(`ym(${yandex_id}, 'reachGoal', '${event}')`);
				ym(yandex_id, "reachGoal", event);
			}
		}
	};
	if (!anlt_events_binded) {
		anlt_events_binded = true;
		$(document)
			.delegate("[data-anlt-events]", "click", function() {
				const banner_id = $(this).data("id");
				sendEvent($(this).data("anlt-events"), banner_id);
			})
			.delegate('[data-s]', "click", function() {
				sendEvent($(this).data("s"));
			})
			.bind("onSuccessRegistration", () => {
				if ($("#salem_bonus").length === 1) {
					sendEvent("registration");
				} else {
					sendEvent("registration");
				}
			});
		["cyberboom", "special-offers", "sportgamestv", "live_calendar"].forEach(href_str => {
			$(document).delegate('a[href*="'+ href_str +'"]', "click", () => {
				sendEvent(href_str);
			});
		});
		[16675, 46705, 13754, 15636].forEach(champ_id => {
			$('[data-statchamp="'+ champ_id +'"]').on("click", () => {
				sendEvent(champ_id);
			});
		});
		$(".smallwnd").find('a[href*="betting"][data-u="2"]').on("click", () => {
			sendEvent("live");
		});
		$(".ashine, .menu_live").on("click", () => {
			sendEvent("betlive");
		});
		$(".live_tv_menu").on("click", () => {
			sendEvent("livebroadcasts");
		});
		if (typeof betMessages != "undefined" || typeof betSpecMessages !== "undefined") {
			sendEvent("betting_success");
		}
		$(document).bind("betSuccessEvent", () => {
			sendEvent("betting_success");
		});
		$(document).bind("betFastSuccessEvent", () => {
			sendEvent("betting_fast_success");
		});
		// обработка событий iframe игры 24/7
		window.addEventListener("message", (event) => {
			if (event.origin === "https://newsportgamestv.olimpbet.kz" || event.origin === "https://bifrost.oddin.gg") {
				let data = event.data;
				if (typeof data !== "object") {
					data = JSON.parse(data);
				}
				if (data.action === "user.bet.placed") {
					sendEvent("betting_success_247");
				}
				if (data.action === "bet-accepted") {
					sendEvent("betting_success_cyber");
				}
			}
		});
	}
	if (event_type) {
		sendEvent();
	}
}

$(document).ready(function() {
	initYandex();
	initWeborama();
	initDWH_ver1();
});
