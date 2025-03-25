// ==UserScript==
// @name         treasury
// @version      0.20
// @author       IvanAgafonov
// @match        https://cdn.thetreasury.io/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/treasury.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/treasury.user.js
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


  var up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent == "Connect wallet" );
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(2000, 3000));
    await connectWallet();
  }

  // up = Array.from(document.querySelectorAll("div[id='ducks']"));
  // if (up.length != 0){
  //   triggerEvents(up[0]);
  //   await sleep(getRandomDelay(2000, 3000));
  // }

  up = Array.from(document.querySelectorAll("img[src='/icons/tasks.svg']")).filter(el => el.className.includes("icons"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(2000, 3000));
  }

  up = Array.from(document.querySelectorAll("p")).filter(el => el.textContent == "Start");
  shuffle(up);
  if (up.length > 1){
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }
  }

  up = Array.from(document.querySelectorAll("button p")).filter(el => el.textContent.includes("Claim"));
  shuffle(up);
  for (const item of up) {
    triggerEvents(item);
    await sleep(getRandomDelay(2000, 3000));
  }

  up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Activities");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(2000, 3000));
  }

  up = Array.from(document.querySelectorAll("p")).filter(el => el.textContent == "Start");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(2000, 3000));
  }

  up = Array.from(document.querySelectorAll("img[src='/images/icons/social/sponge.png']"));
  if (up.length == 2){
    mytext = "911";
  }

  up = Array.from(document.querySelectorAll("img[src='/images/icons/social/icon_activities_duck_quest_day12.png']"));
  if (up.length == 2){
    mytext = "I love ducks";
  }

  up = Array.from(document.querySelectorAll("img[src='/images/icons/social/player.png']"));
  if (up.length == 2){
    mytext = "mozart";
  }

  up = Array.from(document.querySelectorAll("img[src='/images/icons/social/wallpaper.png']"));
  if (up.length == 2){
    mytext = "5783";
  }

  up = Array.from(document.querySelectorAll("img[src='/images/icons/social/key.png']"));
  if (up.length == 2){
    mytext = "6699";
  }

  up = Array.from(document.querySelectorAll("img[src='/images/icons/social/durone.png']"));
  if (up.length == 2){
    mytext = "Du rove";
  }

  up = Array.from(document.querySelectorAll("img[src='/images/icons/social/watch_icon.png']"));
  if (up.length == 2){
    mytext = "1455";
  }

  up = Array.from(document.querySelectorAll("img[src='/images/icons/social/strawberry.png']"));
  if (up.length == 2){
    mytext = "3392";
  }

  up = Array.from(document.querySelectorAll("img[src='/images/icons/social/Icon knok.png']"));
  if (up.length == 2){
    mytext = "2703";
  }

  up = Array.from(document.querySelectorAll("img[src='/images/icons/social/Icon knok.png']"));
  if (up.length == 2){
    mytext = "2703";
  }

  var verify = document.querySelector("input[placeholder='Type code here']")
  if (verify) {
    verify.click();
    // verify.value = "Du rove"
    verify.setAttribute('value', mytext);

    verify.dispatchEvent(new Event('input', { bubbles: true }));
    verify.dispatchEvent(new Event('change'));
    await sleep(getRandomDelay(2000, 3000));
    up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Check");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(2000, 3000));
    }
    up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent.includes("Continue") && el.className.includes("modalButton"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(2000, 3000));
    }
    up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent.includes("Claim") && el.className.includes("modalButton"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(2000, 3000));
    }
  }

  up = Array.from(document.querySelectorAll("button p")).filter(el => el.textContent.includes("Claim"));
  shuffle(up);
  for (const item of up) {
    triggerEvents(item);
    await sleep(getRandomDelay(2000, 3000));
  }
}


function initializeScript() {

    console.log('START claim     ')

    setTimeout(autoBuy, getRandomDelay(10000, 13050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
