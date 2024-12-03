// ==UserScript==
// @name         tg ton connect
// @version      0.12
// @author       IvanAgafonov
// @match        https://web.telegram.org/k*
// @grant        none
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/tg_ton_connect.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/tg_ton_connect.user.js
// @homepage     https://github.com/IvanAgafonov/test-violentmonkey
// ==/UserScript==


async function connect() {

  var up = Array.from(document.querySelectorAll("div[class='popup-title'] span[class='peer-title']")).filter(el => el.textContent == 'Wallet' || el.textContent == 'Galactica Node Sale');
  var up2 = document.evaluate("(//div[contains(@class,'BrowserHeaderTabTitle') and text()='Wallet'])[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (up.length != 0 || up2){

    up = Array.from(document.querySelectorAll("div div div button.popup-button.btn.primary.rp span")).filter(el => el.textContent.includes("Launch"));
    if (up.length != 0){
      up[0].click();
    }

    up = Array.from(document.querySelectorAll("div button.btn-primary.btn-color-primary.web-app-button")).filter(el => el.textContent.includes("Connect") ||
                                                                                                                 el.textContent.includes("Подключить") ||
                                                                                                                 //el.textContent.includes("Confirm") ||
                                                                                                                 //el.textContent.includes("Подтвердить") ||
                                                                                                                 el.textContent.includes("Привязать кошелёк"));
    if (up.length != 0){
      up[0].click();
    }
  }

  up = Array.from(document.querySelectorAll("div div div button[class='btn-primary btn-color-primary web-app-button']")).filter(el => el.textContent.includes("Next") ||
    el.textContent.includes("Purchase for 50 points") ||
    el.textContent.includes("Done") ||
    el.textContent.includes("Continue") ||
    el.textContent.includes("Connect"));
  if (up.length != 0){
    up[0].click();
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

