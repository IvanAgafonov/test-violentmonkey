// ==UserScript==
// @name         linea_swap
// @version      0.11
// @author       IvanAgafonov
// @match        https://linea.build/hub/tokens/swap
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/linea_swap.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/linea_swap.user.js
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

  // document.location.replace("https://linea.build/hub/tokens/swap?fromAmount=0.0000101255&fromChain=59144&fromToken=0x0000000000000000000000000000000000000000&toChain=59144&toToken=0x176211869cA2b568f2A7D4EE941E073a821EE1ff")

  // https://linea.build/hub/tokens/swap?fromAmount=0.0000101255&fromChain=59144&fromToken=0x0000000000000000000000000000000000000000&toChain=59144&toToken=0x176211869cA2b568f2A7D4EE941E073a821EE1ff
  // https://linea.build/hub/tokens/swap?fromAmount=0.0000111265&fromChain=59144&fromToken=0x0000000000000000000000000000000000000000&toChain=59144&toToken=0xA219439258ca9da29E9Cc4cE5596924745e12B93
  // https://linea.build/hub/tokens/swap?fromAmount=0.0000101255&fromChain=59144&fromToken=0x0000000000000000000000000000000000000000&toChain=59144&toToken=0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f

  // var up = Array.from(document.querySelectorAll("path[d='M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6']"))
  // if (up.length != 0){
  //   triggerEvents(up[0]);
  //   await sleep(getRandomDelay(3000, 4000));
  // }

  var up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent.includes("Review swap"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent.includes("Start swapping"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent.includes("Continue"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent.includes("Continue"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(1200, 1500));
  }


//   up = querySelectorAllShadows('button span').filter(el => el.textContent.includes("Spin the wheel"));
//   if (up.length != 0){
//     triggerEvents(up[0]);
//     await sleep(getRandomDelay(3000, 4000));
//   }

//   up = querySelectorAllShadows('button span').filter(el => el.textContent.includes("Spin the wheel"));
//   if (up.length > 1){
//     triggerEvents(up[1]);
//     await sleep(getRandomDelay(26000, 26010));
//   }

//   up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent.includes("prizes"));
//   if (up.length != 0){
//     if (up.textContent != "0 prizes") {
//       try{
//           await fetch("http://127.0.0.1:5000/linea_prize?profile_number=" + profile_number);
//         } catch (error) {}
//     }
//   }

//   up = querySelectorAllShadows('wui-text').filter(el => el.textContent.includes("Rabby Wallet"));
//   console.log(up);
//   if (up.length != 0){
//     triggerEvents(up[0]);
//     up[0].click();
//     await sleep(getRandomDelay(18000, 18100));
//   }

//   var up = Array.from(document.querySelectorAll("path[d=' M43,-20 C43,-20 43,51 43,51 C43,51 -20,51 -20,51 C-20,51 -20,-20 -20,-20 C-20,-20 43,-20 43,-20z']"));
//   if (up.length != 0){
//     triggerEvents(up[0]);
//     await sleep(getRandomDelay(3000, 4000));
//   }

}

function is_reload() {
  var tokens = ['0xA219439258ca9da29E9Cc4cE5596924745e12B93', '0x176211869cA2b568f2A7D4EE941E073a821EE1ff', '0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f']
  shuffle(tokens);
  var amount = Math.round((0.0000131265 + getRandomDelay(1, 3601)/1000000000) * 1000000000) / 1000000000

  if (document.URL == 'https://linea.build/hub/tokens/swap') {
    // console.log("https://linea.build/hub/tokens/swap?fromAmount=" + amount + "&fromChain=59144&fromToken=0x0000000000000000000000000000000000000000&toChain=59144&toToken=" + tokens[0])
    document.location.replace("https://linea.build/hub/tokens/swap?fromAmount=" + amount + "&fromChain=59144&fromToken=0x0000000000000000000000000000000000000000&toChain=59144&toToken=" + tokens[0])
  }
  // var up = Array.from(document.querySelectorAll("h1")).filter(el => el.textContent == "Spin to Win")
  // if (up.length == 0){
  //   location.reload();
  // }
}


function initializeScript() {

    console.log('START claim  ')

    setTimeout(is_reload, getRandomDelay(4000, 5000));
    setTimeout(autoBuy, getRandomDelay(20000, 24050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
