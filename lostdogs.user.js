// ==UserScript==
// @name         LostDogs claim
// @version      0.11
// @author       IvanAgafonov
// @match        https://dog-ways.newcoolproject.io/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/lostdogs.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/lostdogs.user.js
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

async function connectWallet(){
  var up2 = Array.from(document.querySelectorAll("div")).filter(el => el.textContent == "Wallet On")
  if (up2.length != 0){
    triggerEvents(up2[0]);
    await sleep(getRandomDelay(3000, 4100));
    up2 = Array.from(document.querySelectorAll("button")).filter(el => el.textContent.includes("Open Wallet in Telegram"))
    if (up2.length != 0){
      triggerEvents(up2[0]);
      await sleep(getRandomDelay(20000, 21000));
    }
  }
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

function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function simulateTyping(element, text, delay) {
  for (const char of text) {
    const event = new KeyboardEvent('keydown', { key: char });
    element.dispatchEvent(event);
    await new Promise(resolve => setTimeout(resolve, delay));

  }
    for (const char of text) {
    const event = new KeyboardEvent('keypress', { key: char });
    element.dispatchEvent(event);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
    for (const char of text) {
    const event = new KeyboardEvent('keyup', { key: char });
    element.dispatchEvent(event);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}


async function autoBuy() {
  var button = document.evaluate("(//div[text()='Profile'])[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (button) {
    triggerEvents(button);
    await sleep(getRandomDelay(3200, 4000));
  }

  button = document.evaluate("(//div[text()='Connect'])[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (button) {
    triggerEvents(button);
    await sleep(getRandomDelay(3200, 4000));
  }

  await connectWallet();


//   var button = document.evaluate("(//div[text()='Confirm'])[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//   if (button) {
//     triggerEvents(button);
//     await sleep(getRandomDelay(3200, 4000));
//   }

//   button = document.evaluate("(//div[text()='Continue'])[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//   if (button) {
//     triggerEvents(button);
//     await sleep(getRandomDelay(3200, 4000));
//   }

//   button = document.evaluate("(//div[text()='Continue'])[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//   if (button) {
//     triggerEvents(button);
//     await sleep(getRandomDelay(3200, 4000));
//   }

//   button = document.evaluate("(//div[text()='Make choice'])[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//   if (button) {
//     button.click();
//     await sleep(getRandomDelay(3200, 4000));
//   }

//   button = document.evaluate("(//input[@type='range'])[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//   if (button) {
//     const lastValue = button.value;
//     button.value = 0;
//     const event = new Event("input", { bubbles: true });
//     const tracker = button._valueTracker;
//     if (tracker) {
//       tracker.setValue(lastValue);
//     }
//     button.dispatchEvent(event);
//     await sleep(getRandomDelay(3200, 4000));
//   }

//   button = document.evaluate("(//div[text()='Bid 0 $NOT'])[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//   if (button) {
//     triggerEvents(button);
//     await sleep(getRandomDelay(3200, 4000));
//   }

//   button = document.evaluate("(//div[text()='Share a story'])[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//   if (button) {
//     triggerEvents(button);
//     await sleep(getRandomDelay(3200, 4000));
//   }

//   button = document.evaluate("(//div[text()='Continue'])[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//   if (button) {
//     triggerEvents(button);
//     await sleep(getRandomDelay(3200, 4000));
//   }

//   button = document.evaluate("(//div[text()='Continue'])[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//   if (button) {
//     triggerEvents(button);
//     await sleep(getRandomDelay(3200, 4000));
//   }

//   button = document.evaluate("(//div[text()='What lost dog are you?'])[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//   if (button) {
//     triggerEvents(button);
//     await sleep(getRandomDelay(3200, 4000));
//   }
}


function initializeScript() {

    console.log('START LostDogs claim')

    setTimeout(autoBuy, getRandomDelay(11000, 13500));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
