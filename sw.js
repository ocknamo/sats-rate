const urlsToCache = [
    './index.html',
    './currency-selection/index.html',
    './styles.css',
    './main.js',
    './lib/currencyManager.js',
    './lib/currencySelection.js',
    './lib/lightning-address.js',
    './lib/pos.js',
    './lib/currencies.json',
    './lib/nostr-zap@0.21.0.js',
    './lib/qr-code-styling@1.6.0-rc.1.js',
    './lib/sortable@1.15.2.js',
    './manifest.json',
    './fonts/RoundedMplus1c-Regular.woff2',
    './fonts/RoundedMplus1c-Medium.woff2',
    './fonts/RoundedMplus1c-Bold.woff2',
    './favicons/favicon.ico',
    './images/icon.svg',
    './images/icon_x192.png',
    './images/icon_x512.png',
    './images/maskable_icon_x192.png',
    './images/maskable_icon_x512.png',
    './images/square-x-twitter.svg',
    './images/nostr-icon-purple-on-white.svg',
    './images/cloud-solid.svg',
    './images/share-nodes-solid.svg',
    './images/clipboard-solid.svg',
    './images/bitcoin-zukan.webp',
    './images/fulgur-favicon.webp',
    './images/alby_icon_head_yellow_48x48.svg',
    './images/btcmap-logo.svg',
    './images/robosats-favicon.webp',
    './images/mempool-favicon.webp',
    './images/bolt-solid.svg',
    './images/list-ol-solid.svg',
    './images/magnifying-glass-solid.svg',
    './images/sun-regular.svg',
    './images/moon-regular.svg',
    './images/angle-down-solid.svg',
    './images/settings-solid.svg',
    './images/bitcoin-icon.svg',
    './images/drag_indicator_16dp_000000_FILL0_wght400_GRAD0_opsz20.svg',
    './images/caret-up-solid.svg',
    './images/caret-down-solid.svg',
    './images/trash-solid.svg',
    './images/cryptocurrency-icons/btc.svg',
    './images/cryptocurrency-icons/btc-s.svg',
    './images/cryptocurrency-icons/eth.svg',
    './images/cryptocurrency-icons/ltc.svg',
    './images/cryptocurrency-icons/bch.svg',
    './images/cryptocurrency-icons/bnb.svg',
    './images/cryptocurrency-icons/eos.svg',
    './images/cryptocurrency-icons/xrp.svg',
    './images/cryptocurrency-icons/xlm.svg',
    './images/cryptocurrency-icons/link.svg',
    './images/cryptocurrency-icons/dot.svg',
    './images/cryptocurrency-icons/yfi.svg',
    './images/flags/emoji_u1f1fa_1f1f8.svg',
    './images/flags/emoji_u1f1e6_1f1ea.svg',
    './images/flags/emoji_u1f1e6_1f1f7.svg',
    './images/flags/emoji_u1f1e6_1f1fa.svg',
    './images/flags/emoji_u1f1e7_1f1e9.svg',
    './images/flags/emoji_u1f1e7_1f1ed.svg',
    './images/flags/emoji_u1f1e7_1f1f2.svg',
    './images/flags/emoji_u1f1e7_1f1f7.svg',
    './images/flags/emoji_u1f1e8_1f1e6.svg',
    './images/flags/emoji_u1f1e8_1f1ed.svg',
    './images/flags/emoji_u1f1e8_1f1f1.svg',
    './images/flags/emoji_u1f1e8_1f1f3.svg',
    './images/flags/emoji_u1f1e8_1f1ff.svg',
    './images/flags/emoji_u1f1e9_1f1f0.svg',
    './images/flags/emoji_u1f1ea_1f1fa.svg',
    './images/flags/emoji_u1f1ec_1f1e7.svg',
    './images/flags/emoji_u1f1ec_1f1ea.svg',
    './images/flags/emoji_u1f1ed_1f1f0.svg',
    './images/flags/emoji_u1f1ed_1f1fa.svg',
    './images/flags/emoji_u1f1ee_1f1e9.svg',
    './images/flags/emoji_u1f1ee_1f1f1.svg',
    './images/flags/emoji_u1f1ee_1f1f3.svg',
    './images/flags/emoji_u1f1ef_1f1f5.svg',
    './images/flags/emoji_u1f1f0_1f1f7.svg',
    './images/flags/emoji_u1f1f0_1f1fc.svg',
    './images/flags/emoji_u1f1f1_1f1f0.svg',
    './images/flags/emoji_u1f1f2_1f1f2.svg',
    './images/flags/emoji_u1f1f2_1f1fd.svg',
    './images/flags/emoji_u1f1f2_1f1fe.svg',
    './images/flags/emoji_u1f1f3_1f1ec.svg',
    './images/flags/emoji_u1f1f3_1f1f4.svg',
    './images/flags/emoji_u1f1f3_1f1ff.svg',
    './images/flags/emoji_u1f1f5_1f1ed.svg',
    './images/flags/emoji_u1f1f5_1f1f0.svg',
    './images/flags/emoji_u1f1f5_1f1f1.svg',
    './images/flags/emoji_u1f1f7_1f1fa.svg',
    './images/flags/emoji_u1f1f8_1f1e6.svg',
    './images/flags/emoji_u1f1f8_1f1ea.svg',
    './images/flags/emoji_u1f1f8_1f1ec.svg',
    './images/flags/emoji_u1f1f9_1f1ed.svg',
    './images/flags/emoji_u1f1f9_1f1f7.svg',
    './images/flags/emoji_u1f1f9_1f1fc.svg',
    './images/flags/emoji_u1f1fa_1f1e6.svg',
    './images/flags/emoji_u1f1fb_1f1ea.svg',
    './images/flags/emoji_u1f1fb_1f1f3.svg',
    './images/flags/emoji_u1f1ff_1f1e6.svg',
    './images/silver-icon.png',
    './images/gold-icon.png'
];

const VERSION = '2.13';
let CACHE_NAME = 'osats-caches-' + VERSION;
const MY_CACHES = new Set([CACHE_NAME]);

self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(urlsToCache);

        // 新しいバージョンがインストールされたことをクライアントに通知
        self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then((clients) => {
            clients.forEach(client => client.postMessage({ type: 'NEW_VERSION_INSTALLED' }));
        });

        const keys = await caches.keys();
        await Promise.all(
            keys
                .filter(key => !MY_CACHES.has(key))
                .map(key => caches.delete(key))
        );
        return self.skipWaiting();
    })());
});

self.addEventListener('fetch', (ev) => void ev.respondWith((async () => {
    const url = new URL(ev.request.url);
    if (url.origin === location.origin) {
        url.search = '';
    }

    let requestToFetch = ev.request;

    if (ev.request.mode === 'navigate') {
        requestToFetch = new Request(ev.request, {
            mode: 'cors'
        });
    }

    const cacheResponse = await caches.match(url.toString());

    return cacheResponse || fetch(requestToFetch);
})()));

self.addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
    if (event.data === 'CHECK_UPDATE_STATUS') {
        if (self.registration.waiting) {
            // 新しいバージョンがインストールされ、待機中であれば NEW_VERSION_INSTALLED を送信
            event.source.postMessage({ type: 'NEW_VERSION_INSTALLED' });
        } else if (self.registration.installing) {
            // 新しいバージョンが現在インストール中であれば、インストールの完了を待機
            const worker = self.registration.installing;
            worker.addEventListener('statechange', () => {
                if (worker.state === 'installed') {
                    event.source.postMessage({ type: 'NEW_VERSION_INSTALLED' });
                }
            });
        } else {
            // 更新がない場合、あるいはまだ新しいバージョンが準備されていない場合は NO_UPDATE_FOUND を送信
            event.source.postMessage({ type: 'NO_UPDATE_FOUND' });
        }
    }
    if (event.data.action === 'getVersion') {
        event.ports[0].postMessage({ version: VERSION });
    }
});
