// ==UserScript==
// @name         Tiny Verse Autoclicker
// @namespace    Violentmonkey Scripts
// @match        https://*.tonverse.app/*
// @grant        none
// @version      1.3
// @author       xz
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/tinyverse-autoclicker.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/tinyverse-autoclicker.user.js
// @homepage     https://github.com/IvanAgafonov/test-violentmonkey
// ==/UserScript==

(function() {
    'use strict';

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function triggerEvents(element) {
    const events = [
        new MouseEvent('mouseover', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  }),
        new PointerEvent('pointerdown', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0.5, pointerType: "touch" }),
        new MouseEvent('mousedown', { bubbles: true, cancelable: true, isTrusted: true, screenX: 182, screenY: 877 }),
        new PointerEvent('pointerup', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, pointerType: "touch" }),
        new MouseEvent('mouseup', { bubbles: true, cancelable: true, isTrusted: true, screenX: 182, screenY: 877 }),
        new PointerEvent('click', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, pointerType: "touch" }),
        new PointerEvent('pointerout', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, pointerType: "touch" }),
        new PointerEvent('pointerleave', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, pointerType: "touch" }),
        new MouseEvent('mouseout', { bubbles: true, cancelable: true, isTrusted: true, screenX: 182, screenY: 877 }),
        new MouseEvent('mouseleave', { bubbles: true, cancelable: true, isTrusted: true, screenX: 182, screenY: 877 })
    ];

    events.forEach((event, index) => {
        setTimeout(() => element.dispatchEvent(event), index * 100);
    });
  }

    function simulateClick(element) {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const events = [{
                type: 'pointerdown',
                options: {
                    pointerId: 1,
                    width: 1,
                    height: 1,
                    pressure: 0.5
                }
            },
            {
                type: 'mousedown',
                options: {}
            },
            {
                type: 'pointermove',
                options: {
                    pointerId: 1,
                    width: 1,
                    height: 1,
                    pressure: 0.5
                }
            },
            {
                type: 'mousemove',
                options: {}
            },
            {
                type: 'pointerup',
                options: {
                    pointerId: 1,
                    width: 1,
                    height: 1,
                    pressure: 0
                }
            },
            {
                type: 'mouseup',
                options: {}
            },
            {
                type: 'click',
                options: {}
            }
        ];

        for (const {
                type,
                options
            }
            of events) {
            const event = new PointerEvent(type, {
                ...options,
                bubbles: true,
                cancelable: true,
                clientX: x,
                clientY: y,
            });
            element.dispatchEvent(event);
        }
    }

    const defaultSettings = {
        min: 1,
        max: 30
    };
    const settings = JSON.parse(localStorage.getItem('tinyverse-autoclicker-settings')) || defaultSettings;

    function saveSettings() {
        localStorage.setItem('tinyverse-autoclicker-settings', JSON.stringify(settings));
    }

    const settingsButton = document.createElement('button');
    settingsButton.className = 'settings-button';
    settingsButton.textContent = '⚙️';
    document.body.appendChild(settingsButton);

    const overlay = document.createElement('div');
    overlay.className = 'settings-overlay';
    overlay.style.display = 'none';
    document.body.appendChild(overlay);

    const settingsModal = document.createElement('div');
    settingsModal.className = 'settings-menu';
    settingsModal.style.display = 'none';

    settingsModal.innerHTML = `
        <div class="settings-title">
            Tiny Verse Autoclicker
            <button class="settings-close-button">×</button>
        </div>
        <div class="setting-item">
            <span class="setting-label-text">Min Threshold</span>
            <input type="range" id="minThreshold" min="1" max="100" value="${settings.min}" class="setting-slider">
            <span id="minValue" class="setting-value">${settings.min}</span>
        </div>
        <div class="setting-item">
            <span class="setting-label-text">Max Threshold</span>
            <input type="range" id="maxThreshold" min="1" max="100" value="${settings.max}" class="setting-slider">
            <span id="maxValue" class="setting-value">${settings.max}</span>
        </div>
    `;

    document.body.appendChild(settingsModal);

    const style = document.createElement('style');
    style.textContent = `
		.settings-menu {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: rgba(17, 17, 17, 0.95);
			border-radius: 24px;
			box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
			color: #ffffff;
			font-family: 'Space Grotesk', sans-serif;
			z-index: 10000;
			padding: 16px;
			width: 340px;
			backdrop-filter: blur(10px);
			border: 1px solid rgba(255, 255, 255, 0.1);
			padding: 20px 20px 20px 20px;
			opacity: 0.8;
		}

		.settings-title {
			font-size: 16px;
			font-weight: 600;
			display: flex;
			justify-content: space-between;
			margin-bottom: 12px;
		}

		.settings-close-button {
			background: rgba(255, 255, 255, 0.1);
			border: none;
			color: #ffffff;
			font-size: 16px;
			cursor: pointer;
			border-radius: 8px;
		}

		.setting-item {
			margin: 20px 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.setting-slider {
			width: 150px;
		}

		.setting-value {
			margin-left: 8px;
			width: 24px;
			height: 24px;
		}

		.social-buttons {
			display: flex;
			justify-content: space-between;
			margin-top: 12px;
		}

		.social-button img {
			width: 32px;
			height: 32px;
		}

		.settings-button {
			position: fixed;
			bottom: 20px;
			right: 20px;
			width: 60px;
			height: 60px;
			background-color: #1f1f1f;
			border: none;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6);
			transition: transform 0.2s ease, box-shadow 0.2s ease;
			cursor: pointer;
		}

		span.setting-label-text {
			width: 120px;
		}

		.settings-overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			backdrop-filter: blur(8px);
			z-index: 9999;
		}
    `;

    document.head.appendChild(style);

    settingsButton.addEventListener('click', () => {
        const isModalVisible = settingsModal.style.display === 'block';
        settingsModal.style.display = isModalVisible ? 'none' : 'block';
        overlay.style.display = isModalVisible ? 'none' : 'block';
    });

    settingsModal.querySelector('.settings-close-button').addEventListener('click', () => {
        settingsModal.style.display = 'none';
        overlay.style.display = 'none';
    });

    let randomThreshold = getRandomInt(settings.min, settings.max);

    document.getElementById('minThreshold').addEventListener('input', (e) => {
        const newValue = parseInt(e.target.value, 10);
        settings.min = newValue;
        document.getElementById('minValue').textContent = newValue;
        e.target.value = newValue;
        saveSettings();
        randomThreshold = getRandomInt(settings.min, settings.max);
        console.log(`New randomThreshold: ${randomThreshold}`);
    });

    document.getElementById('maxThreshold').addEventListener('input', (e) => {
        const newValue = parseInt(e.target.value, 10);
        settings.max = newValue;
        document.getElementById('maxValue').textContent = newValue;
        e.target.value = newValue;
        saveSettings();
        randomThreshold = getRandomInt(settings.min, settings.max);
        console.log(`New randomThreshold: ${randomThreshold}`);
    });

    (async function waitAndClick() {


      const elementSelector = '#ui-bottom > a:nth-child(2)';
      var count = 0;


        while (true) {
//             var up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Begin your own journey");
//             if (up.length != 0){
//               triggerEvents(up[0]);
//             }

//             up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Begin Journey");
//             if (up.length != 0){
//               triggerEvents(up[0].parentElement);
//             }
            if (count <= 2) {
              var up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Add Stars");
              if (up.length != 0){
                triggerEvents(up[0].parentElement);
              }

              up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Create 100 Stars");
              if (up.length != 0){
                triggerEvents(up[0].parentElement);
              }
            }
            count = count + 1;

            if (count > 2) {
              const element = document.querySelector(elementSelector);

              if (!element) {
                  console.warn('Element not found');
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  continue;
              }

              const spanElement = element.querySelector('span');
              const spanText = spanElement?.textContent?.trim();

              if (spanText) {
                  const percentageMatch = spanText.match(/^(\d+)%$/);
                  if (percentageMatch) {
                      const percentage = parseInt(percentageMatch[1], 10);
                      console.log(`Current value: ${percentage}%, Threshold: ${randomThreshold}%`);

                      if (percentage >= randomThreshold) {
                          simulateClick(element);
                          console.log(`Clicked element at: ${percentage}%`);
                          randomThreshold = getRandomInt(settings.min, settings.max);
                          console.log(`New threshold: ${randomThreshold}%`);
                      }
                  } else {
                      console.log(`Clicking element with text: ${spanText}`);
                      simulateClick(element);
                  }
              } else {
                  console.warn('Could not retrieve text from <span> ');
              }
            }

            await new Promise(resolve => setTimeout(resolve, 500));
        }

    })();
})();
