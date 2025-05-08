// ==UserScript==
// @name         cattea
// @version      0.1
// @author       IvanAgafonov
// @match        https://cdn.cattea.ai/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/cattea.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/cattea.user.js
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
	var posX = 248;
	var posY = 472;

  const events = [
      new PointerEvent('pointerdown', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, clientX: posX, clientY: posY, pressure: 0.5, pointerType: "touch" }),
      new MouseEvent('mousedown', { bubbles: true, cancelable: true, isTrusted: true, clientX: posX, clientY: posY }),
      new PointerEvent('pointerup', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, clientX: posX, clientY: posY, pressure: 0, pointerType: "touch" }),
      new MouseEvent('mouseup', { bubbles: true, cancelable: true, isTrusted: true, clientX: posX, clientY: posY }),
      new PointerEvent('click', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, clientX: posX, clientY: posY, pressure: 0, pointerType: "touch" }),
      new PointerEvent('pointerout', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, clientX: posX, clientY: posY, pressure: 0, pointerType: "touch" }),
      new PointerEvent('pointerleave', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, clientX: posX, clientY: posY, pressure: 0, pointerType: "touch" }),
      new MouseEvent('mouseout', { bubbles: true, cancelable: true, isTrusted: true, clientX: posX, clientY: posY }),
      new MouseEvent('mouseleave', { bubbles: true, cancelable: true, isTrusted: true, clientX: posX, clientY: posY })
  ];

  events.forEach((event, index) => {
      setTimeout(() => element.dispatchEvent(event), index * 100);
  });
}

function sleep(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function connectWallet(){
  var up2 = Array.from(document.querySelectorAll("div")).filter(el => el.textContent == "Wallet On" || el.textContent == "Wallet in")
  if (up2.length != 0){
    triggerEvents(up2[0]);
    await sleep(getRandomDelay(3000, 4100));
    up2 = Array.from(document.querySelectorAll("button")).filter(el => el.textContent.includes("Open Wallet in Telegram") || el.textContent.includes("Connect Wallet in Telegram on desktop"))
    if (up2.length != 0){
      triggerEvents(up2[0]);
      await sleep(getRandomDelay(10000, 21000));
    }
  }
  await sleep(getRandomDelay(2000, 3100));
}

async function autoBuy() {

  var up = Array.from(document.querySelectorAll("canvas#layaCanvas"));
  console.log(up);
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(4000, 5000));
  }

}


function initializeScript() {

    console.log('START claim  ')

    setTimeout(autoBuy, getRandomDelay(15000, 15050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
