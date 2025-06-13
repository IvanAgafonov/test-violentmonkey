// ==UserScript==
// @name         superchain
// @version      0.1
// @author       IvanAgafonov
// @match        https://account.superchain.eco/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/superchain.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/superchain.user.js
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


function querySelectorAllShadows(selector, el = document.body) {
  // recurse on childShadows
  const childShadows = Array.from(el.querySelectorAll('*')).
    map(el => el.shadowRoot).filter(Boolean);

  // console.log('[querySelectorAllShadows]', selector, el, `(${childShadows.length} shadowRoots)`);

  const childResults = childShadows.map(child => querySelectorAllShadows(selector, child));

  // fuse all results into singular, flat array
  const result = Array.from(el.querySelectorAll(selector));
  return result.concat(childResults).flat();
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

  var up = querySelectorAllShadows('wui-button').filter(el => el.textContent.includes("Sign"));
  console.log(up);
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(13000, 16010));
  }

  up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Claim Badges");
  console.log(up);
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(17000, 17100));
  }


//   for(var i=0;i<100;i++) {
//     var up = Array.from(document.querySelectorAll("div div button")).filter(el => el.textContent.includes("Spin") || el.textContent.includes("Free spin"));
//     if (up.length != 0){
//       triggerEvents(up[0]);
//       await sleep(getRandomDelay(3000, 4100));
//     }

//     up = Array.from(document.querySelectorAll("h2")).filter(el => el.textContent == "You need points");
//     if (up.length != 0){
//       triggerEvents(up[0]);
//       await sleep(getRandomDelay(27000, 27100));
//     }

//     up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Accept");
//     if (up.length != 0){
//       triggerEvents(up[0]);
//       await sleep(getRandomDelay(2000, 2100));
//     }

//     up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "OK");
//     if (up.length != 0){
//       triggerEvents(up[0]);
//       await sleep(getRandomDelay(2000, 2100));
//     }

//     up = Array.from(document.querySelectorAll("button span")).filter(el => el.textContent == "Rabby Wallet");
//     if (up.length != 0){
//       triggerEvents(up[0]);
//       await sleep(getRandomDelay(12000, 12100));
//     }

//     up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent == "More options");
//     if (up.length != 0){
//       triggerEvents(up[0]);
//       await sleep(getRandomDelay(3000, 3100));
//       up = Array.from(document.querySelectorAll("button span")).filter(el => el.textContent == "Rabby Wallet");
//       if (up.length != 0){
//         triggerEvents(up[0]);
//         await sleep(getRandomDelay(15000, 15100));
//       }
//     }

//     up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Accept");
//     if (up.length != 0){
//       triggerEvents(up[0]);
//       await sleep(getRandomDelay(2000, 2100));
//     }

//     up = Array.from(document.querySelectorAll("div div button")).filter(el => el.textContent.includes("Continue"));
//     if (up.length != 0){
//       triggerEvents(up[0]);
//       await sleep(getRandomDelay(1000, 2100));
//     }
//   }

}


function initializeScript() {

    console.log('START hume claim ')

    setTimeout(autoBuy, getRandomDelay(13000, 19050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
