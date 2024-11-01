// ==UserScript==
// @name         tg ton connect
// @version      0.2
// @author       IvanAgafonov
// @match        https://web.telegram.org/k*
// @grant        none
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/tg_ton_connect.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/tg_ton_connect.user.js
// @homepage     https://github.com/IvanAgafonov/test-violentmonkey
// ==/UserScript==


async function connect() {

  var up = Array.from(document.querySelectorAll("div div div button.popup-button.btn.primary.rp span")).filter(el => el.textContent.includes("Launch"));
  if (up.length != 0){
    up[0].click();
  }

  up = Array.from(document.querySelectorAll("div button.btn-primary.btn-color-primary.web-app-button")).filter(el => el.textContent.includes("Connect") ||
                                                                                                               el.textContent.includes("Confirm") ||
                                                                                                               el.textContent.includes("Привязать кошелёк"));
  if (up.length != 0){
    up[0].click();
  }

}


function initializeScript() {

    connect()
    setTimeout(initializeScript, 7000);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    setTimeout(initializeScript, 5000);
}

