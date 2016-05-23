(function () {
    "use strict";

    var admobid = {};
    if (/(android)/i.test(navigator.userAgent)) {
        admobid = { // for Android
            banner: 'ca-app-pub-1438477418297657/3974559721',
            interstitial: 'ca-app-pub-1438477418297657/3276555724'
        };
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = { // for iOS
            banner: 'ca-app-pub-1438477418297657/9881492520',
            interstitial: 'ca-app-pub-1438477418297657/1799822520'
        };
    } else {
        admobid = { // for Windows Phone
            banner: 'ca-app-pub-1438477418297657/6230022126',
            interstitial: 'ca-app-pub-1438477418297657/9183488527'
        };
    }

    
    function initApp() {
        if (typeof AdMob !== "undefined") {
            if (AdMob) {
                AdMob.createBanner({
                    adId: admobid.banner,
                    position: AdMob.AD_POSITION.BOTTOM_CENTER,
                    autoShow: true,
                    bgColor: 'brown'
                });
            }
        } else {
            console.log('AdMob is undefined');
        }
    }

    document.addEventListener('deviceready', initApp, false);
})();