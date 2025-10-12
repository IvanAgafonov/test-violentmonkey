// ==UserScript==
// @name         orbiter
// @version      0.13
// @author       IvanAgafonov
// @match        https://www.orbiter.finance/?channel=0x3c0ed9ab1a12ba804900da2807c09b8afec10f67
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/orbiter.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/orbiter.user.js
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

  var up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Connect Wallet");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Connect");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("button div div div div")).filter(el => el.textContent == "MetaMask");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(13000, 14000));
  }

  up = Array.from(document.querySelectorAll("img[src='/assets/icon/header/calendar.svg']"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(4000, 5000));
  }

  up = Array.from(document.querySelectorAll("div[class='flex gap-1 text-[var(--o-color-text-t1)] o-font-500 justify-center items-center relative z-10 cursor-pointer']"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(100, 500));
  }

  var chains = ['base', 'opbnb', 'Ink', 'linea'];
  shuffle(chains);

  up = Array.from(document.querySelectorAll("div")).filter(el => el.textContent.includes(chains[0]) && el.className.includes('border-transparent px-2 h-9 rounded-lg flex gap-2 items-center cursor-pointer'));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(4000, 5000));
  }

  up = Array.from(document.querySelectorAll("p")).filter(el => el.textContent == "Check in");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(13000, 14000));
  }

//   var up = querySelectorAllShadows('wui-text').filter(el => el.textContent.includes("Rabby Wallet"));
//   console.log(up);
//   if (up.length != 0){
//     triggerEvents(up[0]);
//     up[0].click();
//     await sleep(getRandomDelay(12000, 12100));
//   }

//   var up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent == "Close");
//   if (up.length != 0){
//     triggerEvents(up[0]);
//     await sleep(getRandomDelay(3000, 4000));
//   }

//   up = Array.from(document.querySelectorAll("h1")).filter(el => el.textContent == "TAP TO GM");
//   if (up.length != 0){
//     triggerEvents(up[0]);
//     await sleep(getRandomDelay(2000, 3000));
//   }

//   up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "GM");
//   if (up.length != 0){
//     triggerEvents(up[0]);
//     await sleep(getRandomDelay(2000, 3000));
//   }

}


function initializeScript() {

    console.log('START claim  ')

    setTimeout(autoBuy, getRandomDelay(21000, 21050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
