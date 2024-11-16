// ==UserScript==
// @name         Major claim
// @version      0.4
// @author       IvanAgafonov
// @match        https://major.bot/*
// @grant        none
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/major.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/major.user.js
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

  var up = Array.from(document.querySelectorAll("div button span")).filter(el => el.textContent.includes("Take Bonus"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(1000, 2000));
  }

  // Squad
  up = Array.from(document.querySelectorAll("span div span")).filter(el => el.textContent.includes("Join Squad"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(1000, 2000));
      up = Array.from(document.querySelectorAll(".custom-container.items-center"));
      shuffle(up);
      if (up.length != 0){
        up[0].click();
        await sleep(getRandomDelay(1000, 2000));
        up = Array.from(document.querySelectorAll("div button span")).filter(el => el.textContent.includes("Join Squad"));
        if (up.length != 0){
          up[0].click();
          await sleep(getRandomDelay(1000, 2000));
        }
      }
  }

  // profile
  up = Array.from(document.querySelectorAll("a div span")).filter(el => el.textContent.includes("Profile"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("div:nth-child(7) div:nth-child(2)"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("input:nth-child(1)"));
  if (up.length != 0){
    up[0].click();
    up[0].setAttribute('value', 't');
    // up[0].value = 't';
    up[0].dispatchEvent(new Event('input', { bubbles: true }));
    await sleep(getRandomDelay(1000, 2000));
  }
    up = Array.from(document.querySelectorAll("input:nth-child(2)"));
  if (up.length != 0){
    up[0].click();
    up[0].setAttribute('value', 'o');
    // up[0].value = 'o';
    up[0].dispatchEvent(new Event('input', { bubbles: true }));
    await sleep(getRandomDelay(1000, 2000));
  }
    up = Array.from(document.querySelectorAll("input:nth-child(3)"));
  if (up.length != 0){
    up[0].click();
    up[0].setAttribute('value', 'n');
    // up[0].value = 'n';
    up[0].dispatchEvent(new Event('input', { bubbles: true }));
    await sleep(getRandomDelay(1000, 2000));
  }
  up = Array.from(document.querySelectorAll("div div span")).filter(el => el.textContent.includes("Collect"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  // Games
  up = Array.from(document.querySelectorAll("a div span")).filter(el => el.textContent.includes("Games"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("div div span")).filter(el => el.textContent.includes("Roulette"));
  if (up.length > 0){
    up = Array.from(up[0].parentElement.parentElement.parentElement.querySelectorAll("div button")).filter(el => el.textContent.includes("Play"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(2000, 3000));

        up = Array.from(document.querySelectorAll("div button span")).filter(el => el.textContent.includes("Tap to Spin"));
        if (up.length > 0){
          up[0].click();
          await sleep(getRandomDelay(16000, 19000));
        }
        up = Array.from(document.querySelectorAll("div button span")).filter(el => el.textContent.includes("Activate bonus"));
        if (up.length > 0){
          up[0].click();
          await sleep(getRandomDelay(2000, 3000));
          history.back()
          await sleep(getRandomDelay(1000, 2000));
        }
        const activeColor = document.evaluate('(//*[local-name() = "path"][@d="M1.17282 12C0.514893 12 0 11.4702 0 10.8115C0 10.4964 0.114414 10.1957 0.343257 9.98084L4.3051 5.99999L0.343257 2.0334C0.114414 1.8043 0 1.51789 0 1.20286C0 0.529821 0.514893 0.0286375 1.17282 0.0286375C1.50178 0.0286375 1.75923 0.143189 1.98807 0.357995L5.97852 4.3389L9.99761 0.343668C10.2407 0.100239 10.4982 0 10.8128 0C11.4707 0 12 0.515509 12 1.17422C12 1.50358 11.8998 1.76133 11.6423 2.01909L7.66626 5.99999L11.6281 9.96661C11.8713 10.1814 11.9856 10.482 11.9856 10.8115C11.9856 11.4702 11.4565 12 10.7842 12C10.4553 12 10.1549 11.8855 9.94034 11.6563L5.97852 7.67544L2.03097 11.6563C1.80214 11.8855 1.50178 12 1.17282 12Z"])[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (activeColor) {
            activeColor.parentElement.parentElement.click();
            await sleep(getRandomDelay(2000, 3000));
        }
    }
  }

  // Earn
  up = Array.from(document.querySelectorAll("a div span")).filter(el => el.textContent.includes("earn"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(1000, 2000));
  }

  up = Array.from(document.querySelectorAll("div div span")).filter(el =>
                                                                    el.textContent.includes("RentTycoon") ||
                                                                    el.textContent.includes("Watch YouTube Shorts") ||
                                                                    el.textContent.includes("TON Channels") ||
                                                                    el.textContent.includes("Share in Telegram Stories") ||
                                                                    el.textContent.includes("Follow Major on Instagram") ||
                                                                    el.textContent.includes("Follow Major in Telegram"));
  shuffle(up);
  var up2;
  if (up.length != 0){
    for (const item of up) {
      item.click();
      await sleep(getRandomDelay(1000, 2000));
      up2 = Array.from(document.querySelectorAll(".tg-button-bg.justify-center.undefined"));
      if (up2.length != 0){
        up2[0].click();
        await sleep(getRandomDelay(4000, 6000));
        up2 = Array.from(document.querySelectorAll(".button-bg-opacity"));
        if (up2.length != 0){
          up2[0].click();
          await sleep(getRandomDelay(1000, 2000));
        }
      }
    }
  }



  await sleep(3400);
}


function initializeScript() {

    console.log('START Major claim')

    setTimeout(autoBuy, getRandomDelay(14000, 17500));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
