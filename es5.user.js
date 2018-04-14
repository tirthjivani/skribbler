// ==UserScript==
// @name Skribbler
// @namespace https://rosshill.ca
// @match *://skribbl.io/*
// @version 2.3.0
// @author Ross Hill
// @icon https://skribbl.io/res/favicon.png
// @homepageURL https://github.com/rosslh/skribbler
// @connect skribbler.herokuapp.com
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant GM.xmlHttpRequest
// @grant GM_xmlhttpRequest
// ==/UserScript==

// This code has been compiled and minified. The source code and build script can be found on Github.

var w={pattern:"",content:document.createElement("span"),wordsList:$(document.createElement("ul")),prevClue:"",links:document.createElement("strong"),prevAnswer:""};function o(){$("#screenGame").is(":visible")&&$(this).scrollTop()<$("#screenGame").offset().top&&$("html, body").animate({scrollTop:$("#screenGame").offset().top},1e3)}function c(e,n){var t=$(".drawing").is(":visible"),r=e.replace(/_|-| /g,"").length;return!(!t||!(0<unsafeWindow.dictionary.oneOffWords.length||n<=r&&r!==e.length))||(t||(unsafeWindow.dictionary.validAnswers=[],unsafeWindow.dictionary.guessed=[],unsafeWindow.dictionary.oneOffWords=[]),!1)}function y(){return!!$(".guessedWord .info .name[style='color: rgb(0, 0, 255);']").length&&(unsafeWindow.dictionary.validAnswers=[],unsafeWindow.dictionary.guessed=[],unsafeWindow.dictionary.oneOffWords=[],!0)}function i(e,n){for(var t=1;t<n.length+1;t++)if(e===n.substring(0,t-1)+n.substring(t,n.length))return!0;return!1}function f(e,n){if(e.length===n.length){for(var t=0,r=0;r<e.length;r++)if(e.charAt(r)!==n.charAt(r)&&(t+=1),1<t)return!1;return 1===t}return e.length===n.length-1?i(e,n):n.length===e.length-1&&i(n,e)}function g(e,n){if(-1!==unsafeWindow.dictionary.guessed.indexOf(n))return!1;var t=!0,r=!1,i=void 0;try{for(var o,a=unsafeWindow.dictionary.oneOffWords[Symbol.iterator]();!(t=(o=a.next()).done);t=!0){if(!f(n,o.value))return!1}}catch(e){r=!0,i=e}finally{try{!t&&a.return&&a.return()}finally{if(r)throw i}}var s=!0,l=!1,d=void 0;try{for(var u,c=e[Symbol.iterator]();!(s=(u=c.next()).done);s=!0){if(f(n,u.value))return!1}}catch(e){l=!0,d=e}finally{try{!s&&c.return&&c.return()}finally{if(l)throw d}}return!0}function m(e){return new RegExp("^"+e.replace(/_/g,"[^- ]")+"$")}function u(e){var n=unsafeWindow.dictionary,t=void 0;if(0===n.validAnswers.length){t=n.confirmed.slice();var r=!0,i=!1,o=void 0;try{for(var a,s=n.standard[Symbol.iterator]();!(r=(a=s.next()).done);r=!0){var l=a.value;-1===t.indexOf(l)&&t.push(l)}}catch(e){i=!0,o=e}finally{try{!r&&s.return&&s.return()}finally{if(i)throw o}}}else t=n.validAnswers;w.pattern=m(e);var d=[],u=!0,c=!1,f=void 0;try{for(var h,p=n.guessed[Symbol.iterator]();!(u=(h=p.next()).done);u=!0){var v=h.value;-1===n.oneOffWords.indexOf(v)&&d.push(v)}}catch(e){c=!0,f=e}finally{try{!u&&p.return&&p.return()}finally{if(c)throw f}}return y()?n.validAnswers=[]:n.validAnswers=function(e,n,t){var r=[],i=!0,o=!1,a=void 0;try{for(var s,l=e[Symbol.iterator]();!(i=(s=l.next()).done);i=!0){var d=s.value;d.length===t.length&&w.pattern.test(d)&&g(n,d)&&r.push(d)}}catch(e){o=!0,a=e}finally{try{!i&&l.return&&l.return()}finally{if(o)throw a}}return r.sort()}(t,d,e),n.validAnswers}function a(e){var n=$(document.createElement("ul"));if(c(e,0)&&!y()){var t=u(e),r=!0,i=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done);r=!0){var l=a.value,d=document.createElement("li");-1<unsafeWindow.dictionary.confirmed.indexOf(l)?d.innerHTML="<strong>"+l+"</strong>":d.innerText=l,n[0].appendChild(d)}}catch(e){i=!0,o=e}finally{try{!r&&s.return&&s.return()}finally{if(i)throw o}}}w.wordsList.html(n.html()),w.wordsList.css({width:$(document).width()-$("#containerChat").width()-40+"px"})}function s(){return $("#currentWord")}function l(){return s()[0].textContent.toLowerCase()}function d(){var e,n=void 0!==(e=$(".info .name[style='color: rgb(0, 0, 255);")[0])?e.innerText.split(" (")[0]:"";n&&$("#boxMessages p[style='color: rgb(0, 0, 0);'] b:contains("+n+":)").parent().find("span").not(".skribblerHandled").slice(-10).each(function(e,n){var t=n.innerText;-1===unsafeWindow.dictionary.guessed.indexOf(t)&&(unsafeWindow.dictionary.guessed.push(t),n.classList.add("skribblerHandled"),a(l()))})}function h(){return $("#inputChat")}function p(){var e=l(),n=h()[0],t=e.length-n.value.length;w.content.textContent=t,w.content.style.color="unset",0<t?(w.content.textContent="+"+w.content.textContent,w.content.style.color="green"):t<0&&(w.content.style.color="red"),w.pattern=m(e);var r=m(e.substring(0,n.value.length));w.pattern.test(n.value.toLowerCase())?n.style.border="3px solid green":r.test(n.value.toLowerCase())?n.style.border="3px solid orange":n.style.border="3px solid red"}function v(){var e,n=l();n!==w.prevClue&&(w.prevClue=n,p(),a(n),0<(e=n).length&&-1===e.indexOf("_")?(w.links.innerHTML="<a style='color: blue' target='_blank' href='https://www.google.ca/search?tbm=isch&q="+e+"'>Images</a>, ",w.links.innerHTML+="<a style='color: blue' target='_blank' href='https://www.google.ca/search?tbm=isch&tbs=itp:lineart&q="+e+"'>Line art</a>"):w.links.innerHTML="")}function b(r,i){$("#audio").css({left:"unset",right:"0px"}),window.setInterval(o,2e3),$(w.links).css({padding:"0 1em 0 1em"}),s().after(w.links);var e=$("#formChat")[0];$(w.content).css({position:"relative",left:"295px",top:"-25px"}),w.wordsList.css({width:"70%","margin-top":"10px","background-color":"#eee",padding:"4px","border-radius":"2px","list-style-position":"inside",columns:"4"}),e.appendChild(w.content),$("#screenGame")[0].appendChild(w.wordsList[0]),h()[0].style.border="3px solid orange",window.setInterval(function(){var e,n,t;v(),e=r,n=i,"The word was: "===(t=$("#overlay .content .text")[0].innerText).slice(0,14)&&(t=t.slice(14))!==w.prevAnswer&&(w.prevAnswer=t,unsafeWindow.dictionary.oneOffWords=[],unsafeWindow.dictionary.guessed=[],unsafeWindow.dictionary.validAnswers=[],"undefined"!=typeof admin&&addToConfirmed(t,e,n)),$("#boxMessages p[style='color: rgb(204, 204, 0); font-weight: bold;'] span:contains( is close!)").not(".skribblerHandled").slice(-10).each(function(e,n){var t=n.innerText.split("'")[1];-1===unsafeWindow.dictionary.oneOffWords.indexOf(t)&&(unsafeWindow.dictionary.oneOffWords.push(t),n.classList.add("skribblerHandled"),a(l()))}),d(),$(w.wordsList).is(":visible")?0!==w.wordsList.children().length&&!y()&&c(l(),0)||w.wordsList.hide():0<w.wordsList.children().length&&!y()&&c(l(),0)&&w.wordsList.show(),document.hidden&&$(".modal-dialog:contains(Are you still here?)").is(":visible")&&alert("Action required.")},1e3),$("#boxChatInput").append($('<div style="background-color:#eee; position:relative; top:-20px; padding:0 5px; width:auto; margin:0;">\n<input id="guessEnabled" name="guessEnabled" style="width:6px; height:6px;" type="checkbox">\n<label for="guessEnabled" style="all: initial; padding-left:5px;">Enable auto-guesser</label><br>\n<label for="guessRate" style="all: initial; padding-right:5px;">Guess frequency (seconds):</label>\n<input id="guessRate" name="guessRate" type="number" step="0.1" min="0.5" value="1.5" style="width:4em;"></div>'));var n=0,t=0;window.setInterval(function(){$("#guessEnabled").is(":checked")&&1500<=Date.now()-t&&Date.now()-n>=1e3*$("#guessRate").val()&&(n=Date.now(),function(e){if(c(e,1)&&!y()){var n=unsafeWindow.dictionary.validAnswers,t=[],r=!0,i=!1,o=void 0;try{for(var a,s=n[Symbol.iterator]();!(r=(a=s.next()).done);r=!0){var l=a.value;-1<unsafeWindow.dictionary.confirmed.indexOf(l)&&t.push(l)}}catch(e){i=!0,o=e}finally{try{!r&&s.return&&s.return()}finally{if(i)throw o}}var d=void 0;d=0<t.length?t[Math.floor(Math.random()*t.length)]:n[Math.floor(Math.random()*n.length)];var u=Object.keys(unsafeWindow.formChat).filter(function(e){return~e.indexOf("jQuery")})[0];window.setTimeout(function(){""===h().val()&&c(e,1)&&!y()&&(h().val(d),unsafeWindow.formChat[u].events.submit[0].handler())},Math.floor(800*Math.random()))}}(l()))},500),h().keyup(function(){t=Date.now()}),h().keyup(p)}function n(e){var r,i,n="",t="";e&&(n=prompt("Please enter your skribbler username").toLowerCase(),t=prompt("Please enter your skribbler password")),r=n,i=t,GM.xmlHttpRequest({method:"GET",url:"https://skribbler.herokuapp.com/api/words",onload:function(e){var n=JSON.parse(e.responseText);unsafeWindow.dictionary.standard=n.default,unsafeWindow.dictionary.confirmed=n.confirmed;var t=window.setInterval(function(){s()&&(clearInterval(t),b(r,i))},1e3)}})}unsafeWindow.dictionary={standard:[],confirmed:[],oneOffWords:[],guessed:[],validAnswers:[]},$(document).ready(function(){"undefined"==typeof GM&&(GM={xmlHttpRequest:GM_xmlhttpRequest});var e=$("<button>Activate skribbler</button>");e.css({"font-size":"0.6em"}),$(".loginPanelTitle").first().append(e),e.click(function(){e.hide(),"undefined"!=typeof admin?n("admin"):n()})});