// ==UserScript==
// @name         tbook
// @version      0.18
// @author       IvanAgafonov
// @match        https://engage.tbook.com/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/tbook.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/tbook.user.js
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

  var up = Array.from(document.querySelectorAll("img[alt='logo']"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(12000, 14000));
  }

  up = Array.from(document.querySelectorAll("a[href='/wise-score'] img"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(12000, 14000));
  }

  up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent.includes("Check In"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent.includes("Check In"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("a div")).filter(el => el.textContent.includes("My Rewards"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(2000, 3000));
    up = Array.from(document.querySelectorAll("a div")).filter(el => el.textContent.includes("My Rewards"));
    if (up.length == 0){
      await sleep(getRandomDelay(7000, 8000));
    }
  }

  up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent.includes("Check-in to Unlock Bookies NFT"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }
  up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent.includes("Check In"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("a div")).filter(el => el.textContent.includes("My Rewards"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(10000, 11000));
  }

  up = Array.from(document.querySelectorAll("div div div div div")).filter(el => el.textContent.includes("My Streak SBTs") && el.className.includes("text-base") );
  console.log(up)
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(7000, 9000));
  }

  up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent == "Claim" || el.textContent == "View");
  shuffle(up);
  for (const item of up) {
    triggerEvents(item);
    await sleep(getRandomDelay(3000, 4000));

    var up2 = Array.from(document.querySelectorAll("button span")).filter(el => el.textContent.includes("Mint SBT on") || el.textContent.includes("View the SBT"));
    if (up2.length != 0){
      triggerEvents(up2[0]);
      await sleep(getRandomDelay(1000, 2000));
      await connectWallet();
      await sleep(getRandomDelay(21000, 24000));
    }
  }

  await sleep(getRandomDelay(3000, 4000));
  up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent.includes("Check-in to Unlock Bookies NFT"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }
  up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent.includes("Check In"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }

}


function initializeScript() {

    console.log('START claim')

    setTimeout(autoBuy, getRandomDelay(16000, 16050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
