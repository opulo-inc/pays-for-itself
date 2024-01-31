(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function s(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(t){if(t.ep)return;t.ep=!0;const a=s(t);fetch(t.href,a)}})();document.getElementById("calculate-button").addEventListener("click",x,!1);var f,b;document.getElementById("graph-type").onclick=function(){this.checked?(document.getElementById("cost-graph").style.display="block",document.getElementById("time-graph").style.display="none"):(document.getElementById("cost-graph").style.display="none",document.getElementById("time-graph").style.display="block")};function P(r,n){typeof r<"u"&&r.destroy(),typeof n<"u"&&n.destroy()}function g(r,n,s){var l=s*n*r;return l}function h(r,n,s){var l=1995,t=3,a=2.5/60/s,d=l+t*n+a*n*r;return d}function E(r,n){return r/n}function I(r,n,s){if(r<4)return 0;{let l=r-3,t=2.5/60/s,a=n/800,d=t+a;return l/d}}function x(){P(f,b);var r=document.getElementById("operator-rate").value,n=document.getElementById("hand-time").value/60,s=document.getElementById("parts-per-board").value;let l=document.getElementById("boards-per-job").value;for(var t=[],a=[],d=[],e=1,m=!1,p=0;!m&&(a[e-1]=g(e,r,n),t[e-1]=h(e,r,l),d[e-1]=e,a[e-1]>t[e-1]&&(m=!0,p=e),e=e+1,!(e>5e3)););for(;e<p*5&&(a[e-1]=g(e,r,n),t[e-1]=h(e,r,l),d[e-1]=e,e=e+1,!(e>5e3)););console.log("final hand data: "+a),console.log("final lumen data: "+t);const v=document.getElementById("myChart");f=new Chart(v,{type:"line",data:{labels:d,datasets:[{label:"Hand Population",data:a,borderWidth:1},{label:"LumenPnP Population",data:t,borderWidth:1}]},options:{plugins:{tooltip:{callbacks:{label:function(o){let i=o.dataset.label||"";return i&&(i+=": "),o.parsed.y!==null&&(i+=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(o.parsed.y)+" spent to produce "+(o.parsed.x+1)+" boards."),i},title:function(o){return""}}},title:{display:!0,text:"Cost per Board Produced",padding:{top:30,bottom:10},font:{size:20}}},maintainAspectRatio:!0,animations:!1,aspectRatio:2,scales:{y:{title:{display:!0,text:"Total Cost"},display:!0,beginAtZero:!0,ticks:{callback:function(o,i,L){return"$"+o}}},x:{title:{display:!0,text:"Boards Produced"}}}}}),document.getElementById("order").innerHTML="<p>A LumenPnP pays for itself after</p><div class='flipped-point'>"+p+"</div><p>boards produced.</p>",document.getElementById("order").style.display="inline-block";for(var c=[],u=[],y=[],e=1;e<41;)u[e-1]=E(e,n),c[e-1]=I(e,s,l),y[e-1]=e,e=e+1;console.log("final hand boards: "+u),console.log("final lumen boards: "+c);const _=document.getElementById("boardsChart");b=new Chart(_,{type:"line",data:{labels:y,datasets:[{label:"Hand Population",data:u,borderWidth:1},{label:"LumenPnP Population",data:c,borderWidth:1}]},options:{plugins:{tooltip:{callbacks:{label:function(o){let i=o.dataset.label||"";return i&&(i+=": "),o.parsed.y!==null&&(i+=o.parsed.y.toFixed(2)+" boards produced after "+(o.parsed.x+1)+" hours"),i},title:function(o){return""}}},title:{display:!0,text:"Boards Produced per Hour",padding:{top:30,bottom:10},font:{size:20}}},maintainAspectRatio:!0,animations:!1,aspectRatio:2,scales:{y:{title:{display:!0,text:"Boards Produced"},display:!0,beginAtZero:!0},x:{title:{display:!0,text:"Hours"}}},tooltips:{callbacks:{label:function(o){return o.yLabel}}}}});var B=(c[39]-c[38])/(u[39]-u[38]);document.getElementById("bph-result").innerHTML="<p>A LumenPnP assembles boards</p><div class='flipped-point'>"+B.toFixed(1)+"x</div><p>faster than hand-placing after setup.</p>",document.getElementById("bph-result").style.display="inline-block",document.getElementById("graph-type").checked?(document.getElementById("cost-graph").style.display="block",document.getElementById("time-graph").style.display="none"):(document.getElementById("cost-graph").style.display="none",document.getElementById("time-graph").style.display="block")}
