// ==UserScript==
// @name         Kucoin Autoclicker
// @version      0.0
// @namespace    Violentmonkey Scripts
// @author       IvanAgafonov
// @match        *://www.kucoin.com/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/kucoin.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/kucoin.user.js
// @homepage     https://github.com/IvanAgafonov/test-violentmonkey
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    let autoClickerRunning = false;

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function clickRandomInsideElement(element) {
        const rect = element.getBoundingClientRect();
        const x = getRandomInt(rect.left, rect.right);
        const y = getRandomInt(rect.top, rect.bottom);

        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y
        });

        element.dispatchEvent(clickEvent);
    }

    function getCurrentEnergy() {
        const energyElement = document.querySelector('.process--W73kB');
        if (!energyElement) return null;

        const currentEnergy = parseInt(energyElement.querySelector('span').textContent, 10);
        return isNaN(currentEnergy) ? null : currentEnergy;
    }

    function findTargetElement() {
        return document.querySelector('#root > div.container--WYn0q > div:nth-child(2) > div.mainTouch--DToch > div:nth-child(2) > div.frog--GPU1j');
    }

    function startAutoClicker() {
        const element = findTargetElement();

        if (!element) {
            console.log('Элемент не найден, повторяю попытку...');
            setTimeout(startAutoClicker, 1000);
            return;
        }

        const currentEnergy = getCurrentEnergy();

        if (currentEnergy === 0) {
            const pauseDuration = getRandomInt(30000, 60000);
            console.log(`Энергия на нуле, пауза на ${pauseDuration / 1000} секунд`);
            setTimeout(startAutoClicker, pauseDuration);
        } else {
            clickRandomInsideElement(element);
            const clickInterval = getRandomInt(100, 250);
            setTimeout(startAutoClicker, clickInterval);
        }
    }

    function initializeAutoClicker() {
        if (!autoClickerRunning && window.location.href.includes('/miniapp/tap-game')) {
            console.log('Инициализация автокликера...');
            autoClickerRunning = true;
            setTimeout(startAutoClicker, getRandomInt(5000, 7000));
        }
    }

    initializeAutoClicker();

    const observer = new MutationObserver(() => {
        initializeAutoClicker();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
