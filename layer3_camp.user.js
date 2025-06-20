// ==UserScript==
// @name         layer3
// @version      0.19
// @author       IvanAgafonov
// @match        https://app.layer3.xyz/activations/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/layer3_camp.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/layer3_camp.user.js
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

    var up = Array.from(document.querySelectorAll("button")).filter(el => ["Switch to "].includes(el.textContent));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(2000, 2100));
    }

    var up = Array.from(document.querySelectorAll("button")).filter(el => ["Mint CUBE to claim"].includes(el.textContent));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(4000000, 5000000));
    }

  for(var i=0;i<20;i++) {
    up = Array.from(document.querySelectorAll("div h1")).filter(el => ["Activation Completed"].includes(el.textContent));
    if (up.length != 0){
      try{
        await fetch("http://127.0.0.1:5000/layer3?profile_number=" + profile_number + "&src_page=" + document.URL);
      } catch (error) {}
      await sleep(getRandomDelay(4000000, 5000000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent.includes("Your credential is being minted..."));
    var up2 = Array.from(document.querySelectorAll("div h1")).filter(el => el.textContent == "Claim Rewards");
    if (up.length == 0 && up2.length == 0){
      up = Array.from(document.querySelectorAll("button")).filter(el => ["Open RewardedTV", "Open Telegram", "Explore Summit", "Open Discord", "Open Faucet", "Skip", "Verify", "Continue"].includes(el.textContent));
      shuffle(up);
      for (var item of up) {
        triggerEvents(item);
        await sleep(getRandomDelay(2000, 3000));
      }
    }
    await sleep(getRandomDelay(1000, 2000));
  }
}


function initializeScript() {

    console.log('START claim  ')

    setTimeout(autoBuy, getRandomDelay(18000, 18050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
