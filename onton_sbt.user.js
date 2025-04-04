// ==UserScript==
// @name         Onton sbt
// @version      0.15
// @author       IvanAgafonov
// @match        https://app.onton.live/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/onton_sbt.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/onton_sbt.user.js
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

async function autoBuy1() {
    await connectWallet();
    const inputElement = document.querySelector("input[placeholder='Event password']");
    inputElement.click();
    await sleep(getRandomDelay(100, 210));
    inputElement.value = "beeton";
    inputElement.setAttribute('value', "beeton");

    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    inputElement.dispatchEvent(new Event('change'));
}

async function autoBuy2() {
    await connectWallet();
    const inputElement = document.querySelector("input[placeholder='Event password']");
    inputElement.click();
    await sleep(getRandomDelay(100, 210));
    inputElement.value = "Craken-Sbt";
    inputElement.setAttribute('value', "Craken-Sbt");

    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    inputElement.dispatchEvent(new Event('change'));
}

async function autoBuy3() {
    await connectWallet();
    const inputElement = document.querySelector("input[placeholder='Event password']");
    inputElement.click();
    await sleep(getRandomDelay(100, 210));
    inputElement.value = "Craken";
    inputElement.setAttribute('value', "Craken");

    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    inputElement.dispatchEvent(new Event('change'));
}

async function autoBuy4() {
    await connectWallet();
    const inputElement = document.querySelector("input[placeholder='Event password']");
    inputElement.click();
    await sleep(getRandomDelay(100, 210));
    inputElement.value = "sadmeow";
    inputElement.setAttribute('value', "sadmeow");

    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    inputElement.dispatchEvent(new Event('change'));
}

async function autoBuy5() {
    await connectWallet();
    const inputElement = document.querySelector("input[placeholder='Event password']");
    inputElement.click();
    await sleep(getRandomDelay(100, 210));
    inputElement.value = "layerzero";
    inputElement.setAttribute('value', "layerzero");

    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    inputElement.dispatchEvent(new Event('change'));
}


function initializeScript() {
    if (document.URL.includes("66d463c1-2e53-43b0-901b-7a34fd07e9f7")) {
      console.log('START ton society claim 1')

      setTimeout(autoBuy1, getRandomDelay(10000, 10050));
    }
    if (document.URL.includes("12195b0d-1e35-44e6-af75-d1208f6fe056")) {
      console.log('START ton society claim 2')

      setTimeout(autoBuy2, getRandomDelay(10000, 10050));
    }
    if (document.URL.includes("67295108-065b-454d-a25c-0095f178cb49")) {
      console.log('START ton society claim 3')

      setTimeout(autoBuy3, getRandomDelay(10000, 10050));
    }
    if (document.URL.includes("17d0fffc-caae-4d45-9683-037964ffeeca")) {
      console.log('START ton society claim 2')

      setTimeout(autoBuy5, getRandomDelay(10000, 10050));
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
