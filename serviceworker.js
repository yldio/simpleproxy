self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.keys().map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
  
  self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });