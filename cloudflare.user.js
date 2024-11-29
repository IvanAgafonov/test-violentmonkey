// ==UserScript==
// @name         cloudflare claim
// @version      0.15
// @author       IvanAgafonov
// @match        https://challenges.cloudflare.com/*
// @grant        none
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/cloudflare.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/cloudflare.user.js
// @homepage     https://github.com/IvanAgafonov/test-violentmonkey
// ==/UserScript==


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

function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


async function autoBuy() {

  // var up = Array.from(document.querySelectorAll("input[type='checkbox']"));
  var up = Array.from(querySelectorAllShadows("input[type='checkbox']"));
    if (up.length != 0){
    triggerEvents(up[0]);
    // await sleep(getRandomDelay(10500, 14000));
  }
  var up2 = Array.from(document.querySelectorAll("input[type='checkbox']"));
    if (up2.length != 0){
    triggerEvents(up2[0]);
    // await sleep(getRandomDelay(10500, 14000));
  }
  const paintButton = document.evaluate("//*input[type='checkbox']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (paintButton){
    triggerEvents(paintButton);
    // await sleep(getRandomDelay(10500, 14000));
  }
  const paintButton2 = document.evaluate("//*[local-name() = 'input']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (paintButton2){
    triggerEvents(paintButton2);
    // await sleep(getRandomDelay(10500, 14000));
  }

  const shadowHost = document.querySelector('body');
  const shadowRoot = shadowHost.shadowRoot;
  const elementInShadowRoot = shadowRoot.querySelector("input[type='checkbox']");


  if (elementInShadowRoot){
    triggerEvents(elementInShadowRoot);
    // await sleep(getRandomDelay(10500, 14000));
  }
}






function initializeScript() {

    console.log('START cloudflare claim')

    setTimeout(autoBuy, getRandomDelay(5300, 8500));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
