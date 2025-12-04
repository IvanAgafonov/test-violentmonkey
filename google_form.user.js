// ==UserScript==
// @name         google form
// @version      0.13
// @author       IvanAgafonov
// @match        https://docs.google.com/forms/d/e/1FAIpQLSeCqewfmcxU6lFjLo09VHDthHFYfSuv4fPICrFj9HHfOb5OcA/viewform
// @match        https://docs.google.com/forms/d/e/1FAIpQLScRUeyrBIkTYfldYgrxp8H69ae5r1tPEs2drAi-ouafMccspg/viewform
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/google_form.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/google_form.user.js
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
    var up = Array.from(document.querySelectorAll("div div div")).filter(el => el.textContent == "You've already responded")
    if (up.length != 0){
      console.log("return");
      return
    }

    var res;
    try{
       res = await makeGetRequest();
      console.log(res.login);
    } catch (error) {console.log(error);}


    if (res) {
      var up = Array.from(document.querySelectorAll("input[data-initial-value]"))
      if (up.length != 0){
        up[0].click()

        const lastValue = up[0].value;
        up[0].value = evm_addr;
        const event = new Event("input", { bubbles: true });
        const tracker = up[0]._valueTracker;
        if (tracker) {
          tracker.setValue(lastValue);
        }
        up[0].dispatchEvent(event);
        await sleep(getRandomDelay(2200, 2300));
      }

      if (up.length > 1){
        up[1].click()

        const lastValue = up[1].value;
        up[1].value = res.login;
        const event = new Event("input", { bubbles: true });
        const tracker = up[1]._valueTracker;
        if (tracker) {
          tracker.setValue(lastValue);
        }
        up[1].dispatchEvent(event);
        await sleep(getRandomDelay(2200, 3000));
      }

      var paintButton = document.evaluate("(//div[@role='button' and @aria-label='Submit']//span//span)[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (paintButton){
        paintButton.click()
        try{
          GM_xmlhttpRequest( {
             'method' : 'GET',
             'url' : "http://127.0.0.1:5000/google_form_submited?profile_number=" + profile_number
            });
        } catch (error) {console.log(error);}
        await sleep(getRandomDelay(2200, 2300));
      }

    }


}


function initializeScript() {

    console.log('START claim  ')

    setTimeout(autoBuy, getRandomDelay(10000, 13050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
