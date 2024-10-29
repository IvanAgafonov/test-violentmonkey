// ==UserScript==
// @name         Not Pixel Autoclicker
// @namespace    Violentmonkey Scripts
// @author       IvanAgafonov
// @match        *://*notpx.app/*
// @version      0.3
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/notpixel.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/notpixel.user.js
// @homepage     https://github.com/IvanAgafonov/test-violentmonkey
// @grant        none
// ==/UserScript==

function waitForElement(selector, callback) {
  const element = document.querySelector(selector);
  if (element) {
    callback(element);
  } else {
    setTimeout(() => waitForElement(selector, callback), 500);
  }
}
var isRandomColorNow = true;

// Триггеры событий
function triggerEvents(element) {
  const events = [
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

function simulatePointerEvents(element, startX, startY, endX, endY) {
  const events = [
    new PointerEvent('pointerdown', { clientX: startX, clientY: startY, bubbles: true }),
    new PointerEvent('pointermove', { clientX: startX, clientY: startY, bubbles: true }),
    new PointerEvent('pointermove', { clientX: endX, clientY: endY, bubbles: true }),
    new PointerEvent('pointerup', { clientX: endX, clientY: endY, bubbles: true })
  ];

  events.forEach(event => element.dispatchEvent(event));
}

function openPaintWindow() {
  waitForElement('#canvasHolder', (canvas) => {
    const centerX = Math.floor(canvas.width / 2);
    const centerY = Math.floor(canvas.height / 2);
    simulatePointerEvents(canvas, centerX, centerY, centerX, centerY);
    console.log('Попытка открыть окно рисования');
  });
}


// Автосмена цвета
function tryChangeColor(random) {
    // Проверяем состояние элемента
//     const expandablePanel = document.querySelector('div._expandable_panel_layout_1v9vd_1');
//     if (expandablePanel && expandablePanel.style.height !== '0px' && expandablePanel.style.opacity !== '0') {
//         // Получаем список всех цветов
//         const colors = document.querySelectorAll('div._color_item_epppt_22');
//         if (colors.length === 0) {
//             setTimeout(tryChangeColor, 1000);
//             return;
//         }

//         // Выбираем случайный цвет из списка
//         const randomColor = colors[Math.floor(Math.random() * colors.length)];

//         // Нажимаем на случайный цвет
//         console.log('Выбран новый цвет:', randomColor); // Логируем выбранный цвет
//         setTimeout(() => triggerEvents(randomColor), 1000);

//         // Применяем выбранный цвет
//         setTimeout(() => triggerEvents(activeColor), 2000);
//         return;
//     }

    // Нажимаем на активный цвет
    const activeColor = document.evaluate('(//div[contains(@class, "_active_color")])[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (!activeColor) {
        setTimeout(tryChangeColor, 1000);
        return;
    }
    triggerEvents(activeColor);

    // Получаем список всех цветов
    const colors = document.querySelectorAll('div._color_item_epppt_22');
    if (colors.length === 0) {
        setTimeout(tryChangeColor, 1000);
        return;
    }
    var myColor;
    if (random) {
      // Выбираем случайный цвет из списка
      mymColor = colors[Math.floor(Math.random() * colors.length)];
    } else {
      mymColor = colors[16];
    }

    // Нажимаем на случайный цвет
    console.log('Выбран новый цвет:', mymColor); // Логируем выбранный цвет
    setTimeout(() => triggerEvents(mymColor), 1000);

    // Применяем выбранный цвет
    setTimeout(() => triggerEvents(activeColor), 2000);
}


function randomClick() {
  if (isPaused()) {
    console.log('Скрипт на паузе.');
    setTimeout(randomClick, 1000);
    return;
  }

  const paintButton = document.evaluate('//*[@id="root"]//div[contains(@class,"order_panel")]/div/button', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (paintButton) {
    const buttonText = paintButton.querySelector('span[class^="_button_text_"]').textContent;

    if (buttonText === 'Paint') {
      console.log(`tryChangeColor: ${isRandomColorNow}`);
      waitForElement('#canvasHolder', (canvas) => {
        // Случайное перемещение карты
        // const moveX = Math.floor(Math.random() * 200) - 100; // От -100 до 100
        // const moveY = Math.floor(Math.random() * 200) - 100; // От -100 до 100
        // simulatePointerEvents(canvas, canvas.width / 2, canvas.height / 2, canvas.width / 2 + moveX, canvas.height / 2 + moveY);

//         // Случайная точка для рисования
//         const x = Math.floor(Math.random() * canvas.width);
//         const y = Math.floor(Math.random() * canvas.height);
//         simulatePointerEvents(canvas, x, y, x, y);

        simulatePointerEvents(paintButton, 0, 0, 0, 0);
        const nextClickDelay = Math.floor(Math.random() * 1800) + 1300;
        console.log('paint');
        if (isRandomColorNow) {
        isRandomColorNow = false;

        tryChangeColor(isRandomColorNow);
      } else {
        isRandomColorNow = true;
        tryChangeColor(isRandomColorNow);
      }
        setTimeout(randomClick, nextClickDelay);
      });
    } else if (buttonText === 'No energy') {
      const randomPause = Math.floor(Math.random() * 120000) + 60000; // От 60000 мс (1 минута) до 180000 мс (3 минуты)
      console.log(`Нет энергии. Рандомная пауза: ${randomPause} мс.`);
      setTimeout(randomClick, randomPause);
    } else {
      const nextClickDelay = Math.floor(Math.random() * 1500) + 1000;
      setTimeout(randomClick, nextClickDelay);
    }
  } else {
    console.log('Окно рисования не найдено. Попытка открыть.');
    openPaintWindow();
    setTimeout(randomClick, 2000);
  }
}



function checkGameCrash() {
  if (isPaused()) {
    setTimeout(checkGameCrash, 2000);
    return;
  }

  const crashElement = document.querySelector('div._container_ieygs_8');
  if (crashElement) {
    console.log('Игра вылетела. Обновление страницы.');
    location.reload();
  } else {
    setTimeout(checkGameCrash, 6000);
  }
}

function isPaused() {
  const pauseUntil = localStorage.getItem('pauseUntil');
  if (pauseUntil) {
    const pauseUntilDate = new Date(pauseUntil);
    return pauseUntilDate > new Date();
  }
  return false;
}

function createPauseButton() {
  const button = document.createElement('button');
  button.textContent = 'Pause';
  button.style.position = 'fixed';
  button.style.color = 'black';
  button.style.top = '10px';
  button.style.right = '10px';
  button.style.zIndex = 1000;
  button.style.backgroundColor = '#f0f0f0';
  button.style.borderRadius = '5px';
  button.addEventListener('click', () => {
    const existingContainer = document.querySelector('.pause-container');
    if (existingContainer) {
      document.body.removeChild(existingContainer);
    } else {
      const pauseUntil = promptForDate();
      if (pauseUntil) {
        localStorage.setItem('pauseUntil', pauseUntil.toISOString());
      }
    }
  });
  document.body.appendChild(button);
}

function promptForDate() {
  const container = document.createElement('div');
  container.className = 'pause-container';
  container.style.position = 'fixed';
  container.style.top = '50%';
  container.style.left = '50%';
  container.style.transform = 'translate(-50%, -50%)';
  container.style.backgroundColor = 'white';
  container.style.padding = '20px';
  container.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
  container.style.zIndex = 1001;

  const input = document.createElement('input');
  input.type = 'datetime-local';
  input.style.marginBottom = '10px';
  container.appendChild(input);

  const button = document.createElement('button');
  button.textContent = 'OK';
  button.style.color = 'black';
  button.addEventListener('click', () => {
    const date = new Date(input.value);
    if (!isNaN(date)) {
      localStorage.setItem('pauseUntil', date.toISOString());
      document.body.removeChild(container);
    } else {
      alert('Неверная дата');
    }
  });
  container.appendChild(button);

  document.body.appendChild(container);
}

function startScript() {
  createPauseButton();
  openPaintWindow();
  setTimeout(randomClick, Math.floor(Math.random() * 3000) + 5000);
  checkGameCrash();
}

startScript();
