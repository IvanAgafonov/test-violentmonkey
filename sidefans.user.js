// ==UserScript==
// @name         sidefans
// @version      0.1
// @author       IvanAgafonov
// @match        https://game.sidekick.fans/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/sidefans.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/sidefans.user.js
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


  var up = Array.from(document.querySelectorAll("svg[xmlns='http://www.w3.org/2000/svg'][width='19']"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(2000, 3000));
  }

  up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent == "CLAIM");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(20000, 21000));
  }

  up = Array.from(document.querySelectorAll("button[class='flex justify-center items-center h-[48px] w-full mb-[54px] font-600 rounded-[8px]']"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(2000, 3000));
  }

  up = Array.from(document.querySelectorAll("span[class='min-w-[16px] text-left']"));
  if (up.length >=  3) {
    if (Number(up[2].textContent) > 0) {
      up = Array.from(document.querySelectorAll("div[class='font-bold text-[#0B0613] text-[16px] leading-5']"));
      if (up.length != 0){
        triggerEvents(up[0]);
        await sleep(getRandomDelay(3000, 4100));
      }
    }
  }

  up = Array.from(document.querySelectorAll("path[fill='url(#task_svg__a)']"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(2000, 3000));
  }

  up = Array.from(document.querySelectorAll("button div")).filter(el => (el.textContent == "GO"));
  if (up.length != 0){
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(2000, 3000));
    }
  }

  up = Array.from(document.querySelectorAll("div div")).filter(el => el.textContent == "Tasks" && el.className.includes("font-bold text-white text-[14px] leading-3 tracking-[-0.14px]"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(2000, 3000));
  }

  up = Array.from(document.querySelectorAll("button div")).filter(el => (el.textContent == "GO"));
  if (up.length != 0){
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(2000, 3000));
    }
  }

}


function initializeScript() {

    console.log('START sidefans claim')

    setTimeout(autoBuy, getRandomDelay(13000, 15050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}