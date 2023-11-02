(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function i(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=i(t);fetch(t.href,n)}})();document.getElementById("calculate-button").addEventListener("click",P,!1);var y,f;document.getElementById("graph-type").onclick=function(){this.checked?(document.getElementById("cost-graph").style.display="block",document.getElementById("time-graph").style.display="none"):(document.getElementById("cost-graph").style.display="none",document.getElementById("time-graph").style.display="block")};function B(o,a){typeof o<"u"&&o.destroy(),typeof a<"u"&&a.destroy()}function b(o,a,i){var r=i*a*o;return r}function g(o,a){var i=1995,r=2,t=1/60,n=i+r*a+t*a*o;return n}function E(o,a){return o/a}function I(o,a){var i=1e3;return o*(i/a)}function P(){B(y,f);var o=document.getElementById("operator-rate").value,a=document.getElementById("hand-time").value/60;console.log(a);for(var i=document.getElementById("cpb").value,r=[],t=[],n=[],e=1,s=!1,p=0;!s&&(t[e-1]=b(e,o,a),r[e-1]=g(e,o),n[e-1]=e,console.log("hand data: "+t[e-1]),t[e-1]>r[e-1]&&(s=!0,p=e),e=e+1,!(e>5e3)););for(;e<p*3&&(t[e-1]=b(e,o,a),r[e-1]=g(e,o),n[e-1]=e,e=e+1,!(e>5e3)););console.log("final hand data: "+t),console.log("final lumen data: "+r);const h=document.getElementById("myChart");y=new Chart(h,{type:"line",data:{labels:n,datasets:[{label:"Hand Population",data:t,borderWidth:1},{label:"LumenPnP Population",data:r,borderWidth:1}]},options:{plugins:{tooltip:{callbacks:{label:function(l){let d=l.dataset.label||"";return d&&(d+=": "),l.parsed.y!==null&&(d+=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(l.parsed.y)+" spent to produce "+(l.parsed.x+1)+" boards."),d},title:function(l){return""}}},title:{display:!0,text:"Cost per Board Produced",padding:{top:30,bottom:10},font:{size:20}}},maintainAspectRatio:!0,aspectRatio:2,scales:{y:{title:{display:!0,text:"Total Cost"},display:!0,beginAtZero:!0,ticks:{callback:function(l,d,x){return"$"+l}}},x:{title:{display:!0,text:"Boards Produced"}}}}}),document.getElementById("order").innerHTML="<p>A LumenPnP pays for itself after</p><div class='flipped-point'>"+p+"</div><p>boards produced.</p>",document.getElementById("order").style.display="inline-block";for(var u=[],c=[],m=[],e=1;e<41&&(c[e-1]=E(e,a),console.log(c[e-1]),u[e-1]=I(e,i),m[e-1]=e,e=e+1,!(e>5e3)););console.log("final hand boards: "+c),console.log("final lumen boards: "+u);const v=document.getElementById("boardsChart");f=new Chart(v,{type:"line",data:{labels:m,datasets:[{label:"Hand Population",data:c,borderWidth:1},{label:"LumenPnP Population",data:u,borderWidth:1}]},options:{plugins:{tooltip:{callbacks:{label:function(l){let d=l.dataset.label||"";return d&&(d+=": "),l.parsed.y!==null&&(d+=l.parsed.y.toFixed(2)+" boards produced after "+(l.parsed.x+1)+" hours"),d},title:function(l){return""}}},title:{display:!0,text:"Boards Produced per Hour",padding:{top:30,bottom:10},font:{size:20}}},maintainAspectRatio:!0,aspectRatio:2,scales:{y:{title:{display:!0,text:"Boards Produced"},display:!0,beginAtZero:!0},x:{title:{display:!0,text:"Hours"}}},tooltips:{callbacks:{label:function(l){return l.yLabel}}}}});var _=u[39]/c[39];document.getElementById("bph-result").innerHTML="<p>A LumenPnP assembles boards</p><div class='flipped-point'>"+_.toFixed(1)+"x</div><p>faster than hand-placing.</p>",document.getElementById("bph-result").style.display="inline-block",document.getElementById("graph-type").checked?(document.getElementById("cost-graph").style.display="block",document.getElementById("time-graph").style.display="none"):(document.getElementById("cost-graph").style.display="none",document.getElementById("time-graph").style.display="block")}