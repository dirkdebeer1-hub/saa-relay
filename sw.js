// SAA Command — Service Worker v4
// No caching on install — network-first, instant activation

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
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
