// ==UserScript==
// @name         ethgas
// @version      0.12
// @author       IvanAgafonov
// @match        https://www.ethgas.com/community/onboarding/*
// @match        https://www.ethgas.com/community/dashboard/
// @match        https://www.ethgas.com/community/gas-report/
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/ethgas.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/ethgas.user.js
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


// Триггеры событий
function triggerEvents2(element) {
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
      // new PointerEvent('click', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, pointerType: "touch" }),
      new PointerEvent('pointerout', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, pointerType: "touch" }),
      new PointerEvent('pointerleave', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, pointerType: "touch" }),
      // new MouseEvent('mouseout', { bubbles: true, cancelable: true, isTrusted: true, screenX: 182, screenY: 877 }),
      new MouseEvent('mouseleave', { bubbles: true, cancelable: true, isTrusted: true, screenX: 182, screenY: 877 })
  ];

  events.forEach((event, index) => {
      setTimeout(() => element.dispatchEvent(event), index * 10);
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

  var up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Link X Account");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(9800, 10000));
  }

  up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent == "Continue");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3800, 4000));
  }

  up = Array.from(document.querySelectorAll("button p")).filter(el => el.textContent == "Go to Dashboard");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3800, 4000));
  }

  up = Array.from(document.querySelectorAll("input[type='checkbox']"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3800, 4000));
  }

  up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent == "Confirm to proceed");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(4800, 5000));
  }

  up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "+ Link a Primary Wallet");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3800, 4000));
  }

  up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent == "Link a Primary Wallet");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3800, 4000));
  }

  up = Array.from(document.querySelectorAll("button div div div div")).filter(el => el.textContent == "Rabby Wallet");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(18800, 19000));
  }

  up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Follow ETHGas on X");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3800, 4000));
  }

  up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent == "Verify Quest Completion for Beans");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3800, 4000));
  }

  up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Follow the founder of ETHGas on X");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3800, 4000));
  }

  up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent == "Verify Quest Completion for Beans");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3800, 4000));
  }

  up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Generate your gas report");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3800, 4000));
  }

  up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent == "Generate Gas Report");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3800, 4000));
  }

  up = Array.from(document.querySelectorAll("div label")).filter(el => el.textContent == "I understand");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3800, 4000));
  }

  up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent == "All set! Generate My Gas Report");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3800, 4000));
  }

  up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Claim Bonus Beans based on your historical gas spend");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3800, 4000));
  }

  up = Array.from(document.querySelectorAll("div div")).filter(el => el.textContent == "🎉 Claim Beans!");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3800, 4000));
  }
}


function initializeScript() {

    console.log('START claim  ')

    setTimeout(autoBuy, getRandomDelay(9000, 14050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
