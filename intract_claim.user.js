// ==UserScript==
// @name         Intract quest
// @version      0.11
// @author       IvanAgafonov
// @match        https://quest.intract.io/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/intract_claim.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/intract_claim.user.js
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


  var up = Array.from(document.querySelectorAll("div[class='_badge_base_container_1w0or_1']"));
  shuffle(up);
  for (const item of up) {
    console.log(item);
    triggerEvents(item);
    await sleep(getRandomDelay(1000, 2000));
  }

  if (document.URL.includes("64ec621864b3b270d9eed024")) {
    up = Array.from(document.querySelectorAll("button[role='radio']"));
    if (up.length != 0){
      triggerEvents(up[2]);
      await sleep(getRandomDelay(1000, 2000));
    }
  }

  if (document.URL.includes("64eeec9a86faf9411b41bd97")) {
    up = Array.from(document.querySelectorAll("button[role='radio']"));
    if (up.length != 0){
      triggerEvents(up[1]);
      await sleep(getRandomDelay(1000, 2000));
    }
  }

  if (document.URL.includes("64eeeac786faf9411b41bb3c")) {
    up = Array.from(document.querySelectorAll("button[role='radio']"));
    if (up.length != 0){
      triggerEvents(up[1]);
      await sleep(getRandomDelay(1000, 2000));
      triggerEvents(up[6]);
      await sleep(getRandomDelay(1000, 2000));
    }
  }

  if (document.URL.includes("64eeee1e86faf9411b41bf9b")) {
    up = Array.from(document.querySelectorAll("button[role='radio']"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(1000, 2000));
      triggerEvents(up[4]);
      await sleep(getRandomDelay(1000, 2000));
    }
  }

  if (document.URL.includes("64e856a89c093f23a29ccebd")) {
    up = Array.from(document.querySelectorAll("button[role='radio']"));
    if (up.length != 0){
      triggerEvents(up[1]);
      await sleep(getRandomDelay(1000, 2000));
      triggerEvents(up[4]);
      await sleep(getRandomDelay(1000, 2000));
    }
  }

  if (document.URL.includes("64edbfb30c9f33dbc9e38d92")) {
    up = Array.from(document.querySelectorAll("button[role='radio']"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(1000, 2000));
      triggerEvents(up[3]);
      await sleep(getRandomDelay(1000, 2000));
    }
  }

  if (document.URL.includes("650be3c489278ea02f073582")) {
    up = Array.from(document.querySelectorAll("button[role='radio']"));
    if (up.length != 0){
      triggerEvents(up[2]);
      await sleep(getRandomDelay(1000, 2000));
    }
  }

  if (document.URL.includes("6634ca5f7bcdce28ecb1b965")) {
    up = Array.from(document.querySelectorAll("button[role='radio']"));
    if (up.length != 0){
      triggerEvents(up[3]);
      await sleep(getRandomDelay(1000, 2000));
    }
  }


  up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Verify");
  shuffle(up);
  for (const item of up) {
    console.log(item);
    triggerEvents(item);
    await sleep(getRandomDelay(1000, 2000));
  }

//   up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Connect TON Wallet");
//   if (up.length != 0){
//     triggerEvents(up[0]);
//     await sleep(getRandomDelay(4000, 5000));
//     await connectWallet();
//   }

//   up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Prizes");
//   if (up.length != 0){
//     triggerEvents(up[0]);
//     await sleep(getRandomDelay(3000, 4000));
//   }

//   up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Open GemBox");
//   if (up.length != 0){
//     triggerEvents(up[0]);
//     await sleep(getRandomDelay(8000, 10000));
//   }

}


function initializeScript() {

    console.log('START intract claim')

    setTimeout(autoBuy, getRandomDelay(15000, 18050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
