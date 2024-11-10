// ==UserScript==
// @name         Boinkers claim
// @version      0.6
// @author       IvanAgafonov
// @match        https://boink.astronomica.io/*
// @grant        none
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/boinkers.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/boinkers.user.js
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

  var up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("COLLECT") ||  el.textContent.includes("ПОЛУЧИТЬ"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3500, 4000));
  }

  for(var i = 0; i < 3; i++) {
    up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("10 min"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(3500, 4000));
    }

    up = Array.from(document.querySelectorAll("img[alt='close']"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(2000, 4000));
    }
  }

  // upgrade
  for(var i = 0; i < 3; i++) {
    up = Array.from(document.querySelectorAll(".gold-button-diagonal"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(1000, 2000));
    }
    up = Array.from(document.querySelectorAll("span div div span")).filter(el => el.textContent.includes("ALL"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(3500, 4000));
    }

    for(var j = 0; j < 3; j ++) {
      up = Array.from(document.querySelectorAll("img[alt='close']"));
      if (up.length != 0){
        up[0].click();
        await sleep(getRandomDelay(500, 1000));
      }
    }
    up = Array.from(document.querySelectorAll("button span span")).filter(el => el.textContent.includes("COLLECT") ||  el.textContent.includes("ПОЛУЧИТЬ"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(2000, 4000));
    }
    up = Array.from(document.querySelectorAll("button span div span")).filter(el => el.textContent.includes("BUILD") ||  el.textContent.includes("Качать"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(2000, 4000));
    }
  }

  // ALL upgrade
  up = Array.from(document.querySelectorAll(".gold-button-diagonal"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(1000, 2000));
    }

    // Tickets
    up = Array.from(document.querySelectorAll(".floating"));
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(5000, 6000));
      up = Array.from(document.querySelectorAll(".yellow-button-diagonal:not([disabled])"));
      if (up.length != 0){
       for (const item of up) {
        triggerEvents(item);
        await sleep(getRandomDelay(2000, 3000));
       }
      }
      history.back();
      await sleep(getRandomDelay(2000, 3000));
    }

    // Mail
    if (getRandomDelay(1000, 5000) < 2000) {
      up = Array.from(document.querySelectorAll("img[src='/assets/img/inbox_icon.png']"));
      if (up.length != 0){
        triggerEvents(up[0]);
        await sleep(getRandomDelay(5000, 6000));
        up = Array.from(document.querySelectorAll("button.main-button.mat-mdc-button.ng-star-inserted"));
        if (up.length != 0){
         for (const item of up) {
          triggerEvents(item);
          await sleep(getRandomDelay(2000, 3000));
         }
        }
        history.back();
        await sleep(getRandomDelay(2000, 3000));
      }
    }

  // spin
  up = Array.from(document.querySelectorAll("span span span")).filter(el => el.textContent.includes("SPIN") ||  el.textContent.includes("Спин"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(1000, 3000));
  }

  // spin
  while(true) {
    var spins = Array.from(document.querySelectorAll("span[class='main-label values-label'] span[class='ng-star-inserted']"));
    var x = Array.from(document.querySelectorAll("span[class='main-label shadow']"));
    if (spins.length != 0 && x.length != 0){
      await sleep(getRandomDelay(100, 1000));
      if (Number(spins[0].textContent.split("/")[0]) - Number(x[0].textContent.split("X")[1]) > 0) {
        console.log(Number(spins[0].textContent.split("/")[0]))
        console.log(Number(x[0].textContent.split("X")[1]))
      } else {
        break;
      }
    }


    up = Array.from(document.querySelectorAll("button span")).filter(el => el.textContent.includes("SPIN") ||  el.textContent.includes("СПИН"));
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
      await sleep(getRandomDelay(2000, 4000));
      up = Array.from(document.querySelectorAll("img[alt='next']"));
      if (up.length != 0){
        triggerEvents(up[0]);
        await sleep(getRandomDelay(2000, 4000));
      }
      up = Array.from(document.querySelectorAll("button span span")).filter(el => el.textContent.includes("COLLECT") || el.textContent.includes("ПОЛУЧИТЬ"));
      if (up.length != 0){
        triggerEvents(up[0]);
        await sleep(getRandomDelay(2000, 4000));
      }
    }
  }
  await sleep(getRandomDelay(1000, 2000));
  // daily bonus
  up = Array.from(document.querySelectorAll("img[alt='center']"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(2000, 4000));
    up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent == "SPIN ");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(6000, 7000));
    }
    history.back()
    await sleep(getRandomDelay(2000, 4000));
  }

  // EARN
  up = Array.from(document.querySelectorAll("span span span")).filter(el => el.textContent.includes("EARN") || el.textContent.includes("Профит"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(2000, 4000));
  }

  up = Array.from(document.querySelectorAll("app-rewarded-action"))
  var count = 0;

  shuffle(up);
  var up2;
  var up3;
  if (up.length != 0){
    for (const item of up) {

      up2 = Array.from(item.querySelectorAll("div div span[class='main-label']")).filter(el => !el.textContent.includes("24h after achievement") &&
                                                                     !el.textContent.includes("Watch an ad") &&
                                                                     !el.textContent.includes("Earn USDT in Angry Miner!") &&
                                                                     !el.textContent.includes("Join Hexacore and earn $AGO") &&
                                                                     !el.textContent.includes("Play Spell & Earn $MANA") &&
                                                                     !el.textContent.includes("Join News Channel") &&
                                                                     !el.textContent.includes("Notcoin Platinum Users") &&
                                                                     !el.textContent.includes("Play Not Bored Puppies") &&
                                                                     !el.textContent.includes("Play Diamore") &&
                                                                     !el.textContent.includes("Subscribe BIRDS Channel") &&
                                                                     !el.textContent.includes("Play Corn now!") &&
                                                                     !el.textContent.includes("Join News Channel") &&
                                                                     !el.textContent.includes("Merge to level 3 in Merge Pals") &&
                                                                     !el.textContent.includes("СМОТРИ рекламу") &&
                                                                     !el.textContent.includes("Ставь эмодзи") &&
                                                                     !el.textContent.includes("Animals and Coins participation bonus") &&
                                                                     !el.textContent.includes("Boost News Channel") &&
                                                                     !el.textContent.includes("Опубликуй историю в") &&
                                                                     !el.textContent.includes("Put emoji on the latest post every 8 hours") &&
                                                                      !el.textContent.includes("Share a Telegram Story & Forward it to @boinker_bot"));

      up3 = Array.from(item.querySelectorAll("span span")).filter(el => el.textContent.includes("CLAIMED") || el.textContent.includes("ПОЛУЧЕНО"));
      if (up3.length == 0){

        if (up2.length != 0){
          count += 1;
          up2 =  Array.from(item.querySelectorAll("button span")).filter(el => el.textContent.includes("VERIFY") || el.textContent.includes("ЧЕК"));
          if (up2.length != 0){
            up2[0].click();
            await sleep(getRandomDelay(2000, 4000));
          } else {
            up2 =  Array.from(item.querySelectorAll("button span")).filter(el => el.textContent.includes("GO") || el.textContent.includes("ГО"));
            if (up2.length != 0){
              up2[0].click();
              await sleep(getRandomDelay(13000, 20000));
            }
            up2 =  Array.from(item.querySelectorAll("button span")).filter(el => el.textContent.includes("CLAIM") || el.textContent.includes("ПОЛУЧИТЬ"));
            if (up2.length != 0){
              up2[0].click();
              await sleep(getRandomDelay(2000, 4000));
            }
            up2 =  Array.from(item.querySelectorAll("button span")).filter(el => el.textContent.includes("VERIFY") || el.textContent.includes("ЧЕК"));
            if (up2.length != 0){
              up2[0].click();
              await sleep(getRandomDelay(2000, 4000));
            }
          }
        }
      }
      if (count >= 20){
        break;
      }
    }
  }



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
