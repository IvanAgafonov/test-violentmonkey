// ==UserScript==
// @name         wcoin web
// @version      0.1
// @author       IvanAgafonov
// @match        *://alohomora-bucket-fra1-prod-frontend-static.fra1.cdn.digitaloceanspaces.com/*
// @match        *://*.app.w-coin.io/*
// @run-at       document-start
// @grant        none
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/wcoin.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/wcoin.user.js
// @homepage     https://github.com/IvanAgafonov/test-violentmonkey
// ==/UserScript==

(function() {
    'use strict';

    var newUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";

    Object.defineProperty(navigator, 'userAgent', {
        get: function() { return newUserAgent; }
    });

    Object.defineProperty(navigator, 'platform', {
        get: function() { return 'iPhone'; }
    });

    Object.defineProperty(navigator, 'vendor', {
        get: function() { return 'Apple Computer, Inc.'; }
    });
})();
