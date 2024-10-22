// ==UserScript==
// @name         Boinkers claim
// @version      0.0
// @author       ivan
// @match        https://boink.astronomica.io/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/IvanAgafonov/test-violentmonkey/refs/heads/main/boinkers.js
// @updateURL    https://raw.githubusercontent.com/IvanAgafonov/test-violentmonkey/refs/heads/main/boinkers.js
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

async function autoBuy() {

  var up = Array.from(document.querySelectorAll("div div div")).filter(el => el.textContent.includes("free"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(2000, 4000));
  }

  up = Array.from(document.querySelectorAll("img[alt='close']"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(2000, 4000));
  }

  up = Array.from(document.querySelectorAll("img[alt='close']"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(2000, 4000));
  }

  // upgrade
  for(var i = 0; i < 7; i++) {
    up = Array.from(document.querySelectorAll(".gold-button-diagonal"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(1000, 2000));
    }
    for(var j = 0; j < 3; j ++) {
      up = Array.from(document.querySelectorAll("img[alt='close']"));
      if (up.length != 0){
        up[0].click();
        await sleep(getRandomDelay(1000, 2000));
      }
    }
    up = Array.from(document.querySelectorAll("button span span")).filter(el => el.textContent.includes("COLLECT"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(2000, 4000));
    }
    up = Array.from(document.querySelectorAll("button span div span")).filter(el => el.textContent.includes("BUILD"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(2000, 4000));
    }
  }

  // spin
  up = Array.from(document.querySelectorAll("span span span")).filter(el => el.textContent.includes("SPIN"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(1000, 3000));
  }

  // spin
  for(var i = 0; i < 16; i++) {
    up = Array.from(document.querySelectorAll("button span")).filter(el => el.textContent.includes("SPIN"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(2000, 4000));
    }
    up = Array.from(document.querySelectorAll("img[alt='close']"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(2000, 4000));
    }

    up = Array.from(document.querySelectorAll("img[alt='target x']"));
    if (up.length > 3){
      for(var j = 0; j < 4; j ++) {
        up[j].click();
        await sleep(getRandomDelay(3000, 4000));
      }
      up = Array.from(document.querySelectorAll("img[alt='next']"));
      if (up.length != 0){
        up[0].click();
        await sleep(getRandomDelay(2000, 4000));
      }
    }
  }

  // daily bonus
  up = Array.from(document.querySelectorAll("img[alt='center']"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(2000, 4000));
    up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("SPIN"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(6000, 7000));
    }
    history.back()
    await sleep(getRandomDelay(2000, 4000));
  }

//   // EARN
//   up = Array.from(document.querySelectorAll("span span span")).filter(el => el.textContent.includes("EARN"));
//   if (up.length != 0){
//     up[0].click();
//     await sleep(getRandomDelay(2000, 4000));
//   }

//   up = Array.from(document.querySelectorAll("app-rewarded-action"))

//   shuffle(up);
//   var up2;
//   var up3;
//   if (up.length != 0){
//     for (const item of up) {
//       up2 = Array.from(item.querySelectorAll("div div span")).filter(el =>
//                                                                         el.textContent.includes("Follow Boinkers") ||
//                                                                         el.textContent.includes("Like + Comment + Retweet - verify after 10 minutes") ||
//                                                                         el.textContent.includes("Like X Post - verify after 10 minutes") ||
//                                                                         el.textContent.includes("Watch & like Youtube short") ||
//                                                                         el.textContent.includes("Follow Major on Instagram") ||
//                                                                         el.textContent.includes("FadeWallet") ||
//                                                                     el.textContent.includes("Follow Major in Telegram"));
//       up3 = Array.from(item.querySelectorAll("span span")).filter(el => el.textContent.includes("CLAIMED"));
//       if (up3.length == 0){
//         if (up2.length != 0){
//           up2 =  Array.from(item.querySelectorAll("button span")).filter(el => el.textContent.includes("GO"));
//           if (up2.length != 0){
//             up2[0].click();
//             await sleep(getRandomDelay(2000, 4000));
//           }
//           up2 =  Array.from(item.querySelectorAll("button span")).filter(el => el.textContent.includes("VERIFY"));
//           if (up2.length != 0){
//             up2[0].click();
//             await sleep(getRandomDelay(2000, 4000));
//           }
//         }
//       }
//     }
//   }



  await sleep(3400);
}


function initializeScript() {

    console.log('START Boinkers claim')

    setTimeout(autoBuy, getRandomDelay(14000, 17500));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
