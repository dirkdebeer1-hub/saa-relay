const CACHE = 'saa-v1';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c =>
    c.addAll(['/saa-relay/ceo-dashboard.html'])));
  self.skipWaiting();
});

self.addEventListener('activate', e => self.clients.claim());

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

self.addEventListener('push', e => {
  const d = e.data ? e.data.json() : { title: 'SAA Alert', message: 'New notification' };
  e.waitUntil(self.registration.showNotification(d.title, {
    body: d.message,
    icon: '/saa-relay/icon-192.png',
    vibrate: [300, 200, 300],
    tag: 'saa',
    renotify: true
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('ceo-dashboard') && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./ceo-dashboard.html');
    })
  );
});
