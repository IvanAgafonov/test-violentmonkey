// ==UserScript==
// @name         Tonton clicker
// @version      0.13
// @author       IvanAgafonov
// @match        https://quest.intract.io/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/tonton.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/tonton.user.js
// @homepage     https://github.com/IvanAgafonov/test-violentmonkey
// @grant        none

// ==/UserScript==




function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Триггеры событий
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

function sleep(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function connectWallet(){
  var up2 = Array.from(document.querySelectorAll("div")).filter(el => el.textContent == "Wallet On")
  if (up2.length != 0){
    triggerEvents(up2[0]);
    await sleep(getRandomDelay(3000, 4100));
    up2 = Array.from(document.querySelectorAll("button")).filter(el => el.textContent.includes("Open Wallet in Telegram"))
    if (up2.length != 0){
      triggerEvents(up2[0]);
      await sleep(getRandomDelay(10000, 21000));
    }
  }
}

async function autoBuy() {


  var up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent.includes("Ton Ton"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(6000, 7000));
  }

  up = Array.from(document.querySelectorAll("path[d='m13 17 5-5-5-5']"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(1000, 2000));
  }
  up = Array.from(document.querySelectorAll("path[d='m13 17 5-5-5-5']"));
  if (up.length != 0){
    triggerEvents(up[1]);
    await sleep(getRandomDelay(1000, 2000));
  }
  up = Array.from(document.querySelectorAll("path[d='m13 17 5-5-5-5']"));
  if (up.length != 0){
    triggerEvents(up[1]);
    await sleep(getRandomDelay(1000, 2000));
  }

}


function initializeScript() {

    console.log('START claim')

    setTimeout(autoBuy, getRandomDelay(13000, 15050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}


// let GAME_SETTINGS = {
//     minClickDelay: 35,
//     maxClickDelay: 120,
//     pauseMinTime: 100000,
//     pauseMaxTime: 300000,
//     energyThreshold: 2
// };

// const checkInterval = 1500;
// const maxCheckAttempts = 20;

// let checkAttempts = 0;
// let isGamePaused = false;

// const styles = {
//     success: 'background: #28a745; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
//     starting: 'background: #8640ff; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
//     error: 'background: #dc3545; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
//     info: 'background: #007bff; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
// };
// const logPrefix = '%c[TapSwapBot] ';

// const originalLog = console.log;
// console.log = function () {
//     if (typeof arguments[0] === 'string' && arguments[0].includes('[TapSwapBot]')) {
//         originalLog.apply(console, arguments);
//     }
// };

// console.error = console.warn = console.info = console.debug = () => { };

// console.clear();
// console.log(`${logPrefix}Starting`, styles.starting);



// function triggerEvent(element, eventType, properties) {
//     const event = new MouseEvent(eventType, properties);
//     element.dispatchEvent(event);
// }

// function getRandomCoordinateInCircle(radius) {
//     let x, y;
//     do {
//         x = Math.random() * 2 - 1;
//         y = Math.random() * 2 - 1;
//     } while (x * x + y * y > 1);
//     return {
//         x: Math.round(x * radius),
//         y: Math.round(y * radius)
//     };
// }

// function getCurrentEnergy() {
//     const up = Array.from(document.querySelectorAll("div div div div")).filter(el => el.className.includes("tap_tap_footer_energy"));
//     if (up.length != 0){
//       const en = up[0].querySelector('span');
//       if (en) {
//         return parseInt(en.textContent);
//       }
//     }
//     return null;
// }

// function checkCoinAndClick() {
//   if (isGamePaused) {
//       setTimeout(checkCoinAndClick, checkInterval);
//       return;
//   }

//   const button = document.querySelector("canvas");

//   if (button) {
//       console.log(`${logPrefix}Coin found. The click is executed.`, styles.success);
//       clickButton();
//   } else {
//       checkAttempts++;
//       if (checkAttempts >= maxCheckAttempts) {
//           const tabsContainer = document.querySelector('div._tabsContainer_1pooj_1');
//           const map = document.querySelector('div._map_fdvj9_1');
//           const container = document.querySelector('div._container_1gakf_1');
//           const tabs = document.querySelector('div._tabs_1pooj_1');

//           if (tabsContainer || map || container || tabs) {
//               console.log(`${logPrefix}Special element found. Not reloading the page.`, styles.info);
//               checkAttempts = 0;
//               setTimeout(checkCoinAndClick, checkInterval);
//           } else {
//               console.log(`${logPrefix}Coin not found after 3 attempts. Reloading the page.`, styles.error);
//               // location.reload();
//           }
//       } else {
//           console.log(`${logPrefix}Coin not found. Attempt ${checkAttempts}/${maxCheckAttempts}. Check again after 3 seconds.`, styles.error);
//           setTimeout(checkCoinAndClick, checkInterval);
//       }
//   }
// }

// function clickButton() {
//     if (isGamePaused) {
//         setTimeout(checkCoinAndClick, GAME_SETTINGS.minClickDelay);
//         return;
//     }

//     const currentEnergy = getCurrentEnergy();
//     if (currentEnergy !== null && currentEnergy < GAME_SETTINGS.energyThreshold) {
//         const pauseTime = GAME_SETTINGS.pauseMinTime + Math.random() * (GAME_SETTINGS.pauseMaxTime - GAME_SETTINGS.pauseMinTime);
//         console.log(`${logPrefix}The energy is lower ${GAME_SETTINGS.energyThreshold}. Pause for ${Math.round(pauseTime / 1000)} seconds.`, styles.info);
//         setTimeout(clickButton, pauseTime);
//         return;
//     }

//     const button = document.querySelector("canvas");

//     if (button) {
//         const rect = button.getBoundingClientRect();
//         const radius = Math.min(rect.width, rect.height) / 2;
//         const { x, y } = getRandomCoordinateInCircle(radius);

//         const clientX = rect.left + radius + x;
//         const clientY = rect.top + radius + y;

//         const commonProperties = {
//             bubbles: true,
//             cancelable: true,
//             view: window,
//             clientX: clientX,
//             clientY: clientY,
//             screenX: clientX,
//             screenY: clientY,
//             pageX: clientX,
//             pageY: clientY,
//             pointerId: 1,
//             pointerType: "touch",
//             isPrimary: true,
//             width: 1,
//             height: 1,
//             pressure: 0.5,
//             button: 0,
//             buttons: 1
//         };

//         triggerEvent(button, 'pointerdown', commonProperties);
//         triggerEvent(button, 'mousedown', commonProperties);
//         triggerEvent(button, 'pointerup', { ...commonProperties, pressure: 0 });
//         triggerEvent(button, 'mouseup', commonProperties);
//         triggerEvent(button, 'click', commonProperties);

//         const delay = GAME_SETTINGS.minClickDelay + Math.random() * (GAME_SETTINGS.maxClickDelay - GAME_SETTINGS.minClickDelay);
//         setTimeout(checkCoinAndClick, delay);
//     } else {
//         console.log(`${logPrefix}Coin not found!`, styles.error);
// 		checkCoinAndClick();
//     }
// }

// const settingsMenu = document.createElement('div');
// settingsMenu.className = 'settings-menu';
// settingsMenu.style.display = 'none';

// const menuTitle = document.createElement('h3');
// menuTitle.className = 'settings-title';
// menuTitle.textContent = 'TapSwap Autoclicker';

// const closeButton = document.createElement('button');
// closeButton.className = 'settings-close-button';
// closeButton.textContent = '×';
// closeButton.onclick = () => {
//     settingsMenu.style.display = 'none';
// };

// menuTitle.appendChild(closeButton);
// settingsMenu.appendChild(menuTitle);

// function toggleGamePause() {
//     isGamePaused = !isGamePaused;
//     pauseResumeButton.textContent = isGamePaused ? 'Resume' : 'Pause';
//     pauseResumeButton.style.backgroundColor = isGamePaused ? '#e5c07b' : '#98c379';
// }

// function updateSettingsMenu() {
//     document.getElementById('minClickDelay').value = GAME_SETTINGS.minClickDelay;
//     document.getElementById('minClickDelayDisplay').textContent = GAME_SETTINGS.minClickDelay;
//     document.getElementById('maxClickDelay').value = GAME_SETTINGS.maxClickDelay;
//     document.getElementById('maxClickDelayDisplay').textContent = GAME_SETTINGS.maxClickDelay;
//     document.getElementById('pauseMinTime').value = GAME_SETTINGS.pauseMinTime;
//     document.getElementById('pauseMinTimeDisplay').textContent = GAME_SETTINGS.pauseMinTime;
//     document.getElementById('pauseMaxTime').value = GAME_SETTINGS.pauseMaxTime;
//     document.getElementById('pauseMaxTimeDisplay').textContent = GAME_SETTINGS.pauseMaxTime;
//     document.getElementById('energyThreshold').value = GAME_SETTINGS.energyThreshold;
//     document.getElementById('energyThresholdDisplay').textContent = GAME_SETTINGS.energyThreshold;
// }

// settingsMenu.appendChild(createSettingElement('Min Click Delay (ms)', 'minClickDelay', 'range', 10, 1000, 10,
//     'EN: Minimum delay between clicks.<br>' +
//     'RU: Минимальная задержка между кликами.'));
// settingsMenu.appendChild(createSettingElement('Max Click Delay (ms)', 'maxClickDelay', 'range', 10, 1000, 10,
//     'EN: Maximum delay between clicks.<br>' +
//     'RU: Максимальная задержка между кликами.'));
// settingsMenu.appendChild(createSettingElement('Min Pause Time (ms)', 'pauseMinTime', 'range', 10000, 600000, 10000,
//     'EN: Minimum pause time when energy is low.<br>' +
//     'RU: Минимальное время паузы при низкой энергии.'));
// settingsMenu.appendChild(createSettingElement('Max Pause Time (ms)', 'pauseMaxTime', 'range', 10000, 600000, 10000,
//     'EN: Maximum pause time when energy is low.<br>' +
//     'RU: Максимальное время паузы при низкой энергии.'));
// settingsMenu.appendChild(createSettingElement('Energy Threshold', 'energyThreshold', 'range', 1, 100, 1,
//     'EN: Energy threshold for pausing.<br>' +
//     'RU: Порог энергии для паузы.'));

// const pauseResumeButton = document.createElement('button');
// pauseResumeButton.textContent = 'Pause';
// pauseResumeButton.className = 'pause-resume-btn';
// pauseResumeButton.onclick = toggleGamePause;
// settingsMenu.appendChild(pauseResumeButton);

// const socialButtons = document.createElement('div');
// socialButtons.className = 'social-buttons';

// const githubButton = document.createElement('a');
// githubButton.href = '';
// githubButton.target = '_blank';
// githubButton.className = 'social-button';
// githubButton.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADtklEQVR4nO2ZSWgVQRCGP2OCS3CJYoy7uCtiDi6o8aAIikvQi4oGvCiiRo2E6FXJQdxQg4LgUTx4cyPuHhVRD0bcsyDu4IJrTNTnSEMNPOfNm1czb2YSJD8UDNNT1fV3V1dX90AH/l8UAEuBfUAt8Bj4CLSKmOdH0ma+WQL0pp2gC1AGXAJ+A5ZPMToXgFViK3Z0AyqBVwGcTycvga1A17hILAAaQiTglHpgfpQEzNTXREjAKcdl5kNFf+BOjCQskVtAYVgkhst0W20kT8WHrNBP0qjVxtIAFAUl0bWNwsnyCLNAKfpoO3DecsjhICnWy+B2CbspwA7gWRbOmd1+G1As1cGBDN/P05LoptgnBruEoSH0A7gKVACzgNFAvsgYebcROAN8BTYDnR22ihWLXxVilYpRTLf75mlHy+PbAYr+zUB5oouy7Ah9o0pCkaL/F5lmpUwZ1+MiJFKi9GGll5FLSiPLIyRSrvThfDoDBT5K8eoIiRxT+vAL6OlmYKnSwGdZkFFhPPBT6Uupm4H9SmWT56PGSaUve92Ua5XK02Igskzpy1k35afKuMyNgchYJRFT0KbgvULRfBMHhiiJvHNTblUomm86xUBkoiMKPor8cfjT4qZsZ4rZUu+MAPoAA+XZljiIJCNXtoYC6dtUFYOSBjYFn6TxJnAXaJRQeiPPtqwgehz2iIrvScvAzFIKnkjjNUmxWyRPm4p1khw37VGJGjnS11BggmTKRVI575a7MPsIkIKL0rhLqsuDwCngOlAns/FBpnN1xLPRIqPdBDwAbgPngCNyFtrvVaZUKzOFkW8yU2FjncuC9pKdbkbm+jBgpBlYE1KomZJ8j08SRua4GeuuTMFOuSFryXnS0yBfBqMxQL8tXucie504xZxT1soGlM7wW+AEsEFGaiTQK8l2XznHmOvQKikvvgYgYImYkiotSj1SXomcwd8qw65KbihtFMq75iyct5JkYaa015RGsU7apwJfMpAwpNOhJAQy9eKLJyo8DJhcbpcQFyU07J84z4ErwOJMHQDrsyRSrr3duBckLn0gx6MPK4Pc9VOBzwQSLkYSIe4fGwKQSADT/XZ0JI2xT3KxNlgTpx4YFYBITZCO8qTu8tNRZ5/2/di+7PMC8B/09BnLfqG1+yCMP8DDgIdtSOS+nBhDQQ+pNOMmciWKf/F5UmInYiCSAA5FfdExWc4HURGpA2YQE3IlBTc4fvj7xeskfWNrU0zXTSnIkbLldFL54gelorswyz2pAx0gIvwFLXDNiM6zHVAAAAAASUVORK5CYII=">GitHub';
// socialButtons.appendChild(githubButton);

// const telegramButton = document.createElement('a');
// telegramButton.href = '';
// telegramButton.target = '_blank';
// telegramButton.className = 'social-button';
// telegramButton.innerHTML = '<img src="data:image/png;base64,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">Telegram Channel';
// socialButtons.appendChild(telegramButton);

// settingsMenu.appendChild(socialButtons);

// document.body.appendChild(settingsMenu);

// const settingsButton = document.createElement('button');
// settingsButton.className = 'settings-button';
// settingsButton.textContent = '⚙️';
// settingsButton.onclick = () => {
//     settingsMenu.style.display = settingsMenu.style.display === 'block' ? 'none' : 'block';
// };
// document.body.appendChild(settingsButton);

// const style = document.createElement('style');
// style.textContent = `
//     .settings-menu {
//       position: fixed;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       background-color: rgba(40, 44, 52, 0.95);
//       border-radius: 8px;
//       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
//       color: #abb2bf;
//       font-family: 'Arial', sans-serif;
//       z-index: 10000;
//       padding: 20px;
//       width: 300px;
//     }
//     .settings-title {
//       color: #61afef;
//       font-size: 18px;
//       font-weight: bold;
//       margin-bottom: 15px;
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//     }
//     .settings-close-button {
//       background: none;
//       border: none;
//       color: #e06c75;
//       font-size: 20px;
//       cursor: pointer;
//       padding: 0;
//     }
//     .setting-item {
//       margin-bottom: 12px;
//     }
//     .setting-label {
//       display: flex;
//       align-items: center;
//       margin-bottom: 4px;
//     }
//     .setting-label-text {
//       color: #e5c07b;
//       margin-right: 5px;
//     }
//     .help-icon {
//       cursor: help;
//       display: inline-flex;
//       align-items: center;
//       justify-content: center;
//       width: 14px;
//       height: 14px;
//       border-radius: 50%;
//       background-color: #61afef;
//       color: #282c34;
//       font-size: 10px;
//       font-weight: bold;
//     }
//     .setting-input {
//       display: flex;
//       align-items: center;
//     }
//     .setting-slider {
//       flex-grow: 1;
//       margin-right: 8px;
//     }
//     .setting-value {
//       min-width: 30px;
//       text-align: right;
//       font-size: 11px;
//     }
//     .tooltip {
//       position: relative;
//     }
//     .tooltip .tooltiptext {
//       visibility: hidden;
//       width: 200px;
//       background-color: #4b5263;
//       color: #fff;
//       text-align: center;
//       border-radius: 6px;
//       padding: 5px;
//       position: absolute;
//       z-index: 1;
//       bottom: 125%;
//       left: 50%;
//       margin-left: -100px;
//       opacity: 0;
//       transition: opacity 0.3s;
//       font-size: 11px;
//       box-shadow: 0 2px 4px rgba(0,0,0,0.2);
//     }
//     .tooltip:hover .tooltiptext {
//       visibility: visible;
//       opacity: 1;
//     }
//     .pause-resume-btn {
//       display: block;
//       width: calc(100% - 10px);
//       padding: 8px;
//       margin: 15px 5px;
//       background-color: #98c379;
//       color: #282c34;
//       border: none;
//       border-radius: 4px;
//       cursor: pointer;
//       font-weight: bold;
//       font-size: 14px;
//       transition: background-color 0.3s;
//     }
//     .pause-resume-btn:hover {
//       background-color: #7cb668;
//     }
//     .social-buttons {
//       margin-top: 15px;
//       display: flex;
//       justify-content: space-around;
//       white-space: nowrap;
//     }
//     .social-button {
//       display: inline-flex;
//       align-items: center;
//       padding: 5px 8px;
//       border-radius: 4px;
//       background-color: #282c34;
//       color: #abb2bf;
//       text-decoration: none;
//       font-size: 12px;
//       transition: background-color 0.3s;
//     }
//     .social-button:hover {
//       background-color: #4b5263;
//     }
//     .social-button img {
//       width: 16px;
//       height: 16px;
//       margin-right: 5px;
//     }
//     .settings-button {
//       position: fixed;
//       bottom: 20px;
//       right: 20px;
//       background-color: rgba(36, 146, 255, 0.8);
//       color: #fff;
//       border: none;
//       border-radius: 50%;
//       width: 40px;
//       height: 40px;
//       font-size: 18px;
//       cursor: pointer;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
//       z-index: 9999;
//     }
//   `;
// document.head.appendChild(style);

// function createSettingElement(label, id, type, min, max, step, tooltipText) {
//     const container = document.createElement('div');
//     container.className = 'setting-item';

//     const labelContainer = document.createElement('div');
//     labelContainer.className = 'setting-label';

//     const labelElement = document.createElement('span');
//     labelElement.className = 'setting-label-text';
//     labelElement.textContent = label;

//     const helpIcon = document.createElement('span');
//     helpIcon.textContent = '?';
//     helpIcon.className = 'help-icon tooltip';

//     const tooltipSpan = document.createElement('span');
//     tooltipSpan.className = 'tooltiptext';
//     tooltipSpan.innerHTML = tooltipText;
//     helpIcon.appendChild(tooltipSpan);

//     labelContainer.appendChild(labelElement);
//     labelContainer.appendChild(helpIcon);

//     const inputContainer = document.createElement('div');
//     inputContainer.className = 'setting-input';

//     let input;
//     if (type === 'checkbox') {
//         input = document.createElement('input');
//         input.type = 'checkbox';
//         input.id = id;
//         input.checked = GAME_SETTINGS[id];
//         input.addEventListener('change', (e) => {
//             GAME_SETTINGS[id] = e.target.checked;
//             saveSettings();
//         });
//         inputContainer.appendChild(input);
//     } else {
//         input = document.createElement('input');
//         input.type = type;
//         input.id = id;
//         input.min = min;
//         input.max = max;
//         input.step = step;
//         input.value = GAME_SETTINGS[id];
//         input.className = 'setting-slider';

//         const valueDisplay = document.createElement('span');
//         valueDisplay.id = `${id}Display`;
//         valueDisplay.textContent = GAME_SETTINGS[id];
//         valueDisplay.className = 'setting-value';

//         input.addEventListener('input', (e) => {
//             GAME_SETTINGS[id] = parseFloat(e.target.value);
//             valueDisplay.textContent = e.target.value;
//             saveSettings();
//         });

//         inputContainer.appendChild(input);
//         inputContainer.appendChild(valueDisplay);
//     }

//     container.appendChild(labelContainer);
//     container.appendChild(inputContainer);
//     return container;
// }

// function saveSettings() {
//     localStorage.setItem('TapSwapAutoclickerSettings', JSON.stringify(GAME_SETTINGS));
// }

// function loadSettings() {
//     const savedSettings = localStorage.getItem('TapSwapAutoclickerSettings');
//     if (savedSettings) {
//         const parsedSettings = JSON.parse(savedSettings);
//         GAME_SETTINGS = {
//             ...GAME_SETTINGS,
//             ...parsedSettings
//         };
//     }
// }

// loadSettings();
// updateSettingsMenu();

// checkCoinAndClick();
