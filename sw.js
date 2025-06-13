const CACHE_NAME = 'dashboard-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/install-pwa.js',
  '/mobile-features.js',
  '/data.json',
  '/favicon.png'
];

// Service Worker yükleme
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch olayları için cache-first stratejisi
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache'den döndür varsa, yoksa network'ten getir
        if (response) {
          return response;
        }
        
        // Orijinal isteği klonla
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then((response) => {
          // Geçerli bir response kontrolü
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Response'u klonla
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
  );
});

// Cache güncelleme
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 