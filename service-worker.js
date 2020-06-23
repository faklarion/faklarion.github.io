importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
	console.log(`Workbox berhasil dimuat`);
else
	console.log(`Workbox gagal dimuat`);

	workbox.routing.registerRoute(
		new RegExp('/pages/'),
		  workbox.strategies.staleWhileRevalidate({
			  cacheName: 'pages'
		  })
	  );

	  workbox.routing.registerRoute(
		new RegExp('/css/'),
		  workbox.strategies.staleWhileRevalidate({
			  cacheName: 'css'
		  })
	  );

	  workbox.routing.registerRoute(
		new RegExp('/js/'),
		  workbox.strategies.staleWhileRevalidate({
			  cacheName: 'js'
		  })
	  );

	  workbox.routing.registerRoute(
		new RegExp('/'),
		  workbox.strategies.staleWhileRevalidate({
			  cacheName: 'root'
		  })
	  );

	workbox.precaching.precacheAndRoute([
		{ url: '/index.html', revision: '1' },
		{ url: '/nav.html', revision: '1' },
		{ url: '/css/materialize.min.css', revision: '1' },
		{ url: '/css/materialize.css', revision: '1' },
		{ url: '/js/materialize.min.js', revision: '1' },
		{ url: '/js/materialize.js', revision: '1' },
		{ url: '/js/script.js', revision: '1' },
		{ url: '/teamdetails.html', revision: '1' },
		{ url: '/manifest.json', revision: '1' },
		{ url: '/', revision: '1' },
		{ url: '/icon.png', revision: '1' },
		{ url: '/pages/teams.html', revision: '1' },
		{ url: '/pages/klasemen.html', revision: '1' },
		{ url: '/pages/saved.html', revision: '1' },
		{ url: '/css/style.css', revision: '1' },
		{ url: '/css/custom.css', revision: '1' },
		{ url: '/js/api.js', revision: '1' },
		{ url: '/js/db.js', revision: '1' },
		{ url: '/js/idb.js', revision: '1' },
		{ url: '/js/notif.js', revision: '1' },
		{ url: '/push.js', revision: '1' },
	]);

const CACHE_NAME = 'firstpwa-v4';
var urlsToCache = [
	'/',
	'/teamdetails.html',
	'/manifest.json',
	'/icon.png',
	'/nav.html',
	'/index.html',
	'/pages/teams.html',
	'/pages/klasemen.html',
	'/pages/saved.html',
	'/css/materialize.css',
	'/css/materialize.min.css',
	'/css/style.css',
	'/css/custom.css',
	'/js/api.js',
	'/js/db.js',
	'/js/idb.js',
	'/js/notif.js',
	'/push.js',
	'/js/materialize.js',
	'/js/materialize.min.js',
	'/js/script.js'
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){	
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	self.addEventListener("fetch", function(event) {
		var base_url = "https://api.football-data.org/v2/";
		if (event.request.url.indexOf(base_url) > -1) {
		  event.respondWith(
			caches.open(CACHE_NAME).then(function(cache) {
			  return fetch(event.request).then(function(response) {
				cache.put(event.request.url, response.clone());
				return response;
			  })
			})
		  );
		} else {
		  event.respondWith(
			caches.match(event.request, { ignoreSearch: true }).then(function(response) {
			  return response || fetch (event.request);
			})
		  )
		}
	  });
});

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: '/icon.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });

