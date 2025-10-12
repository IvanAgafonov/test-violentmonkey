// ==UserScript==
// @name         Gemswall
// @version      0.18
// @author       IvanAgafonov
// @match        https://app.gleam.bot/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/gemswall.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/gemswall.user.js
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

async function autoBuy() {

  console.stdlog = console.log.bind(console);
  console.logs = [];
  console.log = function(){
      console.logs.push(Array.from(arguments));
      console.stdlog.apply(console, arguments);
  }


  var up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Claim gifts");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(4000, 5000));
  }

  up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Connect TON Wallet");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(4000, 5000));
    await connectWallet();
  }

  up = Array.from(document.querySelectorAll("div.text-subhead-2-600"));
  if (up.length != 0){
    if (up[0].textContent != "0") {
      try{
        await fetch("http://127.0.0.1:5000/gemswall_balance_above_0?profile_number=" + profile_number);
      } catch (error) {}
    }
  }


  up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Participants:");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(4000, 5000));
  }

  up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Go");
  shuffle(up);
  for (const item of up) {
    console.log(item);
    triggerEvents(item);
    await sleep(getRandomDelay(2000, 3000));
    up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Start quest");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(12000, 12100));
    }
    up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Check completion");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(8000, 8100));
    }
    up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Claim rewards");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(2000, 3100));
    }
    up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Close");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(2000, 3100));
    }
    up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Claim" && el.className.includes("text-black text-body-1-500"));
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 1100));
    }

    // try{
    //   await fetch("http://127.0.0.1:5000/gemswall?link=" + console.logs[console.logs.length-1]['url'] + "&address=" + evm_addr);
    // } catch (error) {}
  }

  await sleep(getRandomDelay(2000, 3100));

  up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Claim");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(2000, 3100));
  }


  up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Completed");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(4000, 5000));
  }

  up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Participants:");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(4000, 5000));
  }

  await sleep(getRandomDelay(2000, 3100));

  up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Claim" && el.className.includes("text-black text-body-1-500"));
  for (const item of up) {
    triggerEvents(item);
    await sleep(getRandomDelay(2000, 3100));
  }

//   up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Participants:");
//   if (up.length != 0){
//     triggerEvents(up[1]);
//     await sleep(getRandomDelay(4000, 5000));
//   }

//   await sleep(getRandomDelay(2000, 3100));

//   up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Claim" && el.className.includes("text-black text-body-1-500"));
//   for (const item of up) {
//     triggerEvents(item);
//     await sleep(getRandomDelay(2000, 3100));
//   }


  // up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Claim SBT");
  // if (up.length != 0){
  //   triggerEvents(up[0]);
  //   await sleep(getRandomDelay(2000, 3100));
  //   try{
  //     await fetch("http://127.0.0.1:5000/gemswall?link=" + console.logs[console.logs.length-1]['2']['url'] + "&profile_number=" + profile_number);
  //   } catch (error) {}
  // }


//   up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Claim" && el.className.includes("text-black text-body-1-500"));
//   if (up.length != 0){
//     triggerEvents(up[0]);
//     await sleep(getRandomDelay(2000, 3100));
//   }

//   up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Quests");
//   if (up.length != 0){
//     triggerEvents(up[0]);
//     await sleep(getRandomDelay(3000, 4000));
//   }

//   up = Array.from(document.querySelectorAll("button span")).filter(el => el.textContent == "Go");
//   shuffle(up);
//   for (const item of up) {
//     console.log(item);
//     triggerEvents(item);
//     await sleep(getRandomDelay(4000, 5000));
//   }


  // up = Array.from(document.querySelectorAll("button span")).filter(el => el.textContent == "Check");
  // shuffle(up);
  // for (const item of up) {
  //   console.log(item);
  //   triggerEvents(item);
  //   await sleep(getRandomDelay(4000, 5000));
  // }


  // up = Array.from(document.querySelectorAll("button span")).filter(el => el.textContent == "Claim");
  // shuffle(up);
  // for (const item of up) {
  //   console.log(item);
  //   triggerEvents(item);
  //   await sleep(getRandomDelay(4000, 5000));
  // }

  up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Profile");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("div div")).filter(el => el.textContent == "Claimable" && el.className.includes("text-xs font-medium"));
  shuffle(up);
  for (const item of up) {
    triggerEvents(item);
    await sleep(getRandomDelay(2000, 2100));
    var up2 = Array.from(document.querySelectorAll("path[d='M6 18 18 6M6 6l12 12']"));
    if (up2.length != 0){
      triggerEvents(up2[0]);
      await sleep(getRandomDelay(1000, 2000));
    }
  }

  up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Prizes");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }

  for(var i=0;i<20;i++) {
    up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Open GemBox");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(11000, 12000));
    }

    up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Continue");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(2000, 3000));
    }
    await sleep(getRandomDelay(1000, 2000));
  }




  // up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Profile");
  // if (up.length != 0){
  //   triggerEvents(up[0]);
  //   await sleep(getRandomDelay(3000, 4000));
  // }

  // up = Array.from(document.querySelectorAll("div div")).filter(el => el.textContent == "Claimable");
  // if (up.length != 0){
  //   triggerEvents(up[0]);
  //   await sleep(getRandomDelay(8000, 10000));
  // }

  // up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Claim");
  // if (up.length != 0){
  //   triggerEvents(up[0]);
  //   await sleep(getRandomDelay(8000, 10000));
  // }

}


function initializeScript() {

    console.log('START gemswall claim')

    setTimeout(autoBuy, getRandomDelay(7000, 10050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
