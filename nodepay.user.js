// ==UserScript==
// @name         nodepay
// @version      0.13
// @author       IvanAgafonov
// @match        https://app.nodepay.ai/missions
// @match        https://app.nodepay.ai/medal
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/nodepay.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/nodepay.user.js
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
  var up = Array.from(document.querySelectorAll("div div")).filter(el => el.textContent.includes("Claim ") && el.className.includes("items-center text-white"));
  for (const item of up) {
    triggerEvents(item);
    await sleep(getRandomDelay(3000, 4000));
    var up2 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Done")
    if (up2.length != 0){
      triggerEvents(up2[0]);
      await sleep(getRandomDelay(2000, 3000));
    }
  }

  up = Array.from(document.querySelectorAll("div div")).filter(el => el.textContent == "Claim" && el.className.includes("items-center text-white") && !el.parentElement.className.includes("hidden"));
  console.log(up);
  if (up.length != 0) {
    triggerEvents(up[0]);
    await sleep(getRandomDelay(1000, 1100));
  }

  up = Array.from(document.querySelectorAll("img[src='https://cdn.nodepay.org/medal/Medal_1.png']")).filter(el => !el.style.cssText || !el.style.cssText.includes("grayscale"))
  var up3 = Array.from(document.querySelectorAll("img[src='https://cdn.nodepay.org/medal/Medal_6.png']")).filter(el => !el.style.cssText || !el.style.cssText.includes("grayscale"))
  if (up.length != 0 && up3.length != 0) {
    try{
      await fetch("http://127.0.0.1:5000/nodepay?profile_number=" + profile_number);
    } catch (error) {}
  }

   // AI vs. Human: Who Do You Trust? 🤖
  var paintButton = document.evaluate("//div[text()='AI vs. Human: Who Do You Trust? 🤖']/parent::div/parent::div/parent::div/parent::div//span[text()='Answer']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (paintButton) {
    triggerEvents(paintButton);
    await sleep(getRandomDelay(2000, 3000));

    var answers = ["Yes, I use them regularly.", "Yes, but only occasionally.", "No, I’ve never used one.", "I’m not sure if I have."];
    shuffle(answers);
    var up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == answers[0])
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }

    answers = ["Yes, AI summaries are just as good (or better).", "Sometimes, but they still need improvement.", "No, human-written summaries are still better.", "No, human-written summaries are still better.", "I don’t read summaries, I prefer full content."];
    shuffle(answers);
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == answers[0])
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }

    answers = ["Missing context – AI skips important details.", "Oversimplification – The summary removes too much depth.", "Misinterpretation – AI sometimes gets the meaning wrong.", "Repetitiveness – AI often summarizes content in a generic way.", "Inaccuracy – AI sometimes includes wrong or misleading information."];
    shuffle(answers);
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == answers[0])
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }

    answers = ["Human-written summary – I trust human judgment more.", "AI-generated summary – AI is less biased than humans.", "Depends on the source – I’ll compare both before deciding.", "I wouldn’t trust either without fact-checking myself."];
    shuffle(answers);
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == answers[0])
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }

    answers = ["Yes, I already do.", "Yes, but only if I can verify key details.", "No, AI summaries are too unreliable for that.", "No, I prefer reading the full content myself."];
    shuffle(answers);
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == answers[0])
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }

    answers = ["Yes, it would help me decide when to trust AI.", "Maybe, but I’d still double-check important details.", "No, confidence scores wouldn’t change my trust in AI.", "I don’t trust AI summaries at all, regardless of confidence scores."];
    shuffle(answers);
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == answers[0])
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }

    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Submit")
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }
  }

  // User understanding (part 1)
  paintButton = document.evaluate("//div[text()='User understanding (part 1)']/parent::div/parent::div/parent::div/parent::div//span[text()='Answer']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (paintButton) {
    triggerEvents(paintButton);
    await sleep(getRandomDelay(2000, 3000));

    var answers = ["Yes ", "No "];
    shuffle(answers);
    var up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == answers[0])
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }

    answers = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola"];
    shuffle(answers);
    up3 = Array.from(document.querySelectorAll("#basic_location"));
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }
    up3 = Array.from(document.querySelectorAll("div")).filter(el => el.textContent == answers[0] && el.className == 'ant-select-item-option-content')

    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }

    answers = ["Male", "Female "];
    shuffle(answers);
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == answers[0])
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }

    answers = ["Software Engineer", "Data Scientist", "Financial Analyst"];
    shuffle(answers);
    up3 = Array.from(document.querySelectorAll("#basic_occupation"));
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }
    up3 = Array.from(document.querySelectorAll("div")).filter(el => el.textContent == answers[0] && el.className == 'ant-select-item-option-content')
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }

    answers = ["Finance", "Retail", "Manufacturing"];
    shuffle(answers);
    up3 = Array.from(document.querySelectorAll("#basic_industry"));
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }
    up3 = Array.from(document.querySelectorAll("div")).filter(el => el.textContent == answers[0] && el.className == 'ant-select-item-option-content')
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }

    answers = ["Under 18", "18-24 ", "25-34", "35-44", "45-54"];
    shuffle(answers);
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == answers[0])
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }

    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Submit")
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }
  }

  // Understanding your trading experience in Web3
  paintButton = document.evaluate("//div[text()='Understanding your trading experience in Web3']/parent::div/parent::div/parent::div/parent::div//span[text()='Answer']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (paintButton) {
    triggerEvents(paintButton);
    await sleep(getRandomDelay(2000, 3000));

    var answers = ["Less than 1 month", "Less than 6 months", "More than 1 year", "More than 3 years"];
    shuffle(answers);
    var up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == answers[0])
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }

    answers = ["I traded on CEXs (eg: Binance, OKX, Coinbase) before.", "I traded on DEXs (Liquid, Raydium, Uniswap) before.", "I used both before.", "I do not know how to trade."];
    shuffle(answers);
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == answers[0])
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }

    answers = ["Yes", "No", "I do not know how to trade."];
    shuffle(answers);
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == answers[0])
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }

    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Submit")
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }
  }

  // Understanding CEXs / DEXs used by our community
  paintButton = document.evaluate("//div[text()='Understanding CEXs / DEXs used by our community']/parent::div/parent::div/parent::div/parent::div//span[text()='Answer']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (paintButton) {
    triggerEvents(paintButton);
    await sleep(getRandomDelay(2000, 3000));

    var answers = ["Binance", "OKX", "Kucoin", "Coinbase", "Bitget"];
    shuffle(answers);
    var up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == answers[0])
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }

    answers = ["Binance", "OKX", "Kucoin", "Coinbase", "Bitget", "BingX", "Upbit", "Bithumb", "MEXC"];
    shuffle(answers);
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == answers[0])
    if (up3.length > 1){
      triggerEvents(up3[1]);
      await sleep(getRandomDelay(1000, 1200));
    }
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == answers[1])
    if (up3.length > 1){
      triggerEvents(up3[1]);
      await sleep(getRandomDelay(1000, 1200));
    }
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == answers[2])
    if (up3.length > 1){
      triggerEvents(up3[1]);
      await sleep(getRandomDelay(1000, 1200));
    }

    answers = ["Raydium", "Orca", "Jupiter", "Saber", "Meteora"];
    shuffle(answers);
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == answers[0])
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }

    answers = ["Once a month", "2–4 times a month", "5–9 times a month", "10 or more times a month"];
    shuffle(answers);
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == answers[0])
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }

    answers = ["Bitget Wallet", "Bybit Wallet", "Binance Wallet", "Solflare"];
    shuffle(answers);
    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == answers[0])
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }

    answers = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola"];
    shuffle(answers);
    up3 = Array.from(document.querySelectorAll("#basic_country"));
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }
    up3 = Array.from(document.querySelectorAll("div")).filter(el => el.textContent == answers[0] && el.className == 'ant-select-item-option-content')
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }

    up3 = Array.from(document.querySelectorAll("span")).filter(el => el.textContent == "Submit")
    if (up3.length != 0){
      triggerEvents(up3[0]);
      await sleep(getRandomDelay(1000, 1200));
    }
  }

}


function initializeScript() {

    console.log('START claim  ')

    setTimeout(autoBuy, getRandomDelay(10000, 10050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
