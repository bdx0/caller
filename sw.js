'use strict';
const CACHE='caller-shell-__CALLER_BUILD__';
const ASSETS=['./','./index.html','./style.css','./app.js','./pwa.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./vendor/qrcode.js','./vendor/jsQR.js'];
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(ASSETS.map(path=>new Request(path,{cache:'reload'})));if(!self.registration.active)await self.skipWaiting()})()));
self.addEventListener('message',e=>{if(e.data?.type==='SKIP_WAITING')e.waitUntil(self.skipWaiting())});
self.addEventListener('activate',e=>e.waitUntil((async()=>{await Promise.all((await caches.keys()).filter(k=>k.startsWith('caller-shell-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})()));
const ROOT=new URL(self.registration.scope);
const shellURLs=new Set(ASSETS.map(p=>new URL(p,ROOT).href));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==ROOT.origin||!u.pathname.startsWith(ROOT.pathname))return;if(u.pathname===new URL('version.json',ROOT).pathname){e.respondWith(fetch(e.request,{cache:'no-store'}));return}if(e.request.mode==='navigate'){e.respondWith((async()=>{const c=await caches.open(CACHE);return await c.match(new URL('index.html',ROOT))||fetch(e.request)})());return}if(shellURLs.has(u.href)){e.respondWith((async()=>{const c=await caches.open(CACHE);return await c.match(e.request)||fetch(e.request)})())}});
