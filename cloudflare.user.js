// ==UserScript==
// @name         cloudflare
// @version      0.1
// @author       IvanAgafonov
// @match        https://testnet.monad.xyz/
// @match        https://app.layer3.xyz/quests
// @match        https://layer3.xyz/quests
// @match        https://solana.layer3.xyz/quests
// @match        https://app.nodepay.ai/login
// @match        https://app.nodepay.ai/dashboard
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/cloudflare.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/cloudflare.user.js
// @homepage     https://github.com/IvanAgafonov/test-violentmonkey
// @grant        none
// @run-at document-start
// ==/UserScript==



async function autoBuy() {

  // var up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent.includes("Connect Wallet"));
  // if (up.length != 0){
  //   triggerEvents(up[0]);
  //   await sleep(getRandomDelay(2000, 3100));



const i = setInterval(()=>{
  if (window.turnstile)
   {
  console.log('success!!')
  clearInterval(i)
       window.turnstile.render = (a,b) => {
        let params = {
              sitekey: b.sitekey,
              pageurl: window.location.href,
              data: b.cData,
              pagedata: b.chlPageData,
              action: b.action,
              userAgent: navigator.userAgent,
              json: 1
          };
          console.log('intercepted-params:' + JSON.stringify(params));
          window.cfCallback = b.callback;}
  }
  },10)

  // var up = querySelectorAllShadows('input'); // all `td`s in body
  // console.log(up);
  // if (up.length != 0) {
  //   triggerEvents(up[1]);
  //   up[1].click();
  //   await sleep(getRandomDelay(4000, 4100));
  // }
  // }

  // var up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent.includes("CLAIM"));
  // if (up.length != 0){
  //   triggerEvents(up[0]);
  //   await sleep(getRandomDelay(6000, 7100));
  // }

}
autoBuy();
autoBuy();
autoBuy();
autoBuy();
autoBuy();
autoBuy();
autoBuy();
autoBuy();
autoBuy();
autoBuy();
autoBuy();
autoBuy();

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




function initializeScript() {

    console.log('START claim ')
    autoBuy();
    for(var j=0; j < 1300;j++) {
      setTimeout(autoBuy, getRandomDelay(5*j, 6*j));
    }
}
autoBuy();
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
