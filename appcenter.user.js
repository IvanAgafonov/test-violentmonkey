// ==UserScript==
// @name         Appcenter claim
// @version      0.32
// @author       IvanAgafonov
// @match        https://tappscenter.org/*
// @grant        none
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/appcenter.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/appcenter.user.js
// @homepage     https://github.com/IvanAgafonov/test-violentmonkey
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

async function autoBuy() {


  var up = Array.from(document.querySelectorAll("h1")).filter(el => el.textContent.includes("Complete day") || el.textContent.includes("Серия") ||  el.textContent.includes("days streak"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(6000, 8000));
  }

    if (getRandomDelay(1000, 4000) > 3000) {
      up = Array.from(document.querySelectorAll("h4")).filter(el => el.textContent == "Connected Wallet");
      if (up.length == 0){
        up = Array.from(document.querySelectorAll("h4")).filter(el => el.textContent == "Connect your Wallet");
        if (up.length != 0){
          triggerEvents(up[0]);
          await sleep(getRandomDelay(3000, 4000));
        }
        await connectWallet();
      }
    }

  up = Array.from(document.querySelectorAll("a[href='/twa/streaks']"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(6000, 8000));
  }


    up = Array.from(document.querySelectorAll("div button span")).filter(el => el.textContent == "Open" || el.textContent == "Открыть");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(3000, 4000));
    }

    up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent.includes("Save") || el.textContent.includes("save") || el.textContent.includes("Сохранить") ||  el.textContent.includes("сохранить"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(3000, 4000));
    }

    up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent.includes("Start over") || el.textContent == "Начать ");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(3000, 4000));
    }

    up = Array.from(document.querySelectorAll("div button span")).filter(el => el.textContent == "Open" || el.textContent == "Открыть" );
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(3000, 4000));
    }

    up = Array.from(document.querySelectorAll("button span p")).filter(el => el.textContent == "Check Progress" || el.textContent.includes("Проверить"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(3000, 4000));
    }



//     up = Array.from(document.querySelectorAll("div div h4")).filter(el => el.textContent == "Pocket");
//     if (up.length != 0){
//       triggerEvents(up[0]);
//       await sleep(getRandomDelay(3000, 4000));
//     }

//     up = Array.from(document.querySelectorAll("button span")).filter(el => el.textContent == "50 points");
//     if (up.length != 0){
//       triggerEvents(up[0]);
//       await sleep(getRandomDelay(500, 700));
//     }

//     for(var i=0;i<30;i++){
//       up = Array.from(document.querySelectorAll("path[d='M10.0017 17.1431C9.60719 17.1431 9.28739 16.8233 9.28739 16.4288V10.7145L3.5731 10.7145C3.17861 10.7145 2.85882 10.3947 2.85882 10.0002C2.85882 9.60572 3.17861 9.28592 3.5731 9.28592L9.28739 9.28592L9.28739 3.57164C9.28739 3.17715 9.60719 2.85735 10.0017 2.85735C10.3962 2.85735 10.716 3.17715 10.716 3.57164L10.716 9.28592H16.4302C16.8247 9.28592 17.1445 9.60572 17.1445 10.0002C17.1445 10.3947 16.8247 10.7145 16.4302 10.7145H10.716V16.4288C10.716 16.8233 10.3962 17.1431 10.0017 17.1431Z']"));
//       if (up.length != 0){
//         triggerEvents(up[0]);
//       }
//       await sleep(getRandomDelay(1, 10));
//     }


}


function initializeScript() {

    console.log('START appcenter claim')

    setTimeout(autoBuy, getRandomDelay(18000, 20050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
