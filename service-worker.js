importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
	console.log(`Workbox berhasil dimuat`);
else
	console.log(`Workbox gagal dimuat`);

	workbox.routing.registerRoute(
		new RegExp('https://api.football-data.org/v2/'),
		workbox.strategies.staleWhileRevalidate({
			cacheName: 'footballdata',
			plugins: [
				new workbox.expiration.Plugin({
				maxAgeSeconds: 3 * 24 * 60 * 60, // 3 hari
				}),
			],
		})
	);

	workbox.routing.registerRoute(
		new RegExp('https://fonts.googleapis.com/icon?family=Material+Icons'),
		workbox.strategies.staleWhileRevalidate({
			cacheName: 'fontsmaterial',
			plugins: [
				new workbox.expiration.Plugin({
				maxAgeSeconds: 3 * 24 * 60 * 60, // 3 hari
				}),
			],
		})
	);

	workbox.routing.registerRoute(
		new RegExp('https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'),
		workbox.strategies.staleWhileRevalidate({
			cacheName: 'materialicons',
			plugins: [
				new workbox.expiration.Plugin({
				maxAgeSeconds: 3 * 24 * 60 * 60, // 3 hari
				}),
			],
		})
	);

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

