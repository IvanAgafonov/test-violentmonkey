// ==UserScript==
// @name         Terminal claim
// @version      0.14
// @author       IvanAgafonov
// @match        https://app.0xterminal.game/*
// @grant        none
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/terminal.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/terminal.user.js
// @homepage     https://github.com/IvanAgafonov/test-violentmonkey
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

async function autoBuy() {


  var up = Array.from(document.querySelectorAll("button span")).filter(el => el.textContent.includes("Next"));
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("button span")).filter(el => el.textContent.includes("Next"));
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("a span")).filter(el => el.textContent.includes("Got it"));
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("button span")).filter(el => el.textContent.includes("Got it"));
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("button p")).filter(el => el.textContent == "Continue");
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("button p")).filter(el => el.textContent == "Continue");
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("a span")).filter(el => el.textContent.includes("Got it"));
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("button p")).filter(el => el.textContent == "Take 1000 $TRMNL & GO!");
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("a span")).filter(el => el.textContent.includes("Collect 1000"));
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("button p")).filter(el => el.textContent == "Got it!");
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "push");
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  if (getRandomDelay(1000, 10000) < 1500) {

    up = Array.from(document.querySelectorAll("a[href='/app/tasks']"));
    if (up.length != 0){
      triggerEvents(up[0]);
      // up[0].click();
      await sleep(getRandomDelay(2000, 4000));
    }
    
    up = Array.from(document.querySelectorAll("a span")).filter(el => el.textContent.includes("Got it"));
    if (up.length != 0){
      triggerEvents(up[0]);
      // up[0].click();
      await sleep(getRandomDelay(3000, 4000));
    }

    up = Array.from(document.querySelectorAll("button[class='flex w-full items-center justify-between p-10']"));
    if (up.length != 0){
      for (const item of up) {
        triggerEvents(item);
        await sleep(getRandomDelay(1200, 2000));
        var up2 = Array.from(document.querySelectorAll("button[class='space-x-4 py-8 font-bold inline-flex-center h-32 min-w-32 rounded-16 px-12 text-inter-12 bg-black-100 text-zinc-100 w-full']"));
        if (up2.length != 0){
          triggerEvents(up2[0]);
          // up[0].click();
          await sleep(getRandomDelay(1000, 2000));
        }
      }
    }
  }


  up = Array.from(document.querySelectorAll("a[href='/app']"));
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("div[class*='size-full rounded-full']"));
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

}


function initializeScript() {

    console.log('START terminal claim')

    setTimeout(autoBuy, getRandomDelay(8000, 10050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
