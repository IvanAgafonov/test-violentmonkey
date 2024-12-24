// ==UserScript==
// @name         Paws claim
// @version      0.66
// @author       IvanAgafonov
// @match        https://app.paws.community/*
// @grant        none
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/paws.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/paws.user.js
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


  console.stdlog = console.log.bind(console);
  console.logs = [];
  console.log = function(){
      console.logs.push(Array.from(arguments));
      console.stdlog.apply(console, arguments);
  }

  up = Array.from(document.querySelectorAll("div div div")).filter(el => el.textContent == "PAWSMAS");
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(4000, 7000));
  }

  up = Array.from(document.querySelectorAll("div.main-info div.icon-con"));
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(4000, 7000));
  }


  var up = Array.from(document.querySelectorAll("div div div")).filter(el => el.textContent == "Earn");
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(4000, 7000));
  } else {
    location.reload();
    await sleep(getRandomDelay(12000, 13050));
    await autoBuy();
    return;
  }

  var names = ['Limited', 'In-game', 'Partners'];

  for(const name of names){

    up = Array.from(document.querySelectorAll("div[class='type-item']")).filter(el => el.textContent.includes(name));
    if (up.length != 0){
      triggerEvents(up[0]);
      // up[0].click();
      await sleep(getRandomDelay(3000, 4000));
    }

    var up3 = Array.from(document.querySelectorAll("div.heart-quest div.main-info div.icon-con"));
    if (up3.length != 0){
      triggerEvents(up3[0].childNodes[0]);
      await sleep(getRandomDelay(3000, 4000));
    }

    up = Array.from(document.querySelectorAll("div div div")).filter(el => el.textContent.includes("Start") && el.className.includes("start-btn"));
    if (up.length != 0){
      for (const item of up) {
        var exclude = Array.from(item.parentElement.parentElement.querySelectorAll("div div")).filter(el => el.textContent == "Boost PAWS channel" || el.textContent.includes("Claim Y points") || el.textContent == "Start mining Fomohash" || el.textContent ==  "Add PAWS emoji");
        if (exclude.length != 0) {
          continue;
        }
        triggerEvents(item);
        await sleep(getRandomDelay(2000, 5000));
        var up2 = Array.from(document.querySelectorAll("div div div")).filter(el => el.textContent == "Send message");
        if (up2.length != 0){
          triggerEvents(up2[0]);
          await sleep(getRandomDelay(2000, 4000));
          var link = console.logs[console.logs.length-1]
          try {
            const response = await fetch("http://127.0.0.1:5000/" + link[2].path_full.split("&text")[0].split("startapp=")[1]);
          }
          catch (e) {}
        }
        up2 = Array.from(document.querySelectorAll("button div div")).filter(el => el.textContent.includes("Wallet On"))
        if (up2.length != 0){
          triggerEvents(up2[0]);
          await sleep(getRandomDelay(2000, 2100));
          up2 = Array.from(document.querySelectorAll("div div button")).filter(el => el.textContent.includes("Open Wallet in Telegram"))
          if (up2.length != 0){
            triggerEvents(up2[0]);
            await sleep(getRandomDelay(20000, 21000));
          }
        }
        await sleep(getRandomDelay(1000, 4000));
      }
    }


    up = Array.from(document.querySelectorAll("div div div")).filter(el => el.textContent == "Check" || el.textContent == "Tap" || el.textContent == "Go");
    if (up.length != 0){
      for (const item of up) {
        triggerEvents(item);
        // item.click();
        await sleep(getRandomDelay(1000, 2000));
      }
    }
    up = Array.from(document.querySelectorAll("div div div")).filter(el => el.textContent == "Claim");
    if (up.length != 0){
      for (const item of up) {
        triggerEvents(item);
        // item.click();
        await sleep(getRandomDelay(1000, 2000));
      }
    }
  }
}


function initializeScript() {

    console.log('START paws claim')

    setTimeout(autoBuy, getRandomDelay(12000, 13050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
