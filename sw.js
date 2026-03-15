self.addEventListener('push', function(e) {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || 'SAA Alert', {
      body: data.message || 'You have a new notification',
      icon: '/saa-relay/icon.png',
      badge: '/saa-relay/icon.png',
      vibrate: [300, 200, 300],
      tag: 'saa-alert',
      renotify: true
    })
  );
});

// Handle notification click — open the dashboard
self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(clientList) {
      for (const client of clientList) {
        if (client.url.includes('ceo-dashboard') && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./ceo-dashboard.html');
    })
  );
});
