// ==UserScript==
// @name         Cats claim
// @version      0.1
// @author       IvanAgafonov
// @match        https://cats-frontend.tgapps.store/*
// @grant        none
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/catsgang.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/catsgang.user.js
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


async function autoBuy() {
  if (getRandomDelay(1000, 3000) < 2000) {
    var up = Array.from(document.querySelectorAll("div div button")).filter(el => el.textContent.includes("Show "));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(5500, 6000));
    }

    up = Array.from(document.querySelectorAll("div div button")).filter(el => el.textContent.includes("Open"));
    shuffle(up);
    if (up.length != 0){
      for (const item of up) {
        item.click();
        await sleep(getRandomDelay(3200, 4000));
      }
    }

    var up = Array.from(document.querySelectorAll("button svg path")).filter(el => el.getAttribute("d") && el.getAttribute("d").includes("m10 15 5-3-5-3z"));
    shuffle(up);
    if (up.length != 0){
      for (const item of up) {
        item.parentElement.parentElement.click();
        await sleep(getRandomDelay(3200, 5000));
        var mytext = "";
        var up2 = Array.from(document.querySelectorAll("div div input")).filter(el => !el.disabled);
        if (up2.length != 0){

          var episod = Array.from(document.querySelectorAll("div div h2")).filter(el => el.textContent.includes("How To Make 10x On Crypto") ||
                                                                                  el.textContent.includes("Boost Your Cats Earnings!") ||
                                                                                  el.textContent.includes("FREE Crypto") ||
                                                                                  el.textContent.includes("Futures Trading PART 1") ||
                                                                                  el.textContent.includes("Watching YouTube Videos!") ||
                                                                                  el.textContent.includes("Start From ZERO") ||
                                                                                  el.textContent.includes("GET RICH NOW") ||
                                                                                  el.textContent.includes("How to stay productive") ||
                                                                                  el.textContent.includes("Produciviy tips") ||
                                                                                  el.textContent.includes("Earn $1000 just by Listening to Music") ||
                                                                                  el.textContent.includes("Make Money Online Free 1") ||
                                                                                  el.textContent.includes("Pinterest Affiliate Marketing") ||
                                                                                  el.textContent.includes("Per MONTH") ||
                                                                                  el.textContent.includes("Job Without a Degree") ||
                                                                                  el.textContent.includes("Learned to Code!") ||
                                                                                  el.textContent.includes("EARN $30 PER WORD") ||

                                                                                  el.textContent.includes("Earn Real Money Playing Games") ||
                                                                                  el.textContent.includes("Change Your Life") ||
                                                                                  el.textContent.includes("Get Paid to Play") ||
                                                                                  el.textContent.includes("BLOCKCHAIN TIPS") ||

                                                                                  el.textContent.includes("Futures Trading PART 2"));

          mytext = "";
          if (episod.length != 0){
            if (episod[0].textContent.includes("Earn Real Money Playing Games")) {
              mytext = "BUBBLE"
            }
            if (episod[0].textContent.includes("Change Your Life")) {
              mytext = "BOUNTY"
            }
            if (episod[0].textContent.includes("Get Paid to Play")) {
              mytext = "BULL"
            }
            if (episod[0].textContent.includes("BLOCKCHAIN TIPS")) {
              mytext = "BRIDGES"
            }
            if (episod[0].textContent.includes("EARN $30 PER WORD")) {
              mytext = "BLOCK"
            }
            if (episod[0].textContent.includes("Learned to Code!")) {
              mytext = "LEDGER"
            }
            if (episod[0].textContent.includes("Job Without a Degree")) {
              mytext = "LAMBO"
            }
            if (episod[0].textContent.includes("Per MONTH")) {
              mytext = "BITCOINER"
            }
            if (episod[0].textContent.includes("Pinterest Affiliate Marketing")) {
              mytext = "BITSTREAM"
            }
            if (episod[0].textContent.includes("How To Make 10x On Crypto PART 2")) {
              mytext = "AUCTION"
            }
            if (episod[0].textContent.includes("How To Make 10x On Crypto PART 3")) {
              mytext = "AUDIT"
            }
            if (mytext == "" && episod[0].textContent.includes("How To Make 10x On Crypto")) {
              mytext = "ABSTRACT"
            }
            if (episod[0].textContent.includes("Earn $1000 just by Listening to Music")) {
              mytext = "BAG"
            }
            if (episod[0].textContent.includes("Make Money Online Free 1")) {
              mytext = "AFFILIATE"
            }
            if (episod[0].textContent.includes("Produciviy tips")) {
              mytext = "BAKING"
            }
            if (episod[0].textContent.includes("How to stay productive")) {
              mytext = "ALTCOIN"
            }
            if (episod[0].textContent.includes("GET RICH NOW")) {
              mytext = "BAKERS"
            }
            if (episod[0].textContent.includes("Start From ZERO")) {
              mytext = "ALPHA"
            }
            if (episod[0].textContent.includes("Watching YouTube Videos!")) {
              mytext = "ASIC"
            }
            if (episod[0].textContent.includes("Boost Your Cats Earnings!")) {
              mytext = "dildo"
            }
            if (episod[0].textContent.includes("FREE Crypto")) {
              mytext = "dip"
            }
            if (episod[0].textContent.includes("Futures Trading PART 1")) {
              mytext = "AIRNODE"
            }
            if (episod[0].textContent.includes("Futures Trading PART 2")) {
              mytext = "WEI"
            }
          }

            // up2[0].value = ""
            up2[0].click()
            // up2[0].value = ""
            // var event2 = new Event('focus');

            // Dispatch it.
            // up2[0].dispatchEvent(event2);
            // event2 = new Event('change');
            // simulateTyping(up2[0], mytext, 400);
            console.log("value")
            console.log(up2[0].value)
            console.log(mytext)
            if (up2[0].value != '') {
              var up3 = Array.from(document.querySelectorAll("svg path")).filter(el => el.getAttribute("d") && el.getAttribute("d").includes("M22 10L10 22"));
              if (up3.length != 0){
                up3[0].parentElement.parentElement.click();
              }
              return;
            }
            up2[0].setAttribute('value', mytext);
            // event2 = new Event('complete');

            // Dispatch it.
            // up2[0].dispatchEvent(event2);
            // event2 = new Event('change');

            // Dispatch it.
            // up2[0].dispatchEvent(event2);
            up2[0].dispatchEvent(new Event('input', { bubbles: true }));
            up2 = Array.from(document.querySelectorAll("div button h6")).filter(el => el.textContent.includes("Check answer"));
            if (up2.length != 0){
              up2[0].click();
              await sleep(getRandomDelay(1000, 3000));
            }
            var up4 = Array.from(document.querySelectorAll("svg path")).filter(el => el.getAttribute("d") && el.getAttribute("d").includes("M22 10L10 22"));
            if (up4.length != 0){
              up4[0].parentElement.parentElement.click();
            }
            return;

        }
        else {
          up2 = Array.from(document.querySelectorAll("div button h6")).filter(el => el.textContent.includes("Watch video"));
          if (up2.length != 0){
            up2[0].click();
            await sleep(getRandomDelay(1000, 2000));
          }
        }
        var up3 = Array.from(document.querySelectorAll("svg path")).filter(el => el.getAttribute("d") && el.getAttribute("d").includes("M22 10L10 22"));
        if (up3.length != 0){
          up3[0].parentElement.parentElement.click();
          await sleep(getRandomDelay(2000, 3000));
        }
      }
    }
  }
}


function initializeScript() {

    console.log('START Cats claim')

    //setTimeout(autoBuy, getRandomDelay(11000, 13500));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
