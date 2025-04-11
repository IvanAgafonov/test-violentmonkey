// ==UserScript==
// @name         nodepay
// @version      0.1
// @author       IvanAgafonov
// @match        https://app.nodepay.ai/missions
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/nodepay.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/nodepay.user.js
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
  var up = Array.from(document.querySelectorAll("div div")).filter(el => el.textContent.includes("Claim ") && el.className.includes("items-center text-white"));
  for (const item of up) {
    triggerEvents(item);
    await sleep(getRandomDelay(3000, 4000));
    var up2 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Done")
    if (up2.length != 0){
      triggerEvents(up2[0]);
      await sleep(getRandomDelay(2000, 3000));
    }
  }
   // //div[text()='AI vs. Human: Who Do You Trust? 🤖']/parent::div/parent::div/parent::div/parent::div//span[text()='Answer']
  const paintButton = document.evaluate("//div[text()='AI vs. Human: Who Do You Trust? 🤖']/parent::div/parent::div/parent::div/parent::div//span[text()='Answer']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (paintButton) {
    triggerEvents(paintButton);
    await sleep(getRandomDelay(2000, 3000));
    var up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Yes, I use them regularly.")
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Yes, AI summaries are just as good (or better).")
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Missing context – AI skips important details.")
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Human-written summary – I trust human judgment more.")
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Yes, I already do.")
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Yes, it would help me decide when to trust AI.")
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Submit")
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }
  }

}


function initializeScript() {

    console.log('START claim  ')

    setTimeout(autoBuy, getRandomDelay(10000, 10050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
