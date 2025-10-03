// ==UserScript==
// @name         talentum_verification
// @version      0.1
// @author       IvanAgafonov
// @match        https://monad.talentum.id/verification
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/talentum_verification.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/talentum_verification.user.js
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

  var names = ['Active On-Chain days', 'Unique on-chain activity', 'Token Holdings', 'NFTs Ownership']
  shuffle(names)

  var paintButton = document.evaluate("(//div[text()='" + names[0] + "']/following::div)[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (paintButton) {
    triggerEvents(paintButton);
    await sleep(getRandomDelay(4000, 5000));
  }

  paintButton = document.evaluate("//div[@class='flex flex-row items-center justify-center cursor-pointer text-center gap-1 max-h-10 px-3 py-[7px] rounded-lg font-familyRegular text-md primary bg-button-primary text-text-invert hover:bg-button-primary-hover hover:text-text-invert active:bg-button-primary-active active:text-text-invert']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (paintButton) {
    triggerEvents(paintButton);
    await sleep(getRandomDelay(4000, 5000));
  }

  paintButton = document.evaluate("//div[text()=' Mint ']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (paintButton) {
    triggerEvents(paintButton);
    await sleep(getRandomDelay(4000, 5000));
  }

  paintButton = document.evaluate("//div[contains(@class, 'flex justify-between items-center cursor-pointer px-3 py-2')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (paintButton) {
    triggerEvents(paintButton);
    await sleep(getRandomDelay(3500, 4000));
  }

  paintButton = document.evaluate("//div[contains(normalize-space(), 'Done') and contains(@class, 'text-md normal bg-button-primary text-text-invert')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (paintButton) {
    triggerEvents(paintButton);
    await sleep(getRandomDelay(3000, 4000));
  }


}


function initializeScript() {

    console.log('START claim ')

    setTimeout(autoBuy, getRandomDelay(19000, 19050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
