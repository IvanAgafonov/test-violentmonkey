// ==UserScript==
// @name         Blum claim
// @version      0.24
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

async function connectWallet(){
  var up2 = Array.from(document.querySelectorAll("div")).filter(el => el.textContent == "Wallet On")
  if (up2.length != 0){
    triggerEvents(up2[0]);
    await sleep(getRandomDelay(3000, 4100));
    up2 = Array.from(document.querySelectorAll("button")).filter(el => el.textContent.includes("Open Wallet in Telegram"))
    if (up2.length != 0){
      triggerEvents(up2[0]);
      await sleep(getRandomDelay(20000, 21000));
    }
  }
}

async function start_claim() {
  var up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("Start"));
  shuffle(up);
  if (up.length != 0){
    for (const item of up) {
      var need_wait = false;
      try {
        if (Array.from(item.parentElement.parentElement.parentElement.querySelectorAll("div")).filter(el => el.textContent.includes("Proof of Activity") || el.textContent.includes("Trade any memecoin") || el.textContent.includes("Launch a memecoin")).length > 0)
        {
          console.log("wait!")
          need_wait = true;
        }
      } catch (error) {}
      if (need_wait) {
        await sleep(getRandomDelay(200, 300));
      } else {
        item.click();
        await sleep(getRandomDelay(2000, 3000));
      }
    }
  }

  up = Array.from(document.querySelectorAll("input[type='checkbox'][class='checkbox-legal']"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(2000, 3000));
    up = Array.from(document.querySelectorAll("div button div")).filter(el => el.textContent.includes("Go to"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(2000, 3000));
    }
  }


  up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("Claim"));
  shuffle(up);
  if (up.length != 0){
    for (const item of up) {
      item.click();
      await sleep(getRandomDelay(2000, 3000));
    }
  }
}

async function verify() {
  var up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("Verify"));
  shuffle(up);
  if (up.length != 0){
    for (const item of up) {
      var title = Array.from(item.parentElement.parentElement.querySelectorAll(".title"))
      var q_answer = {"Pre-Market Trading?":          "WOWBLUM",
                     "Doxxing? What's that?":         "NODOXXING",
                     "$2.5M+ DOGS Airdrop":           "HAPPYDOGS",
                     "Liquidity Pools Guide":         "BLUMERSSS",
                     "What Are AMMs?":                "CRYPTOSMART",
                     "Say No to Rug Pull!":           "SUPERBLUM",
                     "What are Telegram Mini Apps?":  "CRYPTOBLUM",
                     "Secure your Crypto!":           "BEST PROJECT EVER",
                     "Forks Explained":               "GO GET",
                     "Play track":                    "Blum - Big City Life",
                     "How to Analyze Crypto?":        "VALUE",
                     "Navigating Crypto":             "HEYBLUM",
                     "How to Memecoin?":              "MEMEBLUM",
                     "Token Burning: How & Why?":     "ONFIRE",
                     "Bitcoin Rainbow Chart?":        "SOBLUM",
                     "Crypto Terms. Part 1":          "BLUMEXPLORER",
                     "How to trade Perps?":           "CRYPTOFAN",
                     "Sharding Explained":            "BLUMTASTIC",
                     "DeFi Explained":                "BLUMFORCE",
                     "How To Find Altcoins?":         "ULTRABLUM",
                     "Crypto Slang. Part 1":          "BLUMSTORM",
                     "What is On-chain Analysis?":    "BLUMEXTRA",
                     "Pumptober Special":             "PUMPIT",
                     "What's Crypto DEX?":            "DEXXX",
                     "Node Sales in Crypto":          "BLUMIFY",
                     "Choosing a Crypto Exchange":    "CRYPTOZONE",
                     "Crypto Slang. Part 2":          "FOMOOO",
                     "DeFi Risks: Key Insights":      "BLUMHELPS",

                      "Dec 10 News":         "ELSALVADOR ",
                      "Dec 6 Crypto News":         "Hundred",

                     "Crypto Regulations #2":         "Blumrules",
                     "P2P Trading Safety Tips":       "BLUMTIPS",
                     "DEX History":                   "Godex",
                     "DEX History #3":                "LOVEBLUM",
                     "Memepad Tutorial":              "Memepad",
                      "Crypto Slang. Part 4":              "LAMBOBLUM",
                      "DEX Evolution":              "Blumspark",
                      "Is Binance a DEX?":              "Blumies",
                      "Crypto Communities":              "Blummunity",
                     "Regulation: Yay or Nay?":       "BLUMSSS",
                     "Crypto Slang. Part 3":          "BOOBLUM",
                     "Smart Contracts 101":           "SMARTBLUM",
                     "What’s Next for DeFi?":         "BLUMNOW",
                     "What is Slippage?":             "CRYPTOBUZZ",
                     "Understanding Gas Fees":        "CRYPTOGAS"}

      if (title.length != 0) {
        for(const [key, value] of Object.entries(q_answer)) {
          if (title[0].textContent == key) {
            item.click();
            await sleep(getRandomDelay(1000, 2000));
            var mytext = value;

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
            break;
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
      element.value += char;
  }
}

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


async function autoBuy() {

  // var up = Array.from(document.querySelectorAll("img[alt='reload']"));
  // if (up.length != 0){
  //   up[0].click();
  //   await sleep(getRandomDelay(4000, 6000));
  // }

  var up = Array.from(document.querySelectorAll("label input[type='text']"));
  if (up.length != 0){
    up[0].click();
    triggerEvents(up[0]);
    up[0].parentElement.click();
    triggerEvents(up[0].parentElement);

    var nameList = [
                'Time','Past','Future','Dev',
                'Fly','Flying','Soar','Soaring','Power','Falling',
                'Fall','Jump','Cliff','Mountain','Rend','Red','Blue',
                'Green','Yellow','Gold','Demon','Demonic','Panda','Cat',
                'Kitty','Kitten','Zero','Memory','Trooper','XX','Bandit',
                'Fear','Light','Glow','Tread','Deep','Deeper','Deepest',
                'Mine','Your','Worst','Enemy','Hostile','Force','Video',
                'Game','Donkey','Mule','Colt','Cult','Cultist','Magnum',
                'Gun','Assault','Recon','Trap','Trapper','Redeem','Code',
                'Script','Writer','Near','Close','Open','Cube','Circle',
                'Geo','Genome','Germ','Spaz','Shot','Echo','Beta','Alpha',
                'Gamma','Omega','Seal','Squid','Money','Cash','Lord','King',
                'Duke','Rest','Fire','Flame','Morrow','Break','Breaker','Numb',
                'Ice','Cold','Rotten','Sick','Sickly','Janitor','Camel','Rooster',
                'Sand','Desert','Dessert','Hurdle','Racer','Eraser','Erase','Big',
                'Small','Short','Tall','Sith','Bounty','Hunter','Cracked','Broken',
                'Sad','Happy','Joy','Joyful','Crimson','Destiny','Deceit','Lies',
                'Lie','Honest','Destined','Bloxxer','Hawk','Eagle','Hawker','Walker',
                'Zombie','Sarge','Capt','Captain','Punch','One','Two','Uno','Slice',
                'Slash','Melt','Melted','Melting','Fell','Wolf','Hound',
                'Legacy','Sharp','Dead','Mew','Chuckle','Bubba','Bubble','Sandwich','Smasher','Extreme','Multi','Universe','Ultimate','Death','Ready','Monkey','Elevator','Wrench','Grease','Head','Theme','Grand','Cool','Kid','Boy','Girl','Vortex','Paradox'
            ];
    alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    var finalName = nameList[Math.floor( Math.random() * nameList.length )] + nameList[Math.floor( Math.random() * nameList.length )] + alphabet[Math.floor( Math.random() * alphabet.length )];

    up[0].value = finalName;
    const event = new Event('input');
    up[0].dispatchEvent(event);

    await sleep(getRandomDelay(4000, 6000));
  }

  up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("Continue"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(4000, 6000));
  }

  up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("Continue"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(4000, 6000));
  }

  up = Array.from(document.querySelectorAll("div div div div")).filter(el => el.textContent.includes("Compete for rewards"));
  if (up.length != 0){
    up = Array.from(document.querySelectorAll("div div div a")).filter(el => el.textContent.includes("Open"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(4000, 6000));
      up = Array.from(document.querySelectorAll("div div div a.pages-tribe-list-item-template"));
      if (up.length != 0){
        var item1 = up[Math.floor(Math.random() * up.length)]
        item1.click();
        await sleep(getRandomDelay(4000, 6000));
        up = Array.from(document.querySelectorAll("div button span")).filter(el => el.textContent.includes("Join"));
        if (up.length != 0){
          up[0].click();
          await sleep(getRandomDelay(4000, 6000));
          history.back()
          await sleep(getRandomDelay(1000, 2000));
          history.back()
          await sleep(getRandomDelay(1000, 2000));
        }
      }
    }
  }

  up = Array.from(document.querySelectorAll("div a span")).filter(el => el.textContent.includes("Home"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("Claim"));
  if (up.length != 0){
    for (const item of up) {
      item.click();
      await sleep(getRandomDelay(2000, 3000));
    }
  }

  up = Array.from(document.querySelectorAll("div")).filter(el => el.textContent.includes("Claim"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("button div div")).filter(el => el.textContent.includes("Start farming"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("div button div")).filter(el => el.textContent.includes("Farm"));
  if (up.length != 0){
    up[0].click();
    await sleep(getRandomDelay(3000, 4000));
  }

  up = Array.from(document.querySelectorAll("div[class='content'] div[class='balance']"));
  var count_tickets = 0;
  if (up.length != 0){
    try{
      console.log(up[0]);
      count_tickets = up[0].textContent.trim().split(' ')[0];
      count_tickets = Number(count_tickets);
      await sleep(getRandomDelay(3000, 4000));
    } catch (error) {}
  }

  console.log('count_tickets');
  console.log(count_tickets)

  if (getRandomDelay(100, 2600) > 1550 || count_tickets > 0) {

    up = Array.from(document.querySelectorAll("div div div div")).filter(el => el.textContent == "Play");
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(60000000, 140000000));
    }
  } else {

    up = Array.from(document.querySelectorAll("div a span")).filter(el => el.textContent.includes("Frens"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(3000, 4000));
    }

    up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent.includes("Points"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(3000, 4000));
    }

    up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("Claim"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(3000, 4000));
    }

    if (getRandomDelay(100, 2600) > 2000) {
      up = Array.from(document.querySelectorAll("div a span")).filter(el => el.textContent.includes("Wallet"));
      if (up.length != 0){
        up[0].click();
        await sleep(getRandomDelay(3000, 4000));
      }
      up = Array.from(document.querySelectorAll("div button")).filter(el => el.textContent.includes("Connect wallet"));
      if (up.length != 0){
        up[0].click();
        await sleep(getRandomDelay(3000, 4000));
      }
      await connectWallet();
    }

    up = Array.from(document.querySelectorAll("div a span")).filter(el => el.textContent.includes("Earn"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(2000, 4000));
    }
    var up3;
    await start_claim();
    if (getRandomDelay(100, 2600) > 1000) {
      up = Array.from(document.querySelectorAll(".tasks-pill-inline.is-status-not-started.is-light.pages-tasks-pill, .tasks-pill-inline.is-status-not-started.is-dark.pages-tasks-pill"));
      if (up.length != 0){
        for (const item of up) {
          var need_wait = false;
          try {
            if (Array.from(item.parentElement.parentElement.parentElement.querySelectorAll("div")).filter(el => el.textContent.includes("Proof of Activity")).length > 0){
              console.log("wait!")
              need_wait = true;
            }
          } catch (error) {}
          if (need_wait) {
          } else {
            item.click();
            await sleep(getRandomDelay(2000, 5000));
          }
          await start_claim();
          up3 = Array.from(document.querySelectorAll("button.close-btn"));
          if (up3.length != 0) {
            up3[0].click();
            await sleep(getRandomDelay(2000, 4000));
          }
          await verify();
          up3 = Array.from(document.querySelectorAll("button.close-btn"));
          if (up3.length != 0) {
            up3[0].click();
            await sleep(getRandomDelay(2000, 4000));
          }
        }
      }
    }

    await verify();
    up3 = Array.from(document.querySelectorAll("button.close-btn"));
    if (up3.length != 0) {
      up3[0].click();
      await sleep(getRandomDelay(2000, 4000));
    }


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

    up = Array.from(document.querySelectorAll("div div label span")).filter(el => el.textContent.includes("Blum Bits"));
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

    up = Array.from(document.querySelectorAll("button div")).filter(el => el.textContent.includes("Claim"));
    shuffle(up);
    if (up.length != 0){
      for (const item of up) {
        item.click();
        await sleep(getRandomDelay(2000, 3000));
      }
    }

    up = Array.from(document.querySelectorAll("div div div div a")).filter(el => el.textContent.includes("Play"));
    if (up.length != 0){
      up[0].click();
      await sleep(getRandomDelay(60000000, 140000000));
    }
  }
}




function initializeScript() {

    console.log('START Blum claim ver 0.12')

    setTimeout(autoBuy, getRandomDelay(12000, 16000));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
