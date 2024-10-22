// ==UserScript==
// @name         Blum Autoclicker
// @version      0.0
// @namespace    Violentmonkey Scripts
// @author       IvanAgafonov
// @match        https://telegram.blum.codes/*
// @downloadURL  https://raw.githubusercontent.com/IvanAgafonov/test-violentmonkey/refs/heads/main/blum_clicker.user.js
// @updateURL    https://raw.githubusercontent.com/IvanAgafonov/test-violentmonkey/refs/heads/main/blum_clicker.user.js
// @homepage     https://github.com/IvanAgafonov/test-violentmonkey
// @grant        none
// ==/UserScript==

let GAME_SETTINGS = {
    minBombHits: Math.floor(Math.random()), // Минимальное количество нажатий на бомбу в процентах / Percentage probability of pressing the bomb
    minIceHits: Math.floor(Math.random() * 2) + 2, // Минимальное количество нажатий на заморозку / Minimum number of freeze hits
    flowerSkipPercentage: Math.floor(Math.random() * 11) + 15, // Вероятность нажатия на цветок в процентах / Percentage probability of clicking on a flower
    minDelayMs: 2000, // Минимальная задержка между действиями в миллисекундах / Minimum delay between actions in milliseconds
    maxDelayMs: 5000, // Максимальная задержка между действиями в миллисекундах / Maximum delay between actions in milliseconds
};

let isGamePaused = false;

try {
    let gameStats = {
        score: 0,
        bombHits: 0,
        iceHits: 0,
        flowersSkipped: 0,
        isGameOver: false,
    };

    const originalPush = Array.prototype.push;
    Array.prototype.push = function (...items) {
        if (!isGamePaused) {
            items.forEach(item => handleGameElement(item));
        }
        return originalPush.apply(this, items);
    };

    function handleGameElement(element) {
        if (!element || !element.item) return;

        const { type } = element.item;
        switch (type) {
            case "CLOVER":
                processFlower(element);
                break;
            case "BOMB":
                processBomb(element);
                break;
            case "FREEZE":
                processIce(element);
                break;
        }
    }

    function processFlower(element) {
        const shouldSkip = Math.random() < (GAME_SETTINGS.flowerSkipPercentage / 100);
        if (shouldSkip) {
            gameStats.flowersSkipped++;
        } else {
            gameStats.score++;
            clickElement(element);
        }
    }

    function processBomb(element) {
        if (gameStats.bombHits < GAME_SETTINGS.minBombHits) {
            gameStats.score = 0;
            clickElement(element);
            gameStats.bombHits++;
        }
    }

    function processIce(element) {
        if (gameStats.iceHits < GAME_SETTINGS.minIceHits) {
            clickElement(element);
            gameStats.iceHits++;
        }
    }

    function clickElement(element) {
        element.onClick(element);
        element.isExplosion = true;
        element.addedAt = performance.now();
    }

    function checkGameCompletion() {
        const rewardElement = document.querySelector('#app > div > div > div.content > div.reward');
        if (rewardElement && !gameStats.isGameOver) {
            gameStats.isGameOver = true;
            resetGameStats();
            resetGameSettings();
        }
    }

    function resetGameStats() {
        gameStats = {
            score: 0,
            bombHits: 0,
            iceHits: 0,
            flowersSkipped: 0,
            isGameOver: false,
        };
    }

    function resetGameSettings() {
        GAME_SETTINGS = {
            minBombHits: Math.floor(Math.random() * 2),  // Минимальное количество нажатий на бомбу в процентах / Percentage probability of pressing the bomb
            minIceHits: Math.floor(Math.random() * 2) + 2, // Минимальное количество нажатий на заморозку / Minimum number of freeze hits
            flowerSkipPercentage: Math.floor(Math.random() * 11) + 15, // Вероятность нажатия на цветок в процентах / Percentage probability of clicking on a flower
            minDelayMs: 2000, // Минимальная задержка между действиями в миллисекундах / Minimum delay between actions in milliseconds
            maxDelayMs: 5000, // Максимальная задержка между действиями в миллисекундах / Maximum delay between actions in milliseconds
        };
    }

    function getNewGameDelay() {
        return Math.floor(Math.random() * (4000 - 1000 + 1) + 20000);
    }

    function checkAndClickPlayButton() {
      console.log('checkAndClickPlayButton')
      const playButton = document.querySelectorAll('button.kit-button.is-large.is-primary')[0];
      const playButton2 = document.querySelectorAll('button.kit-button.is-large.is-primary')[1];
      if ((!isGamePaused && playButton && playButton.textContent.includes('Play')) || (!isGamePaused && playButton2 && playButton2.textContent.includes('Play'))) {
          setTimeout(() => {
              if (playButton && playButton.textContent.includes('Play')) {
                playButton.click();
              }
              if (playButton2 && playButton2.textContent.includes('Play')) {
                playButton2.click();
              }
              gameStats.isGameOver = false;
          }, getNewGameDelay());
      };
    }

    function continuousPlayButtonCheck() {
        checkAndClickPlayButton();
        setTimeout(continuousPlayButtonCheck, 1000);
    }

    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                checkGameCompletion();
            }
        }
    });

    const appElement = document.querySelector('#app');
    if (appElement) {
        observer.observe(appElement, { childList: true, subtree: true });
    }

    continuousPlayButtonCheck();

    const pauseButton = document.createElement('button');
    pauseButton.textContent = 'Pause';
    pauseButton.style.position = 'fixed';
    pauseButton.style.bottom = '20px';
    pauseButton.style.right = '20px';
    pauseButton.style.zIndex = '9999';
    pauseButton.style.padding = '4px 8px';
    pauseButton.style.backgroundColor = '#5d5abd';
    pauseButton.style.color = 'white';
    pauseButton.style.border = 'none';
    pauseButton.style.borderRadius = '10px';
    pauseButton.style.cursor = 'pointer';
    pauseButton.onclick = toggleGamePause;
    document.body.appendChild(pauseButton);

    function toggleGamePause() {
        isGamePaused = !isGamePaused;
        pauseButton.textContent = isGamePaused ? 'Resume' : 'Pause';
    }
} catch (e) {
}
