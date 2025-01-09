// ==UserScript==
// @name         Tabi claim
// @version      0.22
// @author       IvanAgafonov
// @match        https://front.tabibot.com/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/tabi.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/tabi.user.js
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

async function autoBuy() {

//   var up = Array.from(document.querySelectorAll("div div div")).filter(el => el.textContent == "View Rewards");
//   if (up.length != 0){
//     up[0].click();
//     await sleep(getRandomDelay(3000, 4000));
//   }

//   up = Array.from(document.querySelectorAll("div div div")).filter(el => el.textContent == "Mining Now");
//   if (up.length != 0){
//     up[0].click();
//     await sleep(getRandomDelay(3000, 4000));
//   }

  var up = Array.from(document.querySelectorAll("div")).filter(el => el.textContent == "Go");
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("span[class='text-white font-changa-one italic text-[12px]"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("div div div div div.text-white")).filter(el => el.textContent.includes("Upgrade"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(2000, 4000));
  }

  history.back()
  await sleep(getRandomDelay(1000, 1100));

  up = Array.from(document.querySelectorAll("div")).filter(el => el.textContent.includes("Draw") && el.className.includes("flex flex-col justify-center items-center"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(2000, 3000));
  }

  for(let i = 0; i < 12; i++) {
    up = Array.from(document.querySelectorAll("img[class='w-[96px] h-[56px]']"));
    if (up.length != 0){
       triggerEvents(up[0]);
      await sleep(getRandomDelay(3000, 4000));
    }

    up = Array.from(document.querySelectorAll("div")).filter(el => el.textContent.includes("Claim") && el.className.includes("justify-center items-center self-stretch"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(1000, 2000));
    }
  }


  await sleep(3400);
}


function initializeScript() {

    console.log('START Tabi claim')

    setTimeout(autoBuy, getRandomDelay(9000, 11500));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
