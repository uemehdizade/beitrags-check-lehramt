// Im Check24-Tab (https://bu.check24.de/...) ausführen. Lädt je Alter eine Ergebnisseite in einem versteckten iframe, nacheinander.
// Ablauf: window.__G = <Inhalt von groups.json>; dann window.__chain2() starten (siehe README). Ergebnis: window.__ALL, window.__done.all
window.__run = async function(group, ages){
  const out={}; const WANT=/^(BU PROTECT NR|BU PROTECT Teil DU NR|ALVSDV Allg\. DU NR|ALVSDV Allg\. Teil-DU NR|WorkLife EXKLUSIV-PLUS DU|WorkLife EXKLUSIV-PLUS Teil-DU)$/;
  const extract=(doc)=>{const t=doc.body.innerText; const parts=t.split(/\n(?=\d+\.\n)/); const res={};
    for(const p of parts){ const l=p.split('\n').filter(Boolean); if(/^\d+\.$/.test(l[0]) && WANT.test((l[1]||'').trim())){ const m=p.match(/(\d{2,3},\d\d)\s*€/); if(m) res[l[1].trim()]=m[1]; } }
    return {cnt:(t.match(/(\d+) Tarife entsprechen/)||[0,0])[1], res};};
  for(const age of ages){ const q=group.replace('{BD}',(new Date().getFullYear()-age)+'-11-17');
    const f=document.createElement('iframe'); f.style.cssText='position:fixed;left:-9999px;width:1024px;height:768px'; f.src='https://bu.check24.de/result?'+q; document.body.appendChild(f);
    let r=null; for(let i=0;i<80;i++){ await new Promise(x=>setTimeout(x,1000)); try{ const e=extract(f.contentDocument); if(+e.cnt>0){ await new Promise(x=>setTimeout(x,6000)); r=extract(f.contentDocument); break;} }catch(err){ if(i>8){ r={err:String(err)}; break;} } }
    f.remove(); out[age]=r; await new Promise(x=>setTimeout(x,2000)); }
  return out; };
window.__ALL={}; window.__done={};
window.__chain2=(async()=>{ for(const g of Object.keys(window.__G)){ const [q,a,b]=window.__G[g]; const ages=[]; for(let x=a;x<=b;x++)ages.push(x);
  window.__ALL[g]=await window.__run(q,ages); window.__done[g]=Date.now(); localStorage.setItem('duall',JSON.stringify(window.__ALL)); } window.__done.all=Date.now(); });
