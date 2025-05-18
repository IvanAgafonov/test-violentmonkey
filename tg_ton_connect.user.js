// ==UserScript==
// @name         tg ton connect
// @version      0.19
// @author       IvanAgafonov
// @match        https://web.telegram.org/k*
// @grant        none
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/tg_ton_connect.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/tg_ton_connect.user.js
// @homepage     https://github.com/IvanAgafonov/test-violentmonkey
// ==/UserScript==



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


async function connect() {

  var up = Array.from(document.querySelectorAll("div[class='popup-title'] span[class='peer-title']")).filter(el => el.textContent == 'Wallet' || el.textContent == "TON ID" ||
                                                                                                             el.textContent == 'Galactica Node Sale' || el.textContent == 'TON Society ID');
  var up2 = document.evaluate("(//div[contains(@class,'BrowserHeaderTabTitle') and text()='Wallet'])[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (up.length != 0 || up2){

    up = Array.from(document.querySelectorAll("div div div button.popup-button.btn.primary.rp span")).filter(el => el.textContent.includes("Launch"));
    if (up.length != 0){
      triggerEvents(up[0]);
    }

    up = Array.from(document.querySelectorAll("div button.btn-primary.btn-color-primary.web-app-button")).filter(el => el.textContent.includes("Connect") ||
                                                                                                                 el.textContent.includes("Подключить") ||
                                                                                                                 //el.textContent.includes("Confirm") ||
                                                                                                                 //el.textContent.includes("Подтвердить") ||
                                                                                                                 el.textContent.includes("Привязать кошелёк"));
    if (up.length != 0){
      triggerEvents(up[0]);
    }
  }

  up = Array.from(document.querySelectorAll("div div div button[class='btn-primary btn-color-primary web-app-button']")).filter(el => el.textContent.includes("Next") ||
    el.textContent.includes("Purchase for 50 points") ||
    el.textContent.includes("Done") ||
    el.textContent.includes("Enter Password") ||
    el.textContent.includes("Claim Reward") ||
    el.textContent.includes("Continue") ||
    el.textContent.includes("Подключить") ||
    el.textContent.includes("Connect"));
  for (const item of up) {
    triggerEvents(item);
  }

  up = Array.from(document.querySelectorAll("div")).filter(el => el.textContent == "friends" && el.className == "peer-title chat-title");
  if (up.length != 0){
    up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Join Group");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(2000, 3000));
    }
  }


}


function initializeScript() {

    connect()
    setTimeout(initializeScript, 5000);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    setTimeout(initializeScript, 5000);
}

