// ==UserScript==
// @name         tonacad
// @version      0.12
// @author       IvanAgafonov
// @match        https://ton-academy.luly.io/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/tonacad.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/tonacad.user.js
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

  var up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Start now");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(4000, 5000));
  }

  up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Connect TON ID");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(15000, 18000));
  }

  up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Start learning");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(4000, 5000));
  }

  up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Start Lesson");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(2000, 3000));
  }

  for(var i = 0;i<200;i++) {
    up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Next");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(1000, 3000));
    }
    up = Array.from(document.querySelectorAll("div span")).filter(el => [ "Synthetic dollars are trusted globally", "Hedging", "Reserves built on trading strategies",
                                                                                                "It is bank-independent and on-chain", "Risk control, rewards and transparency", "Custodians",
                                                                                               "Assets are held by trusted custodians who safeguard them but cannot use them", "To connect safely to large exchanges and keep USDe stable",
                                                                                               "FIVA", "Lend, trade, stake or use it in DeFi strategies", "Tonkeeper / TON Wallet", "A token that earns rewards from staking",
                                                                                               "Swapping usually has higher costs", "7 days", "Swap USDt for USDe in a TON wallet", "USDT", "Yes", "tsUSDe",
                                                                                               "Stake USDe directly in TON Wallet", "Fixed yield with DeFi strategies", "Lend and borrow USDe", "50% staked, 50% liquidity pool"].includes(el.textContent));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(1000, 3000));
    }
    up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Next");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(1000, 3000));
    }
    up = Array.from(document.querySelectorAll("div span")).filter(el => ["A synthetic dollar"].includes(el.textContent));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(1000, 3000));
    }
    up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Continue");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(1000, 3000));
    }
    up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Claim Reward");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(20000, 30000));
    }
    await sleep(getRandomDelay(1000, 3000));
  }


}


function initializeScript() {

    console.log('START claim  ')

    setTimeout(autoBuy, getRandomDelay(15000, 16050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
