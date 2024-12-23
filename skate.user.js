// ==UserScript==
// @name         Skate claim
// @version      0.1
// @author       IvanAgafonov
// @match        https://mini-app.skatechain.org/*
// @grant        none
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/skate.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/skate.user.js
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


  var up = Array.from(document.querySelectorAll("button[type='button']")).filter(el => el.textContent.includes("Continue"));
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(4000, 5000));
  }

  up = Array.from(document.querySelectorAll("button[type='button']")).filter(el => el.textContent.includes("Come back in"));
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("div div div")).filter(el => el.textContent == "Quests");
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("div div button")).filter(el => el.textContent == "Start");
  if (up.length != 0){
    for (const item of up) {
      triggerEvents(item);
      // item.click();
      await sleep(getRandomDelay(1000, 2000));
    }
  }

  await sleep(getRandomDelay(23000, 25000));

  up = Array.from(document.querySelectorAll("div div button")).filter(el => el.textContent == "Partner Quests");
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("div div button")).filter(el => el.textContent == "Start");
  if (up.length != 0){
    for (const item of up) {
      triggerEvents(item);
      // item.click();
      await sleep(getRandomDelay(1000, 2000));
    }
  }

  up = Array.from(document.querySelectorAll("div div button")).filter(el => el.textContent == "Connect");
  if (up.length != 0){
    for (const item of up) {
      triggerEvents(item);
      // item.click();
      await sleep(getRandomDelay(1000, 2000));
    }
  }

}


function initializeScript() {

    console.log('START skate claim')

    setTimeout(autoBuy, getRandomDelay(25000, 28050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
