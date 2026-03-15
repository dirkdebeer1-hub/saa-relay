// SAA Command — Service Worker v5
// Background push notifications + network-first fetch

const SUPABASE_URL = 'https://ofeeugovkunenbiigozr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mZWV1Z292a3VuZW5iaWlnb3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MDMxNjAsImV4cCI6MjA1NzE3OTE2MH0.yGJmBNJsXjiCrl6HLajEUy6GqgPYmkjFOBIHsB73lmY';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

// Handle push — if no payload, fetch latest unread from Supabase
self.addEventListener('push', e => {
  let promise;
  if (e.data) {
    try {
      const d = e.data.json();
      promise = self.registration.showNotification(d.title || 'SAA Alert', {
        body: d.message || 'New notification',
        vibrate: [300, 200, 300],
        tag: 'saa-' + Date.now(),
        renotify: true
      });
    } catch(_) {
      promise = fetchAndNotify();
    }
  } else {
    promise = fetchAndNotify();
  }
  e.waitUntil(promise);
});

// Fetch latest unread notification from Supabase and show it
async function fetchAndNotify() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/notifications?is_read=eq.false&is_dismissed=eq.false&order=created_at.desc&limit=1`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return self.registration.showNotification(data[0].title || 'SAA Alert', {
        body: data[0].message || 'You have a new notification',
        vibrate: [300, 200, 300],
        tag: 'saa-' + Date.now(),
        renotify: true
      });
    }
    return self.registration.showNotification('SAA Alert', {
      body: 'You have a new notification',
      vibrate: [300, 200, 300],
      tag: 'saa-' + Date.now(),
      renotify: true
    });
  } catch(_) {
    return self.registration.showNotification('SAA Alert', {
      body: 'Check the dashboard',
      vibrate: [300, 200, 300],
      tag: 'saa-' + Date.now(),
      renotify: true
    });
  }
}

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
