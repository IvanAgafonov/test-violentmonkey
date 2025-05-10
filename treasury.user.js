// ==UserScript==
// @name         treasury
// @version      0.52
// @author       IvanAgafonov
// @match        https://cdn.thetreasury.io/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/treasury.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/treasury.user.js
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


  var up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent == "Connect wallet" );
  if (up.length != 0){
    triggerEvents(up[0]);
    // up[0].click();
    await sleep(getRandomDelay(2000, 3000));
    await connectWallet();
  }

  // up = Array.from(document.querySelectorAll("div[id='ducks']"));
  // if (up.length != 0){
  //   triggerEvents(up[0]);
  //   await sleep(getRandomDelay(2000, 3000));
  // }

  up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Knock to continue");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(17000, 18000));
    up = Array.from(document.querySelectorAll("button div div")).filter(el => el.textContent.includes("Claim"));
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(3000, 4000));
    }
  }

  up = Array.from(document.querySelectorAll("img[src='/icons/giveaway/beta.svg']"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Take part");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(2000, 3000));
  }

  up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Take part");
  if (up.length > 1){
    triggerEvents(up[1]);
    await sleep(getRandomDelay(2000, 3000));
  }

  up = Array.from(document.querySelectorAll("img[src='/icons/giveaway/gift_box_white.svg']"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(3000, 4000));
    up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == " You don't have any gifts yet");
    if (up.length == 0){
      try{
        await fetch("http://127.0.0.1:5000/treasury?address=" + evm_addr);
      } catch (error) {}
    }
  }

  up = Array.from(document.querySelectorAll("img[src='/icons/tabs/tasks.svg']"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(2000, 3000));
  }

  up = Array.from(document.querySelectorAll("p")).filter(el => el.textContent == "Start");
  shuffle(up);
  if (up.length > 4){
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }
  }

  up = Array.from(document.querySelectorAll("button p")).filter(el => el.textContent.includes("Claim"));
  shuffle(up);
  for (const item of up) {
    triggerEvents(item);
    await sleep(getRandomDelay(2000, 3000));
  }

  up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Activities");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(2000, 3000));
  }


  up = Array.from(document.querySelectorAll("p")).filter(el => el.textContent == "Start");
  // shuffle(up);
  for (const item of up) {
    triggerEvents(item);
    await sleep(getRandomDelay(2000, 3000));

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/mouse.png']"));
    if (up.length == 2){
      mytext = "CHEESE";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/kitchen_day_6.png']"));
    if (up.length == 2){
      mytext = "NFT";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/ton_garage_quest_icon_3.png']"));
    if (up.length == 2){
      mytext = "Ton";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/veranda_quest_icon_1.png']"));
    if (up.length == 2){
      mytext = "loyal";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/veranda_quest_icon_0.png']"));
    if (up.length == 2){
      mytext = "cosy";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/basement_icon_day_3.png']"));
    if (up.length == 2){
      mytext = "Man in black";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/icon_day_5.png']"));
    if (up.length == 2){
      mytext = "Balloon";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/Bathroom_icon_5.png']"));
    if (up.length == 2){
      mytext = "ICE";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/ton_garage_quest_icon_0.png']"));
    if (up.length == 2){
      mytext = "rocket";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/gym_quest_icon_2.png']"));
    if (up.length == 2){
      mytext = "stamina";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/basement_icon_day2.png']"));
    if (up.length == 2){
      mytext = "42";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/gym_quest_icon_3.png']"));
    if (up.length == 2){
      mytext = "HLS";
    }


    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/Bathroom_icon_1.png']"));
    if (up.length == 2){
      mytext = "STEAM";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/Bathroom_icon_3.png']"));
    if (up.length == 2){
      mytext = "IVY";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/Bathroom_icon_4.png']"));
    if (up.length == 2){
      mytext = "FIRE";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/ton_garage_quest_icon_6.png']"));
    if (up.length == 2){
      mytext = "Cash";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/basement_icon_day1.png']"));
    if (up.length == 2){
      mytext = "TMNT";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/gym_quest_icon_5.png']"));
    if (up.length == 2){
      mytext = "MIGHT";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/Bathroom_icon_0.png']"));
    if (up.length == 2){
      mytext = "Bomb";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/basement_icon_day_4.png']"));
    if (up.length == 2){
      mytext = "Joker";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/gym_quest_icon_4.png']"));
    if (up.length == 2){
      mytext = "speed";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/basement_icon_day_6.png']"));
    if (up.length == 2){
      mytext = "Rainman";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/kitchen_day_6.png']"));
    if (up.length == 2){
      mytext = "NFT";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/enter_code_quest_icon.png']"));
    if (up.length == 2){
      mytext = "0101";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/enter_code_quest_icon2.png']"));
    if (up.length == 2){
      mytext = "just do it";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/icon_tg.png']"));
    if (up.length == 2){
      mytext = "Narrator";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/living_room_day_2.png']"));
    if (up.length == 3){
      mytext = "Hello";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/living_room_day_3.png']"));
    if (up.length == 2){
      mytext = "112";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/living_room_day_4.png']"));
    if (up.length == 2){
      mytext = "AAA";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/sponge.png']"));
    if (up.length == 2){
      mytext = "911";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/icon_activities_duck_quest_day12.png']"));
    if (up.length == 2){
      mytext = "I love ducks";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/kitchen_lamp.png']"));
    if (up.length == 2){
      mytext = "ion";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/kitchen_day_2.png']"));
    if (up.length == 2){
      mytext = "116";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/player.png']"));
    if (up.length == 2){
      mytext = "mozart";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/wallpaper.png']"));
    if (up.length == 2){
      mytext = "5783";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/key.png']"));
    if (up.length == 2){
      mytext = "6699";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/durone.png']"));
    if (up.length == 2){
      mytext = "Du rove";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/watch_icon.png']"));
    if (up.length == 2){
      mytext = "1455";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/strawberry.png']"));
    if (up.length == 2){
      mytext = "3392";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/Icon knok.png']"));
    if (up.length == 2){
      mytext = "2703";
    }

    up = Array.from(document.querySelectorAll("img[src='/images/icons/social/Icon knok.png']"));
    if (up.length == 2){
      mytext = "2703";
    }

    var verify = document.querySelector("input[placeholder='Type code here']")
    if (verify) {
      verify.click();
      // verify.value = "Du rove"
      verify.setAttribute('value', mytext);

      verify.dispatchEvent(new Event('input', { bubbles: true }));
      verify.dispatchEvent(new Event('change'));
      await sleep(getRandomDelay(2000, 3000));
      up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Check");
      if (up.length != 0){
        triggerEvents(up[0]);
        await sleep(getRandomDelay(2000, 3000));
      }
      up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent.includes("Continue") && el.className.includes("modalButton"));
      if (up.length != 0){
        triggerEvents(up[0]);
        await sleep(getRandomDelay(2000, 3000));
      }
      up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent.includes("Claim") && el.className.includes("modalButton"));
      if (up.length != 0){
        triggerEvents(up[0]);
        await sleep(getRandomDelay(2000, 3000));
      }
    }


    up = Array.from(document.querySelectorAll("button p")).filter(el => el.textContent.includes("Claim"));
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(2000, 3000));
    }
    up = Array.from(document.querySelectorAll("button p")).filter(el => el.textContent.includes("Claim"));
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(2000, 3000));
    }
    up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Share story +");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(12000, 13000));
    }
    up = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Claim +");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(2000, 2100));
    }
    await sleep(getRandomDelay(1000, 2000));
  }
    up = Array.from(document.querySelectorAll("button div div")).filter(el => el.textContent.includes("Claim"));
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(3000, 4000));
    }
    up = Array.from(document.querySelectorAll("button p")).filter(el => el.textContent.includes("Claim"));
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(3000, 4000));
    }
    up = Array.from(document.querySelectorAll("button p")).filter(el => el.textContent.includes("Claim"));
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(2000, 3000));
    }


  up = Array.from(document.querySelectorAll("button")).filter(el => el.textContent == "Partners");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(2000, 3000));
  }


  up = Array.from(document.querySelectorAll("p")).filter(el => el.textContent == "Start");
  shuffle(up);
  for (const item of up) {
    triggerEvents(item);
    await sleep(getRandomDelay(2000, 3000));
  }

  up = Array.from(document.querySelectorAll("button p")).filter(el => el.textContent.includes("Claim"));
  for (const item of up) {
    triggerEvents(item);
    await sleep(getRandomDelay(5000, 6000));
  }

  up = Array.from(document.querySelectorAll("button p")).filter(el => el.textContent.includes("Claim"));
  for (const item of up) {
    triggerEvents(item);
    await sleep(getRandomDelay(5000, 6000));
  }

}


function initializeScript() {

    console.log('START claim         ')

    setTimeout(autoBuy, getRandomDelay(19900, 20950));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
