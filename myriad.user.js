// ==UserScript==
// @name         myriad
// @version      0.1
// @author       IvanAgafonov
// @match        https://myriad.markets/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/myriad.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/myriad.user.js
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


  var up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Sign in with Abstract" );
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(28000, 29000));
  }

  up = Array.from(document.querySelectorAll("button div div")).filter(el => el.textContent.includes("Claim +2500 pts"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("button div div")).filter(el => el.textContent.includes("Limbo"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("button div div")).filter(el => el.textContent.includes("Save to Wallet"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("a")).filter(el => el.textContent == "Markets");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(7000, 7100));
  }

  up = Array.from(document.querySelectorAll("div[class='text-center inline-block overflow-hidden px-3 py-2.5 bg-neutral-400 text-neutral-600 text-base font-medium !p-[10px] w-full truncate rounded-xl relative btn-outcome btn-outcome-0']"));
  if (up.length > 15){
    triggerEvents(up[getRandomDelay(15,30)]);
    await sleep(getRandomDelay(3000, 4000));
    up = Array.from(document.querySelectorAll("button[class='text-center inline-block relative overflow-hidden disabled:shadow-none disabled:border-transparent font-semibold light:disabled:bg-neutral-300 light:disabled:text-neutral-400 text-sm rounded-lg px-4 py-3 bg-neutral-400 disabled:text-opacity-50 disabled:bg-opacity-50 hover:bg-neutral-450 light:hover:bg-neutral-350 text-neutral-950 mt-4 w-full cursor-pointer hover:opacity-90']"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(2000, 3000));
    }
    up = Array.from(document.querySelectorAll("button div div")).filter(el => el.textContent == "Confirm");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(10000, 10100));
    }
  }

//   up = querySelectorAllShadows('button').filter(el => el.textContent.includes("Abstract")); // all `td`s in body
//   console.log(up)
//   if (up.length > 1){
//     // triggerEvents(up[1]);
//     up[1].click();
//     await sleep(getRandomDelay(20000, 2100));
//   }

//   up = document.querySelector("input");
//   if (up) {
//     // up.value = "0.000001024"
//     up.setAttribute('value', "0.00000" + getRandomDelay(1025, 9999));
//     up.dispatchEvent(new Event('input', { bubbles: true }));
//     up.dispatchEvent(new Event('change'));
//     // up.setAttribute('value', "0.00001024");
//     // up.dispatchEvent(new Event('input', { bubbles: true }));
//     // up.dispatchEvent(new Event('change'));
//     await sleep(getRandomDelay(2000, 3100));
//   }

//   up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Deposit" );
//   if (up.length != 0){
//     triggerEvents(up[0]);
//     await sleep(getRandomDelay(3000, 4000));
//   }

}


function initializeScript() {

    console.log('START claim  ')

    setTimeout(autoBuy, getRandomDelay(19900, 19950));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
