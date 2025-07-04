// ==UserScript==
// @name         hume quets
// @version      0.11
// @author       IvanAgafonov
// @match        https://humeworld.xyz/quest/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/hume_quest.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/hume_quest.user.js
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


  for(var i=0;i<100;i++) {
    var up = Array.from(document.querySelectorAll("div div button")).filter(el => el.textContent.includes("Start Quest"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(3000, 4100));
    }

    up = Array.from(document.querySelectorAll("h2")).filter(el => el.textContent == "You need points");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(27000, 27100));
    }

    up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Accept");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(2000, 2100));
    }

    up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "OK");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(2000, 2100));
    }

    up = Array.from(document.querySelectorAll("button span")).filter(el => el.textContent == "Rabby Wallet");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(12000, 12100));
    }

    up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent == "More options");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(3000, 3100));
      up = Array.from(document.querySelectorAll("button span")).filter(el => el.textContent == "Rabby Wallet");
      if (up.length != 0){
        triggerEvents(up[0]);
        await sleep(getRandomDelay(15000, 15100));
      }
    }

    up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Accept");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(2000, 2100));
    }

    up = Array.from(document.querySelectorAll("div div button")).filter(el => el.textContent.includes("Continue"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(4000, 5100));
    }
    up = Array.from(document.querySelectorAll("div div button span")).filter(el => el.textContent == "Collect");
    if (up.length != 0){
      await sleep(getRandomDelay(2000, 2100));
      triggerEvents(up[0]);
      await sleep(getRandomDelay(19000, 19100));
    }
    const paintButton = document.evaluate('//div[contains(normalize-space(), "Lv. 3") and @class="current-lv"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (paintButton) {
      try{
        await fetch("http://127.0.0.1:5000/l3_hume?profile_number=" + profile_number);
        await sleep(getRandomDelay(80000, 80100));
      } catch (error) {}
    }
  }

}


function initializeScript() {

    console.log('START hume claim ')

    setTimeout(autoBuy, getRandomDelay(10000, 15050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
