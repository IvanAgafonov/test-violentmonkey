// ==UserScript==
// @name         Coub claim
// @version      0.4
// @author       IvanAgafonov
// @match        https://coub.com/*
// @grant        none
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/coub.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/coub.user.js
// @homepage     https://github.com/IvanAgafonov/test-violentmonkey
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

async function autoBuy() {

  var up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("Claim") || el.textContent.includes("Получить"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(2000, 4000));
  }

  up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("Let's go!") || el.textContent.includes("Поехали!"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(2000, 4000));
  }

  up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent.includes("Tasks") || el.textContent.includes("Таски"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(2000, 4000));
  }

  up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("Claim") || el.textContent.includes("Получить"));
  shuffle(up);
  if (up.length != 0){
    for (const item of up) {
      item.click();
      await sleep(getRandomDelay(2000, 5000));
    }
  }

  up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent.includes("+5M Coubers Like & RT") ||
                                                                      el.textContent.includes("Master of highload") ||
                                                                      el.textContent.includes("Complete all tasks") ||
                                                                      el.textContent.includes("Like &") ||
	  							      el.textContent.includes("Выполнить все таски") ||
	  							      el.textContent.includes("PUMP") ||
                                                                el.textContent.includes("Join") ||
                                                                      el.textContent.includes("Подписаться") ||
								el.textContent.includes("Share&RT") ||
								el.textContent.includes("on X") ||
                                                                el.textContent.includes("Follow on Telegram") ||
                                                                el.textContent.includes("Welcome bonus") ||
                                                                el.textContent.includes("Follow on X") ||
                                                                el.textContent.includes("25 coubs in Random") ||
	  							el.textContent.includes("Follow on YouTube") ||
                                                                el.textContent.includes("Invite 3 frens") ||
                                                                el.textContent.includes("Пригласить 3 друга") ||
                                                                el.textContent.includes("WTF is Coub") ||
                                                                el.textContent.includes("#NewFeatures Like & Retweet"));
  shuffle(up);
  if (up.length != 0){
    for (const item of up) {
      if (item.parentElement.nextElementSibling.textContent.includes("Start") || item.parentElement.nextElementSibling.textContent.includes("Начать")) {
        item.parentElement.nextElementSibling.click();
        await sleep(getRandomDelay(2000, 5000));
      }
    }
  }
  // if (getRandomDelay(1000, 4000) < 3500) {
  //   up = Array.from(document.querySelectorAll("div div div div div")).filter(el => el.textContent.includes("Limited time offer") || el.textContent.includes("Временная акция"));
  //   if (up.length != 0){
  //     up[0].click();
  //     await sleep(getRandomDelay(2000, 4000));
  //   }

  //   up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("Claim") || el.textContent.includes("Получить"));
  //   if (up.length != 0){
  //     up[0].click();
  //     await sleep(getRandomDelay(2000, 4000));
  //   }
  // } else {
    up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent.includes("Home") || el.textContent.includes("Домой"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(3000, 4000));
    // }
  }
    up = Array.from(document.querySelectorAll("div div div")).filter(el => el.textContent.includes("Random") || el.textContent.includes("Случайн"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(6000, 9000));
    // }
  }


  await sleep(3400);
}


function initializeScript() {

    console.log('START Coub claim')

    setTimeout(autoBuy, getRandomDelay(14000, 17500));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
