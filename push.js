var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BHlYCFifXsQDr0HkQaroztb7aviXImIDTTJKMeErVZMUrdG94-6e6qnTxUKsL_IuRUS9gZJr_caacVTGFSfgnV0",
    "privateKey": "PnFahTQV-ktqa8CgXY8gBo_qxHA-qJ1xrpaPmVIhaL8"
};

webPush.setVapidDetails(
    'mailto:faisal.hazard17@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fF2U9JhVRg8:APA91bFoVERKmym3LNsdJ9KTbEUJ8fMxm4YzYJ5Ymk38cwYhcVRPRdItaqzqid9C9LXig2KHN-lFU8zf859CJAPDZqP4yvgivW5-a1NlUtqB791OkQ4agdoPEYbIJ73Kz_9H0iOrFWqO",
    "keys": {
        "p256dh": "BNg4gOe77pi1fbcMJajCf3vBRSU4fx60XezQXxV9/2zaQjA+NW89PZM0vWkwXdg+I2qPkrVvuaM/D6znSxAgJJU=",
        "auth": "P+4JWdSUMCzf2i5uGNvj0A=="
    }
};
var payload = 'Ayo cek tim favoritmu !';
var options = {
    gcmAPIKey: '518436502772',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);