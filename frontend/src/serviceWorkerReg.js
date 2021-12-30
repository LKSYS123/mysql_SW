import { Workbox } from "workbox-window";

export default function serviceWorkerReg() {

    function determineAppServerKey() {
        var vapidPublicKey = 'BCH9PPrNM8ZVn42LUPbJkU5vamrtz7eZwHvsz7v-Xubr80w83jf8yGnGJlX8ZoskwEOOswj548tRdKeIHVAPFwo';
        return urlBase64ToUint8Array(vapidPublicKey);
    }

    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    if ('production' !== process.env.NODE_ENV) {
        return;
    }

    // 브라우저가 serviceWorker 지원 시 등록
    if ('serviceWorker' in navigator) {
        const wb = new Workbox('sw.js');

        // 서비스 워커 설치
        wb.addEventListener('installed', event => {
            if (event.isUpdate) {
                console.warn('업데이트 발견');
                window.location.reload();
            }
        });
        wb.register()
            .then((response => {
                // subscription이 있는조회
                return response.pushManager.getSubscription()
                    .then(function (subscription) {
                        return response.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: determineAppServerKey()
                        })
                    })
            }))
    }
}

