// demo stuffs
(function($) {
		$.fn.drop = function( dur ) {
			return !this.length ? this : this.animate({
					bottom: 0
				}, {
					duration: dur || 1700,
					easing: "easeOutBounce"
				});
		}
})(jQuery);


/* wip
(function( $ ) {
	var catalog = {},
		 	dict = { up}
		  act = function( code, event ) {
			  if ( catalog[code] ) {
					for ( var i = 0; i < catalog[code].length; i++ ) {
						catalog[ code ][i]( event );
					}
			  }
		  },
		  bind = function( key, fn ) {
			   var code = key.length === 1 ? key.charCodeAt(0) : dict[ key ];
			   if ( code ) {
				    catalog[ code ] ? catalog[code].push( fn ) : ( catalog[ code ] = [fn] );
			   }			  
		  };
	
	$( document ).bind( 'keydown', function( e ) {
		console.log( e.charCode );
		act( e.charCode || e.keyCode, e );
	});
	
	$.fn.pressed = function( keyOrMap, fn ) {
		var code;
		if ( $.type( key ) !== "object" ) {
			bind( keyOrMap, fn );
		}
		else {
			$.each( key, bind );
		}
		return this;
	}
})( jQuery );*/
/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/

(function($) {
	var br = /<br\s*\/?>|&lt;br\s*\/?&gt;/gi,
			stripBrs = false,
			spaces = /^\s*/;
			
	$.fn.unindent = function() {
		if ( !this.length ) {
			return this;
		}
		
		this.each( function() {
			var $this = $(this),
				html = $this.html(),
				lines = html.replace( br, stripBrs ? '' : '\n' ).split( '\n' ),
				indents = [],
				line,	matches, min = 1000;

				// go through every line and check for common number of indents
				for (var i = 0; i < lines.length && min > 0; i++)	{
					line = lines[ i ];
					
					if ( line.replace( /^\s+|\s+$/g, '' ).length == 0 ) {
						continue;
					}

					matches = spaces.exec( line );

					// In the event that just one line doesn't have leading white space
					// we can't unindent anything, so bail completely.
					if (matches == null) 
						return this;

					min = Math.min( matches[0].length, min);
				}

				// trim minimum common number of white space from the begining of every line
				if (min > 0) 
					for (var i = 0; i < lines.length; i++) 
						lines[i] = lines[i].substr(min);
				$this.html( lines.join('\n') );
				return this;
		});
	}
})(jQuery);


/*
 * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,p){var i,m=Array.prototype.slice,r=decodeURIComponent,a=$.param,c,l,v,b=$.bbq=$.bbq||{},q,u,j,e=$.event.special,d="hashchange",A="querystring",D="fragment",y="elemUrlAttr",g="location",k="href",t="src",x=/^.*\?|#.*$/g,w=/^.*\#/,h,C={};function E(F){return typeof F==="string"}function B(G){var F=m.call(arguments,1);return function(){return G.apply(this,F.concat(m.call(arguments)))}}function n(F){return F.replace(/^[^#]*#?(.*)$/,"$1")}function o(F){return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function f(H,M,F,I,G){var O,L,K,N,J;if(I!==i){K=F.match(H?/^([^#]*)\#?(.*)$/:/^([^#?]*)\??([^#]*)(#?.*)/);J=K[3]||"";if(G===2&&E(I)){L=I.replace(H?w:x,"")}else{N=l(K[2]);I=E(I)?l[H?D:A](I):I;L=G===2?I:G===1?$.extend({},I,N):$.extend({},N,I);L=a(L);if(H){L=L.replace(h,r)}}O=K[1]+(H?"#":L||!K[1]?"?":"")+L+J}else{O=M(F!==i?F:p[g][k])}return O}a[A]=B(f,0,o);a[D]=c=B(f,1,n);c.noEscape=function(G){G=G||"";var F=$.map(G.split(""),encodeURIComponent);h=new RegExp(F.join("|"),"g")};c.noEscape(",/");$.deparam=l=function(I,F){var H={},G={"true":!0,"false":!1,"null":null};$.each(I.replace(/\+/g," ").split("&"),function(L,Q){var K=Q.split("="),P=r(K[0]),J,O=H,M=0,R=P.split("]["),N=R.length-1;if(/\[/.test(R[0])&&/\]$/.test(R[N])){R[N]=R[N].replace(/\]$/,"");R=R.shift().split("[").concat(R);N=R.length-1}else{N=0}if(K.length===2){J=r(K[1]);if(F){J=J&&!isNaN(J)?+J:J==="undefined"?i:G[J]!==i?G[J]:J}if(N){for(;M<=N;M++){P=R[M]===""?O.length:R[M];O=O[P]=M<N?O[P]||(R[M+1]&&isNaN(R[M+1])?{}:[]):J}}else{if($.isArray(H[P])){H[P].push(J)}else{if(H[P]!==i){H[P]=[H[P],J]}else{H[P]=J}}}}else{if(P){H[P]=F?i:""}}});return H};function z(H,F,G){if(F===i||typeof F==="boolean"){G=F;F=a[H?D:A]()}else{F=E(F)?F.replace(H?w:x,""):F}return l(F,G)}l[A]=B(z,0);l[D]=v=B(z,1);$[y]||($[y]=function(F){return $.extend(C,F)})({a:k,base:k,iframe:t,img:t,input:t,form:"action",link:k,script:t});j=$[y];function s(I,G,H,F){if(!E(H)&&typeof H!=="object"){F=H;H=G;G=i}return this.each(function(){var L=$(this),J=G||j()[(this.nodeName||"").toLowerCase()]||"",K=J&&L.attr(J)||"";L.attr(J,a[I](K,H,F))})}$.fn[A]=B(s,A);$.fn[D]=B(s,D);b.pushState=q=function(I,F){if(E(I)&&/^#/.test(I)&&F===i){F=2}var H=I!==i,G=c(p[g][k],H?I:{},H?F:2);p[g][k]=G+(/#/.test(G)?"":"#")};b.getState=u=function(F,G){return F===i||typeof F==="boolean"?v(F):v(G)[F]};b.removeState=function(F){var G={};if(F!==i){G=u();$.each($.isArray(F)?F:arguments,function(I,H){delete G[H]})}q(G,2)};e[d]=$.extend(e[d],{add:function(F){var H;function G(J){var I=J[D]=c();J.getState=function(K,L){return K===i||typeof K==="boolean"?l(I,K):l(I,L)[K]};H.apply(this,arguments)}if($.isFunction(F)){H=F;return G}else{H=F.handler;F.handler=G}}})})(jQuery,this);
/*
 * jQuery hashchange event - v1.2 - 2/11/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,i,b){var j,k=$.event.special,c="location",d="hashchange",l="href",f=$.browser,g=document.documentMode,h=f.msie&&(g===b||g<8),e="on"+d in i&&!h;function a(m){m=m||i[c][l];return m.replace(/^[^#]*#?(.*)$/,"$1")}$[d+"Delay"]=100;k[d]=$.extend(k[d],{setup:function(){if(e){return false}$(j.start)},teardown:function(){if(e){return false}$(j.stop)}});j=(function(){var m={},r,n,o,q;function p(){o=q=function(s){return s};if(h){n=$('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow;q=function(){return a(n.document[c][l])};o=function(u,s){if(u!==s){var t=n.document;t.open().close();t[c].hash="#"+u}};o(a())}}m.start=function(){if(r){return}var t=a();o||p();(function s(){var v=a(),u=q(t);if(v!==t){o(t=v,u);$(i).trigger(d)}else{if(u!==t){i[c][l]=i[c][l].replace(/#.*/,"")+"#"+u}}r=setTimeout(s,$[d+"Delay"])})()};m.stop=function(){if(!n){r&&clearTimeout(r);r=0}};return m})()})(jQuery,this);
//XRegExp 1.5.0 <xregexp.com> MIT License
var XRegExp;if(XRegExp){throw Error("can't load XRegExp twice in the same frame")}(function(){XRegExp=function(w,r){var q=[],u=XRegExp.OUTSIDE_CLASS,x=0,p,s,v,t,y;if(XRegExp.isRegExp(w)){if(r!==undefined){throw TypeError("can't supply flags when constructing one RegExp from another")}return j(w)}if(g){throw Error("can't call the XRegExp constructor within token definition functions")}r=r||"";p={hasNamedCapture:false,captureNames:[],hasFlag:function(z){return r.indexOf(z)>-1},setFlag:function(z){r+=z}};while(x<w.length){s=o(w,x,u,p);if(s){q.push(s.output);x+=(s.match[0].length||1)}else{if(v=m.exec.call(i[u],w.slice(x))){q.push(v[0]);x+=v[0].length}else{t=w.charAt(x);if(t==="["){u=XRegExp.INSIDE_CLASS}else{if(t==="]"){u=XRegExp.OUTSIDE_CLASS}}q.push(t);x++}}}y=RegExp(q.join(""),m.replace.call(r,h,""));y._xregexp={source:w,captureNames:p.hasNamedCapture?p.captureNames:null};return y};XRegExp.version="1.5.0";XRegExp.INSIDE_CLASS=1;XRegExp.OUTSIDE_CLASS=2;var c=/\$(?:(\d\d?|[$&`'])|{([$\w]+)})/g,h=/[^gimy]+|([\s\S])(?=[\s\S]*\1)/g,n=/^(?:[?*+]|{\d+(?:,\d*)?})\??/,g=false,k=[],m={exec:RegExp.prototype.exec,test:RegExp.prototype.test,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split},a=m.exec.call(/()??/,"")[1]===undefined,e=function(){var p=/^/g;m.test.call(p,"");return !p.lastIndex}(),f=function(){var p=/x/g;m.replace.call("x",p,"");return !p.lastIndex}(),b=RegExp.prototype.sticky!==undefined,i={};i[XRegExp.INSIDE_CLASS]=/^(?:\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S]))/;i[XRegExp.OUTSIDE_CLASS]=/^(?:\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??)/;XRegExp.addToken=function(s,r,q,p){k.push({pattern:j(s,"g"+(b?"y":"")),handler:r,scope:q||XRegExp.OUTSIDE_CLASS,trigger:p||null})};XRegExp.cache=function(r,p){var q=r+"/"+(p||"");return XRegExp.cache[q]||(XRegExp.cache[q]=XRegExp(r,p))};XRegExp.copyAsGlobal=function(p){return j(p,"g")};XRegExp.escape=function(p){return p.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")};XRegExp.execAt=function(s,r,t,q){r=j(r,"g"+((q&&b)?"y":""));r.lastIndex=t=t||0;var p=r.exec(s);if(q){return(p&&p.index===t)?p:null}else{return p}};XRegExp.freezeTokens=function(){XRegExp.addToken=function(){throw Error("can't run addToken after freezeTokens")}};XRegExp.isRegExp=function(p){return Object.prototype.toString.call(p)==="[object RegExp]"};XRegExp.iterate=function(u,p,v,s){var t=j(p,"g"),r=-1,q;while(q=t.exec(u)){v.call(s,q,++r,u,t);if(t.lastIndex===q.index){t.lastIndex++}}if(p.global){p.lastIndex=0}};XRegExp.matchChain=function(q,p){return function r(s,x){var v=p[x].regex?p[x]:{regex:p[x]},u=j(v.regex,"g"),w=[],t;for(t=0;t<s.length;t++){XRegExp.iterate(s[t],u,function(y){w.push(v.backref?(y[v.backref]||""):y[0])})}return((x===p.length-1)||!w.length)?w:r(w,x+1)}([q],0)};RegExp.prototype.apply=function(q,p){return this.exec(p[0])};RegExp.prototype.call=function(p,q){return this.exec(q)};RegExp.prototype.exec=function(t){var r=m.exec.apply(this,arguments),q,p;if(r){if(!a&&r.length>1&&l(r,"")>-1){p=RegExp(this.source,m.replace.call(d(this),"g",""));m.replace.call(t.slice(r.index),p,function(){for(var u=1;u<arguments.length-2;u++){if(arguments[u]===undefined){r[u]=undefined}}})}if(this._xregexp&&this._xregexp.captureNames){for(var s=1;s<r.length;s++){q=this._xregexp.captureNames[s-1];if(q){r[q]=r[s]}}}if(!e&&this.global&&!r[0].length&&(this.lastIndex>r.index)){this.lastIndex--}}return r};if(!e){RegExp.prototype.test=function(q){var p=m.exec.call(this,q);if(p&&this.global&&!p[0].length&&(this.lastIndex>p.index)){this.lastIndex--}return !!p}}String.prototype.match=function(q){if(!XRegExp.isRegExp(q)){q=RegExp(q)}if(q.global){var p=m.match.apply(this,arguments);q.lastIndex=0;return p}return q.exec(this)};String.prototype.replace=function(r,s){var t=XRegExp.isRegExp(r),q,p,u;if(t&&typeof s.valueOf()==="string"&&s.indexOf("${")===-1&&f){return m.replace.apply(this,arguments)}if(!t){r=r+""}else{if(r._xregexp){q=r._xregexp.captureNames}}if(typeof s==="function"){p=m.replace.call(this,r,function(){if(q){arguments[0]=new String(arguments[0]);for(var v=0;v<q.length;v++){if(q[v]){arguments[0][q[v]]=arguments[v+1]}}}if(t&&r.global){r.lastIndex=arguments[arguments.length-2]+arguments[0].length}return s.apply(null,arguments)})}else{u=this+"";p=m.replace.call(u,r,function(){var v=arguments;return m.replace.call(s,c,function(x,w,A){if(w){switch(w){case"$":return"$";case"&":return v[0];case"`":return v[v.length-1].slice(0,v[v.length-2]);case"'":return v[v.length-1].slice(v[v.length-2]+v[0].length);default:var y="";w=+w;if(!w){return x}while(w>v.length-3){y=String.prototype.slice.call(w,-1)+y;w=Math.floor(w/10)}return(w?v[w]||"":"$")+y}}else{var z=+A;if(z<=v.length-3){return v[z]}z=q?l(q,A):-1;return z>-1?v[z+1]:x}})})}if(t&&r.global){r.lastIndex=0}return p};String.prototype.split=function(u,p){if(!XRegExp.isRegExp(u)){return m.split.apply(this,arguments)}var w=this+"",r=[],v=0,t,q;if(p===undefined||+p<0){p=Infinity}else{p=Math.floor(+p);if(!p){return[]}}u=XRegExp.copyAsGlobal(u);while(t=u.exec(w)){if(u.lastIndex>v){r.push(w.slice(v,t.index));if(t.length>1&&t.index<w.length){Array.prototype.push.apply(r,t.slice(1))}q=t[0].length;v=u.lastIndex;if(r.length>=p){break}}if(u.lastIndex===t.index){u.lastIndex++}}if(v===w.length){if(!m.test.call(u,"")||q){r.push("")}}else{r.push(w.slice(v))}return r.length>p?r.slice(0,p):r};function j(r,q){if(!XRegExp.isRegExp(r)){throw TypeError("type RegExp expected")}var p=r._xregexp;r=XRegExp(r.source,d(r)+(q||""));if(p){r._xregexp={source:p.source,captureNames:p.captureNames?p.captureNames.slice(0):null}}return r}function d(p){return(p.global?"g":"")+(p.ignoreCase?"i":"")+(p.multiline?"m":"")+(p.extended?"x":"")+(p.sticky?"y":"")}function o(v,u,w,p){var r=k.length,y,s,x;g=true;try{while(r--){x=k[r];if((w&x.scope)&&(!x.trigger||x.trigger.call(p))){x.pattern.lastIndex=u;s=x.pattern.exec(v);if(s&&s.index===u){y={output:x.handler.call(p,s,w),match:s};break}}}}catch(q){throw q}finally{g=false}return y}function l(s,q,r){if(Array.prototype.indexOf){return s.indexOf(q,r)}for(var p=r||0;p<s.length;p++){if(s[p]===q){return p}}return -1}XRegExp.addToken(/\(\?#[^)]*\)/,function(p){return m.test.call(n,p.input.slice(p.index+p[0].length))?"":"(?:)"});XRegExp.addToken(/\((?!\?)/,function(){this.captureNames.push(null);return"("});XRegExp.addToken(/\(\?<([$\w]+)>/,function(p){this.captureNames.push(p[1]);this.hasNamedCapture=true;return"("});XRegExp.addToken(/\\k<([\w$]+)>/,function(q){var p=l(this.captureNames,q[1]);return p>-1?"\\"+(p+1)+(isNaN(q.input.charAt(q.index+q[0].length))?"":"(?:)"):q[0]});XRegExp.addToken(/\[\^?]/,function(p){return p[0]==="[]"?"\\b\\B":"[\\s\\S]"});XRegExp.addToken(/^\(\?([imsx]+)\)/,function(p){this.setFlag(p[1]);return""});XRegExp.addToken(/(?:\s+|#.*)+/,function(p){return m.test.call(n,p.input.slice(p.index+p[0].length))?"":"(?:)"},XRegExp.OUTSIDE_CLASS,function(){return this.hasFlag("x")});XRegExp.addToken(/\./,function(){return"[\\s\\S]"},XRegExp.OUTSIDE_CLASS,function(){return this.hasFlag("s")})})();


$.extend($.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert($.easing.default);
		return $.easing[$.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return $.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 * jQuery Templates Plugin 1.0.0pre
 * http://github.com/jquery/jquery-tmpl
 * Requires jQuery 1.4.2
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function(a){var r=a.fn.domManip,d="_tmplitem",q=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,b={},f={},e,p={key:0,data:{}},i=0,c=0,l=[];function g(g,d,h,e){var c={data:e||(e===0||e===false)?e:d?d.data:{},_wrap:d?d._wrap:null,tmpl:null,parent:d||null,nodes:[],calls:u,nest:w,wrap:x,html:v,update:t};g&&a.extend(c,g,{nodes:[],parent:d});if(h){c.tmpl=h;c._ctnt=c._ctnt||c.tmpl(a,c);c.key=++i;(l.length?f:b)[i]=c}return c}a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(f,d){a.fn[f]=function(n){var g=[],i=a(n),k,h,m,l,j=this.length===1&&this[0].parentNode;e=b||{};if(j&&j.nodeType===11&&j.childNodes.length===1&&i.length===1){i[d](this[0]);g=this}else{for(h=0,m=i.length;h<m;h++){c=h;k=(h>0?this.clone(true):this).get();a(i[h])[d](k);g=g.concat(k)}c=0;g=this.pushStack(g,f,i.selector)}l=e;e=null;a.tmpl.complete(l);return g}});a.fn.extend({tmpl:function(d,c,b){return a.tmpl(this[0],d,c,b)},tmplItem:function(){return a.tmplItem(this[0])},template:function(b){return a.template(b,this[0])},domManip:function(d,m,k){if(d[0]&&a.isArray(d[0])){var g=a.makeArray(arguments),h=d[0],j=h.length,i=0,f;while(i<j&&!(f=a.data(h[i++],"tmplItem")));if(f&&c)g[2]=function(b){a.tmpl.afterManip(this,b,k)};r.apply(this,g)}else r.apply(this,arguments);c=0;!e&&a.tmpl.complete(b);return this}});a.extend({tmpl:function(d,h,e,c){var i,k=!c;if(k){c=p;d=a.template[d]||a.template(null,d);f={}}else if(!d){d=c.tmpl;b[c.key]=c;c.nodes=[];c.wrapped&&n(c,c.wrapped);return a(j(c,null,c.tmpl(a,c)))}if(!d)return[];if(typeof h==="function")h=h.call(c||{});e&&e.wrapped&&n(e,e.wrapped);i=a.isArray(h)?a.map(h,function(a){return a?g(e,c,d,a):null}):[g(e,c,d,h)];return k?a(j(c,null,i)):i},tmplItem:function(b){var c;if(b instanceof a)b=b[0];while(b&&b.nodeType===1&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode));return c||p},template:function(c,b){if(b){if(typeof b==="string")b=o(b);else if(b instanceof a)b=b[0]||{};if(b.nodeType)b=a.data(b,"tmpl")||a.data(b,"tmpl",o(b.innerHTML));return typeof c==="string"?(a.template[c]=b):b}return c?typeof c!=="string"?a.template(null,c):a.template[c]||a.template(null,q.test(c)?c:a(c)):null},encode:function(a){return(""+a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){__=__.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(__,$1,$2);__=[];",close:"call=$item.calls();__=call._.concat($item.wrap(call,__));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){__.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){__.push($.encode($1a));}"},"!":{open:""}},complete:function(){b={}},afterManip:function(f,b,d){var e=b.nodeType===11?a.makeArray(b.childNodes):b.nodeType===1?[b]:[];d.call(f,b);m(e);c++}});function j(e,g,f){var b,c=f?a.map(f,function(a){return typeof a==="string"?e.key?a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+d+'="'+e.key+'" $2'):a:j(a,e,a._ctnt)}):e;if(g)return c;c=c.join("");c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(f,c,e,d){b=a(e).get();m(b);if(c)b=k(c).concat(b);if(d)b=b.concat(k(d))});return b?b:k(c)}function k(c){var b=document.createElement("div");b.innerHTML=c;return a.makeArray(b.childNodes)}function o(b){return new Function("jQuery","$item","var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(m,l,k,g,b,c,d){var j=a.tmpl.tag[k],i,e,f;if(!j)throw"Unknown template tag: "+k;i=j._default||[];if(c&&!/\w$/.test(b)){b+=c;c=""}if(b){b=h(b);d=d?","+h(d)+")":c?")":"";e=c?b.indexOf(".")>-1?b+h(c):"("+b+").call($item"+d:b;f=c?e:"(typeof("+b+")==='function'?("+b+").call($item):("+b+"))"}else f=e=i.$1||"null";g=h(g);return"');"+j[l?"close":"open"].split("$notnull_1").join(b?"typeof("+b+")!=='undefined' && ("+b+")!=null":"true").split("$1a").join(f).split("$1").join(e).split("$2").join(g||i.$2||"")+"__.push('"})+"');}return __;")}function n(c,b){c._wrap=j(c,true,a.isArray(b)?b:[q.test(b)?b:a(b).html()]).join("")}function h(a){return a?a.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function s(b){var a=document.createElement("div");a.appendChild(b.cloneNode(true));return a.innerHTML}function m(o){var n="_"+c,k,j,l={},e,p,h;for(e=0,p=o.length;e<p;e++){if((k=o[e]).nodeType!==1)continue;j=k.getElementsByTagName("*");for(h=j.length-1;h>=0;h--)m(j[h]);m(k)}function m(j){var p,h=j,k,e,m;if(m=j.getAttribute(d)){while(h.parentNode&&(h=h.parentNode).nodeType===1&&!(p=h.getAttribute(d)));if(p!==m){h=h.parentNode?h.nodeType===11?0:h.getAttribute(d)||0:0;if(!(e=b[m])){e=f[m];e=g(e,b[h]||f[h]);e.key=++i;b[i]=e}c&&o(m)}j.removeAttribute(d)}else if(c&&(e=a.data(j,"tmplItem"))){o(e.key);b[e.key]=e;h=a.data(j.parentNode,"tmplItem");h=h?h.key:0}if(e){k=e;while(k&&k.key!=h){k.nodes.push(j);k=k.parent}delete e._ctnt;delete e._wrap;a.data(j,"tmplItem",e)}function o(a){a=a+n;e=l[a]=l[a]||g(e,b[e.parent.key+n]||e.parent)}}}function u(a,d,c,b){if(!a)return l.pop();l.push({_:a,tmpl:d,item:this,data:c,options:b})}function w(d,c,b){return a.tmpl(a.template(d),c,b,this)}function x(b,d){var c=b.options||{};c.wrapped=d;return a.tmpl(a.template(b.tmpl),b.data,c,b.item)}function v(d,c){var b=this._wrap;return a.map(a(a.isArray(b)?b.join(""):b).filter(d||"*"),function(a){return c?a.innerText||a.textContent:a.outerHTML||s(a)})}function t(){var b=this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]);a(b).remove()}})(jQuery);
