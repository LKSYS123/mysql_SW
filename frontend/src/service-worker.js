import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkOnly } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { BackgroundSyncPlugin, Queue } from 'workbox-background-sync';

clientsClaim();

self.skipWaiting();

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
    ({ url }) => url.origin === 'https://fonts.googleapis.com',
    new StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

registerRoute(
    ({ url }) => url.origin === 'https://fonts.gstatic.com',
    new CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
        ],
    })
);

registerRoute(
    ({ request }) => request.destination === 'script' ||
        request.destination === 'style',
    new StaleWhileRevalidate({
        cacheName: 'static-resources',
    })
);

self.addEventListener('fetch', event => {
    console.log('fettttttttttt', event.request.url);
    // if (event.request.url === 'chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/react_devtools_backend.js') {
    //     event.waitUntil(
    //         self.registration.showNotification("Hello", {
    //             body: "가나다라. Glory_Truck 입니다.",
    //         })
    //     )
    // }
})

const bgSyncPlugin = new BackgroundSyncPlugin('lksys-queue', {
    maxRetentionTime: 24 * 60, // 재시도 할 수 있는 시간 (분단위)
    onSync: async ({ queue }) => {
        console.log('====== sync sync sync sync ======');
        let entry;
        if ((entry = await queue.shiftRequest())) {
            console.log('queue =====> ', queue);
            console.log('entry =====> ', entry);
            try {
                const response = await fetch(entry.request.clone());
                const result = await response.json();
                console.log('service-worker-result ======> ', JSON.stringify(result));

            } catch (error) {
                console.error('Replay failed for request', entry.request);

                // 다시 대기열에 넣고 오류 발생
                await queue.unshiftRequest(entry);
                throw error;
            }
        }
    }
});

registerRoute(
    /.*\/api\/.*/,
    new NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'POST'
);

registerRoute(
    ({ request }) => request.url === 'http://localhost:4000/api/posts',
    new StaleWhileRevalidate({
        cacheName: 'LKSYS-data',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ]
    })
)

self.addEventListener('sync', (event) => {
    console.log('===== 서비스 워커 - sync : ', event.tag);
    console.log('sync 이벤트 ====> ', event);
});