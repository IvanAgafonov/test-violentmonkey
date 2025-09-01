// ==UserScript==
// @name         twitter login
// @version      0.11
// @author       IvanAgafonov
// @match        https://x.com/home
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/twitter_login.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/twitter_login.user.js
// @homepage     https://github.com/IvanAgafonov/test-violentmonkey
// @grant        GM_xmlhttpRequest

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

function querySelectorAllShadows(selector, el = document.body) {
  // recurse on childShadows
  const childShadows = Array.from(el.querySelectorAll('*')).
    map(el => el.shadowRoot).filter(Boolean);

  // console.log('[querySelectorAllShadows]', selector, el, `(${childShadows.length} shadowRoots)`);

  const childResults = childShadows.map(child => querySelectorAllShadows(selector, child));

  // fuse all results into singular, flat array
  const result = Array.from(el.querySelectorAll(selector));
  return result.concat(childResults).flat();
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


function makeGetRequest() {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest( {
             'method' : 'GET',
             'url' : "http://127.0.0.1:5000/twitter_login?profile_number=" + profile_number,
             onload  : response => resolve(JSON.parse(response.response)),
             onerror : response => console.error( response )
          });
    });

}

async function autoBuy() {

  up = Array.from(document.querySelectorAll("div span span")).filter(el => el.textContent == "Înainte")
  if (up.length != 0){
    var res;
    try{
       res = await makeGetRequest();
      console.log(res.login);
    } catch (error) {console.log(error);}


    if (res) {
      var up = Array.from(document.querySelectorAll("input[autocomplete='username']"))
      if (up.length != 0){
        up[0].click()

        const lastValue = up[0].value;
        up[0].value = res.login;
        const event = new Event("input", { bubbles: true });
        const tracker = up[0]._valueTracker;
        if (tracker) {
          tracker.setValue(lastValue);
        }
        up[0].dispatchEvent(event);
        await sleep(getRandomDelay(1200, 2000));
      }

      up = Array.from(document.querySelectorAll("div span span")).filter(el => el.textContent == "Înainte")
      if (up.length != 0){
        up[0].click()
        await sleep(getRandomDelay(4000, 5000));
      }

      up = Array.from(document.querySelectorAll("input[autocomplete='current-password']"))
      if (up.length != 0){
        up[0].click()

        const lastValue = up[0].value;
        up[0].value = res.password;
        const event = new Event("input", { bubbles: true });
        const tracker = up[0]._valueTracker;
        if (tracker) {
          tracker.setValue(lastValue);
        }
        up[0].dispatchEvent(event);
        await sleep(getRandomDelay(1200, 2000));
      }

      up = Array.from(document.querySelectorAll("div span span")).filter(el => el.textContent == "Conectează-te")
      if (up.length != 0){
        up[0].click()
        await sleep(getRandomDelay(6000, 6000));
      }

      up = Array.from(document.querySelectorAll("div span")).filter(el => el.textContent == "Notifications")
      if (up.length != 0){
        try{
            GM_xmlhttpRequest( {
               'method' : 'GET',
               'url' : "http://127.0.0.1:5000/twitter_login_unsuccess?profile_number=" + profile_number
              });
          } catch (error) {console.log(error);}
      }
    }
  }
}





function initializeScript() {

    console.log('START login  ')

    setTimeout(autoBuy, getRandomDelay(10000, 13050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
