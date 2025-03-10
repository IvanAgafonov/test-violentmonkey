// ==UserScript==
// @name         talentum faucet
// @version      0.1
// @author       IvanAgafonov
// @match        https://monad.talentum.id/quests
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/talentum_faucet.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/talentum_faucet.user.js
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


  var up = document.evaluate("//div[contains(normalize-space(), 'MON Faucet') and contains(@class, 'flex flex-row gap-2 max-w-[190px] items-center streak-bg')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (up){
    triggerEvents(up);
    await sleep(getRandomDelay(3000, 4000));
  }

  up = document.evaluate("//div[contains(normalize-space(), 'Connect Your Wallet') and contains(@class, 'normal !bg-button-primary-base')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (up) {
    triggerEvents(up);
    await sleep(getRandomDelay(2000, 3000));
  }

  up = document.evaluate("//div[contains(@class, 'flex justify-between items-center cursor-pointer px-3 py-2')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (up) {
    triggerEvents(up);
    await sleep(getRandomDelay(2000, 3000));
  }

  up = document.evaluate("//div[contains(normalize-space(), 'Done') and contains(@class, 'normal !bg-button-primary-base')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (up) {
    triggerEvents(up);
    await sleep(getRandomDelay(2000, 3000));
  }

  up = document.evaluate("//div[contains(normalize-space(), 'Check Eligibility') and contains(@class, 'normal !bg-button-primary-base')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (up) {
    triggerEvents(up);
    await sleep(getRandomDelay(2000, 3000));
  }

  up = document.evaluate("//div[contains(normalize-space(), 'Get Now!') and contains(@class, 'normal !bg-button-primary-base')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (up) {
    triggerEvents(up);
    await sleep(getRandomDelay(2000, 3000));
  }

  // var up = Array.from(document.querySelectorAll("button")).filter(el => el.className.includes("_achievement_claim_button_container_"));
  // shuffle(up);
  // for (const item of up) {
  //   console.log(item);
  //   triggerEvents(item);
  //   await sleep(getRandomDelay(2000, 3000));
  // }

}


function initializeScript() {

    console.log('START claim ')

    setTimeout(autoBuy, getRandomDelay(13000, 15050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
