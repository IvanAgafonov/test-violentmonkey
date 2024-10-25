// ==UserScript==
// @name         BUMP web
// @version      0.0
// @author       IvanAgafonov
// @match        *://mmbump.pro/*
// @run-at       document-start
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/IvanAgafonov/test-violentmonkey/refs/heads/main/bump.user.js
// @updateURL    https://raw.githubusercontent.com/IvanAgafonov/test-violentmonkey/refs/heads/main/bump.user.js
// @homepage     https://github.com/IvanAgafonov/test-violentmonkey
// ==/UserScript==

(function() {
    'use strict';

   function getRandomiOSUserAgent() {
        const iOSVersions = ['14_0', '14_1', '14_2', '14_3', '14_4', '14_5', '14_6', '14_7', '14_8',
                             '15_0', '15_1', '15_2', '15_3', '15_4', '15_5', '15_6', '15_7',
                             '16_0', '16_1', '16_2', '16_3', '16_4', '16_5', '16_6', '16_7',
                             '17_0', '17_1', '17_2', '17_3', '17_4', '17_5'];
        const iPhoneModels = ['iPhone11,2', 'iPhone11,4', 'iPhone11,6', 'iPhone11,8', 'iPhone12,1',
                              'iPhone12,3', 'iPhone12,5', 'iPhone13,1', 'iPhone13,2', 'iPhone13,3',
                              'iPhone13,4', 'iPhone14,2', 'iPhone14,3', 'iPhone14,4', 'iPhone14,5'];
        const randomVersion = iOSVersions[Math.floor(Math.random() * iOSVersions.length)];
        const randomModel = iPhoneModels[Math.floor(Math.random() * iPhoneModels.length)];
        return `Mozilla/5.0 (${randomModel}; CPU iPhone OS ${randomVersion} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1`;
    }

    const newUserAgent = getRandomiOSUserAgent();

    Object.defineProperty(navigator, 'userAgent', {
        get: function() { return newUserAgent; }
    });

    Object.defineProperty(navigator, 'platform', {
        get: function() { return 'iPhone'; }
    });

    Object.defineProperty(navigator, 'vendor', {
        get: function() { return 'Apple Computer, Inc.'; }
    });
    function emitTouchEvent(event, touchType) {
        var touchObj = new Touch({
            identifier: Date.now(),
            target: event.target,
            clientX: event.clientX,
            clientY: event.clientY,
            screenX: event.screenX,
            screenY: event.screenY,
            pageX: event.pageX,
            pageY: event.pageY,
            radiusX: 2.5,
            radiusY: 2.5,
            rotationAngle: 10,
            force: 0.5,
        });

        var touchEvent = new TouchEvent(touchType, {
            cancelable: true,
            bubbles: true,
            shiftKey: true,
            touches: [touchObj],
            targetTouches: [touchObj],
            changedTouches: [touchObj],
        });

        event.target.dispatchEvent(touchEvent);
    }

    document.addEventListener('mousedown', function(event) {
        emitTouchEvent(event, 'touchstart');
    });

    document.addEventListener('mousemove', function(event) {
        emitTouchEvent(event, 'touchmove');
    });

    document.addEventListener('mouseup', function(event) {
        emitTouchEvent(event, 'touchend');
    });

})();
