// ==UserScript==
// @name         abstract badge
// @version      0.16
// @author       IvanAgafonov
// @match        https://portal.abs.xyz/rewards
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/abstract_badge.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/abstract_badge.user.js
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


  var up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Login with Wallet" );
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(5000, 5100));
    up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Rabby Wallet" );
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(15000, 19000));
    }
  }

  up = Array.from(document.querySelectorAll("button span")).filter(el => el.textContent == "Continue");
  for (const item of up) {
    triggerEvents(item);
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Claim" );
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(5000, 5100));
  }

  up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Claim Badge" );
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("h3")).filter(el => el.textContent.includes("Silver") && el.textContent.includes("Tier"));
  if (up.length != 0){
    try{
        await fetch("http://127.0.0.1:5000/abs_silver?profile_number=" + profile_number);
      } catch (error) {}
  }

  // up = Array.from(document.querySelectorAll("img[src='https://abs.xyz/imagetransform/width=500,quality=100/https%3A%2F%2Fabstract-assets.abs.xyz%2Fbadges%2Fbadge-dinero.png']"));
  // if (up.length != 1){
  //    const response = fetch("http://127.0.0.1:5000/abstract?address=" + rabby.selectedAddress);
  //   await sleep(getRandomDelay(3000, 4000));
  // }


  // up = querySelectorAllShadows('button').filter(el => el.textContent.includes("Abstract")); // all `td`s in body
  // console.log(up)
  // if (up.length > 1){
  //   // triggerEvents(up[1]);
  //   up[1].click();
  //   await sleep(getRandomDelay(4000, 4100));
  // }

}


function initializeScript() {

    console.log('START claim  ')

    setTimeout(autoBuy, getRandomDelay(17000, 17050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
