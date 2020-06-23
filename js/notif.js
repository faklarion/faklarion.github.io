// Periksa service worker
    if (!('serviceWorker' in navigator)) {
      console.log("Service worker tidak didukung browser ini.");
    } else {
      requestPermission();
    }
    function requestPermission() {
if ('Notification' in window) {
  Notification.requestPermission().then(function (result) {
    if (result === "denied") {
      console.log("Fitur notifikasi tidak diijinkan.");
      return;
    } else if (result === "default") {
      console.error("Pengguna menutup kotak dialog permintaan ijin.");
      return;
    }
    if (('PushManager' in window)) {
      navigator.serviceWorker.getRegistration().then(function(registration) {
          registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array("BHlYCFifXsQDr0HkQaroztb7aviXImIDTTJKMeErVZMUrdG94-6e6qnTxUKsL_IuRUS9gZJr_caacVTGFSfgnV0")
          }).then(function(subscribe) {
              console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
              console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                  null, new Uint8Array(subscribe.getKey('p256dh')))));
              console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                  null, new Uint8Array(subscribe.getKey('auth')))));
          }).catch(function(e) {
              console.error('Tidak dapat melakukan subscribe ', e.message);
          });
      });
  }
  });
}
    }
