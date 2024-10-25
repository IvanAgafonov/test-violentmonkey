// ==UserScript==
// @name         Tabi claim
// @version      0.0
// @author       IvanAgafonov
// @match        https://miniapp.tabibot.com/*
// @downloadURL  https://raw.githubusercontent.com/IvanAgafonov/test-violentmonkey/refs/heads/main/tabi.js
// @updateURL    https://raw.githubusercontent.com/IvanAgafonov/test-violentmonkey/refs/heads/main/tabi.js
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

function sleep(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function autoBuy() {

  var up = Array.from(document.querySelectorAll("img[class='w-[28px] h-[28px] absolute right-[-13px]']"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("div div div div div.text-white")).filter(el => el.textContent.includes("Upgrade"));
  // div[class='flex w-[291px] h-[46px] justify-center items-center gap-2.5 shrink-0 [background:#7775E8] shadow-[0px_-2.8px_0px_1px_rgba(0,0,0,0.13)_inset,0px_0.8px_1px_0px_rgba(0,0,0,0.34)] px-[117px] py-3.5 rounded-[47px] text-white font-changa-one mt-3']
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(2000, 4000));
  }

  history.back()


  await sleep(3400);
}


function initializeScript() {

    console.log('START Tabi claim')

    setTimeout(autoBuy, getRandomDelay(9000, 11500));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
