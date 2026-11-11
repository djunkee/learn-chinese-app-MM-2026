// Offline support. Keep this file unchanged between releases: the app updates only when the
// user taps "Update" (the page then sends the 'update' message below). Progress is stored
// separately in the browser and is never touched here.
const CACHE='jiayou-app';
const FILES=['./','index.html','data.js','icon.svg','icon-192.png','icon-512.png','manifest.webmanifest'];
const fresh=f=>fetch(new Request(f,{cache:'reload'}));
async function fill(){const c=await caches.open(CACHE);const keys=(await c.keys()).map(r=>r.url);const all=[...new Set([...FILES.map(f=>new URL(f,self.registration.scope).href),...keys])];
  const got=await Promise.all(all.map(u=>fresh(u).then(r=>r.ok?[u,r]:null).catch(()=>null)));
  const need=FILES.map(f=>new URL(f,self.registration.scope).href);if(need.some(u=>!got.find(x=>x&&x[0]===u)))return false;
  await Promise.all(got.filter(Boolean).map(x=>c.put(x[0],x[1])));return true}
self.addEventListener('install',e=>{e.waitUntil(fill().then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data&&e.data.type==='update'){e.waitUntil(fill().then(ok=>{if(e.ports[0])e.ports[0].postMessage({ok})}))}});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
  if(u.pathname.endsWith('version.json'))return; // always from the network
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match('index.html'))))});
