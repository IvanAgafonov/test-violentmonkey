// ==UserScript==
// @name         Dogs claim
// @version      0.1
// @author       IvanAgafonov
// @match        https://onetime.dog/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/dogs.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/dogs.user.js
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


  var up = Array.from(document.querySelectorAll("div")).filter(el => el.textContent.includes("Start the journey") && el.className.includes('fixedBottom'));
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(2000, 3000));
  }

  up = Array.from(document.querySelectorAll("div")).filter(el =>  el.textContent.includes("Connect $DOGS Wallet") && el.className.includes('button'));
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(2000, 3000));
    await connectWallet();
  }

  up = Array.from(document.querySelectorAll("div")).filter(el => el.className.includes('cell') && el.className.includes('current'));
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(2000, 3000));
  }

}


function initializeScript() {

    console.log('START dogs claim')

    setTimeout(autoBuy, getRandomDelay(10000, 13050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}