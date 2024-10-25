// ==UserScript==
// @name         Blum claim
// @version      0.2
// @author       IvanAgafonov
// @match        https://telegram.blum.codes/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/blum_claim.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/blum_claim.user.js
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

async function simulateTyping(element, text, delay) {
  for (const char of text) {
    const event = new KeyboardEvent('keydown', { key: char });
    element.dispatchEvent(event);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
    for (const char of text) {
    const event = new KeyboardEvent('keypress', { key: char });
    element.dispatchEvent(event);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
    for (const char of text) {
    const event = new KeyboardEvent('keyup', { key: char });
    element.dispatchEvent(event);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

async function start_claim() {
  var up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("Start"));
  shuffle(up);
  if (up.length != 0){
    for (const item of up) {
      item.click();
      await sleep(getRandomDelay(2000, 5000));
    }
  }

  up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("Claim"));
  shuffle(up);
  if (up.length != 0){
    for (const item of up) {
      item.click();
      await sleep(getRandomDelay(2000, 5000));
    }
  }
}

async function verify() {
  var up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("Verify"));
  shuffle(up);
  if (up.length != 0){
    for (const item of up) {
      var title = Array.from(item.parentElement.parentElement.querySelectorAll(".title"))
      if (title.length != 0) {
        if (title[0].textContent.includes("Pre-Market Trading?") ||
           title[0].textContent.includes("Doxxing? What's that?") ||
           title[0].textContent.includes("$2.5M+ DOGS Airdrop") ||
           title[0].textContent.includes("Liquidity Pools Guide") ||
           title[0].textContent.includes("What Are AMMs?") ||
           title[0].textContent.includes("Say No to Rug Pull!") ||
           title[0].textContent.includes("What are Telegram Mini Apps?") ||
            title[0].textContent.includes("Secure your Crypto!") ||
            title[0].textContent.includes("Forks Explained") ||
            title[0].textContent.includes("Play track") ||
            title[0].textContent.includes("How to Analyze Crypto?") ||
           title[0].textContent.includes("Navigating Crypto")) {
          item.click();
          await sleep(1000)

          var mytext = "";
          if (title[0].textContent.includes("Pre-Market Trading?")) {
            mytext = "WOWBLUM"
          }
          if (title[0].textContent.includes("Doxxing? What's that?")) {
            mytext = "NODOXXING"
          }
          if (title[0].textContent.includes("$2.5M+ DOGS Airdrop")) {
            mytext = "HAPPYDOGS"
          }
          if (title[0].textContent.includes("Play track")) {
            mytext = "Blum - Big City Life"
          }
          if (title[0].textContent.includes("Liquidity Pools Guide")) {
            mytext = "BLUMERSSS"
          }
          if (title[0].textContent.includes("What Are AMMs?")) {
            mytext = "CRYPTOSMART"
          }
          if (title[0].textContent.includes("Say No to Rug Pull!")) {
            mytext = "SUPERBLUM"
          }
          if (title[0].textContent.includes("What are Telegram Mini Apps?")) {
            mytext = "CRYPTOBLUM"
          }
          if (title[0].textContent.includes("Secure your Crypto!")) {
            mytext = "BEST PROJECT EVER"
          }
          if (title[0].textContent.includes("Forks Explained")) {
            mytext = "GO GET"
          }
          if (title[0].textContent.includes("How to Analyze Crypto?")) {
            mytext = "VALUE"
          }
          if (title[0].textContent.includes("Navigating Crypto")) {
            mytext = "HEYBLUM"
          }


          var verify = document.querySelector("input[placeholder='Keyword']")
          verify.click();
          verify.value = mytext
          simulateTyping(verify, mytext, 500);

          verify.dispatchEvent(new Event('input', { bubbles: true }));
          verify.dispatchEvent(new Event('change'));
          await sleep(getRandomDelay(2000, 3000));
          // input.value = text;
          // verify.setAttribute('value', mytext);
          up = Array.from(document.querySelectorAll("div div div div div div div button div")).filter(el => el.textContent.includes("Verify") && el.parentElement.getAttribute("class").includes("kit-button"));
          if (up.length != 0){
            up[0].click();
            await sleep(getRandomDelay(2000, 4000));
          }
        }
      }
    }
  }

  up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("Claim"));
  shuffle(up);
  if (up.length != 0){
    for (const item of up) {
      item.click();
      await sleep(getRandomDelay(2000, 5000));
    }
  }
}

async function autoBuy() {

  // var up = Array.from(document.querySelectorAll("img[alt='reload']"));
  // if (up.length != 0){
  //   up[0].click();
  //   await sleep(getRandomDelay(4000, 6000));
  // }

  up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("Continue"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(4000, 6000));
  }

  up = Array.from(document.querySelectorAll("button div div")).filter(el => el.textContent.includes("Claim"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("button div div")).filter(el => el.textContent.includes("Start farming"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  if (getRandomDelay(100, 2600) > 250) {

    up = Array.from(document.querySelectorAll("div div div div a")).filter(el => el.textContent.includes("Play"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(60000000, 140000000));
    }
  } else {

    var up = Array.from(document.querySelectorAll("div a span")).filter(el => el.textContent.includes("Frens"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(2000, 4000));
    }

    up = Array.from(document.querySelectorAll(".claim-button"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(2000, 4000));
    }

    up = Array.from(document.querySelectorAll("div a span")).filter(el => el.textContent.includes("Earn"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(2000, 4000));
    }

    await start_claim();
    if (getRandomDelay(100, 2600) > 1600) {
      up = Array.from(document.querySelectorAll(".tasks-pill-inline.is-status-not-started.is-light.pages-tasks-pill, .tasks-pill-inline.is-status-not-started.is-dark.pages-tasks-pill"));
      if (up.length != 0){
        for (const item of up) {
          item.click();
          await sleep(getRandomDelay(2000, 4000));
          await start_claim();
          await verify();
          var up3 = Array.from(document.querySelectorAll("svg path")).filter(el => el.getAttribute("d") && el.getAttribute("d").includes("M6 18L18 6"));
          if (up3.length != 0){
            up3[0].parentElement.parentElement.click();
            await sleep(getRandomDelay(2000, 4000));
          }
        }
      }
    }

    await verify();


    up = Array.from(document.querySelectorAll("div div label span")).filter(el => el.textContent.includes("OnChain"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(2000, 4000));
    }

    await start_claim();

    up = Array.from(document.querySelectorAll("div div label span")).filter(el => el.textContent.includes("Socials"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(2000, 4000));
    }

    await start_claim();

    up = Array.from(document.querySelectorAll("div div label span")).filter(el => el.textContent.includes("Academy"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(2000, 4000));
    }

    await start_claim();
    await verify();

    up = Array.from(document.querySelectorAll("div div label span")).filter(el => el.textContent.includes("Frens"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(2000, 4000));
    }

    await start_claim();

    up = Array.from(document.querySelectorAll("div div label span")).filter(el => el.textContent.includes("Farming"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(2000, 4000));
    }

    await start_claim();

    var up = Array.from(document.querySelectorAll("div a span")).filter(el => el.textContent.includes("Home"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(2000, 4000));
    }

    up = Array.from(document.querySelectorAll("div div div div a")).filter(el => el.textContent.includes("Play"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(60000000, 140000000));
    }
  }
}

  // up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent.includes("+5M Coubers Like & RT") ||
  //                                                                     el.textContent.includes("Master of highload") ||
  //                                                                     el.textContent.includes("Complete all tasks") ||
  //                                                                     el.textContent.includes("Like & Share #FreeDurov") ||
  //                                                               el.textContent.includes("Follow on Telegram") ||
  //                                                               el.textContent.includes("Welcome bonus") ||
  //                                                               el.textContent.includes("Follow on X") ||
  //                                                               el.textContent.includes("Follow on YouTube") ||
  //                                                               el.textContent.includes("WTF is Coub") ||
  //                                                                     el.textContent.includes("#NewFeatures Like & Retweet"));
  // shuffle(up);
  // if (up.length != 0){
  //   for (const item of up) {
  //     if (item.parentElement.nextElementSibling.textContent.includes("Start")) {
  //       item.parentElement.nextElementSibling.click();
  //       await sleep(getRandomDelay(2000, 5000));
  //     }
  //   }
  // }




function initializeScript() {

    console.log('START Blum claim ver 0.1')

    setTimeout(autoBuy, getRandomDelay(15000, 19500));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
